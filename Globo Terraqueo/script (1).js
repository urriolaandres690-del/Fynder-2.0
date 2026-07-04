// ---------------------------------------------------------------------------
// GLOBO TERRÁQUEO — aviso del estudio
// Paleta: negro #05060A · panel #0C0F14 · verde marca #95BF47 · ámbar #FF8A4C
// Three.js r128, vanilla JS (sin frameworks)
// ---------------------------------------------------------------------------

const CITIES = [
  { name: "Nueva York", lat: 40.7128, lon: -74.006 },
  { name: "Londres", lat: 51.5074, lon: -0.1278 },
  { name: "Tokio", lat: 35.6762, lon: 139.6503 },
  { name: "Sídney", lat: -33.8688, lon: 151.2093 },
  { name: "El Cairo", lat: 30.0444, lon: 31.2357 },
  { name: "Río de Janeiro", lat: -22.9068, lon: -43.1729 },
  { name: "Moscú", lat: 55.7558, lon: 37.6173 },
  { name: "Bombay", lat: 19.076, lon: 72.8777 },
  { name: "Ciudad del Cabo", lat: -33.9249, lon: 18.4241 },
  { name: "San Francisco", lat: 37.7749, lon: -122.4194 },
  { name: "Singapur", lat: 1.3521, lon: 103.8198 },
  { name: "Reikiavik", lat: 64.1466, lon: -21.9426 },
];

const ARCS = [
  ["Nueva York", "Londres"],
  ["Londres", "El Cairo"],
  ["Tokio", "Sídney"],
  ["Tokio", "San Francisco"],
  ["Bombay", "Ciudad del Cabo"],
  ["Río de Janeiro", "Londres"],
  ["Moscú", "Bombay"],
  ["Singapur", "Sídney"],
  ["San Francisco", "Nueva York"],
  ["Reikiavik", "Nueva York"],
];

const RADIUS = 2;
const COLOR_GREEN = 0x95bf47;
const COLOR_ORANGE = 0xff8a4c;
const COLOR_WIRE = 0x2a3a24;
const COLOR_TEXT = 0xeef1e9;

function latLonToVec3(lat, lon, radius) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function init() {
  const canvas = document.getElementById("globe-canvas");
  const hint = document.getElementById("hint");
  const container = document.getElementById("globe-container");
  const width = container.clientWidth;
  const height = container.clientHeight;

  // ---- Escena base -------------------------------------------------------
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 6);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  // ---- Campo de estrellas -------------------------------------------------
  const starGeo = new THREE.BufferGeometry();
  const starCount = 1400;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const r = 20 + Math.random() * 40;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    starPos[i * 3 + 2] = r * Math.cos(phi);
  }
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0x8a9188,
    size: 0.045,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
  });
  scene.add(new THREE.Points(starGeo, starMat));

  // ---- Núcleo sólido tenue -------------------------------------------------
  const coreGeo = new THREE.SphereGeometry(RADIUS * 0.985, 48, 48);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x0c0f14, transparent: true, opacity: 0.92 });
  globeGroup.add(new THREE.Mesh(coreGeo, coreMat));

  // ---- Malla de alambre -----------------------------------------------------
  const wireGeo = new THREE.SphereGeometry(RADIUS, 28, 20);
  const wireMat = new THREE.MeshBasicMaterial({ color: COLOR_WIRE, wireframe: true, transparent: true, opacity: 0.4 });
  globeGroup.add(new THREE.Mesh(wireGeo, wireMat));

  // ---- Atmósfera Fresnel (shader) --------------------------------------------
  const atmoMat = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    uniforms: { glowColor: { value: new THREE.Color(COLOR_GREEN) } },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      uniform vec3 glowColor;
      void main() {
        float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
        gl_FragColor = vec4(glowColor, intensity * 1.1);
      }
    `,
  });
  const atmoMesh = new THREE.Mesh(new THREE.SphereGeometry(RADIUS * 1.18, 48, 48), atmoMat);
  globeGroup.add(atmoMesh);

  // ---- Nodos (ciudades) --------------------------------------------------------
  const cityMap = {};
  const nodeGroup = new THREE.Group();
  CITIES.forEach((c) => {
    const pos = latLonToVec3(c.lat, c.lon, RADIUS);
    cityMap[c.name] = pos;

    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.02, 10, 10),
      new THREE.MeshBasicMaterial({ color: COLOR_ORANGE })
    );
    dot.position.copy(pos);
    nodeGroup.add(dot);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.028, 0.038, 24),
      new THREE.MeshBasicMaterial({ color: COLOR_ORANGE, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
    );
    ring.position.copy(pos);
    ring.lookAt(pos.clone().multiplyScalar(2));
    ring.userData.pulsePhase = Math.random() * Math.PI * 2;
    nodeGroup.add(ring);
  });
  globeGroup.add(nodeGroup);

  // ---- Arcos de vuelo + paquetes viajeros ------------------------------------
  const packets = [];
  const arcGroup = new THREE.Group();
  ARCS.forEach(([a, b]) => {
    const start = cityMap[a];
    const end = cityMap[b];
    if (!start || !end) return;

    const mid = start.clone().add(end).multiplyScalar(0.5);
    const liftFactor = 1 + start.distanceTo(end) / (RADIUS * 3.2);
    mid.normalize().multiplyScalar(RADIUS * liftFactor);

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const points = curve.getPoints(64);
    const geo = new THREE.BufferGeometry().setFromPoints(points);

    const colorA = new THREE.Color(COLOR_GREEN);
    const colorB = new THREE.Color(COLOR_ORANGE);
    const colors = new Float32Array(points.length * 3);
    for (let j = 0; j < points.length; j++) {
      const t = j / (points.length - 1);
      const c = colorA.clone().lerp(colorB, t);
      colors[j * 3] = c.r;
      colors[j * 3 + 1] = c.g;
      colors[j * 3 + 2] = c.b;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending });
    arcGroup.add(new THREE.Line(geo, mat));

    const packet = new THREE.Mesh(
      new THREE.SphereGeometry(0.028, 8, 8),
      new THREE.MeshBasicMaterial({ color: COLOR_TEXT, transparent: true, blending: THREE.AdditiveBlending })
    );
    packet.userData = { curve, offset: Math.random(), speed: 0.12 + Math.random() * 0.08 };
    arcGroup.add(packet);
    packets.push(packet);
  });
  globeGroup.add(arcGroup);

  // ---- Satélite orbital -----------------------------------------------------
  const satGroup = new THREE.Group();
  satGroup.rotation.x = THREE.MathUtils.degToRad(23);
  const satellite = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.045, 0),
    new THREE.MeshBasicMaterial({ color: COLOR_GREEN })
  );
  satellite.position.set(RADIUS * 1.6, 0, 0);
  satGroup.add(satellite);
  const orbitLine = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(new THREE.EllipseCurve(0, 0, RADIUS * 1.6, RADIUS * 1.6).getPoints(80)),
    new THREE.LineBasicMaterial({ color: COLOR_GREEN, transparent: true, opacity: 0.18 })
  );
  orbitLine.rotation.x = Math.PI / 2;
  satGroup.add(orbitLine);
  scene.add(satGroup);

  // ---- Interacción: arrastrar para rotar, rueda para zoom -----------------
  let isDragging = false;
  let prevX = 0;
  let prevY = 0;
  let velX = 0.0018;
  let velY = 0;

  canvas.addEventListener("pointerdown", (e) => {
    isDragging = true;
    prevX = e.clientX;
    prevY = e.clientY;
    if (hint) hint.style.opacity = "0";
  });

  window.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - prevX;
    const dy = e.clientY - prevY;
    velX = dx * 0.0026;
    velY = dy * 0.0026;
    globeGroup.rotation.y += velX;
    globeGroup.rotation.x = THREE.MathUtils.clamp(globeGroup.rotation.x + velY, -1.1, 1.1);
    prevX = e.clientX;
    prevY = e.clientY;
  });

  window.addEventListener("pointerup", () => {
    isDragging = false;
  });

  canvas.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      camera.position.z = THREE.MathUtils.clamp(camera.position.z + e.deltaY * 0.0025, 3.6, 9);
    },
    { passive: false }
  );

  // ---- Bucle de animación -----------------------------------------------------
  const clock = new THREE.Clock();
  function animate() {
    const t = clock.getElapsedTime();

    if (!isDragging) {
      globeGroup.rotation.y += velX;
      velX += (0.0011 - velX) * 0.02;
      velY *= 0.9;
    }

    nodeGroup.children.forEach((child) => {
      if (child.geometry.type === "RingGeometry") {
        const s = 1 + 0.5 * (0.5 + 0.5 * Math.sin(t * 2 + child.userData.pulsePhase));
        child.scale.set(s, s, s);
        child.material.opacity = 0.55 * (1 - 0.4 * Math.sin(t * 2 + child.userData.pulsePhase));
      }
    });

    packets.forEach((p) => {
      p.userData.offset = (p.userData.offset + p.userData.speed * 0.01) % 1;
      const pos = p.userData.curve.getPoint(p.userData.offset);
      p.position.copy(pos);
      p.material.opacity = 0.6 + 0.4 * Math.sin(t * 6 + p.userData.offset * 10);
    });

    satGroup.rotation.y = t * 0.35;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  // ---- Resize --------------------------------------------------------------
  window.addEventListener("resize", () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

window.addEventListener("DOMContentLoaded", init);
