import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[3rem] text-center mt-16">
        <span className="text-[#f56551]">
          Discover your Next Adventure with AI:{" "}
        </span>
        Personalized Itineraries at you Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <Link to={"/create-trip"} className="z-10">
        <Button>Get Started, It's Free</Button>
      </Link>
      <img src="/bgmain.png" className="-mt-60 " />
    </div>
  );
}

export default Hero;
