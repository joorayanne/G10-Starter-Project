import React from "react";
import Image from "next/image";
import logo from "../../../public/logo.png";
interface NavbarProps {
  currentPage: "applications" | "users" | "cycles" | "analytics";
}

const Navbar: React.FC<NavbarProps> = ({ currentPage }) => {
  return (
    <nav className="bg-white shadow-md px-32 py-3 flex justify-between items-center">
      <Image src={logo} width={120} height={24} alt="A2SV Logo" />

      <ul className="flex space-x-12">
        {["applications", "users", "cycles", "analytics"].map((page) => (
          <li
            key={page}
            className={`capitalize text-gray-600 hover:text-gray-900 cursor-pointer hover:underline underline-offset-8 ${
              currentPage === page
                ? "underline underline-offset-8 text-black font-semibold"
                : ""
            }`}
          >
            {page}
          </li>
        ))}
      </ul>

      <ul className="flex space-x-6">
        <li className="text-gray-600 hover:text-gray-900 cursor-pointer hover:underline underline-offset-8">
          Admin User
        </li>
        <li className="text-gray-600 hover:text-gray-900 cursor-pointer hover:underline underline-offset-8">
          Logout
        </li>
      </ul>
    </nav>
  );
};

// import React from "react";
// import Image from "next/image";
// import logo from "../../../public/logo.png";

// const Navbar: React.FC = () => {
//   return (
//     <nav className="bg-white shadow-md px-32 py-3 flex justify-between place-items-center">
//       <Image src={logo} width={120} height={24} alt="A2SV Logo" />
//       <ul className="flex space-x-12 ">
//         <li className="text-gray-600 hover:text-gray-900 hover:underline underline-offset-8 cursor-pointer">
//           Applications
//         </li>
//         <li className="text-gray-600 hover:text-gray-900 hover:underline underline-offset-8  cursor-pointer">
//           Users
//         </li>
//         <li className="text-gray-600 hover:text-gray-900 hover:underline underline-offset-8 cursor-pointer">
//           Cycles
//         </li>
//         <li className="text-gray-600 hover:text-gray-900 hover:underline underline-offset-8 cursor-pointer">
//           Analytics
//         </li>
//       </ul>
//       <ul className="flex space-x-6">
//         <li className="text-gray-600 hover:text-gray-900 hover:underline underline-offset-8 cursor-pointer">
//           Admin User
//         </li>
//         <li className="text-gray-600 hover:text-gray-900 hover:underline underline-offset-8 cursor-pointer">
//           Logout
//         </li>
//       </ul>
//     </nav>
//   );
// };

export default Navbar;
