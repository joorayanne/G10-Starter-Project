import Link from "next/link";
import Footer from "../../components/common/footer";
import NavBar from "../../components/common/NavBar";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="bg-[#F3F4F6] min-h-screen">
      {/* Header */}
      <NavBar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section
          className="relative h-[50vh] sm:h-[55vh] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/images/student_background.png')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 w-full max-w-3xl px-4 sm:px-6 md:px-20 text-white text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Forge Your Future in Tech
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6">
              Join an elite community of Africa&apos;s brightest minds, and get
              fast-tracked to a software engineering career at the world&apos;s
              leading tech companies.
            </p>
            <Link href="/signin">
              <button className="px-4 py-2 sm:px-6 sm:py-3 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA] transition text-sm sm:text-base">
                Start Your Application
              </button>
            </Link>
          </div>
        </section>

        {/* Trusted By Logos */}
        <section className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 py-6 bg-[#F3F4F6] px-4">
          <Image
            src="/images/google.svg"
            alt="Google"
            width={140}
            height={50}
            className="object-contain w-[120px] sm:w-[140px] md:w-[180px]"
          />
          <Image
            src="/images/amazon.svg"
            alt="Amazon"
            width={140}
            height={50}
            className="object-contain w-[120px] sm:w-[140px] md:w-[180px]"
          />
        </section>

        {/* Journey Section */}
        <section className="py-12 px-4 sm:px-6 md:px-20 bg-white">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Your Journey to Silicon Valley
          </h2>
          <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
            A proven path from learning to leadership
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow hover:shadow-md transition flex items-start">
              <Image
                src="/images/phase1.svg"
                alt="Screening Icon"
                width={40}
                height={40}
                className="mr-2 sm:mr-1.5"
              />
              <div>
                <h3 className="text-base sm:text-[16.5px] font-semibold mb-2">
                  Phase 1: Foundations
                </h3>
                <p className="text-gray-600 text-sm sm:text-[15px]">
                  Master data structures, algorithms, and problem-solving
                  techniques in an intensive 3-month bootcamp.
                </p>
              </div>
            </div>
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow hover:shadow-md transition flex items-start">
              <Image
                src="/images/phase2.svg"
                alt="Bootcamp Icon"
                width={40}
                height={40}
                className="mr-2"
              />
              <div>
                <h3 className="text-base sm:text-[16.5px] font-semibold mb-2">
                  Phase 2: Real-world Projects
                </h3>
                <p className="text-gray-600 text-sm sm:text-[15px]">
                  Apply your skills to build complex projects, collaborate in
                  teams, and prepare for technical interviews.
                </p>
              </div>
            </div>
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow hover:shadow-md transition flex items-start">
              <Image
                src="/images/phase3.svg"
                alt="Mentorship Icon"
                width={40}
                height={40}
                className="mr-2 sm:mr-4"
              />
              <div>
                <h3 className="text-base sm:text-[16.5px] font-semibold mb-2">
                  Phase 3: Internship Placement
                </h3>
                <p className="text-gray-600 text-sm sm:text-[15px]">
                  We help you secure internships at top global tech companies to
                  gain invaluable experience.
                </p>
              </div>
            </div>
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow hover:shadow-md transition flex items-start">
              <Image
                src="/images/phase4.svg"
                alt="Employment Icon"
                width={40}
                height={40}
                className="mr-2 sm:mr-4"
              />
              <div>
                <h3 className="text-base sm:text-[16.5px] font-semibold mb-2">
                  Phase 4: Full-Time Conversion
                </h3>
                <p className="text-gray-600 text-sm sm:text-[15px]">
                  Excel in your internship and convert it into a full-time
                  offer, launching your global career.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-20 bg-[#F3F4F6]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center max-w-5xl mx-auto">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Built by Engineers, for Engineers
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mb-6">
                A2SV is not just a program; it is a community. We are on a
                mission to identify Africa&apos;s most brilliant minds and
                provide them with resources, mentorship, and opportunities to
                solve humanity&apos;s greatest challenges.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <Image
                src="/images/team_meeting.svg"
                alt="Engineers Illustration"
                width={300}
                height={240}
                className="object-contain w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px]"
              />
            </div>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 md:px-20 bg-gray-50">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
            Hear From Our Alumni
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between h-full">
              <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                &quot;A2SV completely changed the trajectory of my career. The
                training is intense, but the community and the opportunities are
                unparalleled. I&apos;m now at my dream company, and I owe it all
                to A2SV.&quot;
              </p>
              <div className="flex items-center">
                <Image
                  src="/images/mosh.png"
                  alt="Abel Tadesse"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="ml-2 sm:ml-4 leading-tight">
                  <h3 className="font-semibold text-base sm:text-lg">Abel Tadesse</h3>
                  <span className="text-xs sm:text-sm text-gray-500">
                    Software Engineer @ Google
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between h-full">
              <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                &quot;The problem-solving skills I learned at A2SV are
                invaluable. The mentors push you to be your best and you&apos;re
                surrounded by people who are just as passionate as you
                are.&quot;
              </p>
              <div className="flex items-center">
                <Image
                  src="/images/angela.svg"
                  alt="Bethlehem Tadesse"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="ml-2 sm:ml-4 leading-tight">
                  <h3 className="font-semibold text-base sm:text-lg">Bethlehem Tadesse</h3>
                  <span className="text-xs sm:text-sm text-gray-500">
                    Software Engineer, Amazon
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between h-full">
              <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                &quot;A2SV is more than a bootcamp. It&apos;s a family that
                supports you long after you&apos;ve graduated. The network you
                build here is for life.&quot;
              </p>
              <div className="flex items-center">
                <Image
                  src="/images/angela2.svg"
                  alt="Caleb Alemayehu"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="ml-2 sm:ml-4 leading-tight">
                  <h3 className="font-semibold text-base sm:text-lg">Caleb Alemayehu</h3>
                  <span className="text-xs sm:text-sm text-gray-500">
                    Software Engineer, Palantir
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#4338CA] py-12 sm:py-16">
          <div className="px-4 sm:px-6 md:px-20 text-center">
            <h3 className="font-semibold text-white text-xl sm:text-2xl mb-4">
              Ready to Change Your Life?
            </h3>
            <p className="text-sm sm:text-[15px] text-center text-[#C7D2FE] mb-6">
              The next application cycle is now open. Take the first step towards
              your dream career.
            </p>
            <div className="flex justify-center">
              <Link
                href="/signin"
                className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-blue-500 rounded-md transition hover:bg-gray-100 text-sm sm:text-base"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}