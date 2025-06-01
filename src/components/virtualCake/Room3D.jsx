import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Text3D, Float, Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";
import img1 from "../../assets/img_1.jpg";

// Party Table Component
const PartyTable = () => {
  return (
    <group position={[0, -2, 0]}>
      {/* Table Top */}
      <mesh>
        <cylinderGeometry args={[2.5, 2.5, 0.1, 32]} />
        <meshPhysicalMaterial 
          color="#8B4513" 
          roughness={0.3}
          metalness={0.1}
          clearcoat={0.5}
        />
      </mesh>

      {/* Decorative Tablecloth */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[2.7, 2.7, 0.02, 32]} />
        <meshLambertMaterial color="#FFB6C1" transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

// Party Decorations Component
const PartyDecorations = ({ candlesLit }) => {
  const streamersRef = useRef();
  
  useFrame((state) => {
    if (streamersRef.current) {
      streamersRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={streamersRef}>
      {/* Hanging Streamers */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const x = Math.cos(angle) * 4;
        const z = Math.sin(angle) * 4;
        const colors = ["#FF69B4", "#00CED1", "#FFD700", "#FF6347", "#9370DB"];
        
        return (
          <group key={i} position={[x, 3, z]}>
            <mesh>
              <boxGeometry args={[0.1, 2, 0.05]} />
              <meshLambertMaterial color={colors[i % colors.length]} />
            </mesh>
          </group>
        );
      })}
      
      {/* Floating Party Elements */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[3, 2, -2]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshPhysicalMaterial color="#FF1493" roughness={0} metalness={0.8} />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[-3, 1.5, 2]}>
          <octahedronGeometry args={[0.4]} />
          <meshPhysicalMaterial color="#00FF7F" roughness={0.1} metalness={0.9} />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.7} floatIntensity={0.3}>
        <mesh position={[2, 3, 3]}>
          <dodecahedronGeometry args={[0.35]} />
          <meshPhysicalMaterial color="#FFD700" roughness={0.2} metalness={0.7} />
        </mesh>
      </Float>
    </group>
  );
};

// Room Walls with Modern Gradient
const RoomWalls = () => {
  return (
    <group>
      {/* Floor */}
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshLambertMaterial color="#2C1810" />
      </mesh> */}
      
      {/* Back Wall */}
      {/* <mesh position={[0, 2.5, -8]}>
        <planeGeometry args={[20, 10]} />
        <meshLambertMaterial color="#1A1A2E" />
      </mesh> */}
      
      {/* Left Wall */}
      {/* <mesh position={[-8, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[16, 10]} />
        <meshLambertMaterial color="#16213E" />
      </mesh> */}
      
      {/* Right Wall */}
      {/* <mesh position={[8, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[16, 10]} />
        <meshLambertMaterial color="#16213E" />
      </mesh> */}
      
      {/* Ceiling */}
      {/* <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 7, 0]}>
        <planeGeometry args={[20, 16]} />
        <meshLambertMaterial color="#0F3460" />
      </mesh> */}
    </group>
  );
};

// Dynamic Lighting System
const DynamicLighting = ({ candlesLit }) => {
  const spotLightRef = useRef();
  const ambientRef = useRef();
  
  useFrame((state) => {
    if (spotLightRef.current) {
      // Gentle swaying motion for spot light
      spotLightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      spotLightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.5;
    }
    
    // Adjust ambient lighting based on candles
    if (ambientRef.current) {
      ambientRef.current.intensity = candlesLit ? 0.6 : 0.3;
    }
  });

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight ref={ambientRef} intensity={candlesLit ? 0.6 : 0.3} color="#4A90E2" />
      
      {/* Main spot light on cake */}
      <spotLight
        ref={spotLightRef}
        position={[0, 6, 3]}
        angle={0.6}
        penumbra={0.5}
        intensity={candlesLit ? 1.2 : 0.8}
        color="#FFE4B5"
        castShadow
        target-position={[0, -1, 0]}
      />
      
      {/* Rim lighting */}
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#FF69B4" />
      <pointLight position={[5, 3, -5]} intensity={0.5} color="#00CED1" />
      
      {/* Party atmosphere lights */}
      <pointLight position={[0, 5, -6]} intensity={0.3} color="#9370DB" />
      
      {/* Candle glow effect when lit */}
      {candlesLit && (
        <pointLight position={[0, 0, 0]} intensity={0.8} color="#FFD700" distance={3} />
      )}
    </>
  );
};

// Magical Particles System
const MagicalParticles = ({ candlesLit }) => {
  return (
    <>
      {/* Sparkles around the cake */}
      <Sparkles 
        count={candlesLit ? 100 : 50}
        scale={6} 
        size={3} 
        speed={0.4} 
        color="#FFD700"
        position={[0, 1, 0]}
      />
      
      {/* Star field in background */}
      <Stars 
        radius={15} 
        depth={50} 
        count={200} 
        factor={4} 
        saturation={0} 
        fade={true}
        speed={0.5}
      />
      
      {/* Additional magical particles */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sparkles 
          count={30}
          scale={3} 
          size={2} 
          speed={0.2} 
          color="#FF69B4"
          position={[2, 2, 2]}
        />
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.7}>
        <Sparkles 
          count={25}
          scale={3} 
          size={2} 
          speed={0.3} 
          color="#00CED1"
          position={[-2, 2, -2]}
        />
      </Float>
    </>
  );
};

// Image Hangers Component
const ImageHangers = ({ count = 6 }) => {
  const frameGroupRef = useRef();
  
  // Load the image texture
  const imageTexture = useLoader(THREE.TextureLoader, img1);
  
  // Ensure count is within limits (min: 0, max: 8)
  const limitedCount = Math.max(0, Math.min(8, count));
  
  useFrame((state) => {
    if (frameGroupRef.current) {
      // Gentle swaying motion for all frames
      frameGroupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  // Function to generate evenly spaced frames with random heights
  const generateRandomFrames = (frameCount) => {
    // Early return if no frames to generate
    if (frameCount === 0) return [];
    
    const frames = [];
    const themes = ["🎂", "👨‍👩‍👧‍👦", "🎪", "🎉", "📸", "🌟", "💝", "🎈", "🌸", "⭐"];
    const colors = ["#8B4513", "#2F4F4F", "#4A4A4A", "#654321", "#696969", "#5D4037", "#3E2723", "#424242"];
    
    // Calculate frames per wall - now distributing across 4 walls
    const framesPerWall = Math.floor(frameCount / 4); // Distribute across 4 walls (back, left, right, front)
    const extraFrames = frameCount % 4;
    
    let frameIndex = 0;
    
    // Back wall frames - evenly spaced horizontally
    const backWallFrames = framesPerWall + (extraFrames > 0 ? 1 : 0);
    for (let i = 0; i < backWallFrames; i++) {
      const spacing = 10 / (backWallFrames + 1); // Distribute across 10 units width
      const xPos = -5 + spacing * (i + 1); // Start from -5 and space evenly
      
      frames.push({
        position: [
          xPos,
          1.5 + Math.random() * 3, // Random height between 1.5 and 4.5
          -6.8 + Math.random() * 0.3 // Slight depth variation
        ],
        rotation: [0, Math.random() * 0.2 - 0.1, 0], // Subtle random tilt
        size: [
          0.9 + Math.random() * 0.4, // width: 0.9 to 1.3
          0.8 + Math.random() * 0.5  // height: 0.8 to 1.3
        ],
        color: colors[frameIndex % colors.length],
        theme: themes[frameIndex % themes.length],
        img: imageTexture
      });
      frameIndex++;
    }
    
    // Left wall frames - evenly spaced along depth
    const leftWallFrames = framesPerWall + (extraFrames > 1 ? 1 : 0);
    for (let i = 0; i < leftWallFrames; i++) {
      const spacing = 10 / (leftWallFrames + 1); // Distribute across 10 units depth
      const zPos = -5 + spacing * (i + 1); // Start from -5 and space evenly
      
      frames.push({
        position: [
          -6.8 + Math.random() * 0.3,
          1.5 + Math.random() * 3, // Random height between 1.5 and 4.5
          zPos
        ],
        rotation: [0, Math.PI / 2 + Math.random() * 0.2 - 0.1, 0],
        size: [
          0.9 + Math.random() * 0.4,
          0.8 + Math.random() * 0.5
        ],
        color: colors[frameIndex % colors.length],
        theme: themes[frameIndex % themes.length],
        img: imageTexture
      });
      frameIndex++;
    }
    
    // Right wall frames - evenly spaced along depth
    const rightWallFrames = framesPerWall + (extraFrames > 2 ? 1 : 0);
    for (let i = 0; i < rightWallFrames; i++) {
      const spacing = 10 / (rightWallFrames + 1); // Distribute across 10 units depth
      const zPos = -5 + spacing * (i + 1); // Start from -5 and space evenly
      
      frames.push({
        position: [
          6.8 - Math.random() * 0.3,
          1.5 + Math.random() * 3, // Random height between 1.5 and 4.5
          zPos
        ],
        rotation: [0, -Math.PI / 2 + Math.random() * 0.2 - 0.1, 0],
        size: [
          0.9 + Math.random() * 0.4,
          0.8 + Math.random() * 0.5
        ],
        color: colors[frameIndex % colors.length],
        theme: themes[frameIndex % themes.length],
        img: imageTexture
      });
      frameIndex++;
    }
    
    // Front wall frames - evenly spaced horizontally (behind camera view)
    const frontWallFrames = framesPerWall + (extraFrames > 3 ? 1 : 0);
    for (let i = 0; i < frontWallFrames; i++) {
      const spacing = 8 / (frontWallFrames + 1); // Distribute across 8 units width (slightly smaller for front)
      const xPos = -4 + spacing * (i + 1); // Start from -4 and space evenly
      
      frames.push({
        position: [
          xPos,
          1.5 + Math.random() * 3, // Random height between 1.5 and 4.5
          6.8 - Math.random() * 0.3 // Slight depth variation (front wall)
        ],
        rotation: [0, Math.PI + Math.random() * 0.2 - 0.1, 0], // Face inward toward room
        size: [
          0.9 + Math.random() * 0.4,
          0.8 + Math.random() * 0.5
        ],
        color: colors[frameIndex % colors.length],
        theme: themes[frameIndex % themes.length],
        img: imageTexture
      });
      frameIndex++;
    }
    
    return frames;
  };

  // Generate frames based on limited count
  const frames = generateRandomFrames(limitedCount);

  return (
    <group ref={frameGroupRef}>
      {frames.map((frame, index) => (
        <Float
          key={index}
          speed={1 + index * 0.2}
          rotationIntensity={0.1}
          floatIntensity={0.2}
        >
          <group position={frame.position} rotation={frame.rotation}>
            {/* Picture Frame */}
            <group>
              {/* Frame Border */}
              <mesh>
                <boxGeometry args={[frame.size[0] + 0.2, frame.size[1] + 0.2, 0.1]} />
                <meshPhysicalMaterial 
                  color={frame.color}
                  roughness={0.4}
                  metalness={0.1}
                  clearcoat={0.8}
                />
              </mesh>
              
              {/* Picture/Canvas with actual image */}
              <mesh position={[0, 0, 0.051]}>
                <planeGeometry args={[frame.size[0], frame.size[1]]} />
                <meshLambertMaterial map={frame.img} />
              </mesh>
              
              {/* Hanging Wire/String */}
              <mesh position={[0, frame.size[1] / 2 + 0.3, 0]}>
                <cylinderGeometry args={[0.005, 0.005, 0.6, 8]} />
                <meshLambertMaterial color="#2C2C2C" />
              </mesh>
              
              {/* Wire attachment points */}
              <mesh position={[-frame.size[0] / 3, frame.size[1] / 2 + 0.1, 0.051]}>
                <cylinderGeometry args={[0.02, 0.02, 0.02, 8]} />
                <meshLambertMaterial color="#FFD700" />
              </mesh>
              <mesh position={[frame.size[0] / 3, frame.size[1] / 2 + 0.1, 0.051]}>
                <cylinderGeometry args={[0.02, 0.02, 0.02, 8]} />
                <meshLambertMaterial color="#FFD700" />
              </mesh>
              
              {/* Subtle glow effect for frames */}
              <pointLight 
                position={[0, 0, 0.5]} 
                intensity={0.5} 
                color="#FFE4B5" 
                distance={2} 
              />
            </group>
          </group>
        </Float>
      ))}
      
      {/* Additional wall decorations */}
      <WallDecorations />
    </group>
  );
};

// Additional Wall Decorations
const WallDecorations = () => {
  return (
    <group>
      {/* Wall Sconces */}
      {[-6, 6].map((x, index) => (
        <group key={index} position={[x, 4, -7.8]}>
          <Float speed={0.5} floatIntensity={0.1}>
            {/* Sconce Base */}
            <mesh>
              <cylinderGeometry args={[0.15, 0.2, 0.3, 8]} />
              <meshPhysicalMaterial 
                color="#C9B037" 
                roughness={0.2} 
                metalness={0.8} 
              />
            </mesh>
            
            {/* Sconce Light */}
            <pointLight 
              position={[0, 0, 0.3]} 
              intensity={0.3} 
              color="#FFA500" 
              distance={4} 
            />
            
            {/* Light effect */}
            <mesh position={[0, 0, 0.1]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshBasicMaterial 
                color="#FFA500" 
                transparent 
                opacity={0.6} 
              />
            </mesh>
          </Float>
        </group>
      ))}
      
      {/* Decorative Wall Patterns */}
      {[...Array(4)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 4;
        const x = Math.cos(angle) * 7.5;
        const z = Math.sin(angle) * 7.5;
        const rotation = [0, -angle, 0];
        
        return (
          <group key={i} position={[x, 3.5, z]} rotation={rotation}>
            <Float speed={1 + i * 0.3} rotationIntensity={0.05} floatIntensity={0.1}>
              {/* Decorative Diamond Pattern */}
              <mesh>
                <octahedronGeometry args={[0.2]} />
                <meshPhysicalMaterial 
                  color="#9370DB" 
                  roughness={0.1} 
                  metalness={0.9} 
                  transparent
                  opacity={0.7}
                />
              </mesh>
            </Float>
          </group>
        );
      })}
    </group>
  );
};

// Main Room3D Component
const Room3D = ({ candlesLit = true }) => {
  return (
    <group>
      {/* Room Structure */}
      <RoomWalls />
      
      {/* Furniture */}
      <PartyTable />
      
      {/* Decorations */}
      <PartyDecorations candlesLit={candlesLit} />
      
      {/* Lighting System */}
      <DynamicLighting candlesLit={candlesLit} />
      
      {/* Magical Effects */}
      <MagicalParticles candlesLit={candlesLit} />
      
      {/* Image Hangers */}
      <ImageHangers />
      
      {/* Fog effect for atmosphere */}
      <fog attach="fog" args={["#1A1A2E", 8, 20]} />
    </group>
  );
};

export default Room3D;