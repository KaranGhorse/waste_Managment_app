export const getAddressFromCoords = async (lat, lng) => {
    console.log(lat,lng);
    
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "MyReactNativeAppwaste/1.0"
      }
    });

    const data = await response.json();
    console.log(data);
    let address = `${data.address.residential}, ${data.address.city}`;
    return {fullAddress: data.display_name,address};

  } catch (error) {
    console.log("Address fetch error:", error);
  }
};