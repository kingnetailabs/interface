import { useTranslation } from "react-i18next";
import { App, Radio } from "antd";
import Kingnet_ABI from "@/ethers/abi/Kingnet.json";
import Web3 from "web3";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getSubscriptionPackage } from "@/api";
const style = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  marginTop: 16,
};
const buySubscribe = () => {
  const { t } = useTranslation();
  const { modal, message } = App.useApp();

  const Kingnet_Address = import.meta.env.VITE_KINGNET_CONTRACT_ADDRESS;
  const provider = window.ethereum;
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(Kingnet_ABI, Kingnet_Address);

  const { userAddress } = useSelector((state) => state.main);

  const [selectVal, setSelectVal] = useState(1);
  let options = [];

  const handleOk = async () => {
    if (!userAddress) return message.error(t("connectWalletFirst"));

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length === 0) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    console.log(options);

    const item = options.find((el) => el.value === selectVal);

    const { pool_id, amount } = item;

    await contract.methods
      .deposit(pool_id)
      .send({
        from: userAddress,
        value: web3.utils.toWei(amount, "ether"),
      })
      .on("transactionHash", (hash) => {
        message.success("Subscribe successfully");
      })
      .on("error", (err) => {
        console.log(err);
        message.error(err);
      });
  };

  const onChange = (e) => {
    setSelectVal(e.target.value);
  };
  const SubscribeModal = async () => {
    const res = await getSubscriptionPackage();
    console.log(`res`, res);
    options = [];
    if (!res.code) {
      for (const item of res.data) {
        const { pool_id } = item;

        const poolInfo = await contract.methods.getPoolInfo(pool_id).call();
        console.log(`poolInfo`, poolInfo);
        const amount = web3.utils.fromWei(
          Number(poolInfo.amount).toString(),
          "ether"
        );

        const el = {
          value: item.id,
          pool_id: item.pool_id,
          limit: item.limit,
          amount,
          label: ` ${amount} BNB is used ${item.limit} times`,
        };
        options.push(el);
      }
    }

    const content = (
      <>
        <p>Free times have run out, please select subscription service</p>
        <Radio.Group
          style={style}
          value={selectVal}
          onChange={onChange}
          options={options}
        />
      </>
    );

    modal.confirm({
      title: "Subscribe Tips",
      content,
      okText: "Go and Subscribe",
      onOk() {
        handleOk();
      },
    });
  };

  return {
    SubscribeModal,
  };
};

export default buySubscribe;
