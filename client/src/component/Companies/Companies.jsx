import React from "react";

const Companies = () => {
  return (
    <section className="flex justify-center items-center py-8">
      <div className="flex justify-around gap-33 max-w-screen-lg px-4">
        <img src="./prologis.png" alt="Prologis" className="w-36" />
        <img src="./tower.png" alt="Tower" className="w-36 h-23" />
        <img src="./equinix.png" alt="Equinix" className="w-36 h-25" />
        <img src="./realty.png" alt="Realty" className="w-36 h-22" />
      </div>
    </section>
  );
};

export default Companies;
