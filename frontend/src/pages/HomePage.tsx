import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();


  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-3xl font-bold tracking-tight text-orange-600">
        Join the Conversation, Shape the Future
        </h1>
        <span className="text-xl">Conference is just a click away!</span>
        
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
          Connecting Minds, Creating Opportunities
          </span>
          <span>
            Download the Conference Management App to Enhance Your Conference Journey
          </span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;