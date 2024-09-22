import Image from "next/image";
import Link from "next/link";
import { bookmania, handlee, cardo } from "@/app/ui/fonts";

export default function about() {
  return (
    <div className="page-content z-10">
      <div
        id="up"
        className="bg-center bg-fixed bg-no-repeat bg-center bg-cover h-screen relative"
      >
        <div className="h-screen bg-opacity-50 bg-hero bg-norepeat bg-cover flex items-center justify-center">
          <div className="mx-2 text-center">
            <h1
              className={`${bookmania.className} text-tangerine-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold`}
            >
              <span className="text-white">
                Where real connections are made
              </span>
            </h1>
            <div
              className={`${cardo.className} pt-3 font-medium pt-12 text-xl text-white`}
            >
              We provide a safe, inclusive environment for young adults to forge
              meaningful relationships, develop critical skills, and heighten
              their overall well being.
            </div>
            <div className="inline-flex">
              <a
                href="/api/auth/login"
                className="p-2 my-5 mx-2 bg-tangerine-700 hover:bg-tangerine-800 font-bold text-white rounded border-2 border-transparent hover:border-tangerine-800 shadow-md transition duration-500 md:text-xl"
              >
                Get Started
              </a>
              <a href="/contact">
                <button className="p-2 my-5 mx-2 border-2 bg-tangerine-300 bg-opacity-30 hover:bg-opacity-100 border-tangerine-700 rounded hover:border-tangerine-800 font-bold text-white shadow-md transition duration-500 md:text-lg">
                  Contact Us
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <section className="bg-white relative pb-64 overflow-hidden">
        <div className="fixed absolute -top-44 bottom-[80%] sm:bottom-3/4 lg:bottom-2/3 inset-0 transform skew-y-[-10deg] bg-gradient-to-r from-slate-100 via-indigo-200 via-70% to-fuchsia-200"></div>
        <div className="relative flex pl-8 sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
          <div className="w-3/4 sm:w-1/2 sm:pr-44 pt-16 text-slate-600">
            <h1
              className={`${bookmania.className} text-tangerine-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold`}
            >
              Where REAL connections happen
            </h1>
            <div className={`${cardo.className} font-medium pt-12 text-xl`}>
              We provide a safe, inclusive environment for young adults to forge
              meaningful relationships, develop critical skills, and heighten
              their overall well being.
            </div>
            <a href="/api/auth/login">
              <div className="duration-300 transition-colors ease-in-out bg-gradient-to-r from-stone-400 to-blue-100 hover:from-pink-500 hover:to-indigo-500 group text-white py-2 mt-8 px-4 rounded-lg w-40">
                Begin today
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="duration-300 ease-in-out transition-transform group-hover:translate-x-6 h-6 w-6 inline-block ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7M2 12h14"
                  />
                </svg>
              </div>
            </a>
          </div>
          <Image
            src="/assets/back-view-people-looking-distance.jpg"
            alt="Back view of people looking in distance"
            width={600}
            height={400}
            className="sepia-[.3] rounded-lg h-[36rem] hidden md:block mt-12"
          />
        </div>
      </section> */}

      <section className=" overflow-hidden bg-slate-100">
        <div className="text-slate-600 pb-40 pl-8 sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
          <div className="flex pt-20 sm:pt-40">
            <div className="lg:pt-20 w-3/4 sm:w-2/3">
              <h1
                className={`${bookmania.className} pt-6 text-tangerine-400 font-semibold text-xl sm:text-3xl`}
              >
                Holistic offerings
              </h1>
              <div
                className={`${bookmania.className} text-4xl sm:text-6xl pt-8 font-semibold`}
              >
                Oppportunities for growth through various avenues
              </div>
              <div className={`${cardo.className} pt-12 text-xl`}>
                Our program promotes holistic development through hosting
                events, workshops, and counseling. Members can sign up and stop
                by IRL for any of the support they need.
              </div>
            </div>
            <Image
              src="/assets/bridge.jpg"
              alt="Man walking on bridge"
              width={640}
              height={800}
              className="rounded-lg hidden md:block w-[1/2] h-[40rem] ml-20"
            />
          </div>

          <div className="pt-40">
            <h1 className={`${bookmania.className} text-lg`}>Events</h1>
            <div
              className={`${bookmania.className} text-3xl text-tangerine-400 pt-6 font-semibold`}
            >
              Active Community
            </div>
            <div className={`${cardo.className} pt-8 text-xl w-3/4 sm:w-1/3`}>
              Create new art pieces, unwind in yoga poses, and catch the big
              game with like-minded peers.
            </div>
          </div>

          <div className="pt-40">
            <h1 className={`${bookmania.className} text-lg`}>Workshops</h1>
            <div
              className={`${bookmania.className} text-3xl text-tangerine-400 pt-6 font-semibold`}
            >
              Engaging Learning
            </div>
            <div className={`${cardo.className} pt-8 text-xl w-3/4 sm:w-1/3`}>
              Develop independent living skills and social skills, such as
              effective communication, networking, and conflict resolution.
            </div>
          </div>

          <div className="pt-40">
            <h1 className={`${bookmania.className} text-lg`}>Counseling</h1>
            <div
              className={`${bookmania.className} text-3xl text-tangerine-400 pt-6 font-semibold`}
            >
              Supportive Therapy
            </div>
            <div className={`${cardo.className} pt-8 text-xl w-3/4 sm:w-1/3`}>
              Get help with managing stress, anxiety, depression and other
              mental health challenges.
            </div>
          </div>

          {/* <Link href="/about">
                <div className="hover:bg-slate-300 hover:text-black bg-slate-700 group text-white py-2 mt-8 px-4 rounded-full w-44 mb-10">
                    Discover offerings
                </div>
                </Link> */}
        </div>
      </section>

      <section className="overflow-hidden bg-brown-100 text-slate-100">
        <div className="relative flex pl-8 sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
          <div className="pt-20 w-3/4 sm:w-2/3">
            <h1
              className={`${bookmania.className} text-white font-semibold text-8xl`}
            >
              Real Life
            </h1>
            <div
              className={`${bookmania.className} text-4xl text-tangerine-100 sm:text-4xl pt-8 font-semibold}`}
            >
              The right place to interact
            </div>
            <div
              className={`${cardo.className} pt-12 text-lg text-tangerine-100 font-semibold`}
            >
              In today&apos;s digital world, it can be challenging to meet new
              people and build meaningful relationships. This is where IRL steps
              in – a dedicated socialization space designed to foster a safe,
              supportive, and vibrant community for young adults who crave
              real-life interactions. Get started today by creating an account
              or starting the conversation.
            </div>
            <div className="flex flex-row gap-2">
              <a href="/api/auth/login">
                <div className="font-semibold hover:bg-tangerine-600 hover:text-slate-100 bg-slate-100 group text-slate-600 py-2 mt-8 px-4 rounded-full w-32 mb-10 text-center">
                  Begin today
                </div>
              </a>
              <Link href="/contact">
                <div className="font-semibold hover:text-slate-100 group text-tangerine-100 py-2 mt-8 px-4 w-32 mb-10">
                  Contact us
                </div>
              </Link>
            </div>
          </div>
          <Image
            src="/assets/flower.jpg"
            alt="Yellow flower spiral"
            width={600}
            height={600}
            className="rounded-lg hidden md:block sepia-[.3] w-[1/2] h-[26rem] ml-20 my-20"
          />
        </div>
      </section>
    </div>
  );
}
