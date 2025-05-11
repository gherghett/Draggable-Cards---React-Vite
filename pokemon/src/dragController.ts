let offsetX = 0;
let offsetY = 0;
let lastX: number | null = null;
let speed = 0;

let grabbed: HTMLElement | null = null;
let grabbedRotation = 0;
let globalZIndex = 1;

export function startDragging(card: HTMLElement, event: MouseEvent | TouchEvent) {
  grabbed = card;

  const point = getPoint(event);
  const rect = grabbed.getBoundingClientRect();
  offsetX = point.x - rect.left;
  offsetY = point.y - rect.top;

  globalZIndex++;
  card.style.zIndex = `${globalZIndex}`;

  grabbed.classList.add('grabbed');
  grabbed.style.transitionDuration = `.1s`;
}

// 🌐 Shared handler for mouse/touch move
function handleMove(event: MouseEvent | TouchEvent) {
  if ('touches' in event) {
    event.preventDefault(); //stop scrolling while dragging
  }
  
  const point = getPoint(event);
  speed = point.x - (lastX ?? point.x);
  lastX = point.x;

  if (!grabbed) return;

  const x = point.x - offsetX;
  const y = point.y - offsetY;

  grabbed.style.left = `${x}px`;
  grabbed.style.top = `${y}px`;

  const rect = grabbed.getBoundingClientRect();
  const originX = (offsetX / rect.width) * 100;
  const originY = (offsetY / rect.height) * 100;
  grabbed.style.transformOrigin = `${originX}% ${originY}%`;

  grabbedRotation = speed * 0.5;
  grabbed.style.transform = `rotate(${grabbedRotation}deg)`;
}

function handleEnd() {
  if (!grabbed) return;

  grabbed.style.transform = `rotate(${grabbedRotation * 0.5}deg)`;
  grabbed.classList.remove('grabbed');
  grabbed.style.transitionDuration = `${0.01 * Math.abs(speed)}s`;

  grabbed = null;
}

// 🧠 Helper to normalize touch vs mouse
function getPoint(event: MouseEvent | TouchEvent) {
  if ('touches' in event) {
    return {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }
  return {
    x: event.clientX,
    y: event.clientY,
  };
}

// 📱 Register both mouse and touch listeners once
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', handleMove);
  window.addEventListener('mouseup', handleEnd);
  window.addEventListener('touchmove', handleMove, { passive: false });
  window.addEventListener('touchend', handleEnd);
}
