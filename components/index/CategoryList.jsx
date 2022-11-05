import React from "react";
import CategoryCard from "./CategoryCard";

const CategoryList = ({ sectors }) => {
  return (
    <section className="py-10 bg-white px-10">
      <h3 className="text-2xl my-5 font-bold">Top categories</h3>
      <div className="flex flex-wrap">
        {sectors.map((sector) => (
          <CategoryCard key={sector.sector_name} data={sector} />
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
