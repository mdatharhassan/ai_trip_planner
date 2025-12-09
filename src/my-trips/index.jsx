import { db } from "@/services/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigation("/");
      return;
    }
    const q = query(
      collection(db, "aiTrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnap = await getDocs(q);
    const trips = [];
    querySnap.forEach((doc) => {
      trips.push({ id: doc.id, ...doc.data() });
    });

    setUserTrips(trips);
  };
  useEffect(function () {
    getUserTrips();
  }, []);
  console.log(userTrips);

  return (
    <div className="sm:px-10 md:px-32  lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trip</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {userTrips.length > 0
          ? userTrips.map((trip) => (
              <UserTripCardItem key={trip.id} trip={trip} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default MyTrips;
