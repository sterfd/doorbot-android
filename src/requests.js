export const sendRequest = async (endpoint, token) => {
  try {
    const headers = { Authorization: "Bearer " + token };
    if (endpoint === "checkIn") {
      const rcURL = "https://www.recurse.com/api/v1/";
      const response = await fetch(rcURL + "profiles/me", {
        method: "GET",
        headers: headers,
      });

      if (response.ok) {
        const profile = await response.json();
        const id = profile.id;
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        const checkInResponse = await fetch(
          rcURL + `hub_visits/${id}/${formattedDate}`,
          {
            method: "PATCH",
            headers: headers,
          }
        );
        if (checkInResponse.ok) {
          const checkInData = await checkInResponse.text();
          console.log("Check in response data: ", checkInData);
          return { message: "Checked into the hub!" };
        } else {
          console.log("Failed to send request: ", checkInResponse.status);
          throw new Error("Failed to send request");
        }
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
