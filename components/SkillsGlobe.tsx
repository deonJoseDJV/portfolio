"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useMemo } from "react";

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

/* ================= GOLDEN SPHERE ================= */

function getSpherePoint(index: number, total: number) {
  const radius = 4.0;

  const phi = Math.acos(1 - (2 * (index + 0.5)) / total);
  const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5);

  return new THREE.Vector3(
    radius * Math.cos(theta) * Math.sin(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(phi)
  );
}

/* ================= GLOBE ================= */

function Globe() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.0015;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.8, 64, 64]} />
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
}: {
  index: number;
  total: number;
  skill: Skill;
  active: string | null;
  setActive: (v: string | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const texture = useTexture(skill.texture);

  const basePosition = useMemo(
    () => getSpherePoint(index, total),
    [index, total]
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
        scale={isActive ? 1.25 : 1}
      >
        <planeGeometry args={[0.75, 0.75]} />

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
          <Html distanceFactor={8}>
            {/* ✅ LIGHT/DARK SAFE */}
            <div className="px-3 py-1 rounded-full bg-black/80 dark:bg-black/80 backdrop-blur-md text-xs text-white border border-white/10 whitespace-nowrap">
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

  return (
    <div className="relative w-full h-[650px] md:h-[720px]">
      {/* subtle light-mode fix */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.18),transparent_65%)] dark:bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.18),transparent_65%)]" />

      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.9} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.6} />

        <Globe />

        {skills.map((skill, i) => (
          <FloatingIcon
            key={skill.name}
            index={i}
            total={skills.length}
            skill={skill}
            active={active}
            setActive={setActive}
          />
        ))}

        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}