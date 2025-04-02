import { useTranslation } from "react-i18next";
const Property = () => {
  const { t } = useTranslation();
  const types = {
    title: t("artStyle"),
    sub: t("selectType"),
    options: [
      {
        value: 0,
        label: t("darkRealism"),
        param: {
          prompt_strategy: "6",
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
          label: t("exampleDemo.Ring"),
          param: {
            prompt: `A ring set with sapphires`,
          },
        },
        {
          label: t("exampleDemo.treasureChest"),
          param: {
            prompt: `A treasure chest from the Middle Ages`,
          },
        },
        {
          label: t("exampleDemo.mixtures"),
          param: {
            prompt: `A healing bottle with a green potion in it. The bottom of the bottle is round`,
          },
        },
        {
          label: t("exampleDemo.goldCoin"),
          param: {
            prompt: `A gold coin, used as currency in fantasy games, in the medieval style, which can be decorated with elaborate designs`,
          },
        },
        {
          label: t("exampleDemo.gem"),
          param: {
            prompt: `A large, flat ruby, which has been hand-polished and has a bright sheen on its surface`,
          },
        },
      ],
      [
        {
          label: t("exampleDemo.teddyBear"),
          param: {
            prompt: `A pink teddy bear holds a sign that says ‘Lv.1’`,
          },
        },
        {
          label: t("exampleDemo.treasureChest"),
          param: {
            prompt: `A treasure chest from the Middle Ages`,
          },
        },
        {
          label: t("exampleDemo.snack"),
          param: {
            prompt: `A colorful package of snack packaging, 2D hand painted style, game props`,
          },
        },
      ],
      [
        {
          label: t("exampleDemo.shield"),
          param: {
            prompt: `A shield,`,
          },
        },
        {
          label: t("exampleDemo.armor"),
          param: {
            prompt: `A Gloves with armor,`,
          },
        },
        {
          label: t("exampleDemo.jian"),
          param: {
            prompt: `A Sword,`,
          },
        },
      ],
    ],
  };

  const formData = {
    prompt: "",
    types: [0],
  };

  return { types, keywords, formData };
};

export default Property;
