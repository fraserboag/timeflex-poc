import { useState, useEffect } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 700) setIsMobile(true);
      if (window.innerWidth > 700) setIsMobile(false);
    });
  }, []);

  return isMobile;
};
