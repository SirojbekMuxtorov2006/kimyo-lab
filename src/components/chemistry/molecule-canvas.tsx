"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { atomAppearance, molecules, type MoleculeId } from "@/data/molecules";
import { cn } from "@/lib/utils";

interface MoleculeCanvasProps {
  moleculeId: MoleculeId;
  className?: string;
  autoRotate?: boolean;
}

function Bond({
  start,
  end,
  order,
}: {
  start: [number, number, number];
  end: [number, number, number];
  order: 1 | 2;
}) {
  const bonds = React.useMemo(() => {
    const from = new THREE.Vector3(...start);
    const to = new THREE.Vector3(...end);
    const dir = to.clone().sub(from);
    const length = dir.length();
    const axis = dir.clone().normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      axis
    );
    const midpoint = from.clone().add(to).multiplyScalar(0.5);
    // perpendicular offset for double bonds
    const perpendicular =
      Math.abs(axis.y) === 1
        ? new THREE.Vector3(1, 0, 0)
        : new THREE.Vector3()
            .crossVectors(axis, new THREE.Vector3(0, 1, 0))
            .normalize();
    const offsets =
      order === 2
        ? [perpendicular.clone().multiplyScalar(0.12), perpendicular.clone().multiplyScalar(-0.12)]
        : [new THREE.Vector3(0, 0, 0)];

    return offsets.map((offset) => ({
      position: midpoint.clone().add(offset),
      quaternion,
      height: length,
      key:
        order === 2
          ? offset.x
          : `single-${midpoint.x}-${midpoint.y}-${midpoint.z}`,
    }));
  }, [start, end, order]);

  return (
    <React.Fragment>
      {bonds.map((bond, index) => (
        <mesh
          key={Array.isArray(bond.key) ? bond.key.join("-") : `${bond.key}-${index}`}
          position={[bond.position.x, bond.position.y, bond.position.z]}
          quaternion={bond.quaternion}
        >
          <cylinderGeometry args={[order === 2 ? 0.07 : 0.09, order === 2 ? 0.07 : 0.09, bond.height, 16, 1]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.15} roughness={0.55} />
        </mesh>
      ))}
    </React.Fragment>
  );
}

export function MoleculeCanvas({ moleculeId, className, autoRotate = true }: MoleculeCanvasProps) {
  const definition = molecules[moleculeId];

  return (
    <div className={cn("h-full w-full", className)}>
      <Canvas
        camera={{ position: [0, 0.8, 5.1], fov: 38 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "auto" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 6]} intensity={1.15} color="#ffffff" />
        <pointLight position={[-5, -3, 4]} intensity={0.55} color="#60a5fa" />
        <pointLight position={[5, 2, -4]} intensity={0.4} color="#22d3ee" />

        <Float speed={1.2} rotationIntensity={0.28} floatIntensity={0.55}>
          <group scale={1.35}>
            {definition.bonds.map((bond, index) => (
              <Bond
                key={`bond-${index}`}
                start={definition.atoms[bond.a].position}
                end={definition.atoms[bond.b].position}
                order={bond.order}
              />
            ))}
            {definition.atoms.map((atom, index) => (
              <mesh
                key={`atom-${index}`}
                position={atom.position}
                castShadow
              >
                <sphereGeometry
                  args={[atomAppearance[atom.element].radius * 0.72, 40, 40]}
                />
                <meshPhysicalMaterial
                  color={atomAppearance[atom.element].color}
                  roughness={0.24}
                  metalness={0.06}
                  clearcoat={0.65}
                  clearcoatRoughness={0.2}
                />
              </mesh>
            ))}
          </group>
        </Float>

        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.1}
          autoRotate={autoRotate}
          autoRotateSpeed={0.75}
          minDistance={3.2}
          maxDistance={7}
          rotateSpeed={0.65}
        />
      </Canvas>
    </div>
  );
}
