import React, { useContext } from "react";
import "./NaBar.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import { AuthContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import LeftSideNav from "../Pages/Shared/LeftSideNav/LeftSideNav";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  // console.log(user);

  //navigate
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //log out
  const handleLogOut = () => {
    logout()
      .then(() => {
        navigate(from, { replace: true });
        toast.warning("log out successfuly");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="nab">
      {["lg"].map((expand) => (
        <Navbar key={expand} expand={expand} className="mb-3">
          <Container fluid>
            <Link to="/">
              <Image
                className="border rounded me-2 ms-4"
                src="https://elearningindustry.com/wp-content/uploads/2015/05/Online-Learning-Teaching-Techniques.jpg"
                width="40"
                height="40"
              />
            </Link>
            <Navbar.Brand to="/" className="fw-bold fs-1">
              <span className="text-white"> BGC</span>
              <span className="text-success"> Tech</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <span className="text-danger"> BGC</span>
                  <span className="text-success"> Tech</span>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 allNav">
                  <Link className="me-4" to="/courses">
                    Courses
                  </Link>
                  <Link className="me-4" to="/faq">
                    FAQ
                  </Link>
                  <Link className="me-4" to="/blog">
                    Blog
                  </Link>
                  {user?.photoURL ? (
                    <div>
                      <Link to="/profile" title={user.displayName}>
                        <Image
                          className="m-2"
                          style={{ height: "30px" }}
                          roundedCircle
                          src={user?.photoURL}
                        ></Image>
                      </Link>

                      <Link onClick={handleLogOut}>Log out</Link>
                    </div>
                  ) : (
                    <>
                      <Link className="text-white" to="/login">
                        Login
                      </Link>
                    </>
                  )}
                </Nav>
                <div className="d-lg-none">
                  <LeftSideNav></LeftSideNav>
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
};

export default NavBar;