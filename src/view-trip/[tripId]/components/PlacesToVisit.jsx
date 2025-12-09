import { Link } from "react-router-dom";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ tripData }) {
  console.log(tripData);
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {tripData?.tripData?.itinerary?.map((item, index) => (
          <div>
            <h2 className="font-medium text-lg">Day {item.dayNumber}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {item.plan.map((place, index) => (
                <div className="">
                  <h2 className="font-medium text-sm bg-white rounded-2xl px-4">
                    {place?.bestTimeVisit}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
