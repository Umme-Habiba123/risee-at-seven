import FeaturedWork from "./FeaturedWork";
import MarqueeTicker from "./MarqueeTicker";
import MurkUp from "./MurkUp";
import OurServices from "./OurServices";

const home = () => {
  return (
    <div>
      <MurkUp></MurkUp>
      <FeaturedWork></FeaturedWork>
      <OurServices></OurServices>
      <MarqueeTicker></MarqueeTicker>
    </div>
  );
};

export default home;
