import React from "react";
import Layout from "../components/layouts/Layout";
import HomeCarousel from "../components/HomeCarousel";
import CarDisplayComponent from "../components/CarDisplayComponent";

const Home = () => {
  return (
    <Layout>
      <HomeCarousel />
        <CarDisplayComponent />
    </Layout>
  );
};

export default Home;
