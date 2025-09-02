import React, { useRef, useState, useEffect, useContext } from "react";
import "../../styles/tour-details.css";
import { Container, Row, Col, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../../utils/avgRating";
import avatar from "../../assets/images/avatar.jpg";
import Booking from "../../components/Booking/Booking";
import Newsletter from "../../shared/Newsletter";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  const {
    photo,
    title,
    desc,
    price,
    address,
    city,
    distance,
    maxGroupSize,
    reviews = [],
  } = tour || {};

  const { totalRating, avgRating } = calculateAvgRating(reviews);
  const options = { day: "numeric", month: "long", year: "numeric" };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!user) {
      alert("Please sign in to submit a review");
      return;
    }

    if (!tourRating) {
      alert("Please select a rating before submitting");
      return;
    }

    try {
      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message);
      }

      alert(result.message);
      reviewMsgRef.current.value = ""; // clear input after submission
      setTourRating(null);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center mt-5">Loading...</h4>}
          {error && <h4 className="text-center mt-5">{error}</h4>}
          {!loading && !error && !tour && (
            <h2 className="text-center mt-5">Tour not found</h2>
          )}

          {!loading && !error && tour && (
            <Row>
              <Col lg="8">
                <div className="tour_content">
                  <img src={photo} alt={title} className="w-100" />
                  <div className="tour_info mt-4">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="tour_rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>{" "}
                        {avgRating > 0 ? avgRating : "Not rated"}
                        {reviews.length > 0 && <span>({reviews.length})</span>}
                      </span>
                      <span>
                        <i className="ri-map-pin-user-fill"></i>
                        {address}
                      </span>
                    </div>
                    <div className="tour_extra-details">
                      <span>
                        <i className="ri-map-pin-2-line"></i>
                        {city}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i>${price} /
                        per person
                      </span>
                      <span>
                        <i className="ri-map-pin-time-line"></i>
                        {distance} km
                      </span>
                      <span>
                        <i className="ri-group-line"></i>
                        {maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>

                  {/* Reviews */}
                  <div className="tour_reviews mt-4">
                    <h4>Reviews ({reviews.length} reviews)</h4>
                    <form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mt-4 rating">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <span
                            key={num}
                            onClick={() => setTourRating(num)}
                            style={{
                              cursor: "pointer",
                              color: tourRating >= num ? "#f4c150" : "#aaa",
                            }}
                          >
                            <i className="ri-star-fill"></i>
                          </span>
                        ))}
                      </div>
                      <div className="review_input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Share your thoughts"
                          required
                        />
                        <button
                          type="submit"
                          className="btn primary__btn text-white"
                        >
                          Submit
                        </button>
                      </div>
                    </form>

                    <ListGroup className="user_reviews">
                      {reviews.map((review, index) => (
                        <div className="review_item" key={index}>
                          <img src={avatar} alt="" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username || "User"}</h5>
                                <p>
                                  {new Date(
                                    review.date || Date.now()
                                  ).toLocaleDateString("en-US", options)}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating} <i className="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{review.reviewText || "No comment"}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>

              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default TourDetails;
