import resources from "../../resources/resources";
import axios from "axios";

export default async function getWishList(access_token, setState) {
  let headers = {
    headers: {
      apitoken: access_token,
    },
  };

  try {
    let results = await axios.post(
      resources.config["monitoringEndpoint"] + "/get-wishlist",
      {},
      headers
    );

    setState(results["data"]["data"]);
  } catch (e) {}
}
