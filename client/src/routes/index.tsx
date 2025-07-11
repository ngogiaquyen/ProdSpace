import { routes } from "~/config";
import EmptyLayout from "~/layout/EmptyLayout";
import LmsLayout from "~/layout/LmsLayout/LmsLayout";
import BeNgoanPage from "~/pages/CardPage";
import ClassSchedule from "~/pages/ClassSchedule/ClassSchedule";
import LmsPage from "~/pages/LmsPage";
import LoginPage from "~/pages/LoginPage";
import NotFoundPage from "~/pages/NotFoundPage";
import ProductDetail from "~/pages/ProductDetail";
import ProductPage from "~/pages/ProductPage";
import QuestionPage from "~/pages/QuestionPage";
import TestEdit from "~/pages/TestEdit";
import TestList from "~/pages/TestList";
import TestManagement from "~/pages/TestManagement/TestManagement";
import UploadPage from "~/pages/UploadPage";

const publicRoute = [
  {
    path: routes.home,
    component: ProductPage,
    layout: EmptyLayout,
  },
  {
    path: routes.notFound,
    component: NotFoundPage,
    layout: EmptyLayout,
  },
  {
    path: routes.productDetail,
    component: ProductDetail,
    layout: EmptyLayout,
  },
  {
    path: routes.beNgoan,
    component: BeNgoanPage,
    layout: EmptyLayout,
  },
  {
    path: routes.lms,
    component: LmsPage,
    layout: LmsLayout,
  },
  {
    path: routes.test,
    component: QuestionPage,
    layout: LmsLayout,
  },
  {
    path: routes.upload,
    component: UploadPage,
    layout: LmsLayout,
  },
  {
    path: routes.list,
    component: TestList,
    layout: LmsLayout,
  },
  {
    path: routes.testManagement,
    component: TestManagement,
    layout: LmsLayout,
  },
  {
    path: routes.testEdit,
    component: TestEdit,
    layout: LmsLayout,
  },
  {
    path: routes.login,
    component: LoginPage,
    layout: EmptyLayout,
  },
  {
    path: routes.class,
    component: ClassSchedule,
    layout: EmptyLayout,
  },
];
const privateRoute = [];

export { publicRoute, privateRoute };
