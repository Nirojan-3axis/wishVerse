import React, { useRef } from "react";

// Cake layer component
const CakeLayer = ({ position, radius, height, color, flavor, shape = "round" }) => {
  const meshRef = useRef();

  // Get texture based on flavor
  const getTextureForFlavor = (flavor) => {
    switch (flavor) {
      case "chocolate":
        return "#5D4037";
      case "redvelvet":
        return "#C62828";
      case "strawberry":
        return "#F8BBD0";
      case "lemon":
        return "#FFF59D";
      default:
        return "#FFECB3"; // vanilla
    }
  };

  const cakeColor = getTextureForFlavor(flavor);

  // Render different cake shapes based on the selection
  const renderCakeGeometry = () => {
    switch (shape) {
      case "square":
        return (
          <>
            {/* Main cake body */}
            <boxGeometry args={[radius * 2, height, radius * 2]} />
            {/* Frosting layer */}
            <mesh position={[0, height / 2 + 0.05, 0]}>
              <boxGeometry args={[radius * 2, 0.1, radius * 2]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </>
        );
      case "star":
        return (
          <>
            {/* Create a star-shaped cake using a cylinder with more segments */}
            <cylinderGeometry 
              args={[
                radius * 1.3,  // top radius
                radius * 1.3,  // bottom radius
                height,        // height
                5,             // radial segments (5 for a star)
                1,             // height segments
                false          // open ended
              ]} 
            />
            {/* Frosting on top */}
            <mesh position={[0, height / 2 + 0.05, 0]}>
              <cylinderGeometry 
                args={[
                  radius * 1.3, 
                  radius * 1.3, 
                  0.1, 
                  5, 
                  1, 
                  false
                ]} 
              />
              <meshStandardMaterial color={color} />
            </mesh>
          </>
        );
      default: // "round"
        return (
          <>
            {/* Main cake body */}
            <cylinderGeometry args={[radius, radius, height, 32]} />
            {/* Frosting on top */}
            <mesh position={[0, height / 2 + 0.05, 0]}>
              <cylinderGeometry args={[radius, radius, 0.1, 32]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </>
        );
    }
  };

  return (
    <mesh position={position} ref={meshRef}>
      {renderCakeGeometry()}
      <meshStandardMaterial color={cakeColor} />
    </mesh>
  );
};

export default CakeLayer;