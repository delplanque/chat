const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
  [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];
}, false);

class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.sx = Math.random() * 3 - 1.5;
    this.sy = Math.random() * -3 - 3;
    this.size = Math.random() * 2 + 1;
    const colorVal = Math.round(0xffffff * Math.random());
    [this.r, this.g, this.b] = [colorVal >> 16, (colorVal >> 8) & 255, colorVal & 255];
    this.shouldExplode = false;
  }
  update() {
    this.shouldExplode = this.sy >= -2 || this.y <= 100 || this.x <= 0 || this.x >= canvas.width;
    this.sy += 0.01;
    this.x += this.sx;
    this.y += this.sy;
  }
  draw() {
    ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Particle {
  constructor(x, y, r, g, b) {
    this.x = x;
    this.y = y;
    this.sx = Math.random() * 3 - 1.5;
    this.sy = Math.random() * 3 - 1.5;
    this.r = r;
    this.g = g;
    this.b = b;
    this.size = Math.random() * 2 + 1;
    this.life = 100;
  }
  update() {
    this.x += this.sx;
    this.y += this.sy;
    this.life--;
  }
  draw() {
    ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.life / 100})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const fireworks = [new Firework()];
const particles = [];

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.25) fireworks.push(new Firework());

  fireworks.forEach((firework, i) => {
    firework.update();
    firework.draw();
    if (firework.shouldExplode) {
      for (let j = 0; j < 50; j++) {
        particles.push(new Particle(firework.x, firework.y, firework.r, firework.g, firework.b));
      }
      fireworks.splice(i, 1);
    }
  });

  particles.forEach((particle, i) => {
    particle.update();
    particle.draw();
    if (particle.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

const music = document.createElement("audio");
music.src = "you.mp3";
music.loop = true;
music.volume = 0.1;
music.hidden = true;
document.body.appendChild(music);

const startBtn = document.getElementById("playMusic");

document.addEventListener("click", () => {
  music.play().catch(err => console.log("Lecture bloquée :", err));
  animate();
  startBtn.style.display = "none";
  
}, { once: true });
