export const SelectTravelList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole travels in exploration",
    icon: "👤",
    people: "1 People",
  },
  {
    id: 2,
    title: "Couple",
    desc: "Traveling with your significant other",
    icon: "💑",
    people: "2 Peoples",
  },
  {
    id: 3,
    title: "Family",
    desc: "A fun family trip with kids",
    icon: "👨‍👩‍👧‍👦",
    people: "3 to 5 Peoples",
  },
  {
    id: 4,
    title: "Group",
    desc: "Traveling with friends or colleagues",
    icon: "👥",
    people: "5 to 10 Peoples",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Economy",
    desc: "Budget-friendly options for cost-conscious travelers",
    priceRange: "$500 - $1,500",
    icon: "💰",
  },
  {
    id: 2,
    title: "Standard",
    desc: "Balanced options for a comfortable trip",
    priceRange: "$1,500 - $3,000",
    icon: "🛫",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Premium options for a lavish experience",
    priceRange: "$3,000+",
    icon: "🏝️",
  },
];

// export const AI_PROMT = `Generate Travel Plan for Location : {location} for {days} Days for {travelWith} with a {budget} budget Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each Of the location for 3 days with each day plan with best time to visit in JSON format`;

export const AI_PROMT = `You are an expert travel agent. Your task is to generate a comprehensive travel plan for a trip based on the provided parameters.

**YOU MUST** return the entire output as a single, valid JSON object. **DO NOT** include any conversational text, explanations, or commentary outside of the JSON structure.

Use the exact keys and structure provided in the JSON Schema below.

**Parameters:**
1.  **Location:** {location}
2.  **Duration:** {days} Days
3.  **Travelers:** {travelWith}
4.  **Budget Level:** {budget} (e.g., Luxury, Standard, Economy)

---

**JSON Schema:**

\`\`\`json
{
  "tripDetails": {
    "location": "string",
    "durationDays": "integer",
    "travelers": "string",
    "budgetLevel": "string"
  },
  "hotelOptions": [
    {
      "hotelName": "string",
      "hotelAddress": "string",
      "priceRange": "string (e.g., $150-$250 per night)",
      "hotelImageUrl": "URL",
      "geoCoordinates": {
        "latitude": "number",
        "longitude": "number"
      },
      "rating": "number (1.0 to 5.0)",
      "description": "string"
    }
      // MAX 10 ITEMS TOTAL IN THIS ARRAY
  ],
  "itinerary": [
    {
      "dayNumber": "integer (1, 2, 3, etc.)",
      "dayTheme": "string (e.g., Historical Sites, Local Cuisine)",
      "plan": [
        {
          "placeName": "string",
          "placeDetails": "string (short description of the place)",
          "placeImageUrl": "URL",
          "geoCoordinates": {
            "latitude": "number",
            "longitude": "number"
          },
          "ticketPricing": "string (e.g., $20 or 'Free')",
          "rating": "number (1.0 to 5.0)",
          "bestTimeVisit": "string (e.g., Morning, 10:00 AM - 1:00 PM)",
          "timeRequired": "string (e.g., 2 hours)"
        }
          // MAX 4 ITEMS TOTAL IN THIS ARRAY
      ]
    }
  ]
}
\`\`\``;
