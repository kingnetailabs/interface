import { useTranslation } from "react-i18next";
const Weapon = () => {
  const { t } = useTranslation();
  const types = {
    title: t("functionalSegmentation"),
    sub: t("selectType"),
    options: [
      {
        value: 0,
        label: t("realisticStyle"),
        param: {
          prompt_strategy: "5",
          outKey: [148],
        },
      },
      {
        value: 1,
        label: t("sciFiStyle"),
        param: {
          prompt_strategy: "4",
          outKey: [148],
        },
      },
    ],
  };
  const sizes = {
    title: t("aspectRatio"),
    sub: t("selectType"),
    options: [
      { label: t("vertical"), value: 0, param: { width: 512, height: 1024 } },
      { label: t("equalRatio"), value: 1, param: { width: 1024, height: 1024 } },

      {
        label: t("horizontal"),
        value: 2,
        param: { width: 1024, height: 512 },
      },
    ],
  };

  const keywords = {
    title: t("keywordDescription"),
    sub: t("example"),
    options: [
      [
        {
          label: t("exampleDemo.jian"),
          param: {
            prompt: `Sword, gold, white handle, long, fantasy medieval games,`,
          },
        },
        {
          label: t("exampleDemo.fu"),
          param: {
            prompt: `Axe, purple axe blade, black handle, long, fantasy games, Diablo, Tomahawk`,
          },
        },
        {
          label: t("exampleDemo.staff"),
          param: {
            prompt: `Magic staff, blue crystal, wooden handle, long, fantasy games, high magic staff for wizards`,
          },
        },
        {
          label: t("exampleDemo.gong"),
          param: {
            prompt: `Bow, predominantly black and interspersed with red, the most advanced weapon in fantasy games, World of Warcraft`,
          },
        },
        {
          label: t("exampleDemo.gunslinger"),
          param: {
            prompt: `The musket, dominated by silver and interspersed with ghostly green, is the most advanced weapon in the fantasy game World of Warcraft, a soul-sucking weapon`,
          },
        },
      ],
      [
        {
          label: t("exampleDemo.energyAxe"),
          param: {
            prompt: `(mechanical axe:1.8).  The axe is designed with intricate,metallic components,showcasing a blend of sleek,polished surfaces and rugged,industrial textures.  The handle is cylindrical,featuring multiple layers of dark gray and black rubber-**** material,providing a firm grip.  The head of the axe is a complex assembly of interlocking gears,pistons,and various mechanical components,all painted in shades of silver and black,with hints of blue and orange accents.  The head is topped with a curved,transparent blue blade,which appears to be **** of a durable,high-tech material,possibly a synthetic polymer.  The blade is surrounded by a ring of gears and mechanisms,suggesting advanced functionality.  The background is a smooth,dark gradient,which enhances the metallic sheen of the axe and highlights its detailed craftsmanship.  The overall design is reminiscent of high-tech weaponry,combining elements of both modern engineering and fantasy aesthetics.  The image is highly polished and realistic,with a focus on the intricate,mechanical details that make the axe both functional and visually striking.`,
          },
        },
        {
          label: t("exampleDemo.laserGun"),
          param: {
            prompt: `advanced military rifle.  The weapon is printed with the words‘XDW28’,The weapon is predominantly yellow with black accents,giving it a sleek and modern appearance.   The barrel and upper portion of the rifle are a vibrant yellow,while the lower part and the grip are black with metallic highlights.   The rifle has a futuristic design with angular lines and sharp edges,indicative of advanced technology.   It features a scope mounted on top,which is also yellow with black accents,and has multiple buttons and dials for precise targeting.`,
          },
        },
        {
          label: t("exampleDemo.steampunkPistol"),
          param: {
            prompt: `steampunk-style firearm.  The weapon is intricately crafted with a combination of metallic,wooden,and leather elements.  The barrel and body are primarily **** of polished,metallic components,giving it a sleek,industrial look.  The barrel is elongated with a brass-colored,cylindrical chamber at the end,suggesting a large caliber.  The body features numerous gears,pistons,and valves,all meticulously detailed with rivets and bolts,indicating complex mechanical functionality.The grip is wooden,stained with a rich,dark brown hue,and wrapped in brown leather straps for added grip and durability.  The wooden section is adorned with intricate carvings and engravings,adding to the weapon's ornate appearance.  The handle is connected to the body with a series of metallic rods and joints,showcasing the weapon's robust construction.The background is a gradient of dark grey,which contrasts with the metallic and wooden elements,enhancing the image's depth and focus on the firearm.  The overall style is reminiscent of Victorian-era machinery with a modern twist,blending elements of fantasy and science fiction.  This detailed,highly realistic image is likely created for a video game or concept art.`,
          },
        },
      ],
    ],
  };

  const formData = {
    prompt: "",
    types: [0],
    sizes: [0],
  };
  return { types, sizes, keywords, formData };
};

export default Weapon;
