import React from "react";
import { Container } from "react-bootstrap";
import { AdminSideBar } from "../../components/admin-sidebar/AdminSideBar";
import { Footer } from "./Footer";
import { Header } from "./Header";

const AdminLayout = ({ children }) => {
  return (
    <div>
      {/* header section */}
      <Header />
      <AdminSideBar />
      {/* main content */}
      <Container>
        <main className="main">{children}</main>
      </Container>

      {/* footer section */}

      <Footer />
    </div>
  );
};

export default AdminLayout;
