import { useTranslation } from "react-i18next";
const Building = () => {
  const { t } = useTranslation();
  const types = {
    title: t("functionalSegmentation"),
    sub: t("selectType"),
    options: [
      {
        value: 0,
        label: t("stylizedArchitecture"),
        param: {
          prompt_strategy: "10",
          outKey: [148],
        },
      },
    ],
  };

  const keywords = {
    title: t("keywordDescription"),
    sub: t("example"),
    options: [
      [
        {
          label: t("exampleDemo.crystalAltar"),
          param: {
            prompt: `crystal, magic, glowing, altar, Simple background`,
          },
        },
        {
          label: t("exampleDemo.hauntedMansion"),
          param: {
            prompt: `old wooden shack, spooky graveyard, graves, glowing blue lights,`,
          },
        },
        {
          label: t("exampleDemo.gemCave"),
          param: {
            prompt: `cave, red crystal, magic, red glowing, slime,`,
          },
        },
      ],
    ],
  };

  const sizes = {
    title: t("imageSize"),
    options: [
      {
        label: t("kuan"),
        keyName: "width",
        min: 512,
        max: 1920,
        placeholder: "512~1920",
        value: 1024,
      },
      {
        label: t("gao2"),
        keyName: "height",
        min: 512,
        max: 1920,
        placeholder: "512~1920",
        value: 1024,
      },
    ],
  };

  const formData = {
    prompt: "",
    types: [0],
  };
  return { types, keywords, sizes, formData };
};

export default Building;
