import React from "react";
import '../../styles/home.css';
import { Container, Row, Col } from 'reactstrap';
import heroImg from '../../assets/images/hero-img01.jpg';
import heroImg02 from '../../assets/images/hero-img02.jpg';
import heroVideo from '../../assets/images/hero-video.mp4';
import worldImg from '../../assets/images/world.png';
import Subtitle from '../../shared/Subtitle';
import experienceImg from '../../assets/images/experience.png';  // ✅ correct


import SearchBar from '../../shared/SearchBar';
import ServiceList from "../../services/ServiceList";
import FeaturedTourList from "../Featured-Tours/FeaturedTourList";
import MasonryImagesGallary from "../Image-gallary/MasonryImagesGallary";
import Testimonial from '../Testimonial/Testimonial';
import Newsletter from '../../shared/Newsletter';



 

const Home = () => {
  return (
    <>
      {/* ========= Hero Section Start ========= */}
      <section className="hero">
        <Container>
          <Row>
            <Col lg='6'>
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle="Know Before You Go" />
                  <img src={worldImg} alt="World" />
                </div>
                <h1>
                  Traveling opens the door to creating
                  <span className="highlight"> memories</span>
                </h1>
                <p>
                  "Discover breathtaking destinations and unique experiences that stay with you forever. From historic landmarks to hidden natural wonders, every journey brings new adventures. Whether you’re exploring vibrant cities or peaceful escapes, traveling connects you to cultures, people, and unforgettable memories."
                </p>
              </div>
            </Col>

            <Col lg='2'>
              <div className="hero_img-box">
                <img src={heroImg} alt="Hero" />
              </div>
            </Col>

            <Col lg='2'>
              <div className="hero_img-box  hero_vedio-box mt-4">
                <video src={heroVideo} controls muted autoPlay loop className="hero_video" />
              </div>
            </Col>

            <Col lg='2'>
              <div className="hero_img-box mt-5">
                <img src={heroImg02} alt="Hero 2" />
              </div>
            </Col>
            <SearchBar/>
          </Row>
        </Container>
      </section>
      {/* ========= Hero Section End ========= */}
      <section>
        <Container>
          <Row>
            <Col lg='3'>
              <h5 className="services_subtitle"> What we serve</h5>
              <h2 className="services_title">We offer our best services</h2>
            </Col>
            <ServiceList/>
          </Row>
        </Container>
      </section>

      {/*========================festured tour section start============= */}
      <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <Subtitle subtitle={"Explore"}/>
            <h2 className="featured_tour-title">Our featured tours </h2>
          </Col>
          
        </Row>
        <FeaturedTourList/>
      </Container>
      </section>
      {/*========================featured tour section end============= */}

      {/*========================experience section start============= */}
      <section>
        <Container>
          <Row>
            <Col lg='6'>
            <div className="experience_content">
              <Subtitle subtitle ={"Experience"} />
              <h2> 
                With our all experince <br/> we will serve you
              </h2>
              <p>
                Lorem ipsum dolor sit amet, conseectetur adipisicing elit.
                <br/>
                Quas aliquam,hic tempora inventore suscipit unde. 
              </p>
            </div>
            <div className="counter_wrapper d-flex align-items-center gap-5">
              <div className="counter_box">
                <span>12k+</span>
                <h6> Successful trip</h6>
              </div>
              <div className="counter_box">
                <span>2k+</span>
                <h6> Regular clients</h6>
              </div>
              <div className="counter_box">
                <span>15</span>
                <h6> Year experience</h6>
              </div>
            </div>
            </Col>
            <Col lg="6">
            <div className="experience_img">
              <img src={experienceImg} alt=""/>
            </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/*========================experience section end============= */}
      {/*========================Gallary section start============= */}
      <section>
        <Container>
          <Row>
            <Col  lg='12'>
            <Subtitle subtitle={'Gallary'}/>
            <h2 className="gallary_title">Visit our customers tour gallery</h2>
            </Col>
            <Col lg='12'>
            <MasonryImagesGallary/>
            </Col>
          </Row>
        </Container>
      </section>
      {/*========================Gallary section end============= */}
      {/*========================Testimonial section start============= */}

      <section>
        <Container>
          <Row>
            <Col lg ='12'>
            <Subtitle subtitle ={'Fans Love'}/>
            <h2 className="testimonial_title">What our fans say about us </h2>
            </Col>
            <Col lg='12'>
            <Testimonial/>
            </Col>
          </Row>
        </Container>
      </section>
      {/*========================Testimonial section end============= */}
      <Newsletter/>

    </>
  );
};

export default Home;
