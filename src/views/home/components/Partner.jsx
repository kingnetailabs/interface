import styles from "./components.module.scss";
import { useEffect, useRef } from "react";
import { Carousel } from "antd";
import { useTranslation } from "react-i18next";
import Image from "@/components/Image";

export default function Partner() {
  const { t } = useTranslation();
  const AssetsUrl = import.meta.env.VITE_APP_ASSETS_URL;
  const leftSlider = useRef(null);
  const rightSlider = useRef(null);
  const settings = {
    slidesToShow: 5,
    autoplay: false,
    dots: false,
  };
  useEffect(() => {
    const timer = setInterval(() => {
      if (leftSlider.current && rightSlider.current) {
        leftSlider.current.next();
        rightSlider.current.prev();
      }
    }, 1500);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <div className={styles.partner}>
        <div className={styles.home_page_title + " Impact"}>
          <span>Ecological Support</span>
        </div>

        <div className={styles.list}>
          <Carousel ref={leftSlider} {...settings}>
            {[...Array(5)].map((_, index) => (
              <div key={index} style={{ width: "fit-content" }}>
                <Image src={`${AssetsUrl}home/partner/li${index + 1}.png`} />
              </div>
            ))}
          </Carousel>
          <Carousel
            ref={rightSlider}
            {...settings}
            style={{ marginTop: "0px" }}
          >
            {[...Array(5)].map((_, index) => (
              <div key={index} style={{ width: "fit-content" }}>
                <Image src={`${AssetsUrl}home/partner/li${index + 6}.png`} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}
