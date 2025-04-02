import { useTranslation } from "react-i18next";
const GameMap = () => {
  const { t } = useTranslation();

  const types = {
    title: t("styleClassification"),
    sub: t("selectType"),
    options: [
      {
        value: 0,
        label: t("twoDGameMap"),
        param: {
          prompt_strategy: "11",
          outKey: [148],
        },
      },
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

  const presets = {
    title: t("referenceImageOptions"),
  };

  const presetsStrength = {
    title: t("referenceImageIntensity"),
    options: [
      {
        label: t("low"),
        value: 0,
        param: { preset: "STANDARD (medium strength)" },
      },
      {
        label: t("medium"),
        value: 1,
        param: { preset: "VIT-G (medium strength)" },
      },
      {
        label: t("high"),
        value: 2,
        param: { preset: "PLUS (high strength)" },
      },
    ],
  };

  const keywords = {
    title: t("keywordDescription"),
    sub: t("example"),
    options: [
      [
        {
          label: t("exampleDemo.cyberpunk"),
          param: {
            prompt: `TDG-maps, rpg games map,A cartoon game background with a cyberpunk theme, there's a sign that says "KINGNET, combining cartoon style and cyberpunk elements, set in a fictional city, featuring a game title, showcasing a fantastical futuristic vibe, (pixel art:1.5)`,
          },
        },
        {
          label: t("exampleDemo.forestVillage"),
          param: {
            prompt: `2D game map, RPG game map, elf village, tree house, residential area, forest, one area per section,`,
          },
        },
        {
          label: t("exampleDemo.darkwaterCity"),
          param: {
            prompt: `2D game map, RPG game map, bird 's-eye view, a city like Venice water city, there is a river across the screen from left to right through the entire map, every other area has Bridges linking the two sides, dark blue glowing tones, there is a sense of history`,
          },
        },
      ],
    ],
  };

  const formData = {
    prompt: "",
    types: [0],
  };
  return { types, sizes, presets, presetsStrength, keywords, formData };
};
export default GameMap;
