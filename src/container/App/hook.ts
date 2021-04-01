import { useContext, useEffect } from "react";
import { useAuth } from "../../auth/hook/useAuth";
import { useAuthSubscribe } from "../../auth/hook/useAuthSubscribe";
import { herokuPingUrl } from "../../config";
import { NumberOfPhotosPerQueryContext } from "../../provider/NumberOfPhotosPerQuery";
import { get } from "../../utils/Fetch";

export const useHerokuPing = () => {
  useEffect(() => {
    get(herokuPingUrl)
      .then((res) => console.log("SUCCESS PING HEROKU"))
      .catch((err) => console.error("ERROR PING HEROKU", err));
  }, []);
};

export const useApp = () => {
  const numberOfPhotosPerQuery = useContext(NumberOfPhotosPerQueryContext);

  // AWAKE HEROKU
  useHerokuPing();

  useAuthSubscribe();

  const { user, loading } = useAuth();

  return { user, loading, numberOfPhotosPerQuery };
};
