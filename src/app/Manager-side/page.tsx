import React from "react";
import Display from "./Components/Display";
import PageTitle from "./Components/PageTitle";
import AllApplications from "./Components/AllApplications";
import TeamPerformance from "./Components/TeamPerformance";

const data = [
  ["Total Applications", 204],
  ["Under Review", 750],
  ["Interview Stage", 250],
  ["Accepted", 82],
];

const ManagerDashboard = () => {
  return (
    <div className=" py-10 pl-20 pr-10 flex flex-col gap-5">
      <PageTitle title="Manager Dashboard" subtitle="07 November" />

      <div className="  flex gap-4 mt-4 flex-wrap py-5">
        {data.map(([title, amount], index) => (
          <Display key={index} title={title as string} amount={amount as number} />
        ))}
      </div>
      <div className="flex justify-between  mt-4 flex-wrap">
        <AllApplications />
        <TeamPerformance />
      </div>
    </div>
  );
};

export default ManagerDashboard;
