import { useTranslation } from "react-i18next";
import { Modal } from "antd";
import { useState } from "react";

import KingnetAbi from "@/ethers/abi/Kingnet.json";

import { ethers } from "ethers";

const Subscribe = ({ open }) => {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(open);

  const handleOk = async () => {
    // setIsModalOpen(false);

    const provider = new ethers.JsonRpcProvider(
      "https://data-seed-prebsc-1-s1.binance.org:8545/"
    );
    console.log(provider);

    const network = await provider.detectNetwork();
    console.log("Provider connected to:", network);

    const signer = await provider.getSigner();
    console.log(signer);
    const contractAddress = import.meta.env.VITE_KINGNET_CONTRACT_ADDRESS; // 合约地址
    console.log(contractAddress);

    const KingnetContracr = ethers.Contract(
      contractAddress,
      KingnetAbi,
      signer // 使用provider则为只读
    );

    console.log(KingnetContracr);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const testRpcConnection = async (url) => {
    try {
      const provider = new ethers.JsonRpcProvider(url);
      const network = await provider.getNetwork();
      console.log("Connected to:", network.name, "Chain ID:", network.chainId);
      const block = await provider.getBlockNumber();
      console.log("Latest block:", block);
      return true;
    } catch (error) {
      console.error("Connection failed:", error.message);
      return false;
    }
  };

  // 测试常用RPC节点
  // testRpcConnection("https://bsc-dataseed.binance.org/"); // BSC主网
  // testRpcConnection("https://rpc.ankr.com/eth");         // Ethereum主网
  // testRpcConnection("http://localhost:8545");            // 本地节点

  async function initProvider() {
    try {
      // 初始化Provider
      const provider = new ethers.JsonRpcProvider(
        "https://bsc-dataseed.binance.org/"
      );

      // 验证连接
      const network = await provider.getNetwork();
      const block = await provider.getBlockNumber();

      console.log(
        `网络--Connected to chain ${network.chainId}, latest block: ${block}`
      );

      const balance = await provider.getBalance(
        "0x87405434fD608070A3C33345F4F55e2C96FCf3e8"
      );
      console.log("余额:", ethers.formatEther(balance));


      const signer = await provider.getSigner();

      console.log("signer:", signer);

    } catch (error) {
      console.error("Provider初始化失败:", error);

      // 回退到本地节点
      console.log("尝试连接本地节点...");
      return new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    }
  }

  initProvider();

  return (
    <>
      <Modal
        title="订阅提示"
        open={isModalOpen}
        onOk={handleOk}
        okText="订阅"
        onCancel={handleCancel}
      >
        <p>当前分类的免费次数剩余0次，请订阅使用</p>
        <p>订阅说明：日订阅价格5BNB，当天使用次数500次</p>
      </Modal>
    </>
  );
};

export default Subscribe;
