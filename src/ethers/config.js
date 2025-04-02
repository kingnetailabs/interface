const { VITE_APP_Work, VITE_APP_UsdtAddress } = import.meta.env;

import WorkAbi from "./abi/Work.json";
import UsdbAbi from "./abi/UsdtToken.json";

const WorkAddress = VITE_APP_Work;
const UsdtAddress = VITE_APP_UsdtAddress;

export { WorkAbi, UsdbAbi, WorkAddress, UsdtAddress };
