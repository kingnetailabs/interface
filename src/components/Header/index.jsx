import { useState, useEffect, useRef } from "react";
import header from "./header.module.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userLogout } from "@/store/modules/mainStore";
import plusXing from "@/utils/plusXing";
import { userLogin as userLoginApi } from "@/api";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Dropdown, Space, App } from "antd";
import {
  useAppKit,
  useDisconnect,
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
} from "@reown/appkit/react";
import Footer from "../Footer";
import { useSignMessage } from "wagmi";
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signMessageAsync } = useSignMessage();
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(1);
  const [needSign, setNeedSign] = useState(false);
  const { open } = useAppKit();
  const { userAddress } = useSelector((state) => state.main);
  const { address, isConnected } = useAppKitAccount();
  const { caipNetwork, caipNetworkId } = useAppKitNetwork();
  const { walletProvider } = useAppKitProvider("solana");
  const { message } = App.useApp();
  const { disconnect } = useDisconnect();
  const [langs, setLangs] = useState([
    {
      id: 3,
      key: "en",
      label: "English",
    },
  ]);

  const onLangClick = (item) => {
    i18n.changeLanguage(item.key);
    localStorage.setItem("lang", item.key);
  };

  const addressRef = useRef(address);
  useEffect(() => {
    addressRef.current = address;
  }, [address]);

  useEffect(() => {
    console.log(address, isConnected);
    if (!isConnected || !needSign) return;

    if (address === userAddress) {
      return;
    }

    signLogin();
  }, [isConnected]);

  const signLogin = async () => {
    const signMessage = "Welcome to Kingnet.";
    let signedMessage = "";
    if (caipNetwork.chainNamespace === "solana") {
      try {
        console.log("walletProvider", walletProvider);
        const encodedMessage = new TextEncoder().encode(signMessage);
        const signature = await walletProvider.signMessage(encodedMessage);
        signedMessage = btoa(String.fromCharCode(...signature));
      } catch (error) {
        console.log("sol sign error", error);
        message.error(error.message);
        return;
      }
    }

    if (caipNetwork.chainNamespace === "eip155") {
      try {
        signedMessage = await signMessageAsync({ message: signMessage });
      } catch (error) {
        console.log("evm sign error", error);
        message.error(error.details);
        return;
      }
    }

    const res = await userLoginApi({
      signer: addressRef.current,
      message: signMessage,
      signed_message: signedMessage,
      chain_namespace: caipNetwork.chainNamespace,
      caip_network_id: caipNetworkId,
    });
    if (res.code === 0) {
      localStorage.setItem("token", res.data.token);
      dispatch(userLogin(addressRef.current));
    } else {
      message.error(res.msg);
    }
  };

  let options = [
    {
      id: 1,
      // text: "AI Agents",
      // url: "/agents",
      children: [],

      text: "Game Workshop ",
      url: "GameWorkshop",
    },
    {
      id: 2,
      // text: "AI Engine",
      // url: "/ai/Art2d",
      children: [],
      text: "Technical Architecture",
      url: "IntelligentCentralArchitecture",
    },
    {
      id: 3,
      text: "GitHub",
      url: "https://github.com/kingnetailabs",
      children: [],
    },
  ];

  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const pathname = location.pathname;
    for (const item of options) {
      if (item.url === pathname || pathname.indexOf(item.url) > -1) {
        setCurrent(item.id);
        return;
      }

      if (item.children) {
        for (const item2 of item.children) {
          if (item2.url === pathname || pathname.indexOf(item2.url) > -1) {
            setCurrent(item.id);
            return;
          }
        }
      }
    }

    setCurrent(-1);
  }, [location]);

  const onItemClick = ({ item }) => {
    const url = item.props.url;
    navigate(url);
  };

  function nav() {
    return options.map((item) => {
      return (
        <div key={item.id}>
          <Dropdown
            placement="bottom"
            menu={{
              items: item.children,
              onClick: onItemClick,
            }}
          >
            <Space>
              <span
                key={item.id}
                className={current === item.id ? "active" : ""}
              >
                {item.id !== 3 && <a href={`/#${item.url}`}>{item.text}</a>}
                {item.id == 3 && (
                  <a onClick={() => window.open(item.url)}>{item.text}</a>
                )}
              </span>
            </Space>
          </Dropdown>
        </div>
      );
    });
  }

  const userItems = [
    {
      key: "1",
      label: t("disconnect"),
    },
  ];
  const onUserClick = (item) => {
    if (item.key === "1") {
      disconnect();
      dispatch(userLogout());
      return;
    }

    const obj = userItems.find((item) => item.key === item.key);
    navigate(obj.path);
  };

  const login = () => {
    if (isConnected) {
      signLogin();
      return;
    }

    setNeedSign(true);
    open();
  };

  return (
    <>
      <header className={`${header.header} wow animate__fadeInDown`}>
        <div className="wrap">
          <div
            className="logo"
            onClick={() => {
              navigate("");
            }}
          >
            <img src={require("@/assets/logo.png")} />
          </div>

          <div className="right">
            <div className="nav">{nav()}</div>

            <div className="login">
              {userAddress && (
                <Dropdown menu={{ items: userItems, onClick: onUserClick }}>
                  <div>
                    {userAddress ? plusXing(userAddress) : t("connectWallet")}
                  </div>
                </Dropdown>
              )}

              {!userAddress && <div onClick={login}>{t("connectWallet")}</div>}
            </div>
          </div>
        </div>
      </header>
      <Outlet />
      <Footer />
    </>
  );
}
