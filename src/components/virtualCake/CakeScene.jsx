import React from "react";
import { OrbitControls } from "@react-three/drei";
import CakeLayer from "./CakeLayer";
import Toppings from "./Toppings";
import { Candles, ExtinguishedCandles } from "./Candles";
import BirthdayBalloons from "./BirthdayBalloons";
import Room3D from "./Room3D";

// Complete 3D cake scene with room environment
const CakeScene = ({ cakeOptions, candlesLit = true }) => {
  // Calculate positions and dimensions based on number of layers
  const calculateLayers = () => {
    const layers = [];
    const maxRadius = 1.5;
    const layerHeight = 0.5;

    for (let i = 0; i < cakeOptions.layers; i++) {
      const radius = maxRadius * (1 - i * 0.15);
      const y = i * layerHeight - 1; // Position layers on the table
      layers.push({ radius, y });
    }

    return layers;
  };

  const layers = calculateLayers();
  const topLayer = layers[layers.length - 1];

  return (
    <>
      {/* 3D Room Environment */}
      <Room3D candlesLit={candlesLit} />

      {/* Render cake layers */}
      {layers.map((layer, index) => (
        <CakeLayer
          key={index}
          position={[0, layer.y, 0]}
          radius={layer.radius}
          height={0.5}
          color={cakeOptions.color}
          flavor={cakeOptions.flavor}
          shape={cakeOptions.shape}
        />
      ))}

      {/* Add toppings to the top layer */}
      <Toppings
        position={[0, topLayer.y + 0.3, 0]}
        radius={topLayer.radius}
        type={cakeOptions.topping}
        color={cakeOptions.color}
      />

      {/* Add candles on top of the cake only if they're lit */}
      {candlesLit && (
        <Candles 
          position={[0, topLayer.y + 0.3, 0]} 
          radius={topLayer.radius} 
          count={cakeOptions.candleCount} 
          color="#FFC107" 
        />
      )}

      {/* Add extinguished candles when blown out */}
      {!candlesLit && (
        <ExtinguishedCandles
          position={[0, topLayer.y + 0.3, 0]}
          radius={topLayer.radius}
          count={cakeOptions.candleCount}
          color="#FFC107"
        />
      )}
      
      {/* Birthday Message Balloon Decoration - above the cake */}
      <BirthdayBalloons 
        message={cakeOptions.message} 
        position={[0, topLayer.y + 1.5, 0]} 
        radius={topLayer.radius}
        cakeOptions={cakeOptions}
      />

      <OrbitControls 
        enablePan={true} 
        enableZoom={cakeOptions.zoom} 
        enableRotate={true} 
        minDistance={4} 
        maxDistance={12} 
        autoRotate={true} 
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  );
};

export default CakeScene;