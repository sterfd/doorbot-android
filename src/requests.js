export const sendRequest = async (endpoint, token) => {
  try {
    const headers = { Authorization: "Bearer " + token };
    if (endpoint === "checkIn") {
      const rcUrl = "https://www.recurse.com/api/v1/";
      const response = await fetch(rcUrl + "profiles/me", {
        method: "GET",
        headers: headers,
      });

      if (response.ok) {
        const profile = await response.json();
        const id = profile.id;

        //   const checkInResponse = await fetch(rcUrl + "hub_visits/" + id)
        // get id from profiles
        // patch check in
      }
    } else {
      let method = "POST";
      if (endpoint === "status_mobile") {
        method = "GET";
      }
      const url = "https://doorbot.recurse.com/";
      const response = await fetch(url + endpoint, {
        method: method,
        headers: headers,
      });

      if (response.ok) {
        const data = await response.text();
        console.log("Response data: ", data);
        return { message: data };
      } else {
        console.log("Failed to send request: ", response.status);
        throw new Error("Failed to send request");
      }
    }
  } catch (e) {
    console.error("Eorr sending post", e);
    throw e;
  }
};
