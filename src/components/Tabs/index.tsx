import React, { useState } from "react";
import styles from "./styles.module.scss";

export interface TabItem {
  id: number;
  text: string;
}
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: TabItem[];
  onTabClick?: (item: TabItem) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, onTabClick, ...rest }) => {
  const [tabCurrent, setTabCurrent] = useState<number>(tabs[0]?.id || 0);

  const handleTabClick = (item: TabItem) => {
    setTabCurrent(item.id);
    if (onTabClick) {
      onTabClick(item);
    }
  };

  return (
    <div className={styles.tab} {...rest}>
      {tabs.map((item: TabItem) => (
        <span
          key={item.id}
          className={item.id === tabCurrent ? styles.active : ""}
          onClick={() => handleTabClick(item)}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
};

export default Tabs;
