"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useMemo, useEffect } from "react";

/* ================= TYPES ================= */

type Skill = {
  name: string;
  texture: string;
  category: "mern" | "ai" | "tool" | "lang" | "db";
};

/* ================= SKILLS ================= */

const skills: Skill[] = [
  { name: "React", texture: "/react.png", category: "mern" },
  { name: "Node.js", texture: "/node.png", category: "mern" },
  { name: "Express.js", texture: "/express.png", category: "mern" },
  { name: "MongoDB", texture: "/mongodb.png", category: "mern" },

  { name: "JavaScript", texture: "/javascript.png", category: "lang" },
  { name: "Python", texture: "/python.png", category: "lang" },
  { name: "C++", texture: "/cpp.png", category: "lang" },

  { name: "PostgreSQL", texture: "/postgres.png", category: "db" },
  { name: "Firebase", texture: "/firebase.png", category: "db" },

  { name: "Git", texture: "/git.png", category: "tool" },
  { name: "Linux", texture: "/linux.png", category: "tool" },
  { name: "Postman", texture: "/postman.png", category: "tool" },

  { name: "Machine Learning", texture: "/ml.png", category: "ai" },
  { name: "Data Science", texture: "/datascience.png", category: "ai" },
  { name: "OpenAI API", texture: "/openai.png", category: "ai" },
];

/* ================= COLORS ================= */

const categoryColor: Record<Skill["category"], string> = {
  mern: "#22c55e",
  ai: "#8b5cf6",
  tool: "#f59e0b",
  lang: "#3b82f6",
  db: "#ef4444",
};

/* ================= RESPONSIVE HOOK ================= */

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

/* ================= GOLDEN SPHERE ================= */

function getSpherePoint(index: number, total: number, radius: number) {
  const phi = Math.acos(1 - (2 * (index + 0.5)) / total);
  const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5);

  return new THREE.Vector3(
    radius * Math.cos(theta) * Math.sin(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(phi)
  );
}

/* ================= GLOBE ================= */

function Globe({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.0015;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[isMobile ? 2.2 : 2.8, 64, 64]} />
      <meshStandardMaterial
        color="#1E1D26"
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

/* ================= FLOATING ICON ================= */

function FloatingIcon({
  index,
  total,
  skill,
  active,
  setActive,
  isMobile,
}: {
  index: number;
  total: number;
  skill: Skill;
  active: string | null;
  setActive: (v: string | null) => void;
  isMobile: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const texture = useTexture(skill.texture);

  // ✅ responsive radius
  const radius = isMobile ? 3.1 : 4.0;

  const basePosition = useMemo(
    () => getSpherePoint(index, total, radius),
    [index, total, radius]
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const t = clock.getElapsedTime() * 0.15;

    const rotated = basePosition.clone().applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      t
    );

    meshRef.current.position.copy(rotated);
    meshRef.current.lookAt(camera.position);

    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);

    const dot = rotated.clone().normalize().dot(camDir);
    const opacity = THREE.MathUtils.smoothstep(dot, -0.5, 0.5);

    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = opacity;
    mat.transparent = true;
    mat.depthWrite = false;
  });

  const isActive = active === skill.name;
  const glowColor = categoryColor[skill.category];

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        onClick={() => setActive(isActive ? null : skill.name)}
        onPointerEnter={() => setActive(skill.name)}
        onPointerLeave={() => setActive(null)}
        scale={isActive ? (isMobile ? 1.15 : 1.25) : isMobile ? 0.85 : 1}
      >
        {/* ✅ responsive icon size */}
        <planeGeometry args={[isMobile ? 0.6 : 0.75, isMobile ? 0.6 : 0.75]} />

        <meshBasicMaterial
          map={texture}
          transparent
          opacity={1}
          depthWrite={false}
          toneMapped={false}
        />

        {isActive && (
          <mesh scale={1.45}>
            <ringGeometry args={[0.6, 0.75, 32]} />
            <meshBasicMaterial
              color={glowColor}
              transparent
              opacity={0.7}
            />
          </mesh>
        )}

        {isActive && (
          <Html distanceFactor={isMobile ? 6 : 8}>
            <div className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs text-white border border-white/10 whitespace-nowrap">
              {skill.name}
            </div>
          </Html>
        )}
      </mesh>
    </Float>
  );
}

/* ================= MAIN ================= */

export default function SkillsGlobe() {
  const [active, setActive] = useState<string | null>(null);
  const isMobile = useIsMobile();

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] md:h-[720px]">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.18),transparent_65%)]" />

      <Canvas
        camera={{
          position: [0, 0, isMobile ? 7 : 8], // ✅ responsive camera
          fov: isMobile ? 55 : 50,
        }}
      >
        <ambientLight intensity={0.9} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.6} />

        <Globe isMobile={isMobile} />

        {skills.map((skill, i) => (
          <FloatingIcon
            key={skill.name}
            index={i}
            total={skills.length}
            skill={skill}
            active={active}
            setActive={setActive}
            isMobile={isMobile}
          />
        ))}

        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}