import styles from "./components.module.scss";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
const Roadmap = () => {
  const AssetsUrl = import.meta.env.VITE_APP_ASSETS_URL;
  const { t } = useTranslation();

  const ListView = [
    {
      title: t("Roadmap.2"),
      item: [
        {
          h1: t("Roadmap.3"),
          desc: t("Roadmap.4"),
        },
        {
          h1: t("Roadmap.5"),
          desc: t("Roadmap.6"),
        },
        {
          h1: t("Roadmap.7"),
          desc: t("Roadmap.8"),
        },
        {
          h1: t("Roadmap.9"),
          desc: t("Roadmap.10"),
        },
      ],
    },
    {
      title: t("Roadmap.11"),
      item: [
        {
          h1: t("Roadmap.12"),
          desc: t("Roadmap.13"),
        },
        {
          h1: t("Roadmap.14"),
          desc: t("Roadmap.15"),
        },
        {
          h1: t("Roadmap.16"),
          desc: t("Roadmap.17"),
        },
        {
          h1: t("Roadmap.18"),
          desc: t("Roadmap.19"),
        },
      ],
    },
    {
      title: t("Roadmap.20"),
      item: [
        {
          h1: t("Roadmap.21"),
          desc: t("Roadmap.22"),
        },
        {
          h1: t("Roadmap.23"),
          desc: t("Roadmap.24"),
        },
        {
          h1: t("Roadmap.25"),
          desc: t("Roadmap.26"),
        },
        {
          h1: t("Roadmap.27"),
          desc: t("Roadmap.28"),
        },
      ],
    },
    {
      title: t("Roadmap.29"),
      item: [
        {
          h1: t("Roadmap.30"),
          desc: t("Roadmap.31"),
        },
        {
          h1: t("Roadmap.32"),
          desc: t("Roadmap.33"),
        },
        {
          h1: t("Roadmap.34"),
          desc: t("Roadmap.35"),
        },
        {
          h1: t("Roadmap.36"),
          desc: t("Roadmap.37"),
        },
      ],
    },
  ];

  return (
    <>
      <div className={styles.Roadmap}>
        <div className={styles.home_page_title + " Impact"}>
          <span>{t("Roadmap.1")}</span>
        </div>

        <div className={styles.listBox}>
          {ListView.map((list, index) => {
            return (
              <div className={styles.list} key={index}>
                <div
                  className={styles.title}
                  dangerouslySetInnerHTML={{ __html: list.title }}
                ></div>

                {list.item.map((item, index2) => {
                  return (
                    <div className={styles.item} key={index2}>
                      <div className={styles.h1}>· {item.h1}</div>
                      <div className={styles.desc}>{item.desc}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Roadmap;
