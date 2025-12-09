import getPlacePhoto from "@/services/PhotoApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCard({ hotel }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadImage() {
      try {
        const photo = await getPlacePhoto(hotel?.hotelName);
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
  }, [hotel?.hotelName]);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        hotel?.hotelName + " " + hotel?.hotelAddress
      )}`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={image || "/bg.jpg"}
          className="rounded-xl w-full h-40 sm:h-60"
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍{hotel?.hotelAddress}</h2>
          <h2 className="text-sm">💰 {hotel?.priceRange}</h2>
          <h2 className="text-sm">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

function Hotels({ tripData }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {tripData?.tripData?.hotelOptions?.map((hotel, index) => (
          <HotelCard hotel={hotel} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
