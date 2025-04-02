// 角色
import { useTranslation } from "react-i18next";
const Role = () => {
  const { t } = useTranslation();
  const types = {
    title: t("functionalSegmentation"),
    sub: t("selectType"),
    options: [
      {
        value: 0,
        label: t("threeViewProportional"),
        param: {
          prompt_strategy: "2",
          outKey: [148],
        },
      },
      {
        value: 1,
        label: t("threeViewQVersion"),
        param: {
          prompt_strategy: "3",
          outKey: [148],
        },
      },
      {
        value: 2,
        label: t("characterIllustration"),
        param: {
          prompt_strategy: "1",
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
          label: t("exampleDemo.elfPrincess"),
          param: {
            prompt: `An elf princess with long white hair, wearing a blue dress and high heels, League of Legends character style, with a simple background color,`,
          },
        },
        {
          label: t("exampleDemo.demonBaron"),
          param: {
            prompt: `Create a surrealistic depiction of a powerful and majestic male wizard.  He was a young man with a handsome face, standing confidently, the warlock wearing an elaborate black mage cloak and armor, with rough textures and subtle scratches that showed signs of wear.  The fur lining of his shoulders and bracelets adds a sense of naturalism that emphasizes his connection to raw power.  His blond hair flowed naturally, as if blown by a breeze, and on his head grew a pair of demonic horns carved with intricate ancient runes.`,
          },
        },
        {
          label: t("exampleDemo.weddingGirl"),
          param: {
            prompt: `Create a contemporary Japanese secondary style anime style, like the "Sword Art Online" style anime illustration, a girl with purple hair, she has delicate features, an hourglass figure and pink lips, wearing a gorgeous white wedding dress,`,
          },
        },
        {
          label: t("exampleDemo.handsomeGentleman"),
          param: {
            prompt: `Create a contemporary Japanese secondary style anime style, A modern man, he's very handsome wearing a gentleman's outfit, glasses. The dress was black and white with a dash of gold, and a pocket watch hung on the chest.`,
          },
        },
      ],
      [
        {
          label: t("exampleDemo.elfPrincess"),
          param: {
            prompt: `An elf princess with long white hair, wearing a blue dress and high heels, League of Legends character style, with a simple background color,`,
          },
        },
        {
          label: t("exampleDemo.demonBaron"),
          param: {
            prompt: `Create a surrealistic depiction of a powerful and majestic male wizard.  He was a young man with a handsome face, standing confidently, the warlock wearing an elaborate black mage cloak and armor, with rough textures and subtle scratches that showed signs of wear.  The fur lining of his shoulders and bracelets adds a sense of naturalism that emphasizes his connection to raw power.  His blond hair flowed naturally, as if blown by a breeze, and on his head grew a pair of demonic horns carved with intricate ancient runes.`,
          },
        },
        {
          label: t("exampleDemo.weddingGirl"),
          param: {
            prompt: `Create a contemporary Japanese secondary style anime style Cute Q-version character, like the "Sword Art Online" style anime illustration, a girl with purple hair, she has delicate features, an hourglass figure and pink lips, In a gorgeous white wedding dress and heels `,
          },
        },
        {
          label: t("exampleDemo.handsomeGentleman"),
          param: {
            prompt: `Create a contemporary Japanese secondary style anime style Cute Q-version character,  A modern man, he's very handsome wearing a gentleman's outfit, glasses. The dress was black and white with a dash of gold, and a pocket watch hung on the chest. `,
          },
        },
      ],
      [
        {
          label: t("exampleDemo.elfPrincess"),
          param: {
            prompt: `with a simple background color,without text,without logo.An elf princess with long white hair, wearing a blue dress and high heels, League of Legends character style.`,
          },
        },
        {
          label: t("exampleDemo.elfQueen"),
          param: {
            prompt: `An elf queen with long white hair, wearing a blue dress and high heels, League of Legends character style, with a simple background color,She sat on the throne`,
          },
        },
        {
          label: t("exampleDemo.demonBaron"),
          param: {
            prompt: `Create a surrealistic depiction of a powerful and majestic male wizard.  He was a young man with a handsome face, standing confidently, the warlock wearing an elaborate black mage cloak and armor, with rough textures and subtle scratches that showed signs of wear.  The fur lining of his shoulders and bracelets adds a sense of naturalism that emphasizes his connection to raw power.  His blond hair flowed naturally, as if blown by a breeze, and on his head grew a pair of demonic horns carved with intricate ancient runes.`,
          },
        },
        {
          label: t("exampleDemo.weddingGirl"),
          param: {
            prompt: `Create a contemporary Japanese secondary style anime style, like the "Sword Art Online" style anime illustration, a girl with purple hair, she has delicate features, an hourglass figure and pink lips, wearing a gorgeous white wedding dress,`,
          },
        },
        {
          label: t("exampleDemo.handsomeGentleman"),
          param: {
            prompt: `Contemporary Japanese secondary style anime style, a modern man, he wears a gentleman's suit, wearing glasses, very handsome. He wore a black and white gown with some gold accents, and a pocket watch hung on his chest. The background of the whole piece is very simple white`,
          },
        },
      ],
      [
        {
          label: t("exampleDemo.blueRabbit"),
          param: {
            prompt: `Rabbit, cute,`,
            seed: "436003979873939",
            image: "demoBg_Role1.webp",
          },
        },
        {
          label: t("exampleDemo.yellowRabbit"),
          param: {
            prompt: `Rabbit, cute, blue`,
            seed: "738205503421047",
            image: "demoBg_Role2.webp",
          },
        },
      ],
    ],
  };

  const presets = {
    title: t("poseImageOption"),
  };

  const sizes = {
    title: t("aspectRatio"),
    options: [
      {
        value: 0,
        label: t("vertical"),
        param: {
          width: 1200,
          height: 1920,
        },
      },
      {
        value: 1,
        label: t("horizontal"),
        param: {
          width: 1920,
          height: 1200,
        },
      },
      {
        value: 2,
        label: t("equalRatio"),
        param: {
          width: 1560,
          height: 1560,
        },
      },
    ],
  };

  const seed = {
    title: t("sui_ji_zhong"),
  };

  const formData = {
    prompt: "",
    types: [0],
    image: "",
    seed: "",
  };
  return { types, keywords, presets, sizes, seed, formData };
};

export default Role;
