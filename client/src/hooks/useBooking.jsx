import { useQuery } from "react-query";
import { getAllBookings } from "../utils/api";
import { useAuth0 } from "@auth0/auth0-react";

const useBookings = () => {
  const { user } = useAuth0();
  const token = localStorage.getItem("token");

  return useQuery(["bookings", user?.email], () =>
    getAllBookings(user?.email, token)
  );
};

export default useBookings;
