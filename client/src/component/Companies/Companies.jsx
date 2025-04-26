import React from "react";

const Companies = () => {
  return (
    <section className="flex justify-center items-center py-8">
      <div className="flex justify-around gap-35 max-w-screen-lg px-4">
        <img src="./prologis.png" alt="Prologis" className="w-30 h-21" />
        <img src="./tower.png" alt="Tower" className="w-30 h-18" />
        <img src="./equinix.png" alt="Equinix" className="w-30 h-20" />
        <img src="./realty.png" alt="Realty" className="w-30 h-18" />
      </div>
    </section>
  );
};

export default Companies;
