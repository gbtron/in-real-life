import Image from "next/image";
import { bookmania, cardo } from "@/app/ui/fonts";

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
              src="/assets/IRL_Logo_Final_Responsive.png"
              alt="IRL Logo"
            />
          </div>
          <div className="text-center bg-beige-500 bg-opacity-80 px-2 pt-5 sm:bg-transparent">
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
          <div className="flex pt-20 sm:pt-40">
            <div className="lg:pt-20 w-3/4 sm:w-2/3">
              <h1
                className={`${bookmania.className} text-tangerine-500 font-semibold text-2xl sm:text-3xl`}
              >
                Holistic offerings
              </h1>
              <div
                className={`${bookmania.className} text-4xl sm:text-6xl pt-2 font-semibold`}
              >
                Oppportunities for growth through various avenues
              </div>
              <div className={`${cardo.className} font-semibold pt-5 text-2xl`}>
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
        </div>
      </section>
      <section className="overflow-hidden pb-20 pl-[--columnPaddingNormal]">
        <div className="flex-column space-y-10 sm:flex justify-around sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
          <div className="basis-1/3 border-b-2 border-t-2 border-brown-200 pt-10 pb-10 sm:border-none">
            <h1 className={`${bookmania.className} text-xl font-semibold`}>
              Events
            </h1>
            <div
              className={`${bookmania.className} text-3xl text-tangerine-500 pt-6 font-semibold`}
            >
              Active Community
            </div>
            <div className={`${cardo.className} pt-8 text-2xl w-3/4`}>
              Create new art pieces, unwind in yoga poses, and catch the big
              game with like-minded peers.
            </div>
          </div>

          <div className="basis-1/3 border-b-2 pb-10 border-brown-200 sm:border-none">
            <h1 className={`${bookmania.className} text-xl font-semibold`}>
              Workshops
            </h1>
            <div
              className={`${bookmania.className} text-3xl text-tangerine-500 pt-6 font-semibold`}
            >
              Engaging Learning
            </div>
            <div className={`${cardo.className} pt-8 text-2xl w-3/4`}>
              Develop independent living skills and social skills, such as
              effective communication, networking, and conflict resolution.
            </div>
          </div>

          <div className="basis-1/3">
            <h1 className={`${bookmania.className} text-xl font-semibold`}>
              Counseling
            </h1>
            <div
              className={`${bookmania.className} text-3xl text-tangerine-500 pt-6 font-semibold`}
            >
              Supportive Therapy
            </div>
            <div className={`${cardo.className} pt-8 text-2xl w-3/4`}>
              Get help with managing stress, anxiety, depression and other
              mental health challenges.
            </div>
          </div>
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
              className={`${bookmania.className} text-4xl text-white sm:text-4xl pt-8 font-semibold}`}
            >
              The right place to interact
            </div>
            <div
              className={`${cardo.className} pt-12 text-lg text-white font-semibold`}
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
                <div className="font-semibold hover:bg-tangerine-600 hover:text-slate-100 bg-slate-100 group text-slate-600 py-2 mt-8 px-4 rounded-full w-32 mb-10 text-center">
                  Contact Us
                </div>
              </a>
              {/* <Link href="/api/auth/login">
                <div className="font-semibold hover:text-tangerine-600 group text-white py-2 mt-8 px-4 w-32 mb-10">
                  Begin Today
                </div>
              </Link> */}
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
