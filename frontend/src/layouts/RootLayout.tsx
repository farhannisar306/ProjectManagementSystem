import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const RootLayout = () => {
  return (

    <main className="flex flex-col h-screen">
      <NavBar />
      <section className="flex-1">
        <Outlet />
      </section>
    </main>

    // <div className="flex flex-col bg-gradient-to-br from-gray-50 to-white min-h-screen">
    //   <NavBar />
    //   <main className="flex-1 w-full h-full">
    //     <Outlet />
    //   </main>
    // </div>
  );
};

export default RootLayout;