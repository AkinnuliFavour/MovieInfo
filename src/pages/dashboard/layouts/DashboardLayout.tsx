import { Outlet } from "react-router-dom";
import Nav from "../../../components/Nav";

const DashboardLayout = () => {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default DashboardLayout;
