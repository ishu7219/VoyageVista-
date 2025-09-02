import React from "react";
import Slider from 'react-slick';
import ava01 from '../../assets/images/ava-1.jpg';
import ava02 from '../../assets/images/ava-2.jpg';
import ava03 from '../../assets/images/ava-3.jpg';

const Testimonial = () => {

    const settings={
        dots: true,
        infinite: true,
        autoplay:true,
        speed: 1000,
        swipeToSlide:true,
        autoplaySpeed:2000,
        slidesToShow:3,

        responsive:[
        {
            breakpoint:992,
            settings:{
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite:true,
                dots: true,
            
            },
        },
        {
          breakpoint:576,
            settings:{
                slidesToShow: 1,
                slidesToScroll: 1,  
            },
        },
        ]


    }

    return (<Slider {...settings}>
        <div className="testimonial py-4 py-3">
            <p>This tour was an amazing experience filled with culture, history, and breathtaking views. The guide was very knowledgeable, explaining everything with patience and detail. Every moment felt special and worth remembering, and the hospitality was outstanding throughout.

            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava01}className="w-25 h-25 rounded-2" alt=""/>

            </div>
            <h6 className="mb-0 mt-3">John Doe</h6>
            <p>Customer</p>
        </div>
        <div className="testimonial py-4 py-3">
            <p>I truly enjoyed every part of this trip, from the comfortable travel to the scenic destinations we visited. The arrangements were smooth, and everything was managed very well. It was both relaxing and adventurous, a perfect balance that made it unforgettable.

            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava02}className="w-25 h-25 rounded-2" alt=""/>

            </div>
            <h6 className="mb-0 mt-3">Lia Franklin</h6>
            <p>Customer</p>
        </div>
        <div className="testimonial py-4 py-3">
            <p>This journey exceeded all my expectations, offering a mix of beautiful locations, delicious food, and great company. The staff made sure everything was well organized, comfortable, and completely stress free. I would definitely recommend this wonderful experience to friends and family.

            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava03}className="w-25 h-25 rounded-2" alt=""/>

            </div>
            <h6 className="mb-0 mt-3">John Doe</h6>
            <p>Customer</p>
        </div>
        <div className="testimonial py-4 py-3">
            <p>This tour was an amazing experience filled with culture, history, and breathtaking views. The guide was very knowledgeable, explaining everything with patience and detail. Every moment felt special and worth remembering, and the hospitality was outstanding throughout.

            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava01}className="w-25 h-25 rounded-2" alt=""/>

            </div>
            <h6 className="mb-0 mt-3">John Doe</h6>
            <p>Customer</p>
        </div>
        <div className="testimonial py-4 py-3">
            <p>I truly enjoyed every part of this trip, from the comfortable travel to the scenic destinations we visited. The arrangements were smooth, and everything was managed very well. It was both relaxing and adventurous, a perfect balance that made it unforgettable.
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava02}className="w-25 h-25 rounded-2" alt=""/>

            </div>
            <h6 className="mb-0 mt-3">John Doe</h6>
            <p>Customer</p>
        </div>
        <div className="testimonial py-4 py-3">
            <p>This journey exceeded all my expectations, offering a mix of beautiful locations, delicious food, and great company. The staff made sure everything was well organized, comfortable, and completely stress free. I would definitely recommend this wonderful experience to friends and family.

            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava03}className="w-25 h-25 rounded-2" alt=""/>

            </div>
            <h6 className="mb-0 mt-3">John Doe</h6>
            <p>Customer</p>
        </div>
    </Slider>
    );
};
export default Testimonial;