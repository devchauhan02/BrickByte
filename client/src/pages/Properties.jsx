import React from "react";
import SearchBar from "../component/SearchBar";
import useProperties from "../hooks/useProperties";
import PuffLoader from "react-spinners/PuffLoader";
import PropertyCard from "../component/PropertyCard";

const Properties = () => {
  const { data, isLoading, isError } = useProperties();
  if (isLoading) return <div className="flex justify-center items-center mt-4 "><PuffLoader color="#36d7b7" height={80} width={80} radius={1} aria-label="Loading..." /></div>;
  if (isError) return <div className="flex justify-center mt-4">Error while fetching data</div>;
  
  return (
    <div className="flex flex-col items-center w-[80%] mx-auto">
      <div className="flex justify-center mt-4">
        <SearchBar />
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-20">{
        data.residencies.map((card, i) => (
          <PropertyCard card={card} key={i} />
        ))
      }
      </div>
    </div>
  );
};

export default Properties;
