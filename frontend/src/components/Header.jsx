import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = ({ toggleFacts,
  showFacts,
  toggleMarsChart,
  toggleEpicChart,
  showMarsChart,
  showEpicChart, }) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        className="shadow-sm"
      >
        <Container>
          {/* Offcanvas Toggle Button */}
          <Button
            variant="outline-light"
            onClick={handleShow}
            className="fw-semibold"
            style={{ letterSpacing: "1px" }}
          >
            ☰ Menu
          </Button>

          <Navbar.Brand
            as={NavLink}
            to="/apod"
            className="fw-bold fs-4 text-gradient justify-content-start"
            style={{
              background: "linear-gradient(45deg, #66ccff, #3366ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            NASA Visualizer
          </Navbar.Brand>

          <Navbar.Text className="text-light fst-italic fw-light">
            Current Time:{" "}
            <span className="text-info">
              {formattedTime}
            </span>
          </Navbar.Text>
        </Container>
      </Navbar>

      {/* Left-Side Offcanvas */}
      <Offcanvas
        show={showOffcanvas}
        onHide={handleClose}
        placement="start"
        style={{
          backgroundColor: "#121212",
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
          boxShadow: "3px 0 15px rgba(0,0,0,0.7)",
          transition: "transform 0.3s ease",
          color: "white",
        }}
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title
            className="fs-4 fw-bold"
            style={{ letterSpacing: "1px" }}
          >
            🚀 NASA Menu
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column fs-5">
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip id="tooltip-apod">
                  Click to view Astronomy Picture of the Day!
                </Tooltip>
              }
            >
              <Nav.Link
                as={NavLink}
                to="/apod"
                onClick={handleClose}
                className="d-flex align-items-center px-3 py-2 rounded hover-bg-light"
                style={{
                  color: "white",
                  transition: "background-color 0.2s ease",
                }}
                activeClassName="bg-primary"
              >
                <span role="img" aria-label="apod" className="me-2">
                  🌌
                </span>
                APOD
              </Nav.Link>
            </OverlayTrigger>

            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip id="tooltip-mars-rover">
                  Click to view photos taken by Mars Rovers!
                </Tooltip>
              }
            >
              <Nav.Link
                as={NavLink}
                to="/mars-rover"
                onClick={handleClose}
                className="d-flex align-items-center px-3 py-2 rounded hover-bg-light"
                style={{
                  color: "white",
                  transition: "background-color 0.2s ease",
                }}
                activeClassName="bg-primary"
              >
                <span role="img" aria-label="mars" className="me-2">
                  🛸
                </span>
                Mars Rover Photos
              </Nav.Link>
            </OverlayTrigger>
            <Button
              variant={showMarsChart ? "secondary" : "outline-secondary"}
              size="sm"
              className="mb-3 ms-4"
              onClick={(e) => {
                e.stopPropagation(); // prevent Nav.Link click
                toggleMarsChart();
              }}
            >
              {showMarsChart ? "Hide Chart" : "Show Chart"}
            </Button>


            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip id="tooltip-epic">
                  Click to view photos taken by Earth Polychromatic Imaging
                  Camera!
                </Tooltip>
              }
            >
              <Nav.Link
                as={NavLink}
                to="/epic"
                onClick={handleClose}
                className="d-flex align-items-center px-3 py-2 rounded hover-bg-light"
                style={{
                  color: "white",
                  transition: "background-color 0.2s ease",
                }}
                activeClassName="bg-primary"
              >
                <span role="img" aria-label="epic" className="me-2">
                  🌍
                </span>
                EPIC
              </Nav.Link>
            </OverlayTrigger>
            <Button
              variant={showEpicChart ? "secondary" : "outline-secondary"}
              size="sm"
              className="mb-3 ms-4"
              onClick={(e) => {
                e.stopPropagation();
                toggleEpicChart();
              }}
            >
              {showEpicChart ? "Hide Chart" : "Show Chart"}
            </Button>

            <Nav.Link
              onClick={() => {
                toggleFacts();
                handleClose(); // Optionally close the menu after toggling
              }}
              className="d-flex align-items-center px-3 py-2 rounded hover-bg-light"
              style={{
                color: "white",
                transition: "background-color 0.2s ease",
              }}
            >
              <span role="img" aria-label="facts" className="me-2">
                🧠
              </span>
              {showFacts ? "Hide Space Facts" : "Show Space Facts"}
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <style>
        {`
          .hover-bg-light:hover {
            background-color: rgba(255, 255, 255, 0.1);
            cursor: pointer;
          }
          .fact-btn:hover {
            filter: brightness(1.1);
          }
          .bg-primary {
            background-color: #3366ff !important;
            color: white !important;
          }
        `}
      </style>
    </>
  );
};

export default Header;
