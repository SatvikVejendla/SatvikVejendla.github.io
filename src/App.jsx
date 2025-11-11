"use client";

import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Text, useGLTF, OrbitControls, Environment, Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

let DEBUG_MODE = false;

const EXPERIENCE_DATA = {
  rutgers1: {
    company: "Rutgers University",
    role: "Engineering Lab Research Assistant",
    date: "Sep 2023 - May 2024",
    description: [
      "- Developed Puppeteer web scripts to maintain an accurate inventory of laboratory documents",
      "- Conducted independent experiments for research projects like optimization of muti-arm pose planning"
    ],
    skills: ["Python", "Web Scraping", "Pandas"],
    offset: 1.26
  },
  rutgers2: {
    company: "Rutgers University",
    role: "Undergraduate Enrollment Services Technician",
    date: "Sep 2024 - Jan 2025",
    description: [
      "- Developed automation scripts to streamlined the processing of incoming student applications",
      "- Ensured seamless uploads to the Rutgers Salesforce database"
    ],
    skills: ["Python", "Salesforce", "Automation"],
    offset: 1.16
  },
  depton: {
    company: "Depton LLC",
    role: "Software Engineer Intern",
    date: "Jun 2024 - Jan 2025",
    description: [
      "- Engineered a distributed web scraping framework for real-time stock ticker aggregation.",
      "- Led the end-to-end development of the company’s main internal web platform using Next.js",
    ],
    skills: ["TypeScript", "Next.js", "Client-Server Architecture"],
    offset: 1.06
  },
  hone: {
    company: "Hone Health",
    role: "Software Engineer Intern",
    date: "Jan 2025 - May 2025",
    description: [
      "- Engineered an Azure DevOps extension to analyze historical tickets via semantic embedding search",
      "- Built and optimized an ETL pipeline for webhook event ingestion into Azure Blob Storage and KQL eventhouse, ",
      "- Architected a SQL migration automation system to version-control production data for complex bulk migrations."
    ],
    skills: ["C#", ".NET", "SQL", "Azure"],
    offset: 0.96
  },
  jpmc: {
    company: "JPMorgan Chase & Co.",
    role: "Software Engineer Intern",
    date: "Jun 2025 - Aug 2025",
    description: [
      "- Worked within the Asset & Wealth Management AI team to design, evaluate, and deploy AI-driven financial solutions",
      "- – Developed and productionized an LLM regression testing and evaluation framework for internal AI teams.",
      "- Engineered a generalized document automation pipeline for large-scale Q&A workflows (RFPs, Compliance, etc."
    ],
    skills: ["TypeScript", "Python", "API Design", "Regression Testing", "LangSmith"],
    offset: 0.86
  },
  teachshare: {
    company: "TeachShare",
    role: "Software Engineer Intern",
    date: "Jun 2025 - Present",
    description: [
      "- Engineered an AI-powered autograder system leveraging LLMs to automatically evaluate student submissions",
      "- Integrated semantic analysis pipelines for rubric alignment and contextual feedback generation using GPT and Gemini.",
      "- EdTech startup for supporting teachers with AI-powered tools to streamline lesson planning and assessment."
    ],
    skills: ["TypeScript", "LLMs", "Solid JS"],
    offset: 0.76
  }
};

function Factory({ aboutMePos, aboutMeRotation, startPos, startOrientation, experiencePos, experienceOrientation }) {
    const { scene, animations } = useGLTF("/factorylowpoly2.glb");
    const { camera } = useThree();
    const mixer = useRef();
    const hoveredRef = useRef(null);
    const originalPositionsRef = useRef(new Map());
    const leaveTimeoutRef = useRef(null);
    const targetCameraPosRef = useRef(null);
    const targetCameraRotationRef = useRef(null);
    const isQuaternionRotationRef = useRef(false);
    const conveyorXRef = useRef([]);
    const conveyorInitialWorldXRef = useRef(new Map());
    const chocolateBallRef = useRef(null);
    const isInExperienceViewRef = useRef(false);
    const scrollTimeoutRef = useRef(null);
    const rutgers1Ref = useRef(null);
    const rutgers2Ref = useRef(null);
    const deptonRef = useRef(null);
    const honeRef = useRef(null);
    const jpmcRef = useRef(null);
    const teachshareRef = useRef(null);
    const conveyorXBound = useRef(0);
    const initialExperiencePosRef = useRef(null);

    const conveyerOffset = 1.1;
    const conveyerSpeed = 0.01;


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

          if(obj.name.includes("Chocolate_Ball")) {
            obj.userData.t = 0;
            obj.userData.speed = 0.01;
            chocolateBallRef.current = obj;
          }

          if(obj.name.includes("ConveyerX") && conveyorXRef.current.length === 0) {
            // Found the first conveyor belt - duplicate it 10 times
            const firstObj = obj;
            conveyorXRef.current.push(firstObj);
            
            // Store initial position
            conveyorInitialWorldXRef.current.set(firstObj, firstObj.position.x);
            conveyorXBound.current = firstObj.position.x;
            
            // Create 10 duplicates with x offset of 1 each
            for (let i = 1; i <= 10; i++) {
              const clone = firstObj.clone();
              clone.name = `${firstObj.name}_clone_${i}`;
              
              // Offset by i in x direction
              clone.position.x = firstObj.position.x + i * conveyerOffset;
              
              // Add to parent or scene
              if (firstObj.parent) {
                firstObj.parent.add(clone);
              } else {
                scene.add(clone);
              }
              
              // Assign refs for each experience in order
              if(i == 2) rutgers1Ref.current = clone;
              if(i == 3) rutgers2Ref.current = clone;
              if(i == 4) deptonRef.current = clone;
              if(i == 5) honeRef.current = clone;
              if(i == 6) jpmcRef.current = clone;
              if(i == 7) teachshareRef.current = clone;
              
              conveyorXRef.current.push(clone);
              conveyorInitialWorldXRef.current.set(clone, firstObj.position.x + i);
            }
          }
        });
      }, [scene]);

    // Handle scroll in experience view
    useEffect(() => {
        const handleScroll = (e) => {
            // Only handle scroll when in experience view
            if (!isInExperienceViewRef.current) return;
            
            // Track scroll direction (positive = scroll down, negative = scroll up)
            let direction = e.deltaY > 0 ? 1 : -1;
            
            // Clear existing timeout
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            
            scrollTimeoutRef.current = setTimeout(() => {
                if (isInExperienceViewRef.current) {
                    // Get current position (either actual or target)
                    let currentX = camera.position.x;
                    if(targetCameraPosRef.current) {
                        currentX = targetCameraPosRef.current[0];
                    }
                    
                    // Check if we're at the initial position
                    const initialX = initialExperiencePosRef.current ? initialExperiencePosRef.current[0] : null;
                    const isAtInitial = initialX !== null && Math.abs(currentX - initialX) < 0.1;
                    
                    // Prevent scrolling forward (direction = 1) if at initial position
                    if (isAtInitial && direction < 1) {
                        scrollTimeoutRef.current = null;
                        return;
                    }
                    
                    const forward = new THREE.Vector3(-1 * direction, 0, 0);
                    let targetPos = new THREE.Vector3(
                        camera.position.x + forward.x,
                        camera.position.y + forward.y,
                        camera.position.z + forward.z
                    );
                    if(targetCameraPosRef.current) {
                        targetPos = new THREE.Vector3(
                            targetCameraPosRef.current[0] + forward.x,
                            targetCameraPosRef.current[1] + forward.y,
                            targetCameraPosRef.current[2] + forward.z
                        )
                    }
                    targetCameraPosRef.current = [targetPos.x, targetPos.y, targetPos.z];
                }
                scrollTimeoutRef.current = null;
            }, 50);
        };

        window.addEventListener('wheel', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('wheel', handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [camera]);
  
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
        const pos1 = new THREE.Vector3(-9, 6.3, -5.3);
        const pos2 = new THREE.Vector3(-7.4, 5.8, -4.8);
        const pos3 = new THREE.Vector3(-6.95, 5.5, -3.7);
        const pos4 = new THREE.Vector3(-9, 4.7, -2.3);

        const circleCenter = new THREE.Vector3(-8.6, 6.3, -3.9);
        const circleEdge = new THREE.Vector3(-8.6, 6.3, -5.45);
        const radius = circleCenter.distanceTo(circleEdge);

        if(chocolateBallRef.current) {
            const t = chocolateBallRef.current.userData.t;
            let endPos;
            // Use t as angle to calculate position, keep y constant
            if(chocolateBallRef.current.userData.t <= 4 * Math.PI){
                chocolateBallRef.current.position.x = circleCenter.x + radius * Math.cos(t - Math.PI/2);
                chocolateBallRef.current.position.y = circleCenter.y - t * 0.43;
                chocolateBallRef.current.position.z = circleCenter.z + radius * Math.sin(t - Math.PI/2);
                chocolateBallRef.current.userData.t += chocolateBallRef.current.userData.speed;
                chocolateBallRef.current.userData.speed += 0.001;
            }
            else {
                chocolateBallRef.current.position.x += chocolateBallRef.current.userData.speed;
            }

            if(chocolateBallRef.current.position.x > 0){
                chocolateBallRef.current.userData.t = 0;
                chocolateBallRef.current.userData.speed = 0.01;
            }
        }

        conveyorXRef.current.forEach((obj) => {
            if (isInExperienceViewRef.current) {
                // In experience view: reset to initial position and stop
                const initialX = conveyorInitialWorldXRef.current.get(obj);
                obj.position.x = initialX;
            } else {
                // Normal conveyor movement
                obj.position.x -= conveyerSpeed;
                if(obj.position.x <= conveyorXBound.current) {
                    obj.position.x += (10 * conveyerOffset);
                }
            }
        });
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
                            isInExperienceViewRef.current = false;
                        } else if (obj.name === "AboutMe" && aboutMePos) {
                            targetCameraPosRef.current = aboutMePos;
                            if (aboutMeRotation) {
                                targetCameraRotationRef.current = aboutMeRotation;
                                isQuaternionRotationRef.current = false; // aboutMeRotation is Euler angles
                            }
                            isInExperienceViewRef.current = false;
                        } else if (obj.name === "Experience" && experiencePos) {
                            targetCameraPosRef.current = experiencePos;
                            if (experienceOrientation) {
                                targetCameraRotationRef.current = experienceOrientation;
                                isQuaternionRotationRef.current = true; // experienceOrientation is a quaternion
                            }
                            isInExperienceViewRef.current = true;
                            // Store initial experience position
                            initialExperiencePosRef.current = [...experiencePos];
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
                    hoveredRef.current = foundClickable;
                } else {
                    // Entering a non-clickable object, clear hover state
                    hoveredRef.current = null;
                }
            }}
            onPointerLeave={(e) => {
                e.stopPropagation();
                // Clear any existing timeout
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
        {/* Render experience cards */}
        {[
            { ref: rutgers1Ref, key: 'rutgers1' },
            { ref: rutgers2Ref, key: 'rutgers2' },
            { ref: deptonRef, key: 'depton' },
            { ref: honeRef, key: 'hone' },
            { ref: jpmcRef, key: 'jpmc' },
            { ref: teachshareRef, key: 'teachshare' }
        ].map(({ ref, key }) => {
            if (!ref.current) return null;
            
            const data = EXPERIENCE_DATA[key];
            
            // Check if role is longer than 30 characters (will be 2 lines)
            const isLongRole = data.role.length > 30;
            const dateYOffset = isLongRole ? -0.06 : 0;
            const descriptionYOffset = isLongRole ? -0.06 : 0;
            
            // Calculate skill positions dynamically based on number of skills
            const totalWidth = 0.9; // Max width for all skills
            const spacing = 0.05; // Space between skills
            const numSkills = data.skills.length;
            
            // Estimate width per skill (can be adjusted per skill if needed)
            const skillWidths = data.skills.map(skill => {
                // Rough estimate: 0.02 per character
                return Math.max(0.12, Math.min(0.25, skill.length * 0.02 + 0.04));
            });
            
            // Calculate starting position to center all skills
            const totalSkillWidth = skillWidths.reduce((sum, w) => sum + w, 0) + spacing * (numSkills - 1);
            const startX = -totalSkillWidth / 2;
            
            const skillPositions = [];
            let currentX = startX;
            for (let i = 0; i < numSkills; i++) {
                skillPositions.push(currentX + skillWidths[i] / 2);
                currentX += skillWidths[i] + spacing;
            }
            
            return (
                <group
                    key={key}
                    position={[ref.current.position.x + data.offset, ref.current.position.y + 0.12, ref.current.position.z]}
                    rotation={[-Math.PI/2, 0, Math.PI/2]}
                >
                    {/* Main card background */}
                    <mesh position={[0, 0, 0]}>
                        <planeGeometry args={[1.1, 0.65]} />
                        <meshBasicMaterial color="#0f0f1a" transparent opacity={0.98} />
                    </mesh>

                    {/* Gradient border glow */}
                    <mesh position={[0, 0, -0.0001]}>
                        <planeGeometry args={[1.12, 0.68]} />
                        <meshBasicMaterial color="#4f46e5" transparent opacity={0.5} />
                    </mesh>

                    {/* Company name */}
                    <Text
                        position={[-0.5, 0.3, 0.002]}
                        fontSize={0.07}
                        color="#ffffff"
                        anchorX="left"
                        anchorY="top"
                        fontWeight={900}
                        letterSpacing={0.08}
                        toneMapped={false}
                        depthTest={false}
                        depthWrite={false}
                        renderOrder={999}
                    >
                        {data.company}
                    </Text>

                    {/* Role */}
                    <Text
                        position={[-0.5, 0.2, 0.002]}
                        fontSize={0.062}
                        color="#a5b4fc"
                        anchorX="left"
                        anchorY="top"
                        fontWeight={700}
                        maxWidth={0.95}
                        lineHeight={1.15}
                        textAlign="left"
                        toneMapped={false}
                        depthTest={false}
                        depthWrite={false}
                        renderOrder={999}
                    >
                        {data.role}
                    </Text>

                    {/* Date */}
                    <Text
                        position={[-0.5, 0.12 + dateYOffset, 0.002]}
                        fontSize={0.05}
                        color="#818cf8"
                        anchorX="left"
                        anchorY="top"
                        fontWeight={700}
                        toneMapped={false}
                        depthTest={false}
                        depthWrite={false}
                        renderOrder={999}
                    >
                        {data.date}
                    </Text>

                    {/* Description bullets */}
                    <Text
                        position={[-0.5, 0.02 + descriptionYOffset, 0.002]}
                        fontSize={0.025}
                        color="#ffffff"
                        anchorX="left"
                        anchorY="top"
                        maxWidth={0.95}
                        lineHeight={1.4}
                        textAlign="left"
                        toneMapped={false}
                        depthTest={false}
                        depthWrite={false}
                        renderOrder={999}
                    >
                        {data.description.join('\n')}
                    </Text>

                    {/* Skill tags */}
                    {data.skills.map((skill, index) => (
                        <React.Fragment key={skill}>
                            {/* Tag background */}
                            <mesh position={[skillPositions[index], -0.25, 0.001]}>
                                <planeGeometry args={[skillWidths[index], 0.04]} />
                                <meshBasicMaterial color="#4f46e5" transparent opacity={0.6} />
                            </mesh>

                            {/* Tag text */}
                            <Text
                                position={[skillPositions[index], -0.25, 0.002]}
                                fontSize={0.026}
                                color="#b9c4fa"
                                anchorX="center"
                                anchorY="middle"
                                fontWeight={600}
                                toneMapped={false}
                                depthTest={false}
                                depthWrite={false}
                                renderOrder={999}
                            >
                                {skill}
                            </Text>
                        </React.Fragment>
                    ))}
                </group>
            );
        })}
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

  const experiencePos = [1.886, 1.85, 8.23]
  let experienceOrientation = [-0.3125, 0.632, 0.31, 0.637];
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
          {DEBUG_MODE && <OrbitControls />}

          {DEBUG_MODE && <CameraLogger />}
          <Factory aboutMePos={aboutMePos} aboutMeRotation={aboutMeRotation} startPos={startPos} startOrientation={startOrientation} experiencePos={experiencePos} experienceOrientation={experienceOrientation} />
        </Canvas>
      </div>
    </div>
  );
}
