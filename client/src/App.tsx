import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import { publicRoute } from "./routes";

function App() {
  return (
    <Routes>
      {publicRoute.map((route, index) => {
        let Layout = DefaultLayout;

        const Page = route.component;

        if (route && route?.layout) {
          Layout = route.layout;
        }

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
