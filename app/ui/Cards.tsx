import { mockEvents } from "@/app/lib/data"
import Carousel from "react-multi-carousel"
import 'react-multi-carousel/lib/styles.css';

export function ScrollableCards() {
    const getParticipantCount = () => (5)
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 3, 
          partialVisibilityGutter: 40
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 2, 
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
            centerMode={true}
            responsive={responsive} 
            swipeable={true}
            draggable={false}
            showDots={true}
            ssr={true} // means to render carousel on server-side.
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType="mobile"
            dotListClass="custom-dot-list-style mt-20"
            itemClass="carousel-item-padding-40-px"
            focusOnSelect={true}
            rewindWithAnimation={true}
        >
        {mockEvents.map((event, i)=> (
            <div className='h-full py-2 px-1 border-solid border-2 border-tangerine-400 dark:border-tangerine-100 rounded-md' key={i}>
                <div className='flex flex-row justify-between'>
                    <div>{event.membersEvent && 'Members Only'}</div>
                    <div>{event.sign}</div>
                </div>
                <div className='flex flex-col pt-4 text-center'>
                    <div>{event.title}</div>
                    <div>on {event.date.toDateString()}</div>
                </div>
                
            </div>
        ))}
        </Carousel>
    )
}