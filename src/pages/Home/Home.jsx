import LegacyCards from "../LegacyCards";
import FeaturedWork from "./FeaturedWork";
import Footer from "./Footer";
import MarqueeTicker from "./MarqueeTicker";
import MurkUp from "./MurkUp";
import OurServices from "./OurServices";
import WhatsNew from "./WhatsNew";
import MarqueeSection from './MarqueeSection'

const home = () => {
  return (
    <div>
      <MurkUp></MurkUp>
      <FeaturedWork></FeaturedWork>
      <OurServices></OurServices>
      <MarqueeTicker></MarqueeTicker>
      <LegacyCards></LegacyCards>
      <WhatsNew></WhatsNew>
      <MarqueeSection></MarqueeSection>
      <Footer></Footer>
    </div>
  );
};

export default home;
