import { mockEvents } from "@/app/lib/data"
import Carousel from "react-multi-carousel"
import 'react-multi-carousel/lib/styles.css';
import { sortEvents } from "@/app/lib/events";
import { EventCard } from "@/app/ui/EventCard";
import { useRouter } from "next/navigation";

export function ScrollableCards() {
    const router = useRouter()
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
          containerClass="carousel-container h-80 py-12 sm:pt-12 mb-16"
          itemClass="carousel-item-padding-40-px"
          dotListClass="custom-dot-list-style"
          sliderClass='h-full'
          responsive={responsive} 
          autoPlay={window.innerWidth < 641 ? true : false}
          rewindWithAnimation={true}
          infinite={true}
          removeArrowOnDeviceType={["mobile"]}
          showDots={true}
          draggable={false}
          swipeable={true}
          centerMode={true}
          ssr={true}
        >
          {sortEvents(mockEvents).map( (event, i) => (
            <div key={i} onClick= {() => router.push(`/events/${event.id}`)}>
              <EventCard event={event} selected={false}/> 
            </div>
          ))}
        </Carousel>
    )
}