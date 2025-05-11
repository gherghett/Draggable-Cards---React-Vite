import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import mat from "./assets/mat.png";

import cardData from './assets/cards.json';

// import cat from "./assets/cat.png";
import "./App.css";
import Card from "./Card";

import type { Attack } from "./Card";

const imageModules = import.meta.glob('./assets/card_images/*.png', { eager: true });

const imageMap: Record<string, string> = {};

console.log("h");
console.log("imageModules keys:", Object.keys(imageModules)); // ✅ show all matched files
for (const path in imageModules) {
  const fileName = path.split('/').pop();
  console.log(fileName);
  imageMap[fileName!] = (imageModules[path] as any).default;
}

function App() {
  const [count, setCount] = useState(0);

  const style = {
    backgroundImage: `url(${mat})`,
  };
  // title: string;
  // description: string;
  // glyphs: GlyphCircleProps[];
  // damage: number;
  const catAttacks: Attack[] = [
    {
      title: "Sleepy Slap",
      description: "Take 1 damage per minute you napped this week.",
      glyphs: [
        {
          glyph: "X",
          color: "white",
        },
      ],
      damage: "0-?",
    },
    {
      title: "Strainge Smell",
      description: "Is it that new food we started giving her?",
      glyphs: [
        {
          glyph: "∿",
          color: "green",
        },
        {
          glyph: "⧖",
          color: "red",
        },
      ],
      damage: "20",
    },
  ];
  
  return (
      <div className="felt" style={style}>
      {cardData.map((card, idx) => (
        <Card
          key={idx}
          title={card.title}
          hp={card.hp}
          bgColor={card.bgColor }
          image={imageMap[card.image]}
          attacks={card.attacks}
        />
      ))}
      </div>
  );
}

export default App;
