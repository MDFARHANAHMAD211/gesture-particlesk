// SCENE SETUP
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// PARTICLES
const count = 2000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 6;
}

geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const material = new THREE.PointsMaterial({
  color: 0x00ffff,
  size: 0.04
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// TOUCH INTERACTION (ANDROID FRIENDLY)
window.addEventListener("touchstart", () => {
  material.color.setHSL(Math.random(), 1, 0.5);
  particles.scale.set(1.6, 1.6, 1.6);
});

window.addEventListener("touchend", () => {
  particles.scale.set(1, 1, 1);
});

// CAMERA PERMISSION (for future hand tracking)
navigator.mediaDevices.getUserMedia({ video: true })
  .then(() => console.log("Camera ready"))
  .catch(() => alert("Camera permission required"));

// ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.002;
  particles.rotation.x += 0.001;
  renderer.render(scene, camera);
}
animate();

// RESIZE FIX
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
