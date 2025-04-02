import styles from "./components.module.scss";
import Image from "@/components/Image";
import { useEffect, useRef } from "react";
import { Carousel } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const CreateAi = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const AssetsUrl = import.meta.env.VITE_APP_ASSETS_URL;

  const leftSlider = useRef(null);
  const settings = {
    slidesToShow: 5,
    autoplay: false,
    dots: false,
  };
  useEffect(() => {
    const timer = setInterval(() => {
      if (leftSlider.current) {
        leftSlider.current.next();
      }
    }, 1500);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <div className={styles.CreateAi}>
        <div className={styles.home_page_title + " Impact"}>
          <span id="GameWorkshop">Game Workshop</span>
        </div>
        <div className={styles.descBox}>
          <div className={styles.info}>
            <div className={styles.h1 + " Impact"}>Semantic Generation Hub</div>
            <div className={styles.desc}>
              Input natural language instructions to generate 2D/3D art asset
              packages that can be directly imported into Unity/Unreal,
              multi-agent collaborative game production workshop, AI-driven
              workflow from language description to runnable prototype.
            </div>
            <div
              className={styles.btn + " Impact"}
              onClick={() => navigate("/ai/Art2d")}
            >
              Get started
            </div>
          </div>

          <Image
            className={styles.bg}
            src={`${AssetsUrl}home/CreateAi-bg1.png`}
          />
        </div>

        <div className={styles.list}>
          <Carousel ref={leftSlider} {...settings}>
            {[...Array(5)].map((_, index) => (
              <div key={index} style={{ width: "fit-content" }}>
                <Image
                  style={{ width: "80%", margin: "auto", display: "block" }}
                  src={`${AssetsUrl}home/aiModel/${index + 1}.png`}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};
export default CreateAi;
