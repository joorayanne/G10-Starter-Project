import React from "react";
import Display from "../../components/Manager/Display";
import PageTitle from "../../components/Manager/PageTitle";
import AllApplications from "../../components/Manager/AllApplications";
import TeamPerformance from "../../components/Manager/TeamPerformance";

const data = [
  ["Total Applications", 8],
  ["Under Review", 4],
  ["Interview Stage", 0],
  ["Accepted", 2],
];

const ManagerDashboard = () => {
  return (
    <div className="   flex flex-col gap-5">
      <PageTitle title="Manager Dashboard" subtitle="07 November" />

      <div className="  flex gap-4 mt-4 flex-wrap py-5">
        {data.map(([title, amount], index) => (
          <Display
            key={index}
            title={title as string}
            amount={amount as number}
          />
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
