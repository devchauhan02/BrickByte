import React, { useContext, useState } from "react";
import SearchBar from "../component/SearchBar";
import useProperties from "../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../component/PropertyCard";
import UserDetailContext from "../context/UserDetailContext";

const Favourites = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");
  const {
    userDetail: { favourites },
  } = useContext(UserDetailContext);

  console.log(data);

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  const filteredFavorites = data.residencies.filter((property) =>
    favourites.includes(property.id)
  ).filter(
    (property) =>
      property.title.toLowerCase().includes(filter.toLowerCase()) ||
      property.city.toLowerCase().includes(filter.toLowerCase()) ||
      property.country.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
        <SearchBar filter={filter} setFilter={setFilter} />

        {favourites.length === 0 ? (
          <div className="text-center text-xl text-gray-500">
            <p>No favorites added yet. Add some to see them here!</p>
          </div>
        ) : (
          <div className="w-full flex flex-wrap justify-center gap-6">
            {filteredFavorites.length === 0 ? (
              <div className="text-center text-xl text-gray-500">
                <p>No favorites match your search criteria.</p>
              </div>
            ) : (
              filteredFavorites.map((card, i) => (
                <PropertyCard card={card} key={i} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
