let attempts = 0;
const maxAttempts = 5;

const playBtn = document.getElementById("playBtn");
const clawZone = document.getElementById("clawZone");
const rope = document.getElementById("rope");
const explosionArea = document.getElementById("explosionArea");
const secretBtn = document.getElementById("secretBtn");

let clawPos = 230; 
const moveStep = 30; 

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && clawPos > 20) {
    clawPos -= moveStep;
    clawZone.style.left = clawPos + "px";
  } else if (e.key === "ArrowRight" && clawPos < 440) {
    clawPos += moveStep;
    clawZone.style.left = clawPos + "px";
  }
});


playBtn.addEventListener("click", () => {
  attempts++;

  rope.style.height = "400px";
  setTimeout(() => {
    rope.style.height = "150px";
  }, 600);

  if (attempts >= maxAttempts) {
    document.getElementById("machine").style.display = "none";
    playBtn.style.display = "none";


    for (let i = 0; i < 15; i++) {
      createExplosion();
    }

    setTimeout(() => {
      secretBtn.style.display = "inline-block";
    }, 2000);
  }
});

secretBtn.addEventListener("click", () => {
  window.location.href = "aled.html";
});

function createExplosion() {
  const explosion = document.createElement("div");
  explosion.classList.add("explosion");

  explosion.style.left = Math.random() * window.innerWidth + "px";
  explosion.style.top = Math.random() * window.innerHeight + "px";

  explosionArea.appendChild(explosion);

  setTimeout(() => {
    explosion.remove();
  }, 1000);
}
