import Image from "next/image";

export default function about() {
  return (
    <div className="page-content z-10">
      <div
        id="up"
        className="bg-center bg-fixed bg-no-repeat bg-center bg-cover h-screen relative"
      >
        <div className="h-screen bg-opacity-50 bg-hero bg-norepeat bg-cover">
          <div className="flex justify-center items-center">
            <Image
              width={640}
              height={800}
              className="object-scale-down h-80 sm:h-96"
              src="/assets/IRL_Logo_Final_Responsive.avif"
              alt="IRL Logo"
              loading="eager"
              priority
            />
          </div>
          <div className="text-center bg-beige-500 bg-opacity-80 px-2 pt-5 sm:bg-transparent">
            <h1
              className={`font-title text-tangerine-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold`}
            >
              <span className="text-white">
                Where real connections are made
              </span>
            </h1>
            <div
              className={`font-body pt-3 pt-12 text-2xl text-white`}
            >
              We provide a safe, inclusive environment for young adults to forge
              meaningful relationships, develop critical skills, and heighten
              their overall well being.
            </div>
            <div className="inline-flex">
              <a
                href="/contact"
                className="p-2 my-5 mx-2 bg-tangerine-500 hover:bg-tangerine-600 font-bold text-white rounded border-2 border-transparent hover:border-tangerine-600 shadow-md transition duration-500 md:text-xl"
              >
                Contact Us
              </a>
              {/* <a href="/contact">
                <button className="p-2 my-5 mx-2 border-2 bg-tangerine-300 bg-opacity-30 hover:bg-opacity-70 border-tangerine-500 rounded hover:border-tangerine-300 font-bold text-white shadow-md transition duration-500 md:text-lg">
                  Contact Us
                </button>
              </a> */}
            </div>
          </div>
        </div>
      </div>

      <section className=" overflow-hidden bg-beige-100">
        <div className="pb-10 text-slate-600 pl-8 sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
          <div className="flex pt-20 sm:pt-40 items-center">
            <div className="w-3/4 sm:w-2/3">
              <h1
                className={`font-title text-tangerine-900 font-bold text-2xl sm:text-3xl`}
              >
                Holistic offerings
              </h1>
              <div
                className={`font-title text-4xl sm:text-6xl pt-2 font-bold`}
              >
                Oppportunities for growth through various avenues
              </div>
              <div className={`font-body font-bold pt-5 text-2xl`}>
                Here at IRL, we strive to fulfill three main objectives:
                providing young adults with a positive environment to develop
                social and communication skills, helping them identify strengths
                and weaknesses to support success in school and work, and
                collaborating with clients, parents, and therapists to address
                ongoing mental health needs.
              </div>
            </div>
            <Image
              src="/assets/kayakGlades.jpg"
              alt="Person kayaking in Everglades"
              width={640}
              height={800}
              className="rounded-lg hidden object-cover md:block w-[1/2] h-[40rem] ml-20"
            />
          </div>
        </div>
      </section>
      <section className="overflow-hidden pb-20 pl-[--columnPaddingNormal]">
        <div className="flex-column space-y-10 sm:flex justify-around sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
          <div className="basis-1/3 border-b-2 border-t-2 border-brown-200 pt-10 pb-10 sm:border-none">
            <h1 className={`font-title text-xl font-bold`}>
              Events
            </h1>
            <div
              className={`font-title text-3xl text-tangerine-500 pt-6 font-bold`}
            >
              Active Community
            </div>
            <div className={`font-body pt-8 text-2xl w-3/4`}>
              Join daily activities to build social skills, improve fitness, and
              connect you with the community. Volunteer to enhance your job and
              social skills, boosting your chances for positive employment
              outcomes. Strengthen teamwork and communication in group sessions
              designed to help you grow alongside peers.
            </div>
          </div>

          <div className="basis-1/3 border-b-2 pb-10 border-brown-200 sm:border-none">
            <h1 className={`font-title text-xl font-bold`}>
              Workshops
            </h1>
            <div
              className={`font-title text-3xl text-tangerine-500 pt-6 font-bold`}
            >
              Engaging Learning
            </div>
            <div className={`font-body pt-8 text-2xl w-3/4`}>
              Discover your strengths with vocational counseling that helps you
              build a resume and explore job opportunities. Reach your
              educational goals with tutoring, mentoring, and career guidance.
              Master life skills like budgeting, cooking, and personal hygiene
              through hands-on workshops that support your independence.
            </div>
          </div>

          <div className="basis-1/3">
            <h1 className={`font-title text-xl font-bold`}>
              Group Work
            </h1>
            <div
              className={`font-title text-3xl text-tangerine-500 pt-6 font-bold`}
            >
              Supportive Sessions
            </div>
            <div className={`font-body pt-8 text-2xl w-3/4`}>
              Receive personalized support that aligns with your mental health
              and therapeutic goals. Collaborate with our team, your family, and
              therapists to ensure your emotional and mental well-being is
              prioritized as you work through the program.
            </div>
          </div>
        </div>
      </section>

      <section className=" overflow-hidden bg-beige-100">
        <div className="pb-10 text-slate-600 pl-8 sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
          <div className="flex items-center justify-between">
            <Image
              src="/assets/buildingPalm.jpg"
              alt="An apartment building with a palm tree in the foreground"
              width={640}
              height={800}
              className="rounded-lg hidden md:block w-[1/2] h-[40rem] mr-20"
            />
            <div className="w-3/4 sm:w-2/3">
              <h1
                className={`font-title text-tangerine-900 font-bold text-2xl sm:text-3xl`}
              >
                Our Pillars
              </h1>
              <div
                className={`font-title text-4xl sm:text-6xl pt-2 font-bold`}
              >
                Get to know our space
              </div>
              <div className={`font-body font-bold pt-5 text-2xl`}>
                At the heart of our organization are six key spaces designed to
                foster growth, connection, and creativity. Each of these spaces
                serves as an essential pillar in our mission to provide an
                enriching, supportive environment for young adults.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden pb-20 pl-[--columnPaddingNormal]">
        <div className="flex-column space-y-10 sm:flex justify-around sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
          <details className="dropdown basis-1/3 border-b-2 border-t-2 border-brown-200 pt-10 pb-10 sm:border-none group text-tangerine-500 transition-all duration-300 ease-in-out">
            <summary
              className={`font-title cursor-pointer text-3xl text-tangerine-500 pt-6 font-bold bg-left-bottom bg-gradient-to-r from-tangerine-500 to-tangerine-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:90%_2px] transition-all duration-500 ease-out`}
            >
              Lounge and TV Area
            </summary>
            <div
              className={`font-body pt-8 text-2xl w-3/4 text-slate-600`}
            >
              Relax in a cozy space with couches, game tables, and TVs. This is
              the perfect spot for meeting new friends and enjoying activities
              like movie nights, potluck dinners, and planning community
              outings. Our lounge is designed to foster a sense of belonging and
              connection among members.
            </div>
          </details>

          <details className="dropdown basis-1/3 border-b-2 pb-10 border-brown-200 sm:border-none group text-tangerine-500 transition-all duration-300 ease-in-out">
            <summary
              className={`font-title cursor-pointer text-3xl text-tangerine-500 pt-6 font-bold bg-left-bottom bg-gradient-to-r from-tangerine-500 to-tangerine-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:90%_2px] transition-all duration-500 ease-out`}
            >
              Gym and Game Room
            </summary>
            <div
              className={`font-body pt-8 text-2xl w-3/4 text-slate-600`}
            >
              Stay active with a variety of games like billiards, arcade games,
              or air hockey. Or, join group fitness classes such as yoga, dance,
              meditation, or pilates. This space also includes a basketball hoop
              and functional training area with hand weights. Engage your
              competitive side at the game room!
            </div>
          </details>

          <details className="dropdown basis-1/3 group text-tangerine-500 transition-all duration-300 ease-in-out">
            <summary
              className={`font-title cursor-pointer text-3xl text-tangerine-500 pt-6 font-bold bg-left-bottom bg-gradient-to-r from-tangerine-500 to-tangerine-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:90%_2px] transition-all duration-500 ease-out`}
            >
              Art Studio
            </summary>
            <div
              className={`font-body pt-8 text-2xl w-3/4 text-slate-600`}
            >
              Explore your creativity in a fully equipped art studio offering
              classes in painting, ceramics, photography, graphic design, and
              more. Each client will receive their very own painting box!
              Program field trips to museums and art events like Art Basel will
              inspire your self-expression.
            </div>
          </details>
        </div>
        <div className="flex-column space-y-10 sm:flex justify-around content-center sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
          <details className="dropdown basis-1/3 border-b-2 border-t-2 border-brown-200 pt-10 pb-10 mt-10 sm:border-none sm:mt-0 group text-tangerine-500 transition-all duration-300 ease-in-out">
            <summary
              className={`font-title cursor-pointer text-3xl text-tangerine-500 pt-6 font-bold bg-left-bottom bg-gradient-to-r from-tangerine-500 to-tangerine-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:90%_2px] transition-all duration-500 ease-out`}
            >
              Kitchen and Dining
            </summary>
            <div
              className={`font-body pt-8 text-2xl w-3/4 text-slate-600`}
            >
              Learn cooking skills in our progressive six-week program,
              culminating in a five-course meal for family and friends. This
              program will focus on basic cooking skills, private dining and
              entertainment, and nutrition and health. Additional workshops will
              be provided on a weekly basis that may cover everything from
              bread-making, to holiday meal preparation, to wine and beer
              tasting.
            </div>
          </details>

          <details className="dropdown basis-1/3 border-b-2 pb-10 border-brown-200 sm:border-none group text-tangerine-500 transition-all duration-300 ease-in-out">
            <summary
              className={`font-title cursor-pointer text-3xl text-tangerine-500 pt-6 font-bold bg-left-bottom bg-gradient-to-r from-tangerine-500 to-tangerine-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:90%_2px] transition-all duration-500 ease-out`}
            >
              Education and Career Counseling
            </summary>
            <div
              className={`font-body pt-8 text-2xl w-3/4 text-slate-600`}
            >
              Participate in classes and seminars focused on job readiness,
              financial literacy, and life skills. This comfortable, calming
              space offers computers for job searches and online learning, and
              digital literacy training. The program will also work with parents
              and outside therapists to provide individual and group sessions
              for tailored support.
            </div>
          </details>

          <details className="dropdown basis-1/3 group text-tangerine-500 transition-all duration-300 ease-in-out">
            <summary
              className={`font-title cursor-pointer text-3xl text-tangerine-500 pt-6 font-bold bg-left-bottom bg-gradient-to-r from-tangerine-500 to-tangerine-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:90%_2px] transition-all duration-500 ease-out`}
            >
              Plant Room and Outdoor Gardening
            </summary>
            <div
              className={`font-body pt-8 text-2xl w-3/4 text-slate-600`}
            >
              Learn sustainable and healthy techniques to grow herbs and
              vegetables in our dedicated indoor and outdoor gardening spaces
              with guidance from a plant specialist and support from volunteers.
            </div>
          </details>
        </div>
      </section>

      <section className="overflow-hidden bg-brown-100 text-slate-100">
        <div className="relative flex pl-8 sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
          <div className="pt-20 w-3/4 sm:w-2/3">
            <h1
              className={`font-title text-white font-bold text-8xl`}
            >
              Real Life
            </h1>
            <div
              className={`font-title text-4xl text-white sm:text-4xl pt-8 font-bold}`}
            >
              The right place to interact
            </div>
            <div
              className={`font-body pt-12 text-xl text-white font-bold`}
            >
              In today&apos;s digital world, it can be challenging to meet new
              people and build meaningful relationships. This is where IRL steps
              in – a dedicated socialization space designed to foster a safe,
              supportive, and vibrant community for young adults who crave
              real-life interactions. Get started today by creating an account
              or starting the conversation.
            </div>
            <div className="flex flex-row gap-2">
              <a href="/contact">
                <div className="font-bold hover:bg-tangerine-600 hover:text-slate-100 bg-slate-100 group text-slate-600 py-2 mt-8 px-4 rounded-full w-32 mb-10 text-center">
                  Contact Us
                </div>
              </a>
              {/* <Link href="/api/auth/login">
                <div className="font-bold hover:text-tangerine-600 group text-white py-2 mt-8 px-4 w-32 mb-10">
                  Begin Today
                </div>
              </Link> */}
            </div>
          </div>
          <Image
            src="/assets/palmTop.jpg"
            alt="Top of palm tree against the sky"
            width={600}
            height={600}
            className="rounded-lg hidden object-cover object-bottom md:block sepia-[.3] w-[1/2] h-[26rem] ml-20 my-20"
          />
        </div>
      </section>
    </div>
  );
}
