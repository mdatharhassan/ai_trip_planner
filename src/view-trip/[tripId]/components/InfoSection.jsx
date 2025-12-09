import { Button } from "@/components/ui/button";
import getPlacePhoto from "@/services/PhotoApi";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ tripData }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadImage() {
      try {
        const photo = await getPlacePhoto(tripData?.userSelection?.location);
        if (mounted) setImage(photo);
        console.log(photo);
      } catch (e) {
        // fail silently and keep fallback image
        console.log(`message: ${e.message}`);
      }
    }
    loadImage();
    return () => {
      mounted = false;
    };
  }, [tripData?.userSelection?.location]);

  return (
    <div>
      <img
        src={image || "/bg.jpg"}
        className="h-[300px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {tripData?.userSelection?.location}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {tripData?.userSelection?.days} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {tripData?.userSelection?.budget} Budgets
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🍾 No. of Travelers: {tripData?.userSelection?.travelWith}
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
