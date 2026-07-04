import { useEffect, useState } from "react";

const games = [
  "https://media.rawg.io/media/games/0a2/0a2ee705109a6d8d94e28bef03f6d598.jpg",
  "https://media.rawg.io/media/games/d74/d744a3b0f6f0f0bc63f5ceb9b5e63230.jpeg",
  "https://media.rawg.io/media/games/dcc/dcc38d78ab1f1a90fdc4ba1bea3a73ff.jpg",
  "https://media.rawg.io/media/games/30b/30b195c2321d763f807366967ffad793.jpg",
  "https://media.rawg.io/media/games/fe3/fe3ab374b913d3e44cf377e614526111.jpg",
  "https://media.rawg.io/media/games/51a/51a404b9918a0b19fc704a3ca248c69f.jpg",
  "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % games.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative hidden h-[300px] w-[700px] overflow-hidden lg:flex items-center justify-center">

      <div className="absolute right-0 top-1/2 h-[260px] w-[260px] -translate-y-1/2 rounded-full bg-violet-600/20 blur-[120px]" />

      <div className="absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-[70px]" />

      <div className="hero-carousel relative flex h-full w-full items-center justify-center overflow-hidden">

        {games.map((image, index) => {

          let diff = index - current;

          if (diff > games.length / 2) diff -= games.length;
          if (diff < -games.length / 2) diff += games.length;

          let classes = "";

          switch (diff) {

            case 0:
              classes =
                "translate-x-0 scale-105 opacity-90 z-30";
              break;

            case -1:
              classes =
                "-translate-x-56 scale-90 opacity-35 -rotate-4 z-20";
              break;

            case 1:
              classes =
                "translate-x-56 scale-90 opacity-35 rotate-4 z-20";
              break;

            case -2:
              classes =
                "-translate-x-[420px] scale-75 opacity-10 -rotate-8 z-10";
              break;

            case 2:
              classes =
                "translate-x-[420px] scale-75 opacity-10 rotate-8 z-10";
              break;

            default:
              classes =
                "opacity-0 scale-50";
          }

          return (
            <div
              key={index}
              className={`
                absolute
                transition-all
                duration-1000
                ease-in-out
                ${classes}
              `}
            >
              <img
                src={image}
                alt=""
                draggable={false}
                className="
                  hero-image
                  h-[270px]
                  w-[500px]
                  rounded-3xl
                  object-cover
                  select-none
                  pointer-events-none
                "
              />
            </div>
          );
        })}

      </div>

    </div>
  );
}

export default HeroCarousel;