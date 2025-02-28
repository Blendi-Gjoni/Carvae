import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeCarousel = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="img-fluid"
                    src={require('../assets/mercedescarouselpic.jpg')}
                    alt="Mercedes"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="img-fluid"
                    src={require('../assets/bmwcarouselpic.jpg')}
                    alt="BMW"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="img-fluid"
                    src={require('../assets/audicarouselpic.jpg')}
                    alt="Audi"
                />
            </Carousel.Item>
        </Carousel>
    );
};

export default HomeCarousel;
