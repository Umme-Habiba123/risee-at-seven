import LegacyCards from "../LegacyCards";
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
      <LegacyCards></LegacyCards>
    </div>
  );
};

export default home;
