import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Provider } from "react-redux";
import store from "../store/store";
import { Toaster } from "sonner";

const MainLayout = () => {
  return (
    <>
      <Provider store={store}>
        <Toaster richColors closeButton expand={false} position="top-center" />
        <Header />
        <main className="bg-gray-50 px-2 py-10 sm:px-3 sm:py-16 md:px-5">
          <Outlet />
        </main>
        <Footer />
      </Provider>
    </>
  );
};

export default MainLayout;
