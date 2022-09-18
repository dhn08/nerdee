import React from "react";
import CompanyCard from "./CompanyCard";

const TrustedCompaies = () => {
  return (
    <section className="py-10 border-t border-b">
      <h4 className="text-center text-lg md:text-2xl font-semibold">
        Trusted by companies of all sizes
      </h4>

      <div className="flex justify-center w-10/12 mx-auto md:w-full items-center my-6">
        <CompanyCard src="https://res.cloudinary.com/dplljbrim/image/upload/v1663521681/neerdee/udemy-b1_nlfqrr.svg" />
        <CompanyCard
          src="https://res.cloudinary.com/dplljbrim/image/upload/v1663521681/neerdee/udemy-b2_bt4hqd.svg"
          resize
        />
        <CompanyCard src="https://res.cloudinary.com/dplljbrim/image/upload/v1663521681/neerdee/udemy-b3_y6pgu0.svg" />
        <CompanyCard
          src="https://res.cloudinary.com/dplljbrim/image/upload/v1663521681/neerdee/udemy-b4_xazjac.svg"
          resize
        />
        <CompanyCard src="https://res.cloudinary.com/dplljbrim/image/upload/v1663521681/neerdee/udemy-b5_ot9wpb.svg" />
      </div>
    </section>
  );
};

export default TrustedCompaies;
