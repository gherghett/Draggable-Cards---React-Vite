import "./Card.css";
import cardBg from "./assets/card_bg.png";
import { Fragment, useRef, useEffect } from "react";
import { startDragging } from "./dragController";
import GlyphCircle from "./GlyphCircle";
import type { GlyphCircleProps } from "./GlyphCircle";

export type Attack = {
  title: string;
  description: string;
  glyphs: GlyphCircleProps[];
  damage: string;
};

interface CardProps {
  title: string;
  hp: string;
  bgColor: string // "card-blue" | "card-green" | "card-yellow";
  image: string;
  attacks: Attack[];
}

function Card({ title, hp, bgColor, image, attacks }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const bgStyle = {
    backgroundImage: `url('${image}')`,
  };

  // const handleMouseDown = (e: React.MouseEvent) => {
  //   if (cardRef.current) {
  //     startDragging(cardRef.current, e.nativeEvent); // Use nativeEvent to get real MouseEvent
  //   }
  // };


  const baseRotation = useRef(15 + (15 * (Math.random()-0.5)));
  const baseOffset = useRef({x: (Math.random()*0.5)*20, y:(Math.random()*0.5)*20})

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = `rotate(${baseRotation.current}deg)`;
      cardRef.current.style.top = `${baseOffset.current.y}px`
      cardRef.current.style.left = `${baseOffset.current.x}px`
    }
  }, []);


  return (
    <div 
        className="card"
        onMouseDown={(e) => startDragging(cardRef.current!, e.nativeEvent)}
        onTouchStart={(e) => startDragging(cardRef.current!, e.nativeEvent)}
        ref={cardRef}
        >
      <div
        className={`card-bg ${bgColor}`}
        style={{ backgroundImage: `url('${cardBg}')` }}
      ></div>
      <div className="content">
        <div className="top-row">
          <h3 className="title">{title} </h3>
          <span>{hp} HP</span>
        </div>
        <div className="picture" style={bgStyle}></div>
        <div className="info-lines">
          {attacks.map((attack: Attack, index) => (
            <Fragment key={index}>
              <div className="holder-container">
                <div className="circle-holder">
                  {attack.glyphs.map((glyph, gIndex) => (
                    <GlyphCircle {...glyph} key={gIndex} />
                  ))}
                </div>
              </div>

              <div className="text-column">
                <div className="attack-text">
                  <h4>{attack.title}</h4>
                  <span>{attack.description}</span>
                </div>
              </div>
              <div className="right-column">
                <span>{attack.damage}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
