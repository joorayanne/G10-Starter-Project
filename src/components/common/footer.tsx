import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#1D2B3A] text-white border-t-4 border-blue-500">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo and Tagline Section */}
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
                <Image
                  src="./image/aastu-footer-logo.svg"
                    alt="A2SV Logo"
                    width={50}
                    height={50} 
                />
        
            </div>
            <p className="text-gray-400 text-base max-w-xs">
              Preparing Africa &apos;s top tech talent for global opportunities.
            </p>
          </div>

          {/* Links Section */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8 col-span-2">
                
                {/* Solutions Links */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                    Solutions
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-white">
                        Student Training
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-white">
                        Corporate Partnership
                      </a>
                    </li>
                  </ul>
                </div>
                
                {/* Support Links */}
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                    Support
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-white">
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-white">
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8 col-span-2">

                {/* Company Links */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                    Company
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-white">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-white">
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>
                
                {/* Legal Links */}
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                    Legal
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-white">
                        Privacy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-400 hover:text-white">
                        Terms
                      </a>
                    </li>
                  </ul>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            © 2023 A2SV. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;