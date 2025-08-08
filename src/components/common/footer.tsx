import Image from "next/image";
import logo from "../../../public/images/logo.png"

const Footer = () => {
  return (

    <footer className="bg-[#1D2B3A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-9 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Tagline */}
          <div className="space-y-4 ml-16">
            <div className="flex items-center space-x-3 ">
              <Image
                src="/images/aastu-footer-logo.svg"
                alt="A2SV Logo"
                width={135}
                height={40}
              />
            </div>
            <p className="text-gray-400 max-w-sm text-sm">
              Preparing Africa's top tech talent for global opportunities.

            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
            <div>
              <h3 className="text-gray-200 font-semibold uppercase tracking-wider mb-4">
                Solutions
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Student Training
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Corporate Partnership
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-200 font-semibold uppercase tracking-wider mb-4">
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-200 font-semibold uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-200 font-semibold uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2023 A2SV. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
