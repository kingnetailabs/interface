import { WorkAddress, WorkAbi, UsdbAbi } from "../config";
import { getContract, tokenAuth } from "../base";
import { formatUnits, parseUnits } from "ethers";

let symbolList = []; // Cache for token symbols and decimals

/**
 * Fetches list of supported payment tokens
 * @returns {Promise<Array>} List of token objects with key, address, symbol and decimals
 */
export async function getTokens() {
  try {
    const contract = await getContract(WorkAddress, WorkAbi);
    let list = await contract.getTokens();
    let result = [];
    
    for (const key in list) {
      const tokenContract = await getContract(list[key], UsdbAbi);
      let decimals = await tokenContract.decimals();
      let symbol = await tokenContract.symbol();
      result.push({ 
        key: Number(key), 
        address: list[key], 
        symbol, 
        decimals: Number(decimals) 
      });
    }
    
    symbolList = result; // Cache the result
    return Promise.resolve(result);
  } catch (error) {
    console.error("Error in getTokens:", error);
    return Promise.reject(error);
  }
}

/**
 * Creates a new work/task
 * @param {number} totalAmount - Total amount to be deposited
 * @param {string} id - Work ID
 * @param {string} workId - Additional work identifier
 * @param {number} employeeAmount - Amount per employee
 * @param {number} employeeNum - Number of employees
 * @param {number} inviteReward - Invitation reward amount
 * @param {number} tokenId - Token ID from symbolList
 * @returns {Promise} Transaction result
 */
export async function createWork(totalAmount, id, workId, employeeAmount, employeeNum, inviteReward, tokenId) {
  try {
    if (!symbolList.length) await getTokens();

    // Approve token transfer
    let status = await tokenAuth(totalAmount, symbolList[tokenId].address, UsdbAbi, WorkAddress);
    if (!status) return Promise.reject(status);

    const contract = await getContract(WorkAddress, WorkAbi);
    const parsedAmount = parseUnits(String(employeeAmount), symbolList[tokenId].decimals);
    let result = await contract.createWork(
      id, 
      workId, 
      parsedAmount, 
      employeeNum, 
      inviteReward, 
      tokenId
    );
    
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * Applies for a work/task
 * @param {number} tokenId - Token ID from symbolList
 * @param {number} type - Application type
 * @param {number} amount - Application amount
 * @param {string} id - Work ID
 * @param {string} workId - Additional work identifier
 * @param {string} inviteAddress - Inviter's address (optional)
 * @returns {Promise} Transaction result
 */
export async function applyWork(tokenId, type, amount, id, workId, inviteAddress) {
  try {
    await getMarginFee(type, tokenId, amount);
    
    const contract = await getContract(WorkAddress, WorkAbi);
    let result = await contract.applyWork(id, workId, inviteAddress);
    
    console.log("Work application successful:", result);
    return Promise.resolve(result);
  } catch (error) {
    console.error("Work application failed:", error);
    return Promise.reject(error);
  }
}

/**
 * Withdraws funds from a work participation
 * @param {number} nonce - Transaction nonce
 * @param {string} joinWorkId - Participation ID
 * @param {number} amount - Amount to withdraw
 * @param {string} sign - Signature for verification
 * @returns {Promise} Transaction result
 */
export async function withdrawJoinWork(nonce, joinWorkId, amount, sign) {
  try {
    const contract = await getContract(WorkAddress, WorkAbi);
    let result = await contract.withdrawJoinWork(nonce, joinWorkId, amount, sign);
    
    console.log("Withdrawal successful:", result);
    return Promise.resolve(result);
  } catch (error) {
    console.error("Withdrawal error:", error);
    return Promise.reject(error);
  }
}

/**
 * Calculates and approves the margin fee for work application
 * @param {number} type - Application type
 * @param {number} tokenId - Token ID from symbolList
 * @param {number} amount - Application amount
 * @returns {Promise} Approval status
 */
export async function getMarginFee(type, tokenId, amount) {
  try {
    const contract = await getContract(WorkAddress, WorkAbi);
    let feeRate = await contract.getMarginFee();
    
    if (!symbolList.length) await getTokens();
    
    // Calculate fee amount (amount * feeRate / 1000)
    let approveNum = (amount * Number(feeRate)) / 1000;
    
    // Approve token transfer
    let status = await tokenAuth(
      approveNum, 
      symbolList[tokenId].address, 
      UsdbAbi, 
      WorkAddress
    );
    
    if (!status) return Promise.reject(status);
    return Promise.resolve();
  } catch (error) {
    console.error("Margin fee error:", error);
    return Promise.reject(error);
  }
}