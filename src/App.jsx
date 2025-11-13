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
    offset: 0.05
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
    offset: 0.05
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
    offset: 0.05
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
    offset: 0.05
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
    skills: ["TypeScript", "Python", "API Design", "LangSmith"],
    offset: 0.05
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
    offset: 0
  }
};


const SKILLS_DATA = [
    ["Javascript", "Python", "Java", "C/C++", "C#", "SQL", "R"],
    ["React", "Next.js", "Node.js", "Flask", "FastAPI", "PySpark", "Solid JS"],
    ["LangChain", "JQuery", "Tensorflow", "PyTorch", "LLMs", "CUDA", "Pandas"],
    ["MongoDB", "Redis", "AWS", "Azure", "FastAPI", "Express", "Selenium"],
    ["Git", "Docker", "Kubernetes", "API Design", "Client-Server Model", "CI/CD", "Testing"]
]


const PROJECTS_DATA = [
    {
        name: "SatvikVejendla.com",
        description: [
            "- Creative and responsive personal portfolio website built with Three.js.",
            "- Personally created all the assets in Blender.",
            "- Integrated React Three Fiber for seamless 3D animations and interactions.",
        ],
        technologies: ["Next.js", "Three.js", "Blender"],
    },
    {
        name: "Kanzure",
        description: [
            "- Jira-inspired productivity tool featuring time blocking, task management, and Kanban workflows",
            "- Implemented custom OAuth2 authentication, user analytics, and calendar integrations with Google API.",
            "- Designed custom session tracking and role-based access control (RLS) to enforce data isolation."
        ],
        technologies: ["React", "Tailwind CSS", "Google OAuth2", "PostgreSQL"]
    },
    {
        name: "VEX 750B",
        description: [
            "- Designed a modular robot control framework with PID motion tuning, Odometry, and Pure Pursuit path tracking.",
            "- Developed a mobile scouting app with heuristics to predict match performance from live telemetry data.",
            "- Led team to 1st place at the 2023 NJ State Championship and qualification for the VEX Worlds Championship."
        ],
        technologies: ["C++", "PROS", "React Native", "Pure Pursuit"]
    },
    {
        name: "Reparo",
        description: [
            "- Engineered a comprehensive test repair framework to automatically identify and fix failing regression tests using LLMs.",
            "- Built a custom test runner and data pipeline to efficiently execute and analyze test results.",
            "- Led the development of a user-friendly web interface for test management and reporting."
        ],
        technologies: ["Python", "LLMs", "API Design", "LangSmith"]
    },
    {
        name: "Mentalth",
        description: [
            "- Trained a Tensorflow classification model to detect mental health distress signals from text messages.",
            "- Custom web scraped dataset and preprocessed data for training and evaluation.",
            "- MercerHacks Winner"
        ],
        technologies: ["Python", "Tensorflow", "Puppeteer", "LSTM"]
    },
    {
        name: "TelePlay",
        description: [
            "- Built a cross-site watch-party syncer using a browser extension that injects lightweight content scripts to detect and control HTML5 media elements across multiple streaming sites",
            "- Created a lightweight backend service to manage sessions and handle connections for stable multi-user synchronization.",
        ],
        technologies: ["TypeScript", "Chrome Extension", "Node.js", "Express", "WebSocket"]
    },
]

function Factory({ aboutMePos, aboutMeRotation, startPos, startOrientation, experiencePos, experienceOrientation, skillsPos, skillsOrientation, projectsPos, projectsOrientation, contactPos, contactOrientation, onBackButtonClick, setNotHome }) {
    const { scene, animations } = useGLTF("/factorylowpoly.glb");
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
    const conveyorY1Ref = useRef([]);
    const conveyorY2Ref = useRef([]);
    const conveyorY3Ref = useRef([]);
    const conveyorY4Ref = useRef([]);
    const conveyorY5Ref = useRef([]);
    const conveyorInitialWorldY1Ref = useRef(new Map());
    const conveyorInitialWorldY2Ref = useRef(new Map());
    const conveyorInitialWorldY3Ref = useRef(new Map());
    const conveyorInitialWorldY4Ref = useRef(new Map());
    const conveyorInitialWorldY5Ref = useRef(new Map());
    const conveyorXX1Ref = useRef([]);
    const conveyorXX2Ref = useRef([]);
    const conveyorInitialWorldXX1Ref = useRef(new Map());
    const conveyorInitialWorldXX2Ref = useRef(new Map());
    const conveyorXXBound = useRef(0);

    const chocolateBallRef = useRef(null);
    const isInExperienceViewRef = useRef(false);
    const isInProjectsViewRef = useRef(false);
    const isInSkillsViewRef = useRef(false);
    const scrollTimeoutRef = useRef(null);
    const rutgers1Ref = useRef(null);
    const rutgers2Ref = useRef(null);
    const deptonRef = useRef(null);
    const honeRef = useRef(null);
    const jpmcRef = useRef(null);
    const teachshareRef = useRef(null);
    const project1Ref = useRef(null);
    const project2Ref = useRef(null);
    const project3Ref = useRef(null);
    const project4Ref = useRef(null);
    const project5Ref = useRef(null);
    const project6Ref = useRef(null);
    const contact1Ref = useRef(null);
    const contact2Ref = useRef(null);
    const contact3Ref = useRef(null);
    const conveyorXBound = useRef(0);
    const conveyorYBound = useRef(0);
    const conveyorYReverseBound = useRef(0);
    const initialExperiencePosRef = useRef(null);
    const maxExperiencePosRef = useRef(null);
    const initialProjectsPosRef = useRef(null);
    const maxProjectsPosRef = useRef(null);
    const conveyerOffset = 1.1;
    const conveyerSpeed = 0.01;
    const conveyerYOffset = 2.6;
    const conveyerYSpeed = 0.01;
    const conveyerXXOffset = 2.0;
    
    // Expose back button handler
    useEffect(() => {
        if (onBackButtonClick) {
            onBackButtonClick.current = () => {
                targetCameraPosRef.current = startPos;
                targetCameraRotationRef.current = startOrientation;
                isQuaternionRotationRef.current = true;
                isInExperienceViewRef.current = false;
                isInProjectsViewRef.current = false;
                isInSkillsViewRef.current = false;
                if (setNotHome) {
                    setNotHome(false);
                }
            };
        }
    }, [startPos, startOrientation, onBackButtonClick, setNotHome]);


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
              color: "#ffffff",
              roughness: 0.05,
              metalness: 0,
              transmission: 0.95, // Slightly less than full for subtle tint
              opacity: 1,
              transparent: true,
              ior: 1.5, // Standard glass index of refraction
              thickness: 0.1, // Thin glass for minimal distortion
              clearcoat: 1.0, // Add glossy reflection layer
              clearcoatRoughness: 0.05, // Slight roughness for more natural look
              reflectivity: 0.3, // Reduced reflectivity
              side: THREE.DoubleSide,
            });
          }
          let names = ["AboutMe", "Experience", "Skills", "Projects", "Contact"];
          if (names.includes(obj.name)) {
            obj.userData.clickable = true;
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

          if(obj.name === "Project1") {
            project1Ref.current = obj;
          }
          if(obj.name === "Project2") {
            project2Ref.current = obj;
          }
          if(obj.name === "Project3") {
            project3Ref.current = obj;
          }
          if(obj.name === "Project4") {
            project4Ref.current = obj;
          }
          if(obj.name === "Project5") {
            project5Ref.current = obj;
          }
          if(obj.name === "Project6") {
            project6Ref.current = obj;
          }

          // Contact objects
          const contactNames = ["Contact1", "Contact2", "Contact3"];
          if (contactNames.includes(obj.name)) {
            obj.userData.contactButton = true;
            originalPositionsRef.current.set(obj, [obj.position.x, obj.position.y, obj.position.z]);
            if(obj.name === "Contact1") contact1Ref.current = obj;
            if(obj.name === "Contact2") contact2Ref.current = obj;
            if(obj.name === "Contact3") contact3Ref.current = obj;
          }

          if(obj.name.includes("ConveyerX") && conveyorXRef.current.length === 0) {
            // Found the first conveyor belt - duplicate it 10 times
            const firstObj = obj;
            conveyorXRef.current.push(firstObj);
            
            // Store initial position
            conveyorInitialWorldXRef.current.set(firstObj, firstObj.position.x);
            conveyorXBound.current = firstObj.position.x;
            
            // Create 10 duplicates with x offset of 1 each
            for (let i = 1; i <= 12; i++) {
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
              conveyorInitialWorldXRef.current.set(clone, firstObj.position.x + i * conveyerOffset);
            }
          }
          if(obj.name.includes("ConveyorY1") && conveyorY1Ref.current.length === 0) {
            const firstObj = obj;
            conveyorY1Ref.current.push({ obj: firstObj, baseName: obj.name });
            
            conveyorInitialWorldY1Ref.current.set(firstObj, firstObj.position.x);
            if (conveyorYBound.current === 0) {
              conveyorYBound.current = firstObj.position.x;
            }
            
            for (let i = 1; i <= 7; i++) {
              const clone = firstObj.clone();
              clone.name = `${firstObj.name}_clone_${i}`;
              
              // Offset by i in x direction
              clone.position.x = firstObj.position.x - i * conveyerYOffset;
              // Add to parent or scene
              if (firstObj.parent) {
                firstObj.parent.add(clone);
              } else {
                scene.add(clone);
              }
              
              conveyorY1Ref.current.push({ obj: clone, baseName: obj.name });
              conveyorInitialWorldY1Ref.current.set(clone, firstObj.position.x - i * conveyerYOffset);
            }
          }
          if(obj.name.includes("ConveyorY2") && conveyorY2Ref.current.length === 0) {
            const firstObj = obj;
            conveyorY2Ref.current.push({ obj: firstObj, baseName: obj.name });
            conveyorInitialWorldY2Ref.current.set(firstObj, firstObj.position.x);

            if (conveyorYReverseBound.current === 0) {
              conveyorYReverseBound.current = firstObj.position.x;
            }
            
            for (let i = 1; i <= 7; i++) {
              const clone = firstObj.clone();
              clone.name = `${firstObj.name}_clone_${i}`;
              clone.position.x = firstObj.position.x + i * conveyerYOffset;
              if (firstObj.parent) {
                firstObj.parent.add(clone);
              } else {
                scene.add(clone);
              }
              conveyorY2Ref.current.push({ obj: clone, baseName: obj.name });
              conveyorInitialWorldY2Ref.current.set(clone, firstObj.position.x + i * conveyerYOffset);
            }
          }
          if(obj.name.includes("ConveyorY3") && conveyorY3Ref.current.length === 0) {
            const firstObj = obj;
            conveyorY3Ref.current.push({ obj: firstObj, baseName: obj.name });
            conveyorInitialWorldY3Ref.current.set(firstObj, firstObj.position.x);
            
            for (let i = 1; i <= 7; i++) {
              const clone = firstObj.clone();
              clone.name = `${firstObj.name}_clone_${i}`;
              clone.position.x = firstObj.position.x - i * conveyerYOffset;
              if (firstObj.parent) {
                firstObj.parent.add(clone);
              } else {
                scene.add(clone);
              }
              conveyorY3Ref.current.push({ obj: clone, baseName: obj.name });
              conveyorInitialWorldY3Ref.current.set(clone, firstObj.position.x - i * conveyerYOffset);
            }
          }
          if(obj.name.includes("ConveyorY4") && conveyorY4Ref.current.length === 0) {
            const firstObj = obj;
            conveyorY4Ref.current.push({ obj: firstObj, baseName: obj.name });
            conveyorInitialWorldY4Ref.current.set(firstObj, firstObj.position.x);

            for (let i = 1; i <= 7; i++) {
              const clone = firstObj.clone();
              clone.name = `${firstObj.name}_clone_${i}`;
              clone.position.x = firstObj.position.x + i * conveyerYOffset;
              if (firstObj.parent) {
                firstObj.parent.add(clone);
              } else {
                scene.add(clone);
              }
            
              conveyorY4Ref.current.push({ obj: clone, baseName: obj.name });
              conveyorInitialWorldY4Ref.current.set(clone, firstObj.position.x + i * conveyerYOffset);
            }
          }
          if(obj.name.includes("ConveyorY5") && conveyorY5Ref.current.length === 0) {
            const firstObj = obj;
            conveyorY5Ref.current.push({ obj: firstObj, baseName: obj.name });
            conveyorInitialWorldY5Ref.current.set(firstObj, firstObj.position.x);
            
            for (let i = 1; i <= 7; i++) {
              const clone = firstObj.clone();
              clone.name = `${firstObj.name}_clone_${i}`;
              clone.position.x = firstObj.position.x - i * conveyerYOffset;
              if (firstObj.parent) {
                firstObj.parent.add(clone);
              } else {
                scene.add(clone);
              }
              conveyorY5Ref.current.push({ obj: clone, baseName: obj.name });
              conveyorInitialWorldY5Ref.current.set(clone, firstObj.position.x - i * conveyerYOffset);
            }
          }

          // ConveyerXX1 - moves in -Z direction
          if(obj.name.includes("ConveyerXX1") && conveyorXX1Ref.current.length === 0) {
            const firstObj = obj;
            conveyorXX1Ref.current.push(firstObj);
            
            conveyorInitialWorldXX1Ref.current.set(firstObj, firstObj.position.z);
            conveyorXXBound.current = firstObj.position.z;
            
            // Create 7 duplicates (8 total belts)
            for (let i = 1; i <= 7; i++) {
              const clone = firstObj.clone();
              clone.name = `${firstObj.name}_clone_${i}`;
              
              // Offset in Z direction
              clone.position.z = firstObj.position.z - i * conveyerXXOffset;
              
              if (firstObj.parent) {
                firstObj.parent.add(clone);
              } else {
                scene.add(clone);
              }
              
              conveyorXX1Ref.current.push(clone);
              conveyorInitialWorldXX1Ref.current.set(clone, firstObj.position.z - i * conveyerYOffset);
            }
          }

          // ConveyerXX2 - moves in -Z direction
          if(obj.name.includes("ConveyerXX2") && conveyorXX2Ref.current.length === 0) {
            const firstObj = obj;
            conveyorXX2Ref.current.push(firstObj);
            
            conveyorInitialWorldXX2Ref.current.set(firstObj, firstObj.position.z);
            
            // Create 7 duplicates (8 total belts)
            for (let i = 1; i <= 7; i++) {
              const clone = firstObj.clone();
              clone.name = `${firstObj.name}_clone_${i}`;
              
              // Offset in Z direction
              clone.position.z = firstObj.position.z - i * conveyerXXOffset;
              
              if (firstObj.parent) {
                firstObj.parent.add(clone);
              } else {
                scene.add(clone);
              }
              
              conveyorXX2Ref.current.push(clone);
              conveyorInitialWorldXX2Ref.current.set(clone, firstObj.position.z - i * conveyerYOffset);
            }
          }
        });
      }, [scene]);

    // Handle scroll in experience and projects view
    useEffect(() => {
        const handleScroll = (e) => {
            // Only handle scroll when in experience or projects view
            if (!isInExperienceViewRef.current && !isInProjectsViewRef.current) return;
            
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
                    
                    // Check if we're at the maximum position (last experience)
                    const maxX = maxExperiencePosRef.current;
                    const isAtMax = maxX !== null && currentX <= maxX + 0.1;
                    
                    // Prevent scrolling back (direction < 0) if at initial position
                    if (isAtInitial && direction < 0) {
                        scrollTimeoutRef.current = null;
                        return;
                    }
                    
                    // Prevent scrolling forward (direction > 0) if at max position
                    if (isAtMax && direction > 0) {
                        scrollTimeoutRef.current = null;
                        return;
                    }
                    
                    // Move -1.1 unit in X direction
                    const xOffset = -1.1 * direction;
                    let targetPos;
                    if(targetCameraPosRef.current) {
                        targetPos = [
                            targetCameraPosRef.current[0] + xOffset,
                            targetCameraPosRef.current[1],
                            targetCameraPosRef.current[2]
                        ];
                    } else {
                        targetPos = [
                            camera.position.x + xOffset,
                            camera.position.y,
                            camera.position.z
                        ];
                    }
                    targetCameraPosRef.current = targetPos;
                } else if (isInProjectsViewRef.current) {
                    // Get current position (either actual or target)
                    let currentZ = camera.position.z;
                    if(targetCameraPosRef.current) {
                        currentZ = targetCameraPosRef.current[2];
                    }
                    
                    // Check if we're at the initial position
                    const initialZ = initialProjectsPosRef.current ? initialProjectsPosRef.current[2] : null;
                    const isAtInitial = initialZ !== null && Math.abs(currentZ - initialZ) < 0.1;
                    
                    // Check if we're at the maximum position (last project)
                    const maxZ = maxProjectsPosRef.current;
                    const isAtMax = maxZ !== null && currentZ >= maxZ - 0.1;
                    
                    // Prevent scrolling left (direction = -1) if at initial position
                    if (isAtInitial && direction < 0) {
                        scrollTimeoutRef.current = null;
                        return;
                    }
                    
                    // Prevent scrolling right (direction = 1) if at max position
                    if (isAtMax && direction > 0) {
                        scrollTimeoutRef.current = null;
                        return;
                    }
                    
                    // Scroll down = move right (positive X), scroll up = move left (negative X)
                    const zOffset = 19.5 * direction;
                    let targetPos;
                    if(targetCameraPosRef.current) {
                        targetPos = [
                            targetCameraPosRef.current[0],
                            targetCameraPosRef.current[1],
                            targetCameraPosRef.current[2] + zOffset,
                        ];
                    } else {
                        targetPos = [
                            camera.position.x,
                            camera.position.y,
                            camera.position.z + zOffset,
                        ];
                    }
                    targetCameraPosRef.current = targetPos;
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
            if (obj.userData.clickable || obj.userData.contactButton) {
                obj.position.x = originalPositionsRef.current.get(obj)[0];
                obj.position.y = originalPositionsRef.current.get(obj)[1];
                obj.position.z = originalPositionsRef.current.get(obj)[2];
            }
            });
            if(hoveredRef.current.userData.contactButton) {
                // Contact buttons move -0.1 in Z direction
                hoveredRef.current.position.x = originalPositionsRef.current.get(hoveredRef.current)[0];
                hoveredRef.current.position.y = originalPositionsRef.current.get(hoveredRef.current)[1];
                hoveredRef.current.position.z = originalPositionsRef.current.get(hoveredRef.current)[2] - 0.1;
            } else if(!hoveredRef.current.userData.backButton) {
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
            if (obj.userData.clickable || obj.userData.contactButton) {
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
                    obj.position.x += (12 * conveyerOffset);
                }
            }
        });

        conveyorY1Ref.current.forEach((item) => {
            const obj = item.obj;
            if (isInExperienceViewRef.current) {
                const initialX = conveyorInitialWorldY1Ref.current.get(obj);
                obj.position.x = initialX;
            } else {
                obj.position.x += conveyerYSpeed;
                if(obj.position.x >= conveyorYBound.current) {
                    obj.position.x -= (7 * conveyerYOffset);
                }
            }
        });
        conveyorY2Ref.current.forEach((item) => {
            const obj = item.obj;
            if(isInExperienceViewRef.current) {
                const initialX = conveyorInitialWorldY2Ref.current.get(obj);
                obj.position.x = initialX;
            } else {
                obj.position.x -= conveyerYSpeed;
                if(obj.position.x <= conveyorYReverseBound.current) {
                    obj.position.x += (7 * conveyerYOffset);
                }
            }
        });
        conveyorY3Ref.current.forEach((item) => {
            const obj = item.obj;
            if(isInExperienceViewRef.current) {
                const initialX = conveyorInitialWorldY3Ref.current.get(obj);
                obj.position.x = initialX;
            } else {
                obj.position.x += conveyerYSpeed;
                if(obj.position.x >= conveyorYBound.current) {
                    obj.position.x -= (7 * conveyerYOffset);
                }
            }
        });
        conveyorY4Ref.current.forEach((item) => {
            const obj = item.obj;
            if(isInExperienceViewRef.current) {
                const initialX = conveyorInitialWorldY4Ref.current.get(obj);
                obj.position.x = initialX;
            } else {
                obj.position.x -= conveyerYSpeed;
                if(obj.position.x <= conveyorYReverseBound.current) {
                    obj.position.x += (7 * conveyerYOffset);
                }
            }
        });
        conveyorY5Ref.current.forEach((item) => {
            const obj = item.obj;
            if(isInExperienceViewRef.current) {
                const initialX = conveyorInitialWorldY5Ref.current.get(obj);
                obj.position.x = initialX;
            } else {
                obj.position.x += conveyerYSpeed;
                if(obj.position.x >= conveyorYBound.current) {
                    obj.position.x -= (7 * conveyerYOffset);
                }
            }   
        });

        // ConveyerXX1 and ConveyerXX2 - move in -Z direction
        conveyorXX1Ref.current.forEach((obj) => {
            if (isInExperienceViewRef.current) {
                const initialZ = conveyorInitialWorldXX1Ref.current.get(obj);
                obj.position.z = initialZ;
            } else {
                obj.position.z += conveyerYSpeed;
                if(obj.position.z >= conveyorXXBound.current) {
                    obj.position.z -= (7 * conveyerXXOffset);
                }
            }
        });

        conveyorXX2Ref.current.forEach((obj) => {
            if (isInExperienceViewRef.current) {
                const initialZ = conveyorInitialWorldXX2Ref.current.get(obj);
                obj.position.z = initialZ;
            } else {
                obj.position.z += conveyerYSpeed;
                if(obj.position.z >= conveyorXXBound.current) {
                    obj.position.z -= (7 * conveyerXXOffset);
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
                            isInProjectsViewRef.current = false;
                            isInSkillsViewRef.current = false;
                            if (setNotHome) {
                                setNotHome(false);
                            }
                        } else if (obj.name === "AboutMe" && aboutMePos) {
                            targetCameraPosRef.current = aboutMePos;
                            if (aboutMeRotation) {
                                targetCameraRotationRef.current = aboutMeRotation;
                                isQuaternionRotationRef.current = false; // aboutMeRotation is Euler angles
                            }
                            isInExperienceViewRef.current = false;
                            isInProjectsViewRef.current = false;
                            isInSkillsViewRef.current = false;
                            if (setNotHome) {
                                setNotHome(true);
                            }
                        } else if (obj.name === "Experience" && experiencePos) {
                            targetCameraPosRef.current = experiencePos;
                            if (experienceOrientation && experienceOrientation.length === 4) {
                                targetCameraRotationRef.current = experienceOrientation;
                                isQuaternionRotationRef.current = true;
                            } else if (experienceOrientation && experienceOrientation.length === 3) {
                                targetCameraRotationRef.current = experienceOrientation;
                                isQuaternionRotationRef.current = false; 
                            }
                            isInExperienceViewRef.current = true;
                            isInProjectsViewRef.current = false;
                            isInSkillsViewRef.current = false;
                            // Store initial experience position
                            initialExperiencePosRef.current = [...experiencePos];
                            // Calculate max position (6 experiences, so 5 scrolls away at -1.1 units each)
                            const numExperiences = Object.keys(EXPERIENCE_DATA).length;
                            maxExperiencePosRef.current = experiencePos[0] - ((numExperiences - 1) * 1.1);
                            if (setNotHome) {
                                setNotHome(true);
                            }
                        } else if (obj.name === "Skills" && skillsPos) {
                            targetCameraPosRef.current = skillsPos;
                            if (skillsOrientation && skillsOrientation.length === 4) {
                                targetCameraRotationRef.current = skillsOrientation;
                                isQuaternionRotationRef.current = true;
                            } else if (skillsOrientation && skillsOrientation.length === 3) {
                                targetCameraRotationRef.current = skillsOrientation;
                                isQuaternionRotationRef.current = false;
                            }
                            isInExperienceViewRef.current = false;
                            isInProjectsViewRef.current = false;
                            isInSkillsViewRef.current = true;
                            if (setNotHome) {
                                setNotHome(true);
                            }
                        } else if (obj.name === "Projects" && projectsPos) {
                            targetCameraPosRef.current = projectsPos;
                            if (projectsOrientation && projectsOrientation.length === 4) {
                                targetCameraRotationRef.current = projectsOrientation;
                                isQuaternionRotationRef.current = true;
                            } else if (projectsOrientation && projectsOrientation.length === 3) {
                                targetCameraRotationRef.current = projectsOrientation;
                                isQuaternionRotationRef.current = false;
                            }
                            isInExperienceViewRef.current = false;
                            isInProjectsViewRef.current = true;
                            isInSkillsViewRef.current = false;
                            // Store initial projects position
                            initialProjectsPosRef.current = [...projectsPos];
                            // Calculate max position (Project 6 is 5 scrolls away at 19.5 units each)
                            const numProjects = PROJECTS_DATA.length;
                            maxProjectsPosRef.current = projectsPos[2] + ((numProjects - 1) * 19.5);
                            if (setNotHome) {
                                setNotHome(true);
                            }
                        } else if (obj.name === "Contact" && contactPos) {
                            targetCameraPosRef.current = contactPos;
                            if (contactOrientation && contactOrientation.length === 4) {
                                targetCameraRotationRef.current = contactOrientation;
                                isQuaternionRotationRef.current = true;
                            } else if (contactOrientation && contactOrientation.length === 3) {
                                targetCameraRotationRef.current = contactOrientation;
                                isQuaternionRotationRef.current = false;
                            }
                            isInExperienceViewRef.current = false;
                            isInProjectsViewRef.current = false;
                            isInSkillsViewRef.current = false;
                            if (setNotHome) {
                                setNotHome(true);
                            }
                        }
                        break;
                    }
                    if (obj.userData.contactButton) {
                        // Handle contact button clicks
                        let url = "xxx";
                        if (obj.name === "Contact1") {
                            url = "https://www.linkedin.com/in/satvikvejendla/";
                        } else if (obj.name === "Contact2") {
                            url = "https://github.com/SatvikVejendla";
                        } else if (obj.name === "Contact3") {
                            url = "mailto:satvej1@gmail.com";
                        }
                        window.open(url, '_blank');
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
                    if (obj.userData.clickable || obj.userData.contactButton) {
                        foundClickable = obj;
                        break;
                    }
                    obj = obj.parent;
                }
                
                if (foundClickable) {
                    hoveredRef.current = foundClickable;
                    document.body.style.cursor = 'pointer';
                } else {
                    // Entering a non-clickable object, clear hover state
                    hoveredRef.current = null;
                    document.body.style.cursor = 'default';
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
                        document.body.style.cursor = 'default';
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
                return Math.max(0.12, Math.min(0.4, skill.length * 0.02 + 0.04));
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

            const yOffset = isInExperienceViewRef.current ? 0.12 : -2;
            
            return (
                <group
                    key={key}
                    position={[ref.current.position.x + 0.015, ref.current.position.y + yOffset, ref.current.position.z]}
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
                        fillOpacity={1}
                        material-toneMapped={false}
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
                        fillOpacity={1}
                        material-toneMapped={false}
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
                        fillOpacity={1}
                        material-toneMapped={false}
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
                        fillOpacity={1}
                        material-toneMapped={false}
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
                                fillOpacity={1}
                                material-toneMapped={false}
                            >
                                {skill}
                            </Text>
                        </React.Fragment>
                    ))}
                </group>
            );
        })}
        
        {/* Scroll indicator next to last experience card */}
        {isInExperienceViewRef.current && teachshareRef.current && (
            <Html
                position={[
                    teachshareRef.current.position.x,
                    teachshareRef.current.position.y + 0.10,
                    teachshareRef.current.position.z - 0.7
                ]}
                rotation={[-Math.PI/2, 0, Math.PI/2]}
                transform
                distanceFactor={0.8}
                scale={0.5}
                style={{
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px 24px',
                    background: 'linear-gradient(135deg, rgba(15, 15, 26, 1) 0%, rgba(31, 31, 51, 1) 100%)',
                    border: '4px solid rgba(79, 70, 229, 0.5)',
                    borderRadius: '24px',
                    minWidth: '160px',
                }}>
                    {/* Animated down arrow */}
                    <div style={{
                        width: '60px',
                        height: '100px',
                        border: '4px solid rgba(129, 140, 248, 0.6)',
                        borderRadius: '50px',
                        position: 'relative',
                        marginBottom: '16px',
                        background: 'rgba(15, 15, 26, 0.5)',
                    }}>
                        {/* Animated circle inside */}
                        <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#818cf8',
                            borderRadius: '50%',
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            top: '12px',
                            animation: 'scroll 2s ease-in-out infinite',
                            boxShadow: '0 0 5px rgba(129, 140, 248, 0.8)',
                        }}></div>
                    </div>
                    
                    {/* Scroll text */}
                    <div style={{
                        fontSize: '22px',
                        fontWeight: '600',
                        color: '#a5b4fc',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                    }}>
                        Scroll
                    </div>
                </div>
                
                <style>{`
                    @keyframes scroll {
                        0% {
                            top: 24px;
                            opacity: 1;
                        }
                        50% {
                            top: 60px;
                            opacity: 1;
                        }
                        100% {
                            top: 24px;
                            opacity: 1;
                        }
                    }
                `}</style>
            </Html>
        )}
        
        {/* Scroll indicator for projects view */}
        {isInProjectsViewRef.current && project1Ref.current && (
            <Html
                position={[
                    project1Ref.current.position.x - 8.5,
                    project1Ref.current.position.y + 0.2,
                    project1Ref.current.position.z + 7
                ]}
                rotation={[Math.PI/2, Math.PI, Math.PI/2]}
                transform
                distanceFactor={0.8}
                scale={6}
                style={{
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px 24px',
                    background: 'linear-gradient(135deg, rgba(15, 15, 26, 1) 0%, rgba(31, 31, 51, 1) 100%)',
                    border: '4px solid rgba(79, 70, 229, 0.5)',
                    borderRadius: '24px',
                    minWidth: '160px',
                }}>
                    {/* Pill-shaped scroll indicator */}
                    <div style={{
                        width: '200px',
                        height: '60px',
                        border: '4px solid rgba(31, 31, 51, 1)',
                        borderRadius: '50px',
                        position: 'relative',
                        marginBottom: '16px',
                        background: 'rgba(31, 31, 51, 1)',
                    }}>
                        {/* Animated circle inside */}
                        <div style={{
                            width: '30px',
                            height: '30px',
                            backgroundColor: '#a5b4fc',
                            borderRadius: '50%',
                            position: 'absolute',
                            transform: 'translateX(-50%) translateY(-50%)',
                            top: '50%',
                            animation: 'scrollProjects 3s ease-in-out infinite',
                            boxShadow: '0 0 5px rgba(31, 31, 51, 1)',
                        }}></div>
                    </div>
                    
                    {/* Scroll text */}
                    <div style={{
                        fontSize: '22px',
                        fontWeight: '600',
                        color: '#a5b4fc',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                    }}>
                        Scroll
                    </div>
                </div>
                
                <style>{`
                    @keyframes scrollProjects {
                        0% {
                            left: 30px;
                            opacity: 1;
                        }
                        50% {
                            left: 170px;
                            opacity: 1;
                        }
                        100% {
                            left: 30px;
                            opacity: 1;
                        }
                    }
                `}</style>
            </Html>
        )}
        
        {/* Render skills on ConveyorY tiles */}
        {isInSkillsViewRef.current && [
            { conveyorRef: conveyorY1Ref, skillsIndex: 0 },
            { conveyorRef: conveyorY2Ref, skillsIndex: 1 },
            { conveyorRef: conveyorY3Ref, skillsIndex: 2 },
            { conveyorRef: conveyorY4Ref, skillsIndex: 3 },
            { conveyorRef: conveyorY5Ref, skillsIndex: 4 }
        ].map(({ conveyorRef, skillsIndex }, rowIndex) => {
            return conveyorRef.current.map((item, tileIndex) => {
                const obj = item.obj;
                const skills = SKILLS_DATA[skillsIndex];
                const skillIndex = tileIndex % skills.length;
                const skillName = skills[skillIndex];
                
                return (
                    <SkillCard
                        key={`skill-${rowIndex}-${tileIndex}`}
                        tileObj={obj}
                        skillName={skillName}
                    />
                );
            });
        })}
        
        {/* Render all projects */}
        {isInProjectsViewRef.current && [
            { ref: project1Ref, dataIndex: 0 },
            { ref: project2Ref, dataIndex: 1 },
            { ref: project3Ref, dataIndex: 2 },
            { ref: project4Ref, dataIndex: 3 },
            { ref: project5Ref, dataIndex: 4 },
            { ref: project6Ref, dataIndex: 5 }
        ].map(({ ref, dataIndex }) => {
            if (!ref.current || !PROJECTS_DATA[dataIndex]) return null;
            
            const projectData = PROJECTS_DATA[dataIndex];
            
            return (
                <React.Fragment key={`project-${dataIndex}`}>
                    {/* Project Title */}
                    <Html
                        position={[
                            ref.current.position.x - 0.2,
                            ref.current.position.y + 0.2,
                            ref.current.position.z + 7.5
                        ]}
                        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
                        transform
                        style={{
                            pointerEvents: 'none',
                            userSelect: 'none',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <div style={{
                            fontSize: '50px',
                            fontWeight: 900,
                            color: '#ffffff',
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}>
                            {projectData.name}
                        </div>
                    </Html>

                    {/* Project Description */}
                    <Html
                        position={[
                            ref.current.position.x - 4,
                            ref.current.position.y + 0.2,
                            ref.current.position.z + 7
                        ]}
                        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
                        transform
                        scale={0.5}
                        style={{
                            pointerEvents: 'none',
                            userSelect: 'none',
                            whiteSpace: 'normal',
                            width: '1200px'
                        }}
                    >
                        <div style={{
                            fontSize: '40px',
                            fontWeight: 600,
                            color: '#ffffff',
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}>
                            {projectData.description.map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                        </div>
                    </Html>

                    {/* Technologies */}
                    <Html
                        position={[
                            ref.current.position.x - 7,
                            ref.current.position.y + 0.2,
                            ref.current.position.z + 7
                        ]}
                        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
                        transform
                        style={{
                            pointerEvents: 'none',
                            userSelect: 'none',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <div style={{
                            fontSize: '20px',
                            fontWeight: 600,
                            color: '#a78bfa',
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}>
                            {projectData.technologies.join(' • ')}
                        </div>
                    </Html>
                </React.Fragment>
            );
        })}
    </>)
  }

function SkillCard({ tileObj, skillName }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current && tileObj) {
      // Update position to follow the tile
      groupRef.current.position.set(
        tileObj.position.x,
        tileObj.position.y + 0.1,
        tileObj.position.z
      );
    }
  });

  return (
    <group
      ref={groupRef}
      rotation={[-Math.PI/2, 0, 0]}
    >
      {/* Skill card background */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.7, 0.4]} />
        <meshBasicMaterial color="#1a1a2e" transparent opacity={0.95} />
      </mesh>

      {/* Border glow */}
      <mesh position={[0, 0, -0.0001]}>
        <planeGeometry args={[1.75, 0.45]} />
        <meshBasicMaterial color="#4f46e5" transparent opacity={0.6} />
      </mesh>

      {/* Skill text */}
      <Text
        position={[0, 0, 0.002]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
        toneMapped={false}
        depthTest={false}
        depthWrite={false}
        renderOrder={999}
        fillOpacity={1}
        material-toneMapped={false}
      >
        {skillName}
      </Text>
    </group>
  );
}

function CameraLogger() {
  const { camera } = useThree();
  
  useEffect(() => {
    const logCameraInfo = () => {
      console.log("Camera position:", [camera.position.x, camera.position.y, camera.position.z]);
      console.log("Camera quaternion:", [camera.quaternion.x, camera.quaternion.y, camera.quaternion.z, camera.quaternion.w]);
      console.log("Camera Euler:", [camera.rotation.x, camera.rotation.y, camera.rotation.z]);
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
    } else if (rotation.length === 3) {
        camera.rotation.set(rotation[0], rotation[1], rotation[2]);
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
  const [notHome, setNotHome] = useState(false);
  const backButtonHandlerRef = useRef(null);

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

  const handleBackButtonClick = () => {
    if (backButtonHandlerRef.current) {
      backButtonHandlerRef.current();
    }
  };

  const aboutMePos = [3.9, 4.8, 4];
  const aboutMeRotation = [0, Math.PI, 0, -0.1];
  const startPos = [-13.02, 6.97, 16.93];
  const startOrientation = [-0.272, -0.2104, -0.0611, 0.9369];

  const experiencePos = [0, 1.7, 8.23]
  let experienceOrientation = [-0.3125, 0.632, 0.31, 0.637];
  experienceOrientation = [-Math.PI/2, 0.4, Math.PI/2]

  const skillsPos = [14.93, 6.26, -5.02];
  const skillsOrientation = [-Math.PI/2, 0, 0];

  const projectsPos = [12, 8.100067593683567, 18.19]
  const projectsOrientation = [-0.336587765327058, -0.6261384540936206, -0.34334245349623266, 0.613820227888081]
  
  const contactPos = [-0.4146436123457941, 1.4727768124979945, 23.11021149327466];
  let contactOrientation = [0, 0, 0, 1]
  contactOrientation = [0, 0, 0]
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Back Button */}
      {showScene && notHome && (
        <button
          onClick={handleBackButtonClick}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            zIndex: 1000,
            padding: "18px 36px",
            fontSize: "25px",
            fontWeight: "600",
            color: "#ffffff",
            backgroundColor: "rgba(79, 70, 229, 0.8)",
            border: "2px solid #6366f1",
            borderRadius: "10px",
            cursor: "pointer",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(99, 102, 241, 0.9)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(79, 70, 229, 0.8)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ← Back to Start
        </button>
      )}
      
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
        >      <fog attach="fog" args={["#000000", 35, 40]} />

          <BlackBackground />
          <ambientLight intensity={20} />
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
          <spotLight
            position={[15, 47, -5]}
            intensity={400}
            color="#ffffff"
            angle={Math.PI}
            penumbra={0.6}
            distance={200}
            decay={0.4}
          />
          {/* Image-based lighting can over-brighten the scene; dial it down or remove */}
          <Environment preset="city" intensity={4} />
          <CameraController rotation={startOrientation} />
          {DEBUG_MODE && <OrbitControls />}

          {DEBUG_MODE && <CameraLogger />}
          <Factory 
            aboutMePos={aboutMePos} 
            aboutMeRotation={aboutMeRotation} 
            startPos={startPos} 
            startOrientation={startOrientation} 
            experiencePos={experiencePos} 
            experienceOrientation={experienceOrientation}
            skillsPos={skillsPos}
            skillsOrientation={skillsOrientation}
            projectsPos={projectsPos}
            projectsOrientation={projectsOrientation}
            contactPos={contactPos}
            contactOrientation={contactOrientation}
            onBackButtonClick={backButtonHandlerRef}
            setNotHome={setNotHome}
          />
        </Canvas>
      </div>
    </div>
  );
}
