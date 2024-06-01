import Banner from "../../Components/Banner";
import LatesPosts from "../../Components/LatesPosts";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="w-9/12 mx-auto my-20">
        <LatesPosts></LatesPosts>
      </div>
    </div>
  );
};

export default Home;
