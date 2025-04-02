import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

const Header = lazy(() => import("@/components/Header"));
const Terms = lazy(() => import("@/views/footer/terms"));
const Privacy = lazy(() => import("@/views/footer/privacy"));

const Home = lazy(() => import("@/views/home/index"));

const AiAgents = lazy(() => import("@/views/agent/agents"));
const Agent = lazy(() => import("@/views/agent/index"));

import AiListRouter from "./aiList";

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={null}>
        <Header />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={null}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/agents",
        element: (
          <Suspense fallback={null}>
            <AiAgents />
          </Suspense>
        ),
      },
      {
        path: "/agent/:id",
        element: (
          <Suspense fallback={null}>
            <Agent />
          </Suspense>
        ),
      },

      {
        path: "/terms",
        element: (
          <Suspense fallback={null}>
            <Terms />
          </Suspense>
        ),
      },
      {
        path: "/privacy",
        element: (
          <Suspense fallback={null}>
            <Privacy />
          </Suspense>
        ),
      },
      ...AiListRouter,
    ],
  },
]);
export default router;
