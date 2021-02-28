import { useState, useEffect } from "react";

export const useShowOnDidMount = () => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setIsShow(true);
  }, []);

  return isShow;
};
