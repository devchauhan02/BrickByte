import React, { useContext, useEffect, useState } from "react";
import UserDetailContext from "../context/UserDetailContext";
import useProperties from "../hooks/useProperties";
import PropertyCard from "../component/PropertyCard";
import PuffLoader from "react-spinners/PuffLoader";
import SearchBar from "../component/SearchBar"; 

const Bookings = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { data, isLoading, isError } = useProperties();

  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const storedUserDetail = JSON.parse(localStorage.getItem("userDetail"));
    if (storedUserDetail && storedUserDetail.bookings) {
      setUserDetail((prev) => ({
        ...prev,
        bookings: storedUserDetail.bookings,
      }));
    }
  }, [setUserDetail]);

  useEffect(() => {
    if (data?.residencies && userDetail?.bookings) {
      const bookedProperties = data.residencies.filter((property) =>
        userDetail.bookings.map((booking) => booking.id).includes(property.id)
      );
      setFilteredBookings(bookedProperties);
    }
  }, [data, userDetail]);

 
  const searchFiltered = filteredBookings.filter((property) =>
    property.title.toLowerCase().includes(filter.toLowerCase()) ||
    property.city.toLowerCase().includes(filter.toLowerCase()) ||
    property.country.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-4">
        <PuffLoader color="#36d7b7" height={80} width={80} radius={1} aria-label="Loading..." />
      </div>
    );

  if (isError)
    return <div className="flex justify-center mt-4">Error loading properties</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl text-center font-bold mb-4">Your Bookings</h1>

      <div className="flex justify-center mb-4">
        <SearchBar filter={filter} setFilter={setFilter} />
      </div>

      {searchFiltered.length === 0 ? (
        <p className="text-center">No bookings found. Add Bookings to see them here.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {searchFiltered.map((property) => (
            <PropertyCard card={property} key={property.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
