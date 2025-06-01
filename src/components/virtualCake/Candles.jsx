import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Animated candle flame component with improved animation
const CandleFlame = ({ position }) => {
  const flameRef = useRef();
  const innerFlameRef = useRef();
  const coreFlameRef = useRef();
  const smokeRef = useRef();
  const flickerRef = useRef();

  // Create random flicker values for more natural movement
  const flickerValues = useMemo(
    () => ({
      baseIntensity: Math.random() * 0.2 + 0.8,
      flickerSpeed: Math.random() * 2 + 2,
      sizeVariation: Math.random() * 0.1 + 0.05,
      windOffset: Math.random() * Math.PI * 2,
    }),
    []
  );

  // Animation for the flame with improved realism
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const { baseIntensity, flickerSpeed, sizeVariation, windOffset } =
      flickerValues;

    // Main flame animation with more complex movement
    if (flameRef.current) {
      // Primary flickering motion
      const flicker1 = Math.sin(t * flickerSpeed) * sizeVariation;
      const flicker2 = Math.sin(t * (flickerSpeed * 1.3) + 1) * (sizeVariation * 0.7);
      const flicker3 = Math.sin(t * (flickerSpeed * 0.7) + 2) * (sizeVariation * 0.5);

      // Wind effect
      const wind = Math.sin(t * 0.8 + windOffset) * 0.15;

      // Apply complex scaling
      flameRef.current.scale.x = baseIntensity + flicker1 + flicker2 * 0.5;
      flameRef.current.scale.y = 1.0 + flicker1 * 0.8 + flicker3;
      flameRef.current.scale.z = baseIntensity + flicker2;

      // Flame swaying motion
      flameRef.current.rotation.z = wind + Math.sin(t * 2.1) * 0.08;
      flameRef.current.position.x = Math.sin(t * 1.5) * 0.01;
    }

    // Inner flame with different timing
    if (innerFlameRef.current) {
      const innerFlicker = Math.sin(t * (flickerSpeed * 1.5) + 0.5) * (sizeVariation * 0.8);
      const innerWind = Math.cos(t * 1.2 + windOffset) * 0.1;

      innerFlameRef.current.scale.x = 1.0 + innerFlicker;
      innerFlameRef.current.scale.y = 1.0 + innerFlicker * 1.2;
      innerFlameRef.current.scale.z = 1.0 + innerFlicker * 0.6;
      innerFlameRef.current.rotation.z = innerWind;
    }

    // Flame core with rapid flickering
    if (coreFlameRef.current) {
      const coreFlicker = Math.sin(t * (flickerSpeed * 2.5)) * 0.3;
      coreFlameRef.current.scale.setScalar(1.0 + coreFlicker);

      // Intensity variation for emissive material
      if (coreFlameRef.current.material) {
        coreFlameRef.current.material.emissiveIntensity = 3 + coreFlicker * 2;
      }
    }

    // Smoke particles animation
    if (smokeRef.current) {
      smokeRef.current.position.y = 0.1 + Math.sin(t * 0.5) * 0.02;
      smokeRef.current.rotation.y = t * 0.3;
      smokeRef.current.scale.setScalar(0.8 + Math.sin(t * 0.8) * 0.2);
    }

    // Flicker effect for additional sparks
    if (flickerRef.current) {
      flickerRef.current.rotation.y = t * 2;
      flickerRef.current.position.y = Math.sin(t * 4) * 0.01;
    }
  });

  return (
    <group position={position}>
      {/* Enhanced point light with flickering - REDUCED INTENSITY */}
      <pointLight
        intensity={0.4}  // Reduced from 0.8
        distance={1.5}   // Slightly reduced from 2
        color="#FF8F00"
        castShadow={false}
      />

      {/* Additional warm glow - REDUCED INTENSITY */}
      <pointLight
        intensity={0.1}  // Reduced from 0.3
        distance={0.6}   // Reduced from 1
        color="#FFD54F"
        position={[0, 0.02, 0]}
      />

      {/* Outer flame - tear drop shape */}
      <mesh ref={flameRef} position={[0, 0.02, 0]}>
        <sphereGeometry args={[0.06, 8, 12]} />
        <meshStandardMaterial
          color="#FF6D00"
          emissive="#FF8F00"
          emissiveIntensity={1.5}  // Reduced from 2.5
          transparent={true}
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Middle flame layer */}
      <mesh ref={innerFlameRef} position={[0, 0.01, 0]}>
        <sphereGeometry args={[0.04, 8, 10]} />
        <meshStandardMaterial
          color="#FFA726"
          emissive="#FFCC02"
          emissiveIntensity={2}  // Reduced from 3
          transparent={true}
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner flame core - brightest part */}
      <mesh ref={coreFlameRef} position={[0, -0.01, 0]}>
        <sphereGeometry args={[0.025, 6, 8]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFF176"
          emissiveIntensity={3}  // Reduced from 4
          transparent={true}
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Smoke effect */}
      <mesh ref={smokeRef} position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.02, 6, 6]} />
        <meshStandardMaterial
          color="#424242"
          transparent={true}
          opacity={0.1}
          blending={THREE.NormalBlending}
        />
      </mesh>

      {/* Flicker sparks */}
      <group ref={flickerRef}>
        {[...Array(3)].map((_, i) => {
          const angle = (i * Math.PI * 2) / 3;
          const radius = 0.03;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;

          return (
            <mesh key={i} position={[x, 0.05 + i * 0.01, z]}>
              <sphereGeometry args={[0.008, 4, 4]} />
              <meshStandardMaterial
                color="#FFEB3B"
                emissive="#FF9800"
                emissiveIntensity={2}
                transparent={true}
                opacity={0.6}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          );
        })}
      </group>

      {/* Base glow effect */}
      <mesh position={[0, -0.02, 0]}>
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial
          color="#FF8F00"
          transparent={true}
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

// Candles component
const Candles = ({ position, radius, count = 5, color = "#FFF59D" }) => {
  // Arrange candles in a circular pattern
  const angleStep = (Math.PI * 2) / count;

  return (
    <group position={position}>
      {[...Array(count)].map((_, i) => {
        const angle = i * angleStep;
        const distance = radius * 0.7; // Place candles inside the cake top edge
        const x = Math.sin(angle) * distance;
        const z = Math.cos(angle) * distance;

        return (
          <group key={i} position={[x, 0, z]}>
            {/* Candle stick */}
            <mesh position={[0, 0.2, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
              <meshStandardMaterial color={color} />
            </mesh>

            {/* Animated candle flame */}
            <CandleFlame position={[0, 0.45, 0]} />
          </group>
        );
      })}
    </group>
  );
};

// Extinguished candle component
const ExtinguishedCandle = ({ position }) => {
  return (
    <group position={position}>
      {/* Candle stick */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#FFF59D" />
      </mesh>
    </group>
  );
};

// Extinguished candles component
const ExtinguishedCandles = ({ position, radius, count = 5, color = "#FFF59D" }) => {
  // Arrange candles in a circular pattern
  const angleStep = (Math.PI * 2) / count;

  return (
    <group position={position}>
      {[...Array(count)].map((_, i) => {
        const angle = i * angleStep;
        const distance = radius * 0.7; // Place candles inside the cake top edge
        const x = Math.sin(angle) * distance;
        const z = Math.cos(angle) * distance;

        return <ExtinguishedCandle key={i} position={[x, 0, z]} />;
      })}
    </group>
  );
};

export { Candles, ExtinguishedCandles, CandleFlame };