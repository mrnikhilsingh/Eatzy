import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Provider } from "react-redux";
import store from "../store/store";

const MainLayout = () => {
  return (
    <>
      <Provider store={store}>
        <Header />
        <main className="bg-gray-50 px-4 py-16">
          <Outlet />
        </main>
        <Footer />
      </Provider>
    </>
  );
};

export default MainLayout;
