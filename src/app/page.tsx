import Image from "next/image";
import UsersPage from "./admin/users/page";
import Createuser from "./admin/Create-user/page";
import AnalyticsPage from "./admin/analytics/page";

export default function Home() {
  return (
    <div>
      <UsersPage />
    </div>
  );
}
