const getDirections = async (
  from: string,
  to: string,
  travelMode: google.maps.TravelMode = google.maps.TravelMode.DRIVING,
) => {
  const { route } = new google.maps.DirectionsService();
  try {
    const result = await route({ origin: from, destination: to, travelMode });
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getDirections;
