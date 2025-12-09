import { Button } from "@/components/ui/button";
import getPlacePhoto from "@/services/PhotoApi";
import { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadImage() {
      try {
        const photo = await getPlacePhoto(place?.placeName);
        if (mounted) setImage(photo);
        console.log(image);
      } catch (e) {
        // fail silently and keep fallback image
        console.log(`message: ${e.message}`);
      }
    }
    loadImage();
    return () => {
      mounted = false;
    };
  }, [place?.placeName]);
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place?.placeName
      )}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="border rounded-xl p-3 mt-2 flex items-center gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <div className="w-40 h-28 sm:w-48 sm:h-32 overflow-hidden rounded-xl shrink-0">
          <img
            src={image || "/bg.jpg"}
            alt={place?.placeName || "place image"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-lg line-clamp-1">{place.placeName}</h2>
          <h2 className="text-sm text-gray-400 line-clamp-3">
            {place.placeDetails}
          </h2>
          <h2 className="mt-2">🕰️ {place.timeRequired}</h2>
          <Button size="sm">
            <FaMapLocationDot />
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
