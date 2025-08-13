import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#1D2B3A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Tagline */}
          <div className="space-y-4 mx-auto md:ml-8">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Image
                src="/images/aastu-footer-logo.svg"
                alt="A2SV Logo"
                width={120}
                height={36}
                className="w-28 h-auto sm:w-32 md:w-36"
              />
            </div>
            <p className="text-gray-400 text-sm sm:text-base max-w-xs text-center md:text-left">
              Preparing Africa&apos;s top tech talent for global opportunities.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <h3 className="text-gray-200 font-semibold uppercase tracking-wider mb-3 text-center sm:text-left">
                Solutions
              </h3>
              <ul className="space-y-2 text-center sm:text-left">
                <li>
                  <a
                    href="https://a2sv.org/"
                    className="text-gray-400 hover:text-white"
                  >
                    Student Training
                  </a>
                </li>
                <li>
                  <a
                    href="https://a2sv.org/"
                    className="text-gray-400 hover:text-white"
                  >
                    Corporate Partnership
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-200 font-semibold uppercase tracking-wider mb-3 text-center sm:text-left">
                Support
              </h3>
              <ul className="space-y-2 text-center sm:text-left">
                <li>
                  <a
                    href="https://a2sv.org/"
                    className="text-gray-400 hover:text-white"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://a2sv.org/"
                    className="text-gray-400 hover:text-white"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-200 font-semibold uppercase tracking-wider mb-3 text-center sm:text-left">
                Company
              </h3>
              <ul className="space-y-2 text-center sm:text-left">
                <li>
                  <a
                    href="https://a2sv.org/"
                    className="text-gray-400 hover:text-white"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="https://a2sv.org/"
                    className="text-gray-400 hover:text-white"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-200 font-semibold uppercase tracking-wider mb-3 text-center sm:text-left">
                Legal
              </h3>
              <ul className="space-y-2 text-center sm:text-left">
                <li>
                  <a
                    href="https://a2sv.org/"
                    className="text-gray-400 hover:text-white"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="https://a2sv.org/"
                    className="text-gray-400 hover:text-white"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-gray-700 pt-3 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            © 2023 A2SV. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
