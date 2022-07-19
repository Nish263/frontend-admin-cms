import React from "react";
import { ListGroup } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../system-state/systemSlice";
import { Link } from "react-router-dom";
import { adminLogout } from "../../pages/register-login/signInUpAction";

export const AdminSideBar = () => {
  const dispatch = useDispatch();
  const { showAdminSidebar } = useSelector((state) => state.system);

  return (
    <>
      <Offcanvas
        show={showAdminSidebar}
        onHide={() => dispatch(toggleSidebar())}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin Side Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <hr />
          <ListGroup variant="flush" className="fs-5">
            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              <Link className="nav-link" to="/dashboard">
                <i class="fa-solid fa-house-chimney"></i> Home
              </Link>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              <Link className="nav-link" to="/dashboard">
                <i class="fa-solid fa-chart-line"></i> Dashboard
              </Link>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              <Link className="nav-link" to="/customers">
                <i class="fa-solid fa-user"></i> Customers
              </Link>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              <Link className="nav-link" to="/orders">
                <i class="fa-solid fa-table-cells"></i> Orders
              </Link>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              <Link className="nav-link" to="/products">
                <i class="fa-brands fa-product-hunt"></i> Products
              </Link>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              <Link className="nav-link" to="/categories">
                <i class="fa-solid fa-sitemap"></i> Categories
              </Link>
            </ListGroup.Item>

            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              <Link className="nav-link" to="/reviews">
                <i class="fa-solid fa-star"></i> Reviews
              </Link>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              <Link className="nav-link" to="/admin-profile">
                <i class="fa-solid fa-gear"></i> Admin Profile
              </Link>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => dispatch(toggleSidebar())}>
              <Link className="nav-link" to="/setting">
                <i class="fa-solid fa-gear"></i> Settings
              </Link>
            </ListGroup.Item>
            <ListGroup.Item onClick={() => dispatch(adminLogout())}>
              <Link className="nav-link" to="#">
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
