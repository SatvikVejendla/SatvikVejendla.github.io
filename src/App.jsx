"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Text, useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function Factory({ aboutMePos, aboutMeRotation, startPos, startOrientation }) {
    const { scene, animations } = useGLTF("/factorylowpoly2.glb");
    const { camera } = useThree();
    const mixer = useRef();
    const hoveredRef = useRef(null);
    const originalPositionsRef = useRef(new Map());
    const leaveTimeoutRef = useRef(null);
    const targetCameraPosRef = useRef(null);
    const targetCameraRotationRef = useRef(null);
    const isQuaternionRotationRef = useRef(false);


    useEffect(() => {
        scene.traverse((obj) => {
          if (obj.isMesh) {
            // Enable shadows on all meshes
            obj.castShadow = true;
            obj.receiveShadow = true;
            // Lower image-based lighting influence from Environment
            const mat = obj.material;
            if (mat && 'envMapIntensity' in mat) {
              mat.envMapIntensity = 0.2;
              mat.needsUpdate = true;
            }
          }
          if (obj.isMesh && obj.material?.name === "Glass") {
            console.log("Glass found");
            obj.material = new THREE.MeshPhysicalMaterial({
              color: "white",
              roughness: 0,
              metalness: 0,
              transmission: 1,
              opacity: 0.9,
              transparent: true,
              ior: 1.1,
              thickness: 0.5,
              side: THREE.DoubleSide,
            });
          }
          let names = ["AboutMe", "Experience", "Skills", "Projects", "Contact"];
          if (names.includes(obj.name)) {
            obj.userData.clickable = true;
            originalPositionsRef.current.set(obj, [obj.position.x, obj.position.y, obj.position.z]);
          }

          const backButtons = ["AboutMeBack"];
          if (backButtons.includes(obj.name)) {
            obj.userData.clickable = true;
            obj.userData.backButton = true;
            originalPositionsRef.current.set(obj, [obj.position.x, obj.position.y, obj.position.z]);
          }

          if (obj.isMesh && (obj.name === "TVEmission")) {
            obj.material.emissive = obj.material.emissive || new THREE.Color(0xffaa33);
            obj.material.emissiveIntensity = 0.8;
            obj.material.needsUpdate = true;
          }
        });
      }, [scene]);
  
      useFrame((_, delta) => {
        mixer.current?.update(delta);
 
      // Animate camera position
      if (targetCameraPosRef.current) {
        const target = new THREE.Vector3(...targetCameraPosRef.current);
        camera.position.lerp(target, 0.05);
        
        // Check if we're close enough to stop animating
        if (camera.position.distanceTo(target) < 0.01) {
          //camera.position.copy(target);
          targetCameraPosRef.current = null;
        }
      }

      // Animate camera rotation using quaternion
      if (targetCameraRotationRef.current) {
        const rotation = targetCameraRotationRef.current;
        let targetQuaternion;
        
        if (isQuaternionRotationRef.current) {
          // Direct quaternion (x, y, z, w)
          targetQuaternion = new THREE.Quaternion(rotation[0], rotation[1], rotation[2], rotation[3]);
        } else {
          // Euler angles (x, y, z) with optional pitch adjustment
          targetQuaternion = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(rotation[0], rotation[1], rotation[2])
          );
          
          // If rotation has 4 elements, the 4th is a quaternion adjustment
          if (rotation.length === 4) {
            // Multiply with additional quaternion for pitch down
            const pitchQuaternion = new THREE.Quaternion().setFromAxisAngle(
              new THREE.Vector3(1, 0, 0), // X axis for pitch
              rotation[3] // Pitch angle in radians
            );
            targetQuaternion.multiply(pitchQuaternion);
          }
        }
        
        // Use slerp for smooth quaternion interpolation
        camera.quaternion.slerp(targetQuaternion, 0.05);
        
        // Check if we're close enough to stop animating
        if (camera.quaternion.angleTo(targetQuaternion) < 0.01) {
          //camera.quaternion.copy(targetQuaternion);
          targetCameraRotationRef.current = null;
          isQuaternionRotationRef.current = false;
        }
      }
 
      // Animate hovered objects
      if (hoveredRef.current) {
        scene.traverse((obj) => {
          if (obj.userData.clickable) {
            obj.position.x = originalPositionsRef.current.get(obj)[0];
            obj.position.y = originalPositionsRef.current.get(obj)[1];
            obj.position.z = originalPositionsRef.current.get(obj)[2];
          }
        });
        if(!hoveredRef.current.userData.backButton) {
          hoveredRef.current.position.x = originalPositionsRef.current.get(hoveredRef.current)[0];
          hoveredRef.current.position.y = originalPositionsRef.current.get(hoveredRef.current)[1] - 0.1;
          hoveredRef.current.position.z = originalPositionsRef.current.get(hoveredRef.current)[2];
        } else {
          hoveredRef.current.position.x = originalPositionsRef.current.get(hoveredRef.current)[0];
          hoveredRef.current.position.y = originalPositionsRef.current.get(hoveredRef.current)[1];
          hoveredRef.current.position.z = originalPositionsRef.current.get(hoveredRef.current)[2] + 0.005;
        }
        
      } else {
        scene.traverse((obj) => {
          if (obj.userData.clickable) {
            obj.position.x = originalPositionsRef.current.get(obj)[0];
            obj.position.y = originalPositionsRef.current.get(obj)[1];
            obj.position.z = originalPositionsRef.current.get(obj)[2];
          }
        });
      }
    });
  
    return (
    <>
        <primitive
            object={scene} 
            onClick={(e) => {
                e.stopPropagation();
                let obj = e.object;
                while (obj) {
                    if (obj.userData.clickable) {
                        console.log("Button clicked:", obj.name);
                        if (obj.userData.backButton) {
                            // Back button clicked - return to start position
                            if (startPos) {
                                targetCameraPosRef.current = startPos;
                            }
                            if (startOrientation) {
                                targetCameraRotationRef.current = startOrientation;
                                isQuaternionRotationRef.current = true; // startOrientation is a quaternion
                            }
                        } else if (obj.name === "AboutMe" && aboutMePos) {
                            targetCameraPosRef.current = aboutMePos;
                            if (aboutMeRotation) {
                                targetCameraRotationRef.current = aboutMeRotation;
                                isQuaternionRotationRef.current = false; // aboutMeRotation is Euler angles
                            }
                        }
                        break;
                    }
                    obj = obj.parent;
                }
            }}
            onPointerEnter={(e) => {
                e.stopPropagation();
                // Cancel any pending leave timeout
                if (leaveTimeoutRef.current) {
                    clearTimeout(leaveTimeoutRef.current);
                    leaveTimeoutRef.current = null;
                }
                
                let obj = e.object;
                let foundClickable = null;
                while (obj) {
                    if (obj.userData.clickable) {
                        foundClickable = obj;
                        break;
                    }
                    obj = obj.parent;
                }
                
                if (foundClickable) {
                    console.log("Pointer entered");
                    hoveredRef.current = foundClickable;
                } else {
                    // Entering a non-clickable object, clear hover state
                    hoveredRef.current = null;
                }
            }}
            onPointerLeave={(e) => {
                e.stopPropagation();
                // Clear any existing timeout
                console.log("Pointer left");
                if (leaveTimeoutRef.current) {
                    clearTimeout(leaveTimeoutRef.current);
                }
                
                // Use a small delay to check if we're moving to another child of the same parent
                leaveTimeoutRef.current = setTimeout(() => {
                    // Only clear if we're still not hovering over the same clickable parent
                    if (hoveredRef.current) {
                        hoveredRef.current = null;
                    }
                    leaveTimeoutRef.current = null;
                }, 50);
            }}
        />;
    </>)
  }

function CameraLogger() {
  const { camera } = useThree();
  
  useEffect(() => {
    const logCameraInfo = () => {
      console.log("Camera position:", {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      });
      console.log("Camera quaternion:", {
        x: camera.quaternion.x,
        y: camera.quaternion.y,
        z: camera.quaternion.z,
        w: camera.quaternion.w,
      });
    };
    
    // Log initial position and rotation
    logCameraInfo();
    
    // Log position and rotation on camera changes (using OrbitControls)
    const interval = setInterval(logCameraInfo, 1000);
    
    return () => clearInterval(interval);
  }, [camera]);
  
  return null;
}

function CameraController({ rotation }) {
  const { camera } = useThree();
  
  useEffect(() => {
    if (rotation.length === 4) {
        // Set camera quaternion directly
        camera.quaternion.set(rotation[0], rotation[1], rotation[2], rotation[3]);
        console.log("CameraController: Set quaternion to", rotation);
        console.log("CameraController: Applied quaternion", {
          x: camera.quaternion.x,
          y: camera.quaternion.y,
          z: camera.quaternion.z,
          w: camera.quaternion.w,
        });
        console.log("CameraController: Resulting rotation (Euler)", {
          x: camera.rotation.x,
          y: camera.rotation.y,
          z: camera.rotation.z,
        });
    }
  }, [camera, rotation]);
  
  return null;
}

function TicketAnimation({ onComplete }) {
  const ticketSize = "80vw";
  const ticketHeight = "80vh";
  const leftTicketRef = useRef(null);
  const centerTicketRef = useRef(null);
  const rightTicketRef = useRef(null);
  const positionsRef = useRef({
    left: -70,
    center: 50,
    right: 90,
  });
  const animationRef = useRef(null);

  useEffect(() => {
    const speed = 0.1; // vw per frame
    const ticketWidth = 80; // vw

    const animate = () => {
      // Update positions
      positionsRef.current.left -= speed;
      positionsRef.current.center -= speed;
      positionsRef.current.right -= speed;

      // Wrap tickets when they go off screen on the left
      // Calculate right edges: for left/right tickets it's position + ticketWidth
      // For center ticket (uses translateX(-50%)), right edge is center + ticketWidth/2
      const getRightEdge = (pos, isCenter) => {
        return isCenter ? pos + ticketWidth / 2 : pos + ticketWidth;
      };

      const leftRightEdge = getRightEdge(positionsRef.current.left, false);
      const centerRightEdge = getRightEdge(positionsRef.current.center, true);
      const rightRightEdge = getRightEdge(positionsRef.current.right, false);

      // Find the actual rightmost edge
      const rightmostEdge = Math.max(leftRightEdge, centerRightEdge, rightRightEdge);

      if (positionsRef.current.left < -ticketWidth) {
        // Place left ticket's left edge at the rightmost edge
        positionsRef.current.left = rightmostEdge;
      }
      if (positionsRef.current.center < -ticketWidth / 2) {
        // Place center ticket so its center is at rightmostEdge + ticketWidth/2
        positionsRef.current.center = rightmostEdge + ticketWidth / 2;
      }
      if (positionsRef.current.right < -ticketWidth) {
        // Place right ticket's left edge at the rightmost edge
        positionsRef.current.right = rightmostEdge;
      }

      // Update DOM
      if (leftTicketRef.current) {
        leftTicketRef.current.style.left = `${positionsRef.current.left}vw`;
      }
      if (centerTicketRef.current) {
        centerTicketRef.current.style.left = `${positionsRef.current.center}vw`;
        centerTicketRef.current.style.transform = "translateX(-50%)";
      }
      if (rightTicketRef.current) {
        rightTicketRef.current.style.left = `${positionsRef.current.right}vw`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const [progress, setProgress] = useState(0);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    // Reset progress to 0 on mount/reload
    setProgress(0);
    
    // Clear any existing timeouts
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];
    
    // Define events that need to complete
    // Each event takes 2 seconds
    const events = [
      { name: "loadingScene", duration: 10 },
      { name: "loadingAssets", duration: 10 },
      { name: "initializingFactory", duration: 10 },
      { name: "preparingExperience", duration: 500 },
    ];

    const totalEvents = events.length;
    const progressPerEvent = 100 / totalEvents;

    const processEvent = (eventIndex) => {
      if (eventIndex >= totalEvents) {
        setProgress(100);
        // Trigger transition after a short delay
        if (onComplete) {
          setTimeout(() => {
            onComplete();
          }, 500);
        }
        return;
      }

      const event = events[eventIndex];
      
      // Simulate event completion after duration
      const timeout = setTimeout(() => {
        const newProgress = (eventIndex + 1) * progressPerEvent;
        setProgress(newProgress);
        
        // Process next event
        processEvent(eventIndex + 1);
      }, event.duration);

      timeoutsRef.current.push(timeout);
    };

    // Start processing events
    processEvent(0);

    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Progress bar background */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: `${progress}%`,
          height: "100%",
          background: `linear-gradient(90deg, 
            #5E3719 0%, 
            #70411A 20%, 
            #824A1C 40%, 
            #94541D 60%, 
            #A65D1F 80%, 
            #B86720 100%)`,
          transition: "width 0.1s linear",
          zIndex: 0,
          boxShadow: "inset 0 0 50px rgba(255, 215, 0, 0.3)",
        }}
      />
      {/* Left ticket */}
      <img
        ref={leftTicketRef}
        src="/wonkaticket.png"
        alt="Wonka Ticket"
        style={{
          width: ticketSize,
          height: ticketHeight,
          objectFit: "contain",
          position: "absolute",
          left: "-70vw",
          zIndex: 1,
        }}
      />
      {/* Center ticket */}
      <img
        ref={centerTicketRef}
        src="/wonkaticket.png"
        alt="Wonka Ticket"
        style={{
          width: ticketSize,
          height: ticketHeight,
          objectFit: "contain",
          position: "absolute",
          left: "50vw",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      />
      {/* Right ticket */}
      <img
        ref={rightTicketRef}
        src="/wonkaticket.png"
        alt="Wonka Ticket"
        style={{
          width: ticketSize,
          height: ticketHeight,
          objectFit: "contain",
          position: "absolute",
          left: "90vw",
          zIndex: 1,
        }}
      />
    </div>
  );
}

function BlackBackground() {
    return (
      <mesh scale={-1}>
        <sphereGeometry args={[200, 32, 32]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
    );
  }

  
export default function Home() {
  const [showScene, setShowScene] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleComplete = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowScene(true);
    }, 500);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "g" || e.key === "G") {
        setIsTransitioning(true);
        setTimeout(() => {
          setShowScene(true);
        }, 500);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const aboutMePos = [3.9, 4.8, 4];
  const aboutMeRotation = [0, Math.PI, 0, -0.1];
  const startPos = [-13.02, 6.97, 16.93];
  const startOrientation = [-0.272, -0.2104, -0.0611, 0.9369];
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Ticket Animation */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: isTransitioning ? 0 : 1,
          transition: "opacity 0.5s ease-out",
          pointerEvents: showScene ? "none" : "auto",
        }}
      >
        <TicketAnimation onComplete={handleComplete} />
      </div>
      
      {/* 3D Scene */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: showScene ? 1 : 0,
          transition: "opacity 0.5s ease-in",
          pointerEvents: showScene ? "auto" : "none",
        }}
      >
        <Canvas
          shadows
          camera={{ position: startPos, rotation: startOrientation }}
          gl={{
            physicallyCorrectLights: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.1, // lower exposure for darker scene
          }}
        >      <fog attach="fog" args={["#000000", 25, 30]} />

          <BlackBackground />
          <ambientLight intensity={0} />
          {/* Replace broad directional light with a tight spotlight. setcolor blue */}
          <spotLight
            position={[-12, 8, 5]}
            intensity={200}
            color="#8888ff"
            angle={Math.PI}           /* smaller angle = tighter cone */
            penumbra={0.6}         /* softer edge */
            distance={200}          /* light falloff distance */
            decay={0.4}
          />
          {/* Pink spotlight */}
          <spotLight
            position={[5, 14, 5]}
            intensity={200}
            color="#9F2B68"
            angle={Math.PI}           /* smaller angle = tighter cone */
            penumbra={0.6}         /* softer edge */
            distance={200}          /* light falloff distance */
            decay={0.2}
          />
          <directionalLight
            position={[5, 14, 7]}
            intensity={10}
            color="#ffffff"
          />
          <pointLight
            position={[5, 4, 7]}
            intensity={20}
            distance={100}
            decay={0.2}
            color="#ffffff"
          />
          <pointLight
            position={[3.9, 4.95, 4]}
            intensity={20}
            distance={100}
            decay={0.2}
            color="#ffffff"
          />
          {/* Image-based lighting can over-brighten the scene; dial it down or remove */}
          <Environment preset="sunset" intensity={0} />
          <CameraController rotation={startOrientation} />
          {/* <OrbitControls /> */}

          {/* <CameraLogger /> */}
          <Factory aboutMePos={aboutMePos} aboutMeRotation={aboutMeRotation} startPos={startPos} startOrientation={startOrientation} />
        </Canvas>
      </div>
    </div>
  );
}
