import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/options";
import { SearchBox } from "@mapbox/search-js-react";
import { Autocomplete, GoogleMap, LoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { chat } from "@/services/AIModal.jsx";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { db } from "@/services/firebaseConfig";
import { Loader2 } from "lucide-react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const onLoad = (ref) => {
  //   setPlace(ref);
  //   console.log("autocomplete: ", ref);
  // };
  // const onPlaceChanged = () => {
  //   if (place !== undefined) {
  //     const location = place.getPlace().formatted_address;
  //     console.log(location);
  //     handleInputChange("location", location);
  //   }
  // };

  const handleInputChange = (name, value) => {
    name === "days" && value > 5 && alert("Please enter a maximum of 5 days");
    setFormData({ ...formData, [name]: value });
  };

  // useEffect(() => {
  //  // console.log(formData);
  // }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (res) => getUserProfile(res),
    onError: (err) => console.log("Login Failed:", err),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      (formData?.days > 5 && !formData?.days) ||
      !formData?.budget ||
      !formData?.location ||
      !formData?.travelWith
    ) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }
    // console.log(formData);
    setLoading(true);
    const PROMPT = AI_PROMT.replace("{location}", formData?.location)
      .replace("{days}", formData?.days)
      .replace("{travelWith}", formData?.travelWith)
      .replace("{budget}", formData?.budget);
    console.log(PROMPT);
    const result = await chat(PROMPT);
    console.log(result);
    const text = result.text.replace(/```json|```/g, "");
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) {
      throw new Error("No JSON found in response");
    }
    const cleaned = text.substring(start, end + 1).trim();
    setLoading(false);
    saveAITrip(cleaned);
    toast.success("Trip Generated Successfully!");
  };

  const saveAITrip = async (tripData) => {
    console.log(tripData);

    setLoading(true);
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User Email:", user?.email);
    // Add a new document in collection "aiTrips"
    await setDoc(doc(db, "aiTrips", docId), {
      id: docId,
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user?.email,
    });
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  const getUserProfile = async (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log("User Profile:", res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        onGenerateTrip();
        setOpenDialog(false);
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72  px-5 mt-10">
      <h2 className="text-3xl font-bold">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinery based on your preferences 🏕️ 🌴
      </p>
      <div className="mt-20 flex flex-col gap-0">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is the destination of choice?
          </h2>
          {/* <GooglePlacesAutocomplete
            // apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            selectProps={{
              placeholder: "Enter a location",
              place,
              onChange: (value) => {
                setPlace(value);
                handleInputChange("location", value);
              },
            }}
          /> */}
          {/* <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={["places"]}
          >
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <Input
                placeholder="Enter a location"
                value={formData.location || ""}
                />
                </Autocomplete>
                </LoadScript> */}

          <SearchBox
            accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || ""}
            options={{
              language: "en",
            }}
            placeholder="Enter a location"
            onRetrieve={(res) => {
              console.log("Selected:", res);
              setPlace(res);
              handleInputChange("location", res.features[0].properties.name);
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Ex.3"
            type="number"
            onChange={(e) => handleInputChange("days", e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", option.title)}
              className={`border p-4 rounded-lg mb-5 cursor-pointer
                ${
                  formData?.budget === option.title
                    ? "border-black shadow-lg"
                    : "hover:shadow-lg"
                }
                `}
            >
              <h2 className="text-4xl font-semibold mb-2">{option.icon}</h2>
              <h2 className="font-bold text-lg">{option.title}</h2>
              <h2 className="text-sm text-gray-500">{option.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelList.map((option, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("travelWith", option.people)}
              className={`border p-4 rounded-lg mb-5 cursor-pointer hover:shadow-md
                ${
                  formData?.travelWith === option.people
                    ? "border-black shadow-lg"
                    : "hover:shadow-lg"
                }
                `}
            >
              <h2 className="text-4xl font-semibold mb-2">{option.icon}</h2>
              <h2 className="font-bold text-lg">{option.title}</h2>
              <h2 className="text-sm text-gray-500">{option.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button onClick={onGenerateTrip} disabled={loading}>
          {loading ? (
            <Loader2 className=" size-6 animate-spin" />
          ) : (
            " Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.png" className="size-15" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button
                className="w-full mt-5"
                onClick={login}
                disabled={loading}
              >
                <FcGoogle className="size-6" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
