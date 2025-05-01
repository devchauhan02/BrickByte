import React, { useContext, useEffect } from "react";
import UserDetailContext from "../context/UserDetailContext";
import useProperties from "../hooks/useProperties";
import PropertyCard from "../component/PropertyCard";

const Bookings = () => {
  const {
    userDetail: { bookings },
    setUserDetail, 
  } = useContext(UserDetailContext);

  const { data, isLoading, isError } = useProperties();

  // Ensure bookings is loaded from localStorage if not available in context
  useEffect(() => {
    const storedUserDetail = JSON.parse(localStorage.getItem("userDetail"));
    if (storedUserDetail && storedUserDetail.bookings) {
      setUserDetail((prev) => ({
        ...prev,
        bookings: storedUserDetail.bookings,
      }));
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading properties</div>;

  // Safely filter booked properties
  const bookedProperties = data?.residencies?.filter((res) =>
    bookings?.map((b) => b.id).includes(res.id)
  ) || [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
      {bookedProperties.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {bookedProperties.map((card) => (
            <PropertyCard card={card} key={card.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
