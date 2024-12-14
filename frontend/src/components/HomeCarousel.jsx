import React from "react";
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeCarousel = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://images.netdirector.co.uk/gforces-auto/image/upload/q_auto,c_fill,f_auto,fl_lossy,w_1600,h_533/auto-client/49687a47db15162947879befbc7e5ac5/skoda_superb_hatch_new_car_desktop_020524.jpg"
                    alt="Skoda"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://d1wkbaiybv8xl1.cloudfront.net/image-repo/2024/bmw/series-3/bmw-series-3-vs-bmw-series-5.webp"
                    alt="BMW"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="http://www.rzbautoparts.com/En/images/banner001.jpg"
                    alt="Volkswagen"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default HomeCarousel;
