import TopBanner from "./components/TopBanner";
import TokenLolz from "./components/TokenLolz";
import Partner from "./components/Partner";
import MemeAi from "./components/MemeAi";
import CreateAi from "./components/CreateAi";
import Product from "./components/Product";
import Creativity from "./components/Creativity";
import Roadmap from "./components/Roadmap";
import AiShow from "./components/AiShow";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./index.scss";

const Home = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  return (
    <div className="lang-en">
      <TopBanner />
      <CreateAi />
      <MemeAi />
      <Product />
      <AiShow />
      <Creativity />
    </div>
  );
};
export default Home;
