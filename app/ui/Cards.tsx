import { mockEvents } from "@/app/lib/data"
import Carousel from "react-multi-carousel"
import 'react-multi-carousel/lib/styles.css';
import { sortEvents } from "@/app/lib/events";
import { FaPerson } from 'react-icons/fa6'
import { getParticipantCount } from "@/app/lib/events";

export function ScrollableCards() {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 3, 
          partialVisibilityGutter: 40
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1, 
          partialVisibilityGutter: 30
        },
        tablet: {
          breakpoint: { max: 1024, min: 640 },
          items: 1, 
          partialVisibilityGutter: 30
        },
        mobile: {
          breakpoint: { max: 640, min: 0 },
          items: 1, 
          partialVisibilityGutter:30
        }
      };
    return (
       <Carousel 
          arrows={false}
          infinite={true}
          centerMode={true}
          responsive={responsive} 
          swipeable={true}
          draggable={false}
          ssr={true} // means to render carousel on server-side.
          containerClass="carousel-container h-80 py-12 sm:pt-12 mb-16"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style pb-4"
          itemClass="carousel-item-padding-40-px"
          focusOnSelect={true}
          rewindWithAnimation={true}
          sliderClass='h-full'
          showDots={true}
        >
        {sortEvents(mockEvents).map((event, i)=> (
            <div className='h-full mx-2 sm:mx-32 py-2 px-1 border-solid border-2 border-tangerine-400 dark:border-tangerine-100 rounded-md' key={i}>
                <div className='flex text-left justify-between h-12'>
                    <div>{event.membersOnly && 'Members Only'}</div>
                    <div>{event.sign}</div>
                </div>
                <div className='flex flex-col pt-4 sm:pt-12 text-center h-1/2'>
                    <div>{event.title}</div>
                    <div>on {event.date.toLocaleDateString(undefined, {month:'long', day:'numeric'})}</div>
                </div>
                <div className='pt-8 flex justify-center items-center'>
                  {getParticipantCount()}
                  <FaPerson/>
                </div>
            </div>
        ))}
        </Carousel>
    )
}