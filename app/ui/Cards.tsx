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
          autoPlay={window.innerWidth < 641 ? false : false}
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
        {sortEvents(mockEvents).map( (event, i) => ( <EventCard key={i} event={event} setActiveEvent={setActiveEvent}/> ) )}
        </Carousel>
    )
}