import { routes } from "~/config";
import EmptyLayout from "~/layout/EmptyLayout";
import BeNgoanPage from "~/pages/BeNgoanPage";
import LmsPage from "~/pages/LmsPage";
import NotFoundPage from "~/pages/NotFoundPage";
import ProductDetail from "~/pages/ProductDetail";
import ProductPage from "~/pages/ProductPage";
import QuestionPage from "~/pages/QuestionPage";
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
    layout: EmptyLayout,
  },
  {
    path: routes.question,
    component: QuestionPage,
    layout: EmptyLayout,
  },
  {
    path: routes.upload,
    component: UploadPage,
    layout: EmptyLayout,
  },
];
const privateRoute = [];

export { publicRoute, privateRoute };
