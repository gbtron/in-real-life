import { mockEvents } from "@/app/lib/data"
import Carousel from "react-multi-carousel"
import 'react-multi-carousel/lib/styles.css';
import { sortEvents } from "@/app/lib/events";
import { ActiveEventDispatch } from "@/app/lib/definitions";
import { EventCard } from "@/app/ui/EventCard";

export function ScrollableCards({ setActiveEvent } : {setActiveEvent:ActiveEventDispatch} ) {
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
          autoPlay={window.innerWidth < 641 ? true : false}
          centerMode={true}
          containerClass="carousel-container mt-8 h-80 py-12 sm:pt-12 mb-16"
          dotListClass="custom-dot-list-style"
          draggable={false}
          focusOnSelect={true}
          infinite={true}
          itemClass="carousel-item-padding-40-px"
          responsive={responsive} 
          showDots={true}
          sliderClass='h-full'
          ssr={true}
          swipeable={true}
          removeArrowOnDeviceType={["mobile"]}
          rewindWithAnimation={true}
        >
        {sortEvents(mockEvents).map((event, i)=> (
            <div 
              className='bg-white/50 dark:bg-black/50 h-full mx-2 sm:mx-32 py-2 px-1 border-solid border-2 sm:border-4 border-tangerine-400 dark:border-tangerine-100 dark:text-tangerine-100 rounded-md' 
              key={i}
              onClick={()=>setActiveEvent(event)}
              >
                <EventCard event={event} active={false}/>
            </div>
        ))}
        </Carousel>
    )
}