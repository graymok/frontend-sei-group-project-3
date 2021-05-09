import Background from "../images/desert.jpeg";
import Clouds from "../images/clouds.png";
import Logo from "../images/logo.png";
import Brand from "../images/brand.png";

const Landing = () => {
  return (
    <div id="landing">
      <div id="logoBck">
        <img id="brand" src={Brand}></img>
        <img id="logo" src={Logo}></img>
      </div>
      <img id="desert" src={Background}></img>
      <div className="cloud-container">
        <img id="clouds" src={Clouds}></img>
      </div>
    </div>
  );
};

export default Landing;
