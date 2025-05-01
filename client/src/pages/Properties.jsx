import React, { useState } from "react";
import SearchBar from "../component/SearchBar";
import useProperties from "../hooks/useProperties";
import PuffLoader from "react-spinners/PuffLoader";
import PropertyCard from "../component/PropertyCard";

const Properties = () => {
  const { data, isLoading, isError } = useProperties();
  const [filter, setFilter] = useState("");

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-4 ">
        <PuffLoader color="#36d7b7" height={80} width={80} radius={1} aria-label="Loading..." />
      </div>
    );

  if (isError)
    return <div className="flex justify-center mt-4">Error while fetching data</div>;

  // Filter properties based on filter text (title, city, country)
  const filteredProperties = data.residencies.filter((property) =>
    property.title.toLowerCase().includes(filter.toLowerCase()) ||
    property.city.toLowerCase().includes(filter.toLowerCase()) ||
    property.country.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-[80%] mx-auto">
      <div className="flex justify-center mt-4">
        <SearchBar filter={filter} setFilter={setFilter} />
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-20">
        {filteredProperties.map((card, i) => (
          <PropertyCard card={card} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Properties;
