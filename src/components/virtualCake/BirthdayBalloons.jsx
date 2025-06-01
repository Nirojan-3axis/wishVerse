import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

// Message Sparkles component for added decoration around text
const MessageSparkles = ({ count, radius }) => {
  const sparkleRefs = useRef([]);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Animate each sparkle
    sparkleRefs.current.forEach((sparkle, i) => {
      if (sparkle) {
        // Rotate and pulse
        sparkle.rotation.z = t * (0.5 + i * 0.05);
        sparkle.scale.setScalar(0.8 + Math.sin(t * 3 + i) * 0.2);
        
        // Subtle position adjustments
        sparkle.position.y = Math.sin(t * 2 + i) * 0.03;
        sparkle.position.x += Math.sin(t * 3 + i * 0.5) * 0.001;
        sparkle.position.z += Math.cos(t * 2 + i * 0.5) * 0.001;
        
        // Keep within boundaries
        const dist = Math.sqrt(sparkle.position.x ** 2 + sparkle.position.z ** 2);
        if (dist > radius * 0.7) {
          const angle = Math.atan2(sparkle.position.z, sparkle.position.x);
          sparkle.position.x = Math.cos(angle) * radius * 0.7;
          sparkle.position.z = Math.sin(angle) * radius * 0.7;
        }
      }
    });
  });
  
  // Create an array of sparkles positioned randomly around the text
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const distance = (0.3 + Math.random() * 0.5) * radius;
        
        return (
          <mesh 
            key={i}
            ref={el => sparkleRefs.current[i] = el}
            position={[
              Math.cos(angle) * distance,
              (Math.random() - 0.5) * 0.4,
              Math.sin(angle) * distance
            ]}
          >
            <planeGeometry args={[0.06, 0.06]} />
            <meshBasicMaterial 
              color={["#FFD700", "#FF90E8", "#64FFDA", "#00BFFF"][i % 4]} 
              transparent={true}
              opacity={0.8}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Helper function to generate decorative balloons
const generateFancyBalloons = (count, radius) => {
  // Generate a set of colors for the balloons
  const balloonColors = [
    "#FF5252", // Red
    "#FFD740", // Yellow
    "#64FFDA", // Teal
    "#448AFF", // Blue
    "#E040FB", // Purple
    "#FF6E40", // Orange
  ];

  // Create an array to hold the balloons
  const balloons = [];
  
  // Refs for animation
  const balloonRefs = Array(Math.min(Math.max(count, 6), 12)).fill().map(() => useRef());

  // Animation for balloon movement
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    balloonRefs.forEach((ref, i) => {
      if (ref.current) {
        // Create gentle floating effect
        ref.current.position.y += Math.sin(t * 1 + i) * 0.0008;
        ref.current.rotation.z = Math.sin(t * 0.5 + i) * 0.04;
        
        // Subtle side-to-side movement
        ref.current.position.x += Math.sin(t * 0.8 + i * 2) * 0.0005;
        ref.current.position.z += Math.cos(t * 0.8 + i * 2) * 0.0005;
      }
    });
  });

  // Determine how many balloons to create
  const balloonCount = Math.min(Math.max(count, 6), 12);

  // Create balloons arranged in a semicircle above the cake
  for (let i = 0; i < balloonCount; i++) {
    // Calculate position in a semicircle pattern (only the top half)
    const angle = (i / (balloonCount - 1)) * Math.PI;
    const x = Math.sin(angle) * radius * 0.8;
    const y = Math.cos(angle) * radius * 0.5 + 1.0;
    
    // Random offsets to make it look more natural, but smaller
    const xOffset = (Math.random() - 0.5) * 0.2;
    const yOffset = (Math.random() - 0.5) * 0.2;
    
    // Create a balloon with string
    const balloonColor = balloonColors[i % balloonColors.length];
    const isMetallic = Math.random() > 0.6;
    
    balloons.push(
      <group 
        key={i} 
        position={[x + xOffset, y + yOffset, 0]}
        ref={balloonRefs[i]}
      >
        {/* Balloon - with optional metallic effect */}
        <mesh>
          <sphereGeometry args={[0.15, 32, 32]} />
          {isMetallic ? (
            <meshStandardMaterial 
              color={balloonColor} 
              metalness={0.8} 
              roughness={0.2} 
              envMapIntensity={1.5}
            />
          ) : (
            <meshStandardMaterial 
              color={balloonColor} 
              emissive={balloonColor} 
              emissiveIntensity={0.2}
              roughness={0.6}
            />
          )}
        </mesh>
        
        {/* Balloon highlight */}
        <mesh position={[-0.05, 0.05, 0.07]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="white" transparent opacity={0.3} />
        </mesh>
        
        {/* Balloon knot */}
        <mesh position={[0, -0.15, 0]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color={balloonColor} />
        </mesh>
        
        {/* Balloon string - curved path */}
        <mesh position={[0, -0.3, 0]}>
          <tubeGeometry 
            args={[
              new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0.02, -0.1, 0.01),
                new THREE.Vector3(-0.02, -0.2, -0.01),
                new THREE.Vector3(0, -0.3, 0)
              ]),
              8,
              0.003,
              8
            ]} 
          />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    );
  }

  return balloons;
};

// Birthday Balloons component that displays a message with balloons
const BirthdayBalloons = ({ message, position, radius, cakeOptions }) => {
  const colors = ['#FF5252', '#FFD740', '#64FFDA', '#448AFF', '#E040FB', '#FF6E40'];
  const letterColors = Array.from(message).map((_, i) => colors[i % colors.length]);
  
  // Get balloon count and message color from cakeOptions context
  const messageColor = cakeOptions.messageColor || "#FFFFFF";
  const balloonCount = cakeOptions.balloonCount || 12;
  
  // Animation for the text
  const textRef = useRef();
  
  useFrame(({ clock }) => {
    if (textRef.current) {
      // Gentle floating animation
      const t = clock.getElapsedTime();
      textRef.current.position.y = 0.8 + Math.sin(t * 1.5) * 0.05;
      
      // Subtle rotation
      textRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
    }
  });
  
  return (
    <group position={position}>
      {/* Enhanced 3D message text with animation and effects */}
      <group ref={textRef}>
        {/* Glow effect */}
        <Text
          position={[0, 0, 0]}
          fontSize={0.32}
          characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!.,;:?-+&"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineBlur={0.07}
          outlineColor="#FFA0FE"
          outlineOpacity={0.4}
          strokeWidth={0}
          fillOpacity={0}
          depthOffset={.6}
        >
          {message}
        </Text>
        
        {/* Colorful 3D text with user-customized styling */}
        <Text
          position={[0, 0, 0]}
          fontSize={0.32}
          characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!.,;:?-+&"
          color={cakeOptions.messageColor || "#FFFFFF"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={cakeOptions.outlineWidth || 0.04}
          outlineColor={cakeOptions.outlineColor || "#5C2E91"}
          outlineOpacity={1}
          strokeWidth={cakeOptions.strokeWidth || 0.01}
          strokeColor={cakeOptions.strokeColor || "#FF90E8"}
          strokeOpacity={0.7}
          depthOffset={0}
          fontWeight="bold"
        >
          {message}
        </Text>

        {/* Sparkles around the text for added flair */}
        <MessageSparkles count={Math.min(balloonCount + 8, 28)} radius={radius * 0.6} />
      </group>

      {/* Decorative balloons around the text */}
      {generateFancyBalloons(balloonCount, radius)}
    </group>
  );
};

export default BirthdayBalloons;