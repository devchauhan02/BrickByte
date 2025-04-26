import { useEffect, useState } from "react";

const useHeaderColor = () => {
  const [headerColor, setHeaderColor] = useState("#000000");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setHeaderColor("rgba(0, 0, 0, 0.8)");
      } else {
        setHeaderColor("#000000");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return headerColor;
};

export default useHeaderColor;
