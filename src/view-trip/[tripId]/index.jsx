import { db } from "@/services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "./components/InfoSection";
import Hotels from "./components/Hotels";
import PlacesToVisit from "./components/PlacesToVisit";
import Footer from "./components/Footer";

function ViewTrip() {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState([]);

  const getTripData = async () => {
    // Fetch trip data from Firestore using the tripId
    // This is a placeholder function; implement actual data fetching logic here
    const docRef = doc(db, "aiTrips", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setTripData(docSnap.data());
    } else {
      toast.error("Trip not found.");
      setTripData([]);
    }
  };

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      <InfoSection tripData={tripData} />
      <Hotels tripData={tripData} />
      <PlacesToVisit tripData={tripData} />
      <Footer tripData={tripData} />
    </div>
  );
}

export default ViewTrip;
