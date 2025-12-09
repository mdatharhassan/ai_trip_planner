async function getPlacePhoto(place) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${place}&client_id=${
      import.meta.env.VITE_UNPLASH_ACCESS_KEY
    }`
  );
  const data = await res.json();
  return data.results[0]?.urls?.regular;
}

export default getPlacePhoto;

// // This function would run on your server (e.g., Firebase Function or Node.js backend)

// import axios from 'axios'; // Or use the native 'fetch' API

// // Replace this with your actual Unsplash Access Key stored securely
// const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
// const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

// /**
//  * Searches Unsplash for an image based on the search query.
//  * @param {string} hotelName - The name of the hotel (e.g., "The Grand Hyatt New York").
//  * @returns {string | null} The URL of the found image, or null on failure.
//  */
// async function getHotelImageUrl(hotelName) {
//   // Enhance the query for better results
//   const searchQuery = `${hotelName} hotel exterior`;

//   try {
//     const response = await axios.get(`${UNSPLASH_BASE_URL}/search/photos`, {
//       params: {
//         query: searchQuery,
//         per_page: 1, // Only need the first result
//         orientation: 'landscape' // Good for UI displays
//       },
//       headers: {
//         // Authentication is done via the Authorization header (recommended)
//         Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
//       }
//     });

//     const results = response.data.results;

//     if (results && results.length > 0) {
//       // The 'regular' URL is a good balance of size and quality
//       const imageUrl = results[0].urls.regular;
//       return imageUrl;
//     } else {
//       return null; // No image found
//     }

//   } catch (error) {
//     console.error(`Error fetching image for ${hotelName}:`, error.message);
//     return null;
//   }
// }

// // --- Example of how to use it with your trip plan data ---
// /*
// async function processTripPlan(geminiJson) {
//   // Assuming 'geminiJson' is the parsed output from the Gemini API
//   const hotelOptions = geminiJson.hotelOptions;

//   for (const hotel of hotelOptions) {
//     const realUrl = await getHotelImageUrl(hotel.hotelName);
//     // Replace the placeholder with the real, working URL
//     hotel.hotelImageUrl = realUrl || 'URL_TO_DEFAULT_FALLBACK_IMAGE';
//   }

//   // Now, send this updated 'geminiJson' to your React UI
//   return geminiJson;
// }
// */
