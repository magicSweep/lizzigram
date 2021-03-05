import { useEffect } from "react";
import { herokuPingUrl } from "../../config";
import { get } from "../../utils/Fetch";

export const useHerokuPing = () => {
  useEffect(() => {
    get(herokuPingUrl)
      .then((res) => console.log("SUCCESS PING HEROKU"))
      .catch((err) => console.error("ERROR PING HEROKU", err));
  }, []);
};
