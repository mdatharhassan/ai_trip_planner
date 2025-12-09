import getPlacePhoto from "@/services/PhotoApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadImage() {
      try {
        const photo = await getPlacePhoto(trip?.userSelection?.location);
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
  }, [trip?.userSelection?.location]);
  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="hover:scale-105 transition-all">
        <img
          src={image || "/bg.jpg"}
          className="object-cover rounded-xl h-[250px] w-[250px]"
        />
        <div>
          <h2 className="font-bold text-lg">{trip?.userSelection?.location}</h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.days} Days trip with{" "}
            {trip?.userSelection?.budget} budgets
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
