import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const Hero = () => {
  const content = [
    {
      name: "Boost Productivity",
      description:
        "Organize your tasks and stay on top of your goals with TaskSyncro.",
      image: "/images/productivity.jpg",
    },
    {
      name: "Collaborate Seamlessly",
      description:
        "Share modules and collaborate with your team effortlessly.",
      image: "/images/collaboration.jpg",
    },
    {
      name: "Achieve Milestones",
      description: "Track your progress and celebrate your achievements.",
      image: "/images/milestones.png",
    },
  ];

  return (
    <section className="w-full bg-gray-50">
      <Carousel>
        {" "}
        {/* Add `loop` for continuous carousel */}
        <CarouselContent>
          {content.map((item, index) => (
            <CarouselItem
              key={index}
              className="flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 py-7 space-y-8 lg:space-y-0 lg:space-x-12"
            >
              {/* Left Side (Text) */}
              <div className="flex flex-col items-center lg:items-start space-y-4 lg:w-1/2">
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 text-center lg:text-left">
                  {item.name}
                </h2>
                <p className="text-lg text-gray-600 text-center lg:text-left">
                  {item.description}
                </p>
              </div>

              {/* Right Side (Image with animation) */}
              <div className="relative w-full lg:w-1/2 text-center mx-auto flex justify-center items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[30rem] object-cover rounded-lg shadow-lg transform transition-all duration-500 ease-in-out hover:translate-y-2 hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Carousel Controls */}
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100" />
      </Carousel>
    </section>
  );
};

export default Hero;
