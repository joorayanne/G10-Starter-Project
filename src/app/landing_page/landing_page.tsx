import Link from "next/link";
import Image from "next/image";
import Footer from "../../components/common/footer";
import NavBar from "../../components/common/NavBar";

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
          style={{ backgroundImage: "url('/image/student_background.png')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10 max-w-2xl pl-6 md:pl-20 text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Forge Your Future in Tech
            </h1>
            <p className="text-lg mb-6">
              Join an elite community of Africa’s brightest minds, and get
              fast-tracked to a software engineering career at the world’s
              leading tech companies.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Start Your Application
            </button>
          </div>
        </section>

        {/* Trusted By Logos */}
        <section className="flex justify-center items-center gap-10 py-6 bg-[#F3F4F6]">
          <Image
            src="/image/google.svg"
            alt="Google"
            width={180}
            height={70}
            className="object-contain"
          />
          <Image
            src="/image/amazon.svg"
            alt="Amazon"
            width={180}
            height={70}
            className="object-contain"
          />
        </section>

        {/* Journey Section */}
        <section className="py-12 px-6 md:px-20 bg-white">
          <h2 className="text-3xl font-bold text-center">
            Your Journey to Silicon Valley{" "}
          </h2>
          <p className="text-center text-gray-600 mb-5">
            A proven path from learning to leadership
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1: Screening */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="flex items-center mb-2">
                <Image
                  src="/image/phase1.svg"
                  alt="Screening Icon"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <h3 className="text-xl font-semibold">Phase 1: Foundations</h3>
              </div>
              <p className="text-gray-600">
                Master data structures, algorithms, and problem-solving
                techniques in an intensive 3-month bootcamp.
              </p>
            </div>

            {/* Card 2: Bootcamp */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="flex items-center mb-2">
                <Image
                  src="/image/phase2.svg"
                  alt="Bootcamp Icon"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <h3 className="text-xl font-semibold">
                  Phase 2: Real-world Projects
                </h3>
              </div>
              <p className="text-gray-600">
                Apply your skills to build complex projects, collaborate in
                teams, and prepare for technical interviews.
              </p>
            </div>

            {/* Card 3: Mentorship */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="flex items-center mb-2">
                <Image
                  src="/image/phase3.svg"
                  alt="Mentorship Icon"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <h3 className="text-xl font-semibold">
                  Phase 3: Internship Placement
                </h3>
              </div>
              <p className="text-gray-600">
                We help you secure internships at top global tech companies to
                gain invaluable experience.
              </p>
            </div>

            {/* Card 4: Employment */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="flex items-center mb-2">
                <Image
                  src="/image/phase4.svg"
                  alt="Employment Icon"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <h3 className="text-xl font-semibold">
                  Phase 4: Full-Time Conversion
                </h3>
              </div>
              <p className="text-gray-600">
                Excel in your internship and convert it into a full-time offer,
                launching your global career.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 md:px-20 bg-[#F3F4F6]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mx-50 my-20">
            {/* Left Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Built by Engineers, for Engineers
              </h2>
              <p className="text-gray-600 mb-6">
                A2SV is not just a program; it's a community. We're on a mission
                to identify Africa's most brilliant minds and provide them with
                resources, mentorship, and opportunities to solve humanity's
                greatest challenges.
              </p>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <Image
                src="/image/team_meeting.svg"
                alt="Engineers Illustration"
                width={500}
                height={400}
                className="object-contain"
              />
            </div>
          </div>
        </section>

        <section className="py-16 px-6 md:px-20 bg-gray-50">
  <h2 className="text-3xl font-bold text-center mb-10">Meet Our Alumni</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Alumni Card Example */}
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between h-full">
      {/* Testimonial Text */}
      <p className="text-gray-600 mb-6">
        "A2SV completely changed the trajectory of my career. The training is intense, but of the community and the opportunities are unparalleled. I'm now at my dream company, and I owe it all to A2SV."
      </p>

      {/* Bottom Row: Image & Info */}
      <div className="flex items-center justify-between">
        {/* Profile Image */}
        <Image
          src="/image/mosh.png"
          alt="Sara Kebede"
          width={50}
          height={50}
          className="rounded-full object-cover"
        />

        {/* Name & Role */}
        <div className="text-right">
          <h3 className="font-semibold text-lg">Abel Tadesse</h3>
          <span className="text-sm text-gray-500">Software Engineer @ Google</span>
        </div>
      </div>
    </div>

    {/* Repeat Cards for Other Alumni... */}

     <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between h-full">
      {/* Testimonial Text */}
      <p className="text-gray-600 mb-6">
        "The problem-solving skills I learned at A2SV are invaluable. The mentors push you to be your best and you're surrounded by people who are just as passionate as you are."
      </p>

      {/* Bottom Row: Image & Info */}
      <div className="flex items-center justify-between">
        {/* Profile Image */}
        <Image
          src="/image/angela.svg"
          alt="Sara Kebede"
          width={50}
          height={50}
          className="rounded-full object-cover"
        />

        {/* Name & Role */}
        <div className="text-right">
          <h3 className="font-semibold text-lg">Bethlehem Tadesse</h3>
          <span className="text-sm text-gray-500">Software Engineer, Amazon</span>
        </div>
      </div>
    </div>

     <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between h-full">
      {/* Testimonial Text */}
      <p className="text-gray-600 mb-6">
        "A2SV is more than a bootcamp. It's a family that supports you long after you've graduated. The network you build here is for life."
      </p>

      {/* Bottom Row: Image & Info */}
      <div className="flex items-center justify-between">
        {/* Profile Image */}
        <Image
          src="/image/angela2.svg"
          alt="Sara Kebede"
          width={50}
          height={50}
          className="rounded-full object-cover"
        />

        {/* Name & Role */}
        <div className="text-right">
          <h3 className="font-semibold text-lg">Caleb Alemayehu</h3>
          <span className="text-sm text-gray-500">Software Engineer, Palantir</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="bg-[#4338CA] h-64">
  <div className="p-10">
  <h3 className="font-semibold text-white text-lg text-center pt-7 ">Ready to Change your life</h3>
  <p className="text-sm text-white text-center">The next application cycle now open. Take the first step towards your dream career</p>
  <div className="flex justify-center mt-6">
    <Link href="#" className="px-6 py-3 bg-white text-blue-500 rounded-md  transition">
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
