import React, { useState, useEffect } from "react";
import CommonSection from "../../shared/CommonSection";
import "../../styles/tour.css";
import TourCard from "../../shared/TourCard";
import SearchBar from "../../shared/SearchBar";
import Newsletter from "../../shared/Newsletter";
import { Container, Row, Col } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const Tour = () => {
  // ✅ API call
  const [page, setPage] = useState(0);
  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`); 
  const { data: tourCount } = useFetch(`${BASE_URL}/tours`);

  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (tourCount) {
      // ✅ If backend returns { count: number }
      const total = tourCount.count ? tourCount.count : tourCount; 
      const pages = Math.ceil(total / 8);
      setPageCount(pages);
    }
    window.scrollTo(0, 0);
  }, [tourCount, tours]);

  return (
    <>
      <CommonSection title={"All Tours"} />

      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading.....</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}

          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md="6" sm="6s" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}

              {/* Pagination */}
              <Col lg="12">
                <div className="pagination_wrapper d-flex align-items-center justify-content-center mt-4 gap-3">
                  {pageCount > 0 &&
                    [...Array(pageCount).keys()].map((number) => (
                      <span
                        key={number}
                        onClick={() => setPage(number)}
                        className={page === number ? "active_page" : ""}
                      >
                        {number + 1}
                      </span>
                    ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default Tour;
