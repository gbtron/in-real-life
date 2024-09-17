import { mockEvents } from "@/app/lib/data"
import Carousel from "react-multi-carousel"
import 'react-multi-carousel/lib/styles.css';

export function ScrollableCards() {
    const getParticipantCount = () => (5)
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return (
       <Carousel 
            responsive={responsive} 
            swipeable={true}
            draggable={true}
            showDots={true}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType="mobile"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
        {mockEvents.map((event, i)=> (
            <div className='w-1/2 h-4/6 py-2 px-1 border-solid border-2 border-tangerine-400 dark:border-tangerine-100 rounded-md' key={i}>
                <div className='flex flex-row justify-between'>
                    <div>{event.membersEvent && 'Members Only'}</div>
                    <div>{event.sign}</div>
                </div>
                <div className='flex flex-col pt-4 text-center'>
                    <div>{event.title}</div>
                    <div>on {event.date.toDateString()}</div>
                </div>
                <div className='pt-8'>{getParticipantCount()}</div>
            </div>
        ))}
        </Carousel>
    )
}