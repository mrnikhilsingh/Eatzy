import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="py-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
