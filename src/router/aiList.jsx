import { lazy } from "react";

const AiList = lazy(() => import("@/views/aiList/aiList"));
const HeadNav = lazy(() => import("@/views/aiList/layer/HeadNav"));

// 2d
const Role = lazy(() => import("@/views/aiList/art2d/Role"));
const Weapon = lazy(() => import("@/views/aiList/art2d/Weapon"));
const Property = lazy(() => import("@/views/aiList/art2d/Property"));
const GameScene = lazy(() => import("@/views/aiList/art2d/GameScene"));
const Building = lazy(() => import("@/views/aiList/art2d/Building"));
const GameMap = lazy(() => import("@/views/aiList/art2d/GameMap"));

const AiListRouter = [
  {
    path: "/ai",
    element: <AiList />,
    children: [
      {
        path: "Art2d",
        element: <AiList />,
      },
    ],
  },

  {
    path: "/ai",
    element: <HeadNav />,
    children: [
      {
        path: "Art2d/Role",
        element: <Role />,
      },
      {
        path: "Art2d/Weapon",
        element: <Weapon />,
      },
      {
        path: "Art2d/Property",
        element: <Property />,
      },
      {
        path: "Art2d/GameScene",
        element: <GameScene />,
      },
      {
        path: "Art2d/Building",
        element: <Building />,
      },
      {
        path: "Art2d/GameMap",
        element: <GameMap />,
      },
    ],
  },
];

export default AiListRouter;
