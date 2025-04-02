import { useState, useEffect } from "react";
import { useReadContract, useWriteContract } from "wagmi";
import { UsdbAbi, WorkAbi, WorkAddress, UsdtAddress } from "@/ethers/config";
import { useConfig } from "wagmi";
import { parseUnits } from "ethers";
import { getToken, readContract, writeContract } from "wagmi/actions";
import { useSelector } from "react-redux";
import useBaseContract from "./useBaseContract";

const useWorkContract = () => {
  const config = useConfig();
  const [tokens, setTokens] = useState([]);
  const { userAddress } = useSelector((state) => state.main);
  const { tokenAuth, write } = useBaseContract();
  const [marginFee, setMarginFee] = useState(0);
  // const { writeContract } = useWriteContract();

  // console.log('WorkAddress', WorkAddress, config)
  const { data } = useReadContract({
    abi: WorkAbi,
    address: WorkAddress,
    functionName: "getTokens",
  });

  useEffect(() => {
    console.log("marginFee", marginFee);
  }, [marginFee]);

  useEffect(() => {
    console.log("data", data);
    if (data) {
      fetchTokens(data);
    }
  }, [data]);

  async function fetchToken(index, address) {
    const token = await getToken(config, { address });
    token.id = index;
    setTokens((prevTokens) => [...prevTokens, token]);
  }

  async function fetchTokens(tokenAddresses) {
    if (!tokenAddresses) {
      console.log("len is zero");
      return;
    }

    for (let i = 0; i < tokenAddresses.length; i++) {
      const address = tokenAddresses[i];
      await fetchToken(i, address);
    }
  }

  async function createWork(args) {
    return write(WorkAbi, WorkAddress, "createWork", args);
  }

  async function applyWork(
    employeeAmount,
    tokenAddress,
    workId,
    joinWorkId,
    inviteAddress = WorkAddress
  ) {
    try {
      console.log("applyWork", workId, joinWorkId, inviteAddress);
      let totalAmount = employeeAmount * (1 + marginFee / 1000);
      await tokenAuth(totalAmount, tokenAddress, userAddress, WorkAddress);
      await write(WorkAbi, WorkAddress, "applyWork", [
        BigInt(joinWorkId),
        BigInt(workId),
        inviteAddress,
      ]);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // 提现
  async function withdrawJoinWork(args) {
    return write(WorkAbi, WorkAddress, "withdrawJoinWork", args);
  }

  return { tokens, createWork, marginFee, applyWork, withdrawJoinWork };
};

export default useWorkContract;
