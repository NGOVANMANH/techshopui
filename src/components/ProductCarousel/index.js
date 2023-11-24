import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../ProductCard";
import styles from './ProductCarousel.module.scss';
import clsx from "clsx";

const ProductCarousel = ({ products, className }) => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 7
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };

    const carouselOptions = {
        responsive: responsive,
        autoPlay: true,
        autoPlaySpeed: 3000, // Adjust the speed (in milliseconds) as needed
        infinite: true,
        containerClass: clsx(styles.ProductCarousel)
    };

    return (
        <Carousel {...carouselOptions} removeArrowOnDeviceType={["tablet", "mobile"]} className={clsx(styles.ProductCarousel, className)}>
            {
                products ? products.map((product) => (<ProductCard key={product.id} product={product} />)) : <></>
            }
        </Carousel>
    );
};

export default ProductCarousel;