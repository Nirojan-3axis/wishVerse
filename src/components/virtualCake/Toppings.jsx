import React from "react";

// Toppings component
const Toppings = ({ position, radius, type, color }) => {
  switch (type) {
    case "sprinkles":
      return (
        <group position={position}>
          {[...Array(30)].map((_, i) => (
            <mesh key={i} position={[(Math.random() - 0.5) * radius * 1.5, 0.05, (Math.random() - 0.5) * radius * 1.5]}>
              <boxGeometry args={[0.05, 0.05, 0.2]} />
              <meshStandardMaterial color={["#FF5252", "#FFD740", "#64FFDA", "#448AFF", "#E040FB"][i % 5]} />
            </mesh>
          ))}
        </group>
      );

    case "fruit":
      return (
        <group position={position}>
          {[...Array(8)].map((_, i) => (
            <mesh key={i} position={[(Math.random() - 0.5) * radius * 1.2, 0.15, (Math.random() - 0.5) * radius * 1.2]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color={["#E53935", "#7CB342", "#FF9800", "#8E24AA", "#D81B60"][i % 5]} />
            </mesh>
          ))}
        </group>
      );

    case "chocolate":
      return (
        <group position={position}>
          {[...Array(12)].map((_, i) => {
            const scale = 0.6 + Math.random() * 0.4;
            return (
              <mesh
                key={i}
                position={[(Math.random() - 0.5) * radius * 1.5, 0.05, (Math.random() - 0.5) * radius * 1.5]}
                rotation={[0, Math.random() * Math.PI, 0]}
              >
                <boxGeometry args={[0.2 * scale, 0.05 * scale, 0.4 * scale]} />
                <meshStandardMaterial color="#5D4037" />
              </mesh>
            );
          })}
        </group>
      );

    case "flowers":
      return (
        <group position={position}>
          {[...Array(5)].map((_, i) => (
            <group key={i} position={[(Math.random() - 0.5) * radius * 1.2, 0.1, (Math.random() - 0.5) * radius * 1.2]}>
              {/* Flower petals */}
              {[...Array(5)].map((_, j) => (
                <mesh key={j} position={[Math.sin((j * Math.PI * 2) / 5) * 0.15, 0, Math.cos((j * Math.PI * 2) / 5) * 0.15]}>
                  <sphereGeometry args={[0.1, 8, 8]} />
                  <meshStandardMaterial color={["#F48FB1", "#CE93D8", "#FFAB91"][i % 3]} />
                </mesh>
              ))}
              {/* Flower center */}
              <mesh position={[0, 0.05, 0]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshStandardMaterial color="#FFF176" />
              </mesh>
            </group>
          ))}
        </group>
      );

    default:
      return null;
  }
};

export default Toppings;