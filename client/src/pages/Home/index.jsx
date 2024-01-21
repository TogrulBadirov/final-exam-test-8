import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";
import AboutTasty from "../../components/AboutTasty";
import OurMenu from "../../components/OurMenu";
import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <>
    <div><Toaster/></div>
      <Helmet>
        <title>Home </title>
      </Helmet>
      <Header />
      <AboutTasty/>
      <OurMenu/>
    </>
  );
};

export default Home;
