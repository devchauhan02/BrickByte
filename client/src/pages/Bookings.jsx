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

  const bookedProperties = data?.residencies?.filter((res) =>
    bookings?.map((b) => b.id).includes(res.id)
  ) || [];

  return (
    <div className="p-8">
      <h1 className="text-2xl text-center font-bold mb-4">Your Bookings</h1>
      {bookedProperties.length === 0 ? (
        <p className="text-center ">No bookings found. Add Bookings to see them here</p>
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
