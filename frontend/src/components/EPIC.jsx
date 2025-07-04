import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown, Container, Row, Col } from "react-bootstrap";
import "../index.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadSpinner from "./LoadSpinner";
import EpicLongitudeHistogram from "./charts/EpicLongitudeHistogram";

const EPIC = ({ showChart }) => {
  // State to hold EPIC data & control the type of images displayed
  const [epicData, setImages] = useState(null);
  const [type, setType] = useState("natural");
  const [error, setError] = useState(null);

  // Fetch images on type change
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/epic?type=${type}`)
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setError("Failed to fetch EPIC data. Please try again later.");
      });
  }, [type]);

  return error ? (
    <p className="set-error center">{error}</p>
  ) : epicData ? (
    <Container>
      <Row>
        <Col md="auto">
          <h2>Earth Polychromatic Imaging Camera (EPIC)</h2>
        </Col>
        <Col className="flex justify-content-end">
          <DropdownButton
            className="mx-5 my-2"
            variant="primary"
            id="dropdown-basic-button"
            title={`Images: ${type.toUpperCase()}`}
          >
            <Dropdown.Item onClick={() => setType("natural")}>
              Natural
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setType("enhanced")}>
              Enhanced
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>


      {showChart && (<Row className="my-4">
        <Col>
          <h4>Distribution of Images by Longitude</h4>
          <EpicLongitudeHistogram data={epicData} />
        </Col>
      </Row>)}

      <div className="epic-img-layout">
        {epicData.map((image) => (
          <div key={image.identifier} className="epic-img">
            <LazyLoadImage
              className="img-layout photo"
              src={`https://epic.gsfc.nasa.gov/archive/${type}/${image.date
                .substring(0, 10)
                .replace(/-/g, "/")}/jpg/${image.image}.jpg`}
              alt={`EPIC Image ${image.identifier}`}
            />
            <div className="p-3 bg-dark">
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  margin: "5px 0",
                }}
              >
                {image.caption ? image.caption : "No caption available"}
              </p>
              <p className="fs-6 text-secondary">
                <strong>Date:</strong> {image.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  ) : (
    <LoadSpinner />
  );
};

export default EPIC;
