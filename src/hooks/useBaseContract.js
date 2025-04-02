import { UsdbAbi } from "@/ethers/config";
import { useConfig } from "wagmi";
import {
  readContracts,
  writeContract,
  waitForTransactionReceipt,
  simulateContract,
} from "wagmi/actions";
import { formatUnits, parseUnits } from "ethers";
// import { WriteContractErrorType } from '@wagmi/core'

const useBaseContract = () => {
  const config = useConfig();
  // const { writeContract } = useWriteContract()

  /**
   * tokenAuth
   * @param {*} approveNum
   * @param {*} tokenAddress
   * @param {*} ownerAddress
   * @param {*} spenderAddress
   * @returns tx
   */
  async function tokenAuth(
    approveNum,
    tokenAddress,
    ownerAddress,
    spenderAddress
  ) {
    try {
      const tokenContract = {
        address: tokenAddress,
        abi: UsdbAbi,
      };

      const result = await readContracts(config, {
        contracts: [
          {
            ...tokenContract,
            functionName: "decimals",
          },
          {
            ...tokenContract,
            functionName: "allowance",
            args: [ownerAddress, spenderAddress],
          },
        ],
      });
      let decimals, allowance;
      for (let [index, item] of result.entries()) {
        if (item.error) {
          return Promise.reject(item.error);
        }
        if (index == 0) {
          decimals = item.result;
        }
        if (index == 1) {
          allowance = item.result;
        }
      }

      const allowanceNum = parseFloat(formatUnits(allowance, decimals));

      if (allowanceNum >= approveNum) {
        console.log("tokenAuth ok");
        return Promise.resolve({ status: "success" });
      }

      const res = await write(UsdbAbi, tokenAddress, "approve", [
        spenderAddress,
        parseUnits(String(approveNum), decimals),
      ]);
      console.log("tokenAuth ok");
      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function write(abi, address, functionName, args, value) {
    console.log("write", abi, address, functionName, args, value);
    try {
      try {
        let res = await simulateContract(config, {
          abi,
          address,
          functionName,
          args,
          value,
        });
        console.log("result", res);
      } catch (err) {
        console.log("simulateContract err", err);
        return Promise.reject(err);
      }

      const hashResult = await writeContract(config, {
        abi,
        address,
        functionName,
        args,
        value,
      });
      // console.log("hashResult", hashResult);
      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: hashResult,
      });
      // console.log("transactionReceipt", transactionReceipt);
      return Promise.resolve(transactionReceipt);
    } catch (error) {
      // console.log("error", error.toString());
      return Promise.reject(error);
    }
  }

  return { tokenAuth, write };
};

export default useBaseContract;
