import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

export type SculptureMode = 'orbit' | 'exploded' | 'prism';

interface OracleHeroSceneProps {
  activeSectionHint?: string;
}

const _vec3 = new THREE.Vector3();
const _mat4 = new THREE.Matrix4();
const _quat = new THREE.Quaternion();
const _scale = new THREE.Vector3();
const _euler = new THREE.Euler();

function createBrushedBumpTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 2) {
      const shade = 112 + Math.floor((Math.sin(y * 0.45) + 1) * 16 + ((y * 37) % 14));
      ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
      ctx.fillRect(0, y, 256, 1);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  return tex;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 122);
    grad.addColorStop(0, 'rgba(204, 29, 185, 0.28)');
    grad.addColorStop(0.45, 'rgba(255, 163, 2, 0.14)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createSignalArcGeometry(
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number,
  depth: number,
): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerR, startAngle, endAngle, false);
  shape.absarc(0, 0, innerR, endAngle, startAngle, true);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.025,
    bevelSegments: 2,
    curveSegments: 28,
  });
  geo.center();
  return geo;
}

export function OracleHeroScene({ activeSectionHint }: OracleHeroSceneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modeRef = useRef<SculptureMode>('orbit');
  const resetFlagRef = useRef<boolean>(false);
  const [mode, setMode] = useState<SculptureMode>('orbit');
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [webglFallback, setWebglFallback] = useState(false);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let isSoftwareGl = false;
    try {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) {
        setWebglFallback(true);
        return;
      }
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param) ?? '');
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      setWebglFallback(true);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFallback(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.setAttribute('data-testid', 'hero-3d-canvas');
    renderer.domElement.setAttribute('aria-label', 'Interactive 3D Online Oracle Signal Sculpture');
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.045);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 520;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 80);
    camera.position.set(0, 0.45, 7.2);
    renderer.setSize(width, height, false);

    // Three-point warm/cool architectural studio lighting
    const hemiLight = new THREE.HemisphereLight(0xcfd8ff, 0x1a0918, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffdca8, 2.4);
    keyLight.position.set(5, 6, 6);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.left = -4;
      keyLight.shadow.camera.right = 4;
      keyLight.shadow.camera.top = 4;
      keyLight.shadow.camera.bottom = -4;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimMagenta = new THREE.PointLight(0xcc1db9, 14, 18, 1.6);
    rimMagenta.position.set(-4.5, -1.8, -2.5);
    scene.add(rimMagenta);

    const rimOrange = new THREE.PointLight(0xffa302, 12, 18, 1.6);
    rimOrange.position.set(4.2, 2.6, -2.2);
    scene.add(rimOrange);

    // Shared procedural bump & shadow maps
    const brushedBump = createBrushedBumpTexture();
    brushedBump.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const shadowTex = createContactShadowTexture();

    // Materials with calibrated roughness contrast (>= 0.25 delta between adjacent parts)
    const obsidianGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x14131c,
      metalness: 0.15,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transmission: isSoftwareGl ? 0 : 0.45,
      thickness: 1.4,
      ior: 1.65,
      transparent: true,
      opacity: isSoftwareGl ? 0.88 : 1.0,
      envMapIntensity: 1.4,
    });

    const coreAmberEmissiveMat = new THREE.MeshStandardMaterial({
      color: 0xffa302,
      emissive: 0xffa302,
      emissiveIntensity: 0.9,
      metalness: 0.75,
      roughness: 0.22,
    });

    const brushedOrangeMat = new THREE.MeshPhysicalMaterial({
      color: 0xffa302,
      metalness: 0.88,
      roughness: 0.24,
      bumpMap: brushedBump,
      bumpScale: 0.015,
      clearcoat: 0.5,
      envMapIntensity: 1.35,
    });

    const brushedMagentaMat = new THREE.MeshPhysicalMaterial({
      color: 0xcc1db9,
      metalness: 0.82,
      roughness: 0.32,
      bumpMap: brushedBump,
      bumpScale: 0.015,
      clearcoat: 0.45,
      envMapIntensity: 1.25,
    });

    const matteCarbonMat = new THREE.MeshStandardMaterial({
      color: 0x1e1d26,
      metalness: 0.25,
      roughness: 0.78,
    });

    const chromeAccentMat = new THREE.MeshStandardMaterial({
      color: 0xf4f4f8,
      metalness: 0.95,
      roughness: 0.16,
    });

    // Composite Hero Sculpture (10 distinct sculptural parts inside THREE.Group)
    const sculptureRoot = new THREE.Group();
    scene.add(sculptureRoot);

    // Part 1: Inner faceted energy nucleus
    const coreGeo = new THREE.IcosahedronGeometry(0.58, 1);
    const coreNucleus = new THREE.Mesh(coreGeo, coreAmberEmissiveMat);
    sculptureRoot.add(coreNucleus);

    // Part 2: Faceted obsidian crystal oracle sphere shell
    const outerCrystalGeo = new THREE.IcosahedronGeometry(0.95, 2);
    const outerCrystal = new THREE.Mesh(outerCrystalGeo, obsidianGlassMat);
    outerCrystal.castShadow = !isSoftwareGl;
    outerCrystal.renderOrder = 2;
    sculptureRoot.add(outerCrystal);

    // Part 3: Precision wireframe lattice collar around crystal
    const cageGeo = new THREE.IcosahedronGeometry(1.06, 1);
    const cageEdges = new THREE.EdgesGeometry(cageGeo);
    const cageMat = new THREE.LineBasicMaterial({
      color: 0xffa302,
      transparent: true,
      opacity: 0.55,
    });
    const crystalCage = new THREE.LineSegments(cageEdges, cageMat);
    sculptureRoot.add(crystalCage);

    // Part 4: Primary anodized orange equatorial gimbal ring
    const ringOrangeGeo = new THREE.TorusGeometry(1.62, 0.065, 20, 72);
    const ringOrange = new THREE.Mesh(ringOrangeGeo, brushedOrangeMat);
    ringOrange.rotation.x = Math.PI * 0.36;
    ringOrange.castShadow = !isSoftwareGl;
    sculptureRoot.add(ringOrange);

    // Part 5: Secondary magenta meridian gimbal ring
    const ringMagentaGeo = new THREE.TorusGeometry(1.94, 0.055, 20, 72);
    const ringMagenta = new THREE.Mesh(ringMagentaGeo, brushedMagentaMat);
    ringMagenta.rotation.y = Math.PI * 0.28;
    ringMagenta.rotation.x = -Math.PI * 0.24;
    ringMagenta.castShadow = !isSoftwareGl;
    sculptureRoot.add(ringMagenta);

    // Part 6: Matte carbon structural outer ring (high roughness contrast)
    const ringCarbonGeo = new THREE.TorusGeometry(2.28, 0.04, 16, 80);
    const ringCarbon = new THREE.Mesh(ringCarbonGeo, matteCarbonMat);
    ringCarbon.rotation.x = Math.PI * 0.48;
    ringCarbon.rotation.z = 0.22;
    sculptureRoot.add(ringCarbon);

    // Parts 7, 8, 9: Three beveled ExtrudeGeometry broadcast signal wave arcs (directly echoing Online Oracle logo)
    const waveGroup = new THREE.Group();
    sculptureRoot.add(waveGroup);

    const waveArc1Geo = createSignalArcGeometry(1.18, 1.34, 0.18, 1.38, 0.09);
    const waveArc1 = new THREE.Mesh(waveArc1Geo, brushedOrangeMat);
    waveArc1.position.set(0.35, 0.35, 0.42);
    waveGroup.add(waveArc1);

    const waveArc2Geo = createSignalArcGeometry(1.52, 1.68, 0.14, 1.42, 0.09);
    const waveArc2 = new THREE.Mesh(waveArc2Geo, brushedMagentaMat);
    waveArc2.position.set(0.45, 0.45, 0.22);
    waveGroup.add(waveArc2);

    const waveArc3Geo = createSignalArcGeometry(1.86, 2.02, 0.12, 1.45, 0.08);
    const waveArc3 = new THREE.Mesh(waveArc3Geo, chromeAccentMat);
    waveArc3.position.set(0.55, 0.55, 0.0);
    waveGroup.add(waveArc3);

    // Part 10: 6 Precision Orbital Discipline Nodes
    const nodesGroup = new THREE.Group();
    sculptureRoot.add(nodesGroup);
    const nodeGeo = new THREE.OctahedronGeometry(0.11, 0);
    const nodeCollarGeo = new THREE.TorusGeometry(0.17, 0.016, 10, 24);
    const orbitNodes: THREE.Group[] = [];

    for (let i = 0; i < 6; i++) {
      const nodeHolder = new THREE.Group();
      const mat = i % 2 === 0 ? brushedOrangeMat : brushedMagentaMat;
      const gem = new THREE.Mesh(nodeGeo, mat);
      const collar = new THREE.Mesh(nodeCollarGeo, chromeAccentMat);
      collar.rotation.x = Math.PI / 2;
      nodeHolder.add(gem, collar);

      const angle = (i / 6) * Math.PI * 2;
      const radius = i % 2 === 0 ? 1.62 : 2.28;
      nodeHolder.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 2) * 0.42,
        Math.sin(angle) * radius,
      );
      nodeHolder.userData = { baseAngle: angle, baseRadius: radius, yOffset: Math.sin(angle * 2) * 0.42 };
      nodesGroup.add(nodeHolder);
      orbitNodes.push(nodeHolder);
    }

    // Subtle grounded floor aura disc & architectural calibration ring below
    const shadowPlaneGeo = new THREE.CircleGeometry(2.6, 48);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const shadowDisc = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowDisc.rotation.x = -Math.PI / 2;
    shadowDisc.position.y = -2.35;
    scene.add(shadowDisc);

    const floorRingGeo = new THREE.RingGeometry(2.25, 2.28, 64);
    const floorRingMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.14,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const floorRing = new THREE.Mesh(floorRingGeo, floorRingMat);
    floorRing.rotation.x = -Math.PI / 2;
    floorRing.position.y = -2.33;
    scene.add(floorRing);

    // Instanced Signal Constellation (76 micro-prisms with per-instance color variation)
    const particleCount = 76;
    const particleGeo = new THREE.OctahedronGeometry(0.032, 0);
    const particleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.7,
      roughness: 0.25,
    });
    const constellation = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
    constellation.frustumCulled = false;

    const palette = [
      new THREE.Color(0xffa302),
      new THREE.Color(0xcc1db9),
      new THREE.Color(0xffffff),
    ];
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 2.9 + (i % 5) * 0.42;
      _vec3.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi) * 0.75,
        r * Math.sin(phi) * Math.sin(theta),
      );
      _euler.set(i * 0.4, i * 0.7, i * 0.2);
      _quat.setFromEuler(_euler);
      const s = 0.7 + ((i * 19) % 10) * 0.09;
      _scale.set(s, s, s);
      _mat4.compose(_vec3, _quat, _scale);
      constellation.setMatrixAt(i, _mat4);
      constellation.setColorAt(i, palette[i % palette.length]);
    }
    constellation.instanceMatrix.needsUpdate = true;
    if (constellation.instanceColor) constellation.instanceColor.needsUpdate = true;
    scene.add(constellation);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Interactive pointer drag & parallax
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let targetRotY = 0.35;
    let targetRotX = 0.14;
    let currentRotY = 0.35;
    let currentRotX = 0.14;
    let pointerParallaxX = 0;
    let pointerParallaxY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        pointerParallaxX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.35;
        pointerParallaxY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.25;
      }
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      targetRotY += dx * 0.008;
      targetRotX = THREE.MathUtils.clamp(targetRotX + dy * 0.006, -0.85, 0.85);
    };
    const onPointerUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglFallback(true);
    };
    domEl.addEventListener('webglcontextlost', onContextLost);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(260, Math.floor(entry.contentRect.width));
        const h = Math.max(260, Math.floor(entry.contentRect.height));
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      }
    });
    resizeObserver.observe(container);

    // Damped animated state variables
    let explodedFactor = 0;
    let targetCameraZ = 7.2;
    let currentCameraZ = 7.2;
    let frameId = 0;
    let disposed = false;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (disposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 85);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 100);
      }
    }

    function renderFrame() {
      if (disposed) return;
      const dt = Math.min(clock.getDelta(), 0.08);
      const elapsed = clock.getElapsedTime();

      if (resetFlagRef.current) {
        targetRotY = 0.35;
        targetRotX = 0.14;
        resetFlagRef.current = false;
      }

      const activeMode = modeRef.current;
      const targetExploded = activeMode === 'exploded' ? 1 : 0;
      targetCameraZ = activeMode === 'prism' ? 5.15 : activeMode === 'exploded' ? 7.9 : 7.05;

      explodedFactor = THREE.MathUtils.damp(explodedFactor, targetExploded, 4.5, dt);
      currentCameraZ = THREE.MathUtils.damp(currentCameraZ, targetCameraZ, 4.2, dt);

      if (!prefersReducedMotion && !isDragging) {
        targetRotY += dt * (activeMode === 'prism' ? 0.34 : 0.22);
      }

      currentRotY = THREE.MathUtils.damp(currentRotY, targetRotY + pointerParallaxX, 5.5, dt);
      currentRotX = THREE.MathUtils.damp(currentRotX, targetRotX + pointerParallaxY, 5.5, dt);

      sculptureRoot.rotation.y = currentRotY;
      sculptureRoot.rotation.x = currentRotX;
      sculptureRoot.position.y = prefersReducedMotion ? 0 : Math.sin(elapsed * 1.15) * 0.11;

      // Exploded architecture separation
      outerCrystal.scale.setScalar(1 + explodedFactor * 0.12);
      crystalCage.scale.setScalar(1 + explodedFactor * 0.26);
      crystalCage.rotation.y = -elapsed * 0.18;
      coreNucleus.rotation.y = elapsed * 0.55;
      coreNucleus.rotation.x = elapsed * 0.35;

      ringOrange.position.y = explodedFactor * 0.62;
      ringOrange.rotation.z = elapsed * 0.24;

      ringMagenta.position.y = -explodedFactor * 0.58;
      ringMagenta.rotation.z = -elapsed * 0.2;

      ringCarbon.scale.setScalar(1 + explodedFactor * 0.2);
      ringCarbon.rotation.z = 0.22 + elapsed * 0.1;

      waveArc1.position.set(
        0.35 + explodedFactor * 0.22,
        0.35 + explodedFactor * 0.22,
        0.42 + explodedFactor * 0.35,
      );
      waveArc2.position.set(
        0.45 + explodedFactor * 0.42,
        0.45 + explodedFactor * 0.42,
        0.22 + explodedFactor * 0.55,
      );
      waveArc3.position.set(
        0.55 + explodedFactor * 0.65,
        0.55 + explodedFactor * 0.65,
        0.0 + explodedFactor * 0.78,
      );

      for (let i = 0; i < orbitNodes.length; i++) {
        const node = orbitNodes[i];
        const data = node.userData as { baseAngle: number; baseRadius: number; yOffset: number };
        const angle = data.baseAngle + (prefersReducedMotion ? 0 : elapsed * (i % 2 === 0 ? 0.35 : -0.25));
        const r = data.baseRadius + explodedFactor * 0.55;
        node.position.set(
          Math.cos(angle) * r,
          data.yOffset * (1 + explodedFactor * 0.9),
          Math.sin(angle) * r,
        );
        node.rotation.y = elapsed * 1.2 + i;
      }

      constellation.rotation.y = prefersReducedMotion ? 0.2 : elapsed * 0.055;
      constellation.rotation.x = prefersReducedMotion ? 0.1 : Math.sin(elapsed * 0.2) * 0.06;

      camera.position.z = currentCameraZ;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

      if (prefersReducedMotion) {
        return;
      }
      if (isSoftwareGl) {
        afterDraw(renderFrame);
      } else {
        frameId = requestAnimationFrame(renderFrame);
      }
    }

    renderFrame();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domEl.removeEventListener('webglcontextlost', onContextLost);

      coreGeo.dispose();
      outerCrystalGeo.dispose();
      cageGeo.dispose();
      cageEdges.dispose();
      ringOrangeGeo.dispose();
      ringMagentaGeo.dispose();
      ringCarbonGeo.dispose();
      waveArc1Geo.dispose();
      waveArc2Geo.dispose();
      waveArc3Geo.dispose();
      nodeGeo.dispose();
      nodeCollarGeo.dispose();
      shadowPlaneGeo.dispose();
      floorRingGeo.dispose();
      particleGeo.dispose();

      obsidianGlassMat.dispose();
      coreAmberEmissiveMat.dispose();
      brushedOrangeMat.dispose();
      brushedMagentaMat.dispose();
      matteCarbonMat.dispose();
      chromeAccentMat.dispose();
      cageMat.dispose();
      shadowPlaneMat.dispose();
      floorRingMat.dispose();
      particleMat.dispose();

      brushedBump.dispose();
      shadowTex.dispose();
      envTarget.dispose();
      renderer.dispose();

      if (domEl.parentNode === container) {
        container.removeChild(domEl);
      }
    };
  }, []);

  const handleResetView = () => {
    setMode('orbit');
    resetFlagRef.current = true;
  };

  return (
    <div
      className="relative w-full h-[420px] sm:h-[500px] lg:h-[580px] rounded-2xl bg-[#07070A] border border-white/10 overflow-hidden select-none"
      data-sculpture-mode={mode}
      data-hint={activeSectionHint ?? 'hero'}
    >
      {/* Subtle radial studio spotlight behind 3D canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 52% 45%, rgba(255,163,2,0.14) 0%, rgba(204,29,185,0.12) 38%, rgba(0,0,0,0) 72%)',
        }}
      />

      {webglFallback ? (
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-8 text-center">
          <div className="h-44 w-44 rounded-full border-2 border-[#FFA302]/60 flex items-center justify-center relative">
            <div className="h-32 w-32 rounded-full border border-[#CC1DB9]/70 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#FFA302] to-[#CC1DB9]" />
            </div>
          </div>
          <p className="mt-6 text-sm text-neutral-300 max-w-xs">
            Interactive 3D Oracle Signal Sculpture — drag-ready WebGL viewport.
          </p>
        </div>
      ) : (
        <div
          ref={mountRef}
          className="relative z-10 h-full w-full cursor-grab active:cursor-grabbing"
        />
      )}

      {/* Minimal bottom dock (solid rgba, zero backdrop-blur over WebGL) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center w-max max-w-[calc(100%-24px)]">
        <button
          type="button"
          onClick={() => setControlsCollapsed((prev) => !prev)}
          aria-expanded={!controlsCollapsed}
          aria-label={controlsCollapsed ? 'Show 3D view controls' : 'Hide 3D view controls'}
          className="mb-1.5 inline-flex items-center gap-1.5 rounded-t-md bg-[#0E0E13] px-3 py-1 text-xs font-medium text-neutral-300 border border-white/15 hover:text-white transition-colors whitespace-nowrap"
        >
          {controlsCollapsed ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" />
              <span>3D Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" />
              <span>Hide Controls</span>
            </>
          )}
        </button>

        {!controlsCollapsed && (
          <div
            role="group"
            aria-label="3D Sculpture View Modes"
            className="flex items-center justify-center gap-1 sm:gap-1.5 rounded-xl bg-[#0D0D12]/95 border border-white/15 px-2 py-1.5 sm:px-2.5 sm:py-2"
          >
            {(
              [
                { id: 'orbit', label: 'Signal Orbit' },
                { id: 'exploded', label: 'Exploded Layers' },
                { id: 'prism', label: 'Oracle Core' },
              ] as const
            ).map((opt) => {
              const active = mode === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setMode(opt.id)}
                  aria-pressed={active}
                  className={`px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#FFA302] text-black font-semibold'
                      : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}

            <button
              type="button"
              onClick={handleResetView}
              aria-label="Reset 3D camera view"
              title="Reset view"
              className="ml-0.5 inline-flex items-center justify-center rounded-lg p-1.5 text-neutral-300 hover:bg-white/10 hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
