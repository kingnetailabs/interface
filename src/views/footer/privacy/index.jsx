import { useEffect, useState } from "react";
import EnPrivacy from "../components/EnPrivacy";
import { useTranslation } from "react-i18next";
const Index = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  return <EnPrivacy />;
};

export default Index;
