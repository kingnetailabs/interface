import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import Image from "../Image";
import { useTranslation } from "react-i18next";
import { App, Typography } from "antd";
// import { title } from "process";

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { modal, message } = App.useApp();
  const AssetsUrl = import.meta.env.VITE_APP_ASSETS_URL;
  const { Title, Paragraph,  } = Typography;
  const list = [
    // {
    //   name: "telegram",
    //   ico: AssetsUrl + "home/relation/telegram.png",
    //   url: "",
    //   type: "open",
    // },
    {
      name: "tuite",
      ico: AssetsUrl + "home/relation/tuite.png",
      url: "https://x.com/Kingnet_AI",
      type: "open",
    },
    {
      name: "github",
      ico: AssetsUrl + "home/relation/github.png",
      url: "https://github.com/kingnetailabs",
      type: "open",
    },
  ];

  const tabs = [
    {
      title: t("terms"),
      items: [
        {
          text: "Content Copyright Agreement",
          title: "KINGNET AI generates content terms of use",
          content: (
            <div style={{ maxHeight: "50vh", overflow: "auto" }}>
              <Typography>
                <Paragraph>
                  Version: v1.3｜Jurisdiction: Hong Kong, China｜Effective
                  Method: Acceptance by Use
                </Paragraph>
                <Title level={4}>Core Terms</Title>
                <Title level={5}>1. Copyright Ownership</Title>
                <Paragraph>
                  <ul>
                    <li>
                      Users retain full copyright of generated content (no
                      authorization required for commercial use/adaptation/NFT
                      minting)
                    </li>
                    <li>
                      Platform reserves the right to use anonymized data (solely
                      for AI model optimization)
                    </li>
                  </ul>
                </Paragraph>

                <Title level={5}>2. User Responsibilities</Title>
                <Paragraph>
                  <ul>
                    <li>
                      Ensure input commands do not infringe third-party rights
                      or violate Hong Kong laws
                    </li>
                    <li>
                      Bear all risks for content generated through third-party
                      tools (e.g. Stable Diffusion)
                    </li>
                  </ul>
                </Paragraph>

                <Title level={5}>3. Platform Disclaimer</Title>
                <Paragraph>
                  <ul>
                    <li>
                      No guarantee regarding artistic quality, commercial value,
                      or legal compliance of generated content
                    </li>
                    <li>
                      Maximum liability for technical failures limited to 150%
                      of quarterly service fee (capped at HKD 10,000)
                    </li>
                  </ul>
                </Paragraph>

                <Title level={5}>4. Web3 Rules</Title>
                <Paragraph>
                  <ul>
                    <li>
                      On-chain records serve as technical proof only, not legal
                      copyright registration
                    </li>
                    <li>
                      Users must independently audit smart contract templates
                      and assume operational risks
                    </li>
                  </ul>
                </Paragraph>

                <Title level={5}>5. Dispute Jurisdiction</Title>
                <Paragraph>
                  <ul>
                    <li>
                      Mediation through Hong Kong International Arbitration
                      Centre (HKIAC) takes priority
                    </li>
                    <li>
                      Exclusive jurisdiction of Hong Kong High Court for
                      litigation
                    </li>
                  </ul>
                </Paragraph>

                <Title level={4}>User Acknowledgement</Title>
                <Paragraph>
                  <ul>
                    <li>Agreement implied upon login</li>
                    <li>
                      Wallet signature required for secondary confirmation
                      during NFT minting/third-party tool integration
                    </li>
                    <li>
                      Continued use constitutes acceptance of terms and updates
                    </li>
                  </ul>
                </Paragraph>

                <Title level={4}>Validity Statement</Title>
                <Paragraph>
                  These terms are established under Hong Kong's Electronic
                  Transactions Ordinance, with user operations constituting
                  legally recognized valid consent
                </Paragraph>
              </Typography>
            </div>
          ),
        },
        {
          text: "Privacy Protection Framework",
          title: "KINGNET AI Privacy protection framework",
          content: (
            <div style={{ maxHeight: "50vh", overflow: "auto" }}>
              <Typography>
                <Paragraph>
                  Version: v2.2｜Jurisdiction: Hong Kong, China｜Effective
                  Method: Acceptance by Use
                </Paragraph>
                <Title level={4}>Core Terms</Title>
                <Title level={5}>1. Data Collection</Title>
                <Paragraph>
                  <ul>
                    <li>
                      Collected data: Wallet address (anonymous), generation
                      commands, basic device fingerprint
                    </li>
                    <li>
                      On-chain storage: Content hash value, timestamp, engine
                      version
                    </li>
                  </ul>
                </Paragraph>

                <Title level={5}>2. Data Usage</Title>
                <Paragraph>
                  <ul>
                    <li>AI model optimization (using anonymized commands)</li>
                    <li>
                      Prevention of illegal activities (in compliance with Hong
                      Kong SFC guidelines)
                    </li>
                  </ul>
                </Paragraph>

                <Title level={5}>3. User Rights</Title>
                <Paragraph>
                  <ul>
                    <li>
                      Download command sets｜Modify wallet binding｜Request data
                      deletion (anonymized within 30 days)
                    </li>
                    <li>
                      Disable smart recommendations (switch to manual mode)
                    </li>
                  </ul>
                </Paragraph>

                <Title level={5}>4. Third-party Liability</Title>
                <Paragraph>
                  <ul>
                    <li>
                      Data flows involving tools like Stable Diffusion require
                      user authorization; platform does not monitor/store
                    </li>
                  </ul>
                </Paragraph>

                <Title level={5}>5. Security Commitment</Title>
                <Paragraph>
                  <ul>
                    <li>
                      TLS 1.3 transmission｜AES-256 storage｜Vulnerability
                      disclosure to Hong Kong Privacy Commissioner within 72
                      hours
                    </li>
                  </ul>
                </Paragraph>

                <Title level={5}>6. Disclaimer</Title>
                <Paragraph>
                  <ul>
                    <li>No guarantee of legality for generated content</li>
                    <li>
                      Exempt from liability for leaks caused by force majeure
                      (e.g., quantum attacks)
                    </li>
                  </ul>
                </Paragraph>

                <Title level={5}>7. Dispute Jurisdiction</Title>
                <Paragraph>
                  <ul>
                    <li>
                      Mediation by Hong Kong International Arbitration Centre
                      (HKIAC) takes priority
                    </li>
                    <li>
                      Litigation under jurisdiction of Hong Kong High Court
                    </li>
                  </ul>
                </Paragraph>

                <Title level={4}>User Consent Process</Title>
                <Paragraph>
                  <ul>
                    <li>Agreement implied upon login</li>
                    <li>
                      Continued use constitutes acceptance of terms and updates
                    </li>
                  </ul>
                </Paragraph>

                <Title level={4}>Console Entries</Title>
                <Paragraph>
                  [Data Management]｜[Privacy Settings]｜[Delete Account]
                </Paragraph>
              </Typography>
            </div>
          ),
        },
      ],
    },
  ];

  const goPage = (item) => {
    if (!item.url) return message.info(t("stayTuned"));

    if (!item.type) {
      navigate(item.url);
    } else {
      window.open(item.url);
    }
  };

  const openModal = ({ title, content }) => {
    modal.info({
      title,
      content,
      width: 600,
      okText: "I know",
    });
  };

  return (
    <footer className={`${styles.wrap} wow animate__fadeInUp`}>
      <div className={styles.main}>
        <div className={styles.l}>
          <div className={styles.logo}>
            <Image src={"footer-logo.png"} alt="Footer Logo" />
          </div>
          <div className={styles.desc}>
            <Image src={"ico-footer.png"} />

            <div
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: t("community") }}
            ></div>
          </div>
          <div className={styles.relation}>
            {list.map((item, index) => (
              <Image
                key={index}
                src={item.ico}
                alt={item.name}
                onClick={() => goPage(item)}
              />
            ))}
          </div>
        </div>
        <div className={styles.r}>
          {tabs.map((item) => (
            <div className={styles.item} key={item.title}>
              <div className={styles.title}>{item.title}</div>
              {item.items.map((item2) => (
                <div
                  className={styles.p}
                  key={`${item2.text}`}
                  onClick={() => {
                    // goPage(item2);
                    openModal(item2);
                  }}
                >
                  {item2.text}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.copyright}>{t("copyright")}</div>
    </footer>
  );
};

export default Footer;
