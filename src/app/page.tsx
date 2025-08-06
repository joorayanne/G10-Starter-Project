import Image from "next/image";
import UsersPage from "../app/(admin)/users/page";
import Createuser from "../app/(admin)/CreateUser/page";
import AnalyticsPage from "./(admin)/analytics/page";

export default function Home() {
  return (
    <div>
      <UsersPage />
    </div>
  );
}
