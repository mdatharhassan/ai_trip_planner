const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export const getPlaceData = async (data) => {
  console.log(data);

  const res = await fetch(
    `${BASE_URL}?q=${data.textQuery}&session_token=${
      data.sessiontoken
    }&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`
  );

  return await res.json();
};
