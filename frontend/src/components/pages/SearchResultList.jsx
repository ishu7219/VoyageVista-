import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CommonSection from "../../shared/CommonSection";
import TourCard from "../../shared/TourCard";
import { Container, Row, Col } from "reactstrap";
import Newsletter from "../../shared/Newsletter";

const SearchResultList = () => {
  const location = useLocation();
  const [data, setData ] = useState([location.state]);

  useEffect(() => {
    if (location.state) {
      setData(location.state); // state me jo result aya h usko set karenge
    }
  }, [location.state]);

  return (
    <>
      <CommonSection title={" Tour Search Results"} />

      <section >
        <Container>
          <Row>
            {data.length === 0 ? (
                <h4 className="text-center">No Tour Found</h4>
            ):(
              data.map((tour) => (
                <Col lg="3" key={tour._id} className="mb-4">
                  <TourCard tour={tour} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
      <Newsletter/>
    </>
  );
};

export default SearchResultList;
