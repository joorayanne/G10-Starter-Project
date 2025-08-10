import Link from "next/link";
import Footer from "../../components/common/footer";
import NavBar from "../../components/common/NavBar";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="bg-[#F3F4F6]">
      {/* Header */}
      <NavBar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section
          className="relative h-[55vh] flex items-center bg-cover bg-center"
          style={{ backgroundImage: "url('/images/student_background.png')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10 max-w-2xl pl-6 md:pl-20 text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Forge Your Future in Tech
            </h1>
            <p className="text-lg mb-6">
              Join an elite community of Africa&apos;’s brightest minds, and get
              fast-tracked to a software engineering career at the world&apos;’s
              leading tech companies.
            </p>
            <a href="/signin">
              <button className="px-6 py-3 bg-[#4F46E5] text-white rounded-md hover:bg-[#4338CA] transition">
                Start Your Application
              </button>
            </a>
          </div>
        </section>

        {/* Trusted By Logos */}
        <section className="flex justify-center items-center gap-10 py-6 bg-[#F3F4F6]">
          <Image
            src="/images/google.svg"
            alt="Google"
            width={180}
            height={70}
            className="object-contain"
          />
          <Image
            src="/images/amazon.svg"
            alt="Amazon"
            width={180}
            height={70}
            className="object-contain"
          />
        </section>

        {/* Journey Section */}
        <section className="py-12 px-5 md:px-20 bg-white">
          <h2 className="text-3xl font-bold text-center">
            Your Journey to Silicon Valley{" "}
          </h2>
          <p className="text-center text-gray-600 mb-5">
            A proven path from learning to leadership
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition flex items-start">
              <Image
                src="/images/phase1.svg"
                alt="Screening Icon"
                width={48}
                height={48}
                className="mr-1.5"
              />
              <div>
                <h3 className="text-[16.5px] font-semibold mb-4">
                  Phase 1: Foundations
                </h3>

                <p className="text-gray-600 text-[15px]">
                  Master data structures, algorithms,and problem-solving
                  techniques in intensive 3-month bootcamp.
                </p>
              </div>
            </div>
            {/* Card 2: Bootcamp */}
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition flex items-start">
              <Image
                src="/images/phase2.svg"
                alt="Bootcamp Icon"
                width={48}
                height={48}
                className="mr-2"
              />
              <div>
                <h3 className="text-[16.5px] font-semibold mb-2">
                  Phase 2: Real-world Projects
                </h3>

                <p className="text-gray-600 text-[15px]">
                  Apply your skills to build complex projects, collaborate in
                  teams, and prepare for technical interviews.
                </p>
              </div>
            </div>

            {/* Card 3: Mentorship */}
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition flex items-start">
              <Image
                src="/images/phase3.svg"
                alt="Mentorship Icon"
                width={48}
                height={48}
                className="mr-4"
              />
              <div>
                <h3 className="text-[16.5px] font-semibold mb-2">
                  Phase 3: Internship Placement
                </h3>
                <p className="text-gray-600 text-[15px]">
                  We help you secure internships at top global tech companies to
                  gain invaluable experience.
                </p>
              </div>
            </div>

            {/* Card 4: Employment */}
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition flex items-start">
              <Image
                src="/images/phase4.svg"
                alt="Employment Icon"
                width={48}
                height={48}
                className="mr-4"
              />
              <div>
                <h3 className="text-[16.5px] font-semibold mb-2">
                  Phase 4: Full-Time Conversion
                </h3>
                <p className="text-gray-600 text-[15px]">
                  Excel in your internship and convert it into a full-time
                  offer, launching your global career.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 md:px-20 bg-[#F3F4F6]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mx-50 my-20">
            {/* Left Text Content */}
            <div>
              <h2 className="text-[28px] md:text-4xl font-bold mb-4">
                Built by Engineers, for Engineers
              </h2>
              <p className="text-gray-600 mb-6">
                A2SV is not just a program; it is a community. We are on a
                mission to identify Africa&apos;s most brilliant minds and
                provide them with resources, mentorship, and opportunities to
                solve humanity&apos;s greatest challenges.
              </p>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <Image
                src="/images/team_meeting.svg"
                alt="Engineers Illustration"
                width={500}
                height={400}
                className="object-contain"
              />
            </div>
          </div>
        </section>

        <section className="py-16 px-6 md:px-20 bg-gray-50">
          <h2 className="text-[28px] font-bold text-center mb-10">
            Hear From Our Alumni
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Alumni Card Example */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between h-full">
              {/* Testimonial Text */}
              <p className="text-gray-600 mb-6">
                &quot;A2SV completely changed the trajectory of my career. The
                training is intense, but the community and the opportunities are
                unparalleled. I&apos;m now at my dream company, and I owe it all
                to A2SV.&quot;
              </p>

              {/* Bottom Row: Image & Info */}
              <div className="flex items-center">
                {/* Profile Image */}

                <Image
                  src="/images/mosh.png"
                  alt="Sara Kebede"
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />

                {/* Name & Role */}

                <div className="ml-2 leading-none">
                  <h3 className="font-semibold text-lg ">Abel Tadesse</h3>
                  <span className="text-sm text-gray-500">
                    Software Engineer @ Google
                  </span>
                </div>
              </div>
            </div>

            {/* Repeat Cards for Other Alumni... */}

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between h-full">
              {/* Testimonial Text */}
              <p className="text-gray-600 mb-6">
                &quot;The problem-solving skills I learned at A2SV are
                invaluable. The mentors push you to be your best and you&apos;re
                surrounded by people who are just as passionate as you
                are.&quot;
              </p>

              {/* Bottom Row: Image & Info */}
              <div className="flex items-center">
                {/* Profile Image */}
                <Image
                  src="/images/angela.svg"
                  alt="Sara Kebede"
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />

                {/* Name & Role */}
                <div className="ml-2 leading-none">
                  <h3 className="font-semibold text-lg">Bethlehem Tadesse</h3>
                  <span className="text-sm text-gray-500">
                    Software Engineer, Amazon
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between h-full">
              {/* Testimonial Text */}
              <p className="text-gray-600 mb-6">
                &quot;A2SV is more than a bootcamp. It&apos;’s a family that
                supports you long after you&apos;’ve graduated. The network you
                build here is for life.&quot;
              </p>

              {/* Bottom Row: Image & Info */}
              <div className="flex items-center  ">
                {/* Profile Image */}
                <Image
                  src="/images/angela2.svg"
                  alt="Sara Kebede"
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />

                {/* Name & Role */}
                <div className="ml-2 leading-none">
                  <h3 className="font-semibold text-lg">Caleb Alemayehu</h3>
                  <span className="text-sm text-gray-500">
                    Software Engineer, Palantir
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#4338CA] h-64">
          <div className="p-10">
            <h3 className="font-semibold text-white text-2xl text-center pt-5">
              Ready to Change your life?
            </h3>
            <p className="text-[15px] text-center text-[#C7D2FE] pt-2">
              The next application cycle now open. Take the first step towards
              <br></br>
              your dream career
            </p>
            <div className="flex justify-center mt-4">
              <Link
                href="/signin"
                className="px-6 py-3 bg-white text-blue-500 rounded-md transition hover:bg-gray-100"
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