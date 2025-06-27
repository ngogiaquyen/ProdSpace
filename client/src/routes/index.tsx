import { routes } from "~/config";
import DefaultLayout from "~/layout/DefaultLayout";
import EmptyLayout from "~/layout/EmptyLayout";
import AIDesignPage from "~/pages/AIDesignPage";
import BeNgoanPage from "~/pages/BeNgoanPage";
import BuilderPage from "~/pages/BuilderPage";
import ComponentShowcasePage from "~/pages/ComponentShowcasePage";
import NotFoundPage from "~/pages/NotFoundPage";
import ProfilePage from "~/pages/ProfilePage";
import SettingsPage from "~/pages/SettingsPage";
import TemplatePage from "~/pages/TemplatePage";
import WebsiteIntroPage from "~/pages/WebsiteIntroPage";

const publicRoute = [
  {
    path: routes.home,
    component: TemplatePage,
    layout: DefaultLayout,
  },
  {
    path: routes.notFound,
    component: NotFoundPage,
    layout: EmptyLayout,
  },
  {
    path: routes.intro,
    component: WebsiteIntroPage,
    layout: DefaultLayout,
  },  
  {
    path: routes.pageBuider,
    component: BuilderPage,
    layout: DefaultLayout,
  },
  {
    path: routes.beNgoan,
    component: BeNgoanPage,
    layout: EmptyLayout,
  },
  {
    path: routes.aiDesign,
    component: AIDesignPage,
    layout: EmptyLayout,
  },
  {
    path: routes.components,
    component: ComponentShowcasePage,
    layout: EmptyLayout,
  },
  {
    path: routes.settings,
    component: SettingsPage,
    layout: DefaultLayout,
  },
  {
    path: routes.profile,
    component: ProfilePage,
    layout: DefaultLayout,
  },
];
const privateRoute = [];

export { publicRoute, privateRoute };
