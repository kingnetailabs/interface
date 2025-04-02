import "./HeadNav.scss";
import { Outlet, useLocation } from "react-router-dom";
import { App, Breadcrumb, Modal } from "antd";
import commonData from "../common/data";

export default function init() {
  let { pathname } = useLocation();
  const { tabsData } = commonData().base();

  const parts = pathname.split("/");
  const trimmedParts = parts.filter((part) => part !== "");

  // 数据来源对应名称
  const subMenu = commonData().base()[trimmedParts[1]];

  const Menu = [];
  const atMenu = [];
  let atTitle1 = "";
  let atTitle2 = "";

  tabsData.map((item) => {
    Menu.push({
      id: item.id,
      label: <a href={item.path}>{item.title}</a>,
    });

    const parts1 = item.path.split("/");
    const trimmedParts1 = parts1.filter((part) => part !== "");
    if (trimmedParts[1] === trimmedParts1[1]) {
      atTitle1 = item.title;
    }
  });

  subMenu.map((item) => {
    atMenu.push({
      id: item.id,
      label: <a href={item.path}>{item.title}</a>,
    });
    if (pathname === item.path) {
      atTitle2 = item.title;
    }
  });

  return (
    <>
      <App>
        <div className="main-container">
          <div className="back">
            <Breadcrumb
              items={[
                {
                  title: "AI",
                },
                {
                  title: atTitle1,
                  menu: { items: Menu },
                },
                {
                  title: atTitle2,
                  menu: { items: atMenu },
                },
              ]}
            />
          </div>
          <div className="generate-main-container">
            <Outlet />
          </div>
        </div>
      </App>
    </>
  );
}
