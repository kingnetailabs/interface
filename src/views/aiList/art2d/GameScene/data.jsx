// 场景
import { useTranslation } from "react-i18next";
const GameScene = () => {
  const { t } = useTranslation();
  const types = {
    title: t("artStyle"),
    sub: t("selectType"),
    options: [
      {
        label: t("realisticStyle"),
        value: 0,
        param: {
          prompt_strategy: "9",
          outKey: [148],
        },
      },
      {
        label: t("nextGenIllustration"),
        value: 1,
        param: {
          prompt_strategy: "7",
          outKey: [148],
        },
      },
      {
        label: t("animeIllustration"),
        value: 2,
        param: {
          prompt_strategy: "8",
          outKey: [148],
        },
      },
    ],
  };

  const sizes = {
    title: t("aspectRatio"),
    sub: t("selectType"),
    options: [
      {
        label: t("horizontal"),
        value: 0,
        param: { width: 1920, height: 1080 },
      },
      {
        label: t("vertical"),
        value: 1,
        param: { width: 1080, height: 1920 },
      },

      { label: t("equalRatio"), value: 2, param: { width: 1560, height: 1560 } },
    ],
  };
  const keywords = {
    title: t("keywordDescription"),
    sub: t("example"),
    options: [
      [
        {
          label: t("exampleDemo.darkForest"),
          param: {
            prompt: `a dead Pine tree forest with a high moon, Photorealistic, 8k,amazing details, highly detailed, highest quality, perfect composition,`,
          },
        },
        {
          label: t("exampleDemo.sciFiCity"),
          param: {
            prompt: `hyper realistic and highly detailed, highly dynamic cinematic panorama view, an otherworldly landscape of an extremely advanced futuristic alien civilization, epic scale, colossal magnitude, sky high otherworldly buildings and futuristic  spacecrafts flying around, beautiful, excellent composition, finest details, highest aesthetics, strong muted Birch and King Blue hue, mystical glowing,  atmospheric haze, panoramic zoomed out view, highly dramatic lighting`,
          },
        },
        {
          label: t("exampleDemo.frostCity"),
          param: {
            prompt: `Ultra high definition images, masterpiece, professional artwork, breathtaking view of a frozen winter landscape, ice covered stone ruins surrounded by a harsh frozen lake, slight cracks form in the ice`,
          },
        },
      ],
      [
        {
          label: t("exampleDemo.lavaCity"),
          param: {
            prompt: `Below, cities burned, their skeletal buildings crumbling in waves of flame.   Rivers of lava split streets and roared toward the horizon, sending up clouds of black smoke that choked the air and blotted out the sun.   Lightning sliced the sky into jagged scars, illuminating the chaos in cruel, brilliant flashes. `,
          },
        },
        {
          label: t("exampleDemo.magicKingdom"),
          param: {
            prompt: `crystal towers built in vertiginous shapes, towers in the distance, a river below.`,
          },
        },
        {
          label: t("exampleDemo.starryPath"),
          param: {
            prompt: `A floating staircase of translucent crystal winds upward through a vast, star-filled void.`,
          },
        },
      ],
      [
        {
          label: t("exampleDemo.breedingPool"),
          param: {
            prompt: `worms-eye view of Bioluminescent Algae lighting, Background is the area of techno-organic gardens, bio-engineered flora, luminescent plants, harmonious fusion of nature and technology, dark lighting`,
          },
        },
        {
          label: t("exampleDemo.goldenGrassland"),
          param: {
            prompt: `background is a grassy field at golden hour`,
          },
        },
        {
          label:  t("exampleDemo.scrapFactory"),
          param: {
            prompt: `This is a scene of no one, a wasteland of broken machines and rusting metal.     A large scrap heap in the shape of a  towers above , with the word "KINGNET" spray-painted on its side, (Studio ghibli style, Art by Hayao Miyazaki:1.2), Anime Style, Manga Style, Hand drawn, cinematic, Sharp focus, humorous illustration, big depth of field, Masterpiece, concept art, trending on artstation, Vivid colors, Simplified style, trending on ArtStation, trending on CGSociety, Intricate, Vibrant colors, Soft Shading, Simplistic Features, Sharp Angles, Playful`,
          },
        },
      ],
    ],
  };

  const intensity = {
    title: t("detailIntensity"),
    marks: {
      0: "0%",
      100: "100%",
    },
    min: 0,
    max: 100,
  };

  const formData = {
    prompt: "",
    types: [0],
    intensity: 0.15,
  };

  return {
    types,
    sizes,
    keywords,
    intensity,
    formData,
  };
};

export default GameScene;
