import React from "react";
import ServiceCard  from "./ServiceCard";
import { Col } from "reactstrap";

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';

  


const servicesData =[ 
    {
        imgUrl :weatherImg,
        title:"Calculate Weather",
        desc: "Get real-time weather updates for your travel destination and plan your journey with confidence.",
    },
    {
        imgUrl :guideImg,
        title:"Best Tour Guide",
        desc: "Explore new places with experienced guides who make your trips safe, fun, and memorable.",
    },
    {
        imgUrl :customizationImg,
        title:"Customization",
        desc: "Tailor your travel experience with flexible plans designed just for your needs and preferences.",
    },
];


const ServiceList = ( ) => {
  return (
  <>
  
    {servicesData.map((item,index)=> (
    <Col lg='3' md="6" sm="12" key={index}>
        <ServiceCard item={item} />
    </Col>
    ))}
  
  </>  
  );
};
export default ServiceList;
