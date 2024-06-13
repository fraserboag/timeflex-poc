import { useState, useEffect } from "react";

export const useTimelineHeight = (zoomLevel, intervalsPerDay) => {
  const [height, setHeight] = useState();

  useEffect(() => {
    if (zoomLevel > 1) {
      setHeight((zoomLevel - 1) * 25 * intervalsPerDay);
    } else {
      setHeight();
    }
  }, [zoomLevel]);

  return height;
};
