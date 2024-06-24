import React from 'react';
import * as THREE from 'three';

import TWEEN from '@tweenjs/tween.js';
import "./THREEComponent.css";


function multiplyMatrices(a, b) {

    var result = new Array(a.length).fill(0).map(row => new Array(b[0].length).fill(0));
    for (var i = 0; i < a.length; i++) {
        for (var j = 0; j < b[0].length; j++) {
            for (var k = 0; k < a[0].length; k++) {
                result[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return result;

}

function rotationMatrix(xangle, yangle, zangle){
    let x = [
        [1, 0, 0],
        [0, Math.cos(xangle), -Math.sin(xangle)],
        [0, Math.sin(xangle), Math.cos(xangle)]
    ];
    let y = [
        [Math.cos(yangle), 0, Math.sin(yangle)],
        [0, 1, 0],
        [-Math.sin(yangle), 0, Math.cos(yangle)]
    ];
    let z = [
        [Math.cos(zangle), -Math.sin(zangle), 0],
        [Math.sin(zangle), Math.cos(zangle), 0],
        [0, 0, 1]
    ];
    return multiplyMatrices(multiplyMatrices(x, y), z);
}

const MM = (a, b) => {
    if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) {
       throw new Error('arguments should be in 2-dimensional array format');
    }
    let x = a.length,
    z = a[0].length,
    y = b[0].length;
    if (b.length !== z) {
       // XxZ & ZxY => XxY
       throw new Error('number of columns in the first matrix should be the same as the number of rows in the second');
    }
    let productRow = Array.apply(null, new
    Array(y)).map(Number.prototype.valueOf, 0);
    let product = new Array(x);
    for (let p = 0; p < x; p++) {
       product[p] = productRow.slice();
    }
    for (let i = 0; i < x; i++) {
       for (let j = 0; j < y; j++) {
          for (let k = 0; k < z; k++) {
             product[i][j] += a[i][k] * b[k][j];
          }
       }
    }
    return product;
 }
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function cos(a){
    return (1 - Math.sech(a * 2));
}
export default class THREEComponent extends React.Component {
    constructor(props){
        super(props);
    }


    async componentDidMount(){
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 20;


        const rootStyle = getComputedStyle(document.documentElement);
        const primaryColor = rootStyle.getPropertyValue('--primary-color');
        const whiteColor = rootStyle.getPropertyValue('--white-color');



        var renderer = new THREE.WebGLRenderer({alpha: true});
        renderer.setSize(window.innerWidth, window.innerHeight);


        
        window.addEventListener("resize", () => {
            let width = window.innerWidth;
            let height = window.innerHeight;
        
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        document.querySelector("#three-container").appendChild( renderer.domElement );
        var dotGeometry = new THREE.SphereGeometry(0.05);
        var hashGeometry = new THREE.BoxGeometry(0.2, 0.05, 0.05);
        let points = [
            new THREE.Vector3(0, -0.15, 0),
            new THREE.Vector3(0, 0.15, 0),
        ]

        var pointerGeometry = new THREE.BufferGeometry().setFromPoints(points);
        var material = new THREE.MeshBasicMaterial({ color: whiteColor});

        const nameSequence = "... .- - ...- .. -.-/...- . .--- . -. -.. .-.. .-";

        let sequence = "";
        let sequence2 = "";

        let phase = 0;
        

        let pointer = new THREE.Line(pointerGeometry, material);
        scene.add(pointer);

        let oldChildren = 0;
        let oldPhase = 0;
        let oldSection = 0;

        let objects = [];
        let dots = [];
        let dashes = [];

        
        let o1 = 0.02;
        let o2 = 0;
        let o3 = 0;

        let spinrate = 0.005;
        let spinEasing = TWEEN.Easing.Quadratic.InOut;

        
        let postrho = 2;

        let coordsStates = [];

        let xScale = 18;
        let yScale = 4;
        let fillerDot;

        
        let fillSphereRate = 0.04; //default 0.02
        let blinkingDelay = 200;
        let typingDelay = 50;

        let postTypingDelay = 500;
        let squishTime = 500;
        

        /*shorter
        let fillSphereRate = 0.1; //default 0.02
        let blinkingDelay = 50;
        let typingDelay = 1;

        let postTypingDelay = 0;
        let squishTime = 10;*/



        let positions = [];

        let stillAnimating = false;


        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            TWEEN.update();
            if(oldChildren != scene.children.length){
                oldChildren = scene.children.length;
                console.log(scene.children.length);
            }
            if(oldPhase != phase){
                oldPhase = phase;

                if(phase == 1){


                    objects.forEach((obj) => {
                        let phi = Math.acos(obj.position.y / postrho);
                        let theta = Math.atan2(obj.position.z, obj.position.x);
                        
                        let newTheta = theta + Math.PI;
                        let newPhi = phi + Math.PI;
                        positions.push([newPhi, newTheta]);
                        if(newPhi > Math.PI){
                            newPhi = Math.PI;
                        }
                        if(newTheta > Math.PI){
                            newTheta = Math.PI;
                        }

                        let newx = Math.sin(newPhi) * Math.cos(newTheta) * postrho;
                        let newy = Math.cos(newPhi) * postrho;
                        let newz = Math.sin(newPhi) * Math.sin(newTheta) * postrho;

                        obj.position.x = newx;
                        obj.position.y = newy;
                        obj.position.z = newz;
                        obj.visible = true;


                    });
                    
                } else if(phase == 2){
                    
                    let m2 = new THREE.MeshBasicMaterial({color: 0x00FF00});
                    let dotGeometry2 = new THREE.SphereGeometry(0.01);
                    


                    let newRho = 4;

                    let curState = [];
                    let nextState = [];
                    let squareState = [];
                    let sinState = [];
                    for(let i = 0; i < objects.length; i++){
                        let position = objects[i].position;
                        curState.push({
                            x: position.x,
                            y: position.y,
                            z: position.z
                        
                        });

                        let theta = Math.atan2(objects[i].position.y, objects[i].position.x);
                        let r = Math.sqrt(objects[i].position.x * objects[i].position.x + objects[i].position.y * objects[i].position.y);
                        let phi = Math.atan2(r, objects[i].position.z);

                        let x = newRho * Math.sin(phi) * Math.cos(theta);
                        let y = newRho * Math.cos(phi);
                        let z = newRho * Math.sin(phi) * Math.sin(theta);

                        let rad = 1;
                        let squareX = Math.random() * rad - rad / 2;
                        let squareY = Math.random() * rad - rad / 2;


                        let sinX;
                        let sinY;

                        if(i < objects.length / 2){
                            sinX = i / (objects.length / 2) * (xScale) - xScale / 2;
                            sinY = 1/(1 + Math.exp(-sinX)) * yScale - yScale / 2;
                        } else {
                            sinX = (i - objects.length / 2) / (objects.length / 2) * (xScale) - xScale / 2;
                            sinY = -(1/(1 + Math.exp(-sinX)) * yScale - yScale / 2);
                        }


                        sinState.push({
                            x: sinX,
                            y: sinY,
                            z: 0
                        });

                        squareState.push({
                            x: squareX,
                            y: squareY,
                            z: 0
                        });

                        nextState.push({
                            x: x,
                            y: y,
                            z: z
                        });
                    }
                    coordsStates.push(curState);
                    coordsStates.push(sinState);
                    coordsStates.push(squareState);
                    coordsStates.push(nextState);
                    
                    const event = new Event("threeComplete");
                    window.dispatchEvent(event);

                    
                    new TWEEN.Tween({x: o2})
                        .to({
                            x: spinrate
                        }, 3000)
                        .easing(spinEasing)
                        .onUpdate((val) => {
                            o2 = val.x;
                        })
                        .start()
                        .onComplete(() => {

                            new TWEEN.Tween({x: o2})
                                .to({
                                    x: -spinrate
                                }, 5000)
                                .easing(spinEasing)
                                .onUpdate((val) => {
                                    o2 = val.x;
                                })
                                .repeat(Infinity)
                                .yoyo(true)
                                .start();
                        });

                    new TWEEN.Tween({x: o3})
                    .to({
                        x: spinrate
                    }, 4000)
                    .easing(spinEasing)
                    .onUpdate((val) => {
                        o3 = val.x;
                    })
                    .start()
                    .onComplete(() => {

                        new TWEEN.Tween({x: o3})
                            .to({
                                x: -spinrate
                            }, 5000)
                            .easing(spinEasing)
                            .onUpdate((val) => {
                                o3 = val.x;
                            })
                            .repeat(Infinity)
                            .yoyo(true)
                            .start();
                    });
                
                   
                }
                
                /*
                new TWEEN.Tween(objects[0].scale)
                    .to({
                        x: 160,
                        y: 160,
                        z: 0,
                    }, 1000)
                    .easing(TWEEN.Easing.Quadratic.InOut)
                    .start();*/

                

            }

            if(phase == 1){

                for(let i = 0; i < objects.length; i++){
                    let position = positions[i];
                    let phi = position[0];
                    let theta = position[1];

                    let newTheta = theta - fillSphereRate;

                    let phiRate = Math.max(0.2, (2 * positions[0][0] / Math.PI));
                    let newPhi = phi - fillSphereRate * phiRate;

                    positions[i] = [newPhi, newTheta];
                    if(newPhi > Math.PI){
                        newPhi = Math.PI;
                    }
                    if(newTheta > Math.PI){
                        newTheta = Math.PI;
                    }
                    let newx = Math.sin(newPhi) * Math.cos(newTheta) * postrho;
                    let newy = Math.cos(newPhi) * postrho;
                    let newz = Math.sin(newPhi) * Math.sin(newTheta) * postrho;
                    objects[i].position.x = newx;
                    objects[i].position.y = newy;
                    objects[i].position.z = newz;

                    if(newPhi <= 0){
                        phase = 2;
                    }
                }
            } else if(phase == 2){

                
                
                

                //DISCRETE

                if(this.props.section != oldSection){
                    oldSection = this.props.section;


                    if(this.props.section == 0){
                        for(let i = 0; i < objects.length; i++){
                            

                            new TWEEN.Tween(objects[i].position)
                                .to({
                                    x: coordsStates[0][i].x,
                                    y: coordsStates[0][i].y,
                                    z: coordsStates[0][i].z,
                                }, 800)
                                .easing(TWEEN.Easing.Exponential.InOut)
                                .start();

                            

                        }

                        new TWEEN.Tween(camera.rotation)
                            .to({
                                x: 0,
                                y: 0,
                                z: -Math.PI/4,
                            }, 800)
                            .easing(TWEEN.Easing.Exponential.InOut)
                            .start();

                        new TWEEN.Tween(camera.position)
                            .to({
                                x: 0,
                                y: 0,
                                z: 20,
                            }, 800)
                            .easing(TWEEN.Easing.Exponential.InOut)
                            .start();




                    } else if(this.props.section == 1){

                        stillAnimating = true;


                        new TWEEN.Tween(camera.rotation)
                            .to({
                                x: 0,
                                y: 0,
                                z: 0,
                            }, 800)
                            .easing(TWEEN.Easing.Exponential.InOut)
                            .start();

                        new TWEEN.Tween(camera.position)
                            .to({
                                x: 0,
                                y: 0,
                                z: 20,
                            }, 800)
                            .easing(TWEEN.Easing.Exponential.InOut)
                            .start();

                        for(let i = 0; i < objects.length; i++){
                            

                            new TWEEN.Tween(objects[i].position)
                                .to({
                                    x: coordsStates[1][i].x,
                                    y: coordsStates[1][i].y,
                                    z: coordsStates[1][i].z,
                                }, 800)
                                .easing(TWEEN.Easing.Exponential.InOut)
                                .start()
                                .onComplete(() => {
                                    stillAnimating = false;
                                });


                        }

                        

                    } else if(this.props.section == 2){

                        

                        for(let i = 0; i < objects.length; i++){
                            
                            objects[i].material = material;
                            let randomDur = 800;
                            let newY = Math.random() * 10 + 10;
                            new TWEEN.Tween(objects[i].position)
                                .to({
                                    x: objects[i].position.x,
                                    y: newY,
                                    z: objects[i].position.z
                                }, 800)
                                .easing(TWEEN.Easing.Exponential.InOut)
                                .start();

                        }
                          
                    } else if(this.props.section == 3){

                        stillAnimating = true;

                        for(let i = 0; i < objects.length/2; i++){

                            objects[i].position.x = 18 * i / (objects.length/2) + 9;
                            objects[i].position.y = 0.4;
                            objects[i].position.z = 0;


                            let x = 18 * i / objects.length - 4.5;
                            

                            new TWEEN.Tween(objects[i].position)
                                .to({
                                    x: 2 * x,
                                    y: 0.4,
                                    z: 0,
                                }, 800)
                                .easing(TWEEN.Easing.Exponential.InOut)
                                .start()
                                .onComplete(() => {
                                    stillAnimating = false;
                                });


                        }

                        for(let i = objects.length/2; i < objects.length; i++){
                            
                            objects[i].position.x = 18 * (i - objects.length/2) / (objects.length/2) + 9;
                            objects[i].position.y = -0.4;
                            objects[i].position.z = 0;

                            let x = 18 * (i - objects.length/2) / objects.length - 4.5;

                            new TWEEN.Tween(objects[i].position)
                                .to({
                                    x: 2 * x,
                                    y: -0.4,
                                    z: 0,
                                }, 800)
                                .easing(TWEEN.Easing.Exponential.InOut)
                                .start();
                        }


                        


                        new TWEEN.Tween(camera.rotation)
                            .to({
                                x: 0,
                                y: 0,
                                z: 0,
                            }, 800)
                            .easing(TWEEN.Easing.Exponential.InOut)
                            .start();
                        
                    } else if(this.props.section == 4){

                        if(stillAnimating == true){

                            for(let i = 0; i < objects.length/2; i++){

                                objects[i].position.x = 18 * i / (objects.length/2) + 9;
                                objects[i].position.y = 0.4;
                                objects[i].position.z = 0;
    
    
                                let x = 18 * i / objects.length - 4.5;
                                
                                objects[i].position.x = 2 * x;
                                objects[i].position.y = 0.4;
                                objects[i].position.z = 0;
                            }
    
                            for(let i = objects.length/2; i < objects.length; i++){
                                
                                objects[i].position.x = 18 * (i - objects.length/2) / (objects.length/2) + 9;
                                objects[i].position.y = -0.4;
                                objects[i].position.z = 0;
    
                                let x = 18 * (i - objects.length/2) / objects.length - 4.5;
                                
                                objects[i].position.x = 2 * x;
                                objects[i].position.y = -0.4;
                                objects[i].position.z = 0;
                            }

                        }
                        stillAnimating = true;

                        for(let i = 0; i < objects.length / 2; i++){
                            let x = objects[i].position.x;
                            let y = objects[i].position.y;
                            
                            let newY;
                            if(Math.abs(x) < 5){
                                newY = 0;
                            } else {
                                if(x > 0){
                                    newY = ((x-5) * (x-5));
                                } else {
                                    newY = ((x+5) * (x+5));
                                }

                            }
                            new TWEEN.Tween(objects[i].position)
                                .to({
                                    x: x,
                                    y: newY,
                                    z: 0,
                                }, 800)
                                .easing(TWEEN.Easing.Exponential.InOut)
                                .start()
                                .onComplete(() => {
                                    stillAnimating = false;
                                });

                        }

                        for(let i = objects.length / 2; i < objects.length; i++){
                            let x = objects[i].position.x;
                            let y = objects[i].position.y;
                            
                            let newY;
                            if(Math.abs(x) < 5){
                                newY = 0;
                            } else {
                                if(x > 0){
                                    newY = ((x-5) * (x-5));
                                } else {
                                    newY = ((x+5) * (x+5));
                                }

                            }
                            new TWEEN.Tween(objects[i].position)
                                .to({
                                    x: x,
                                    y: -newY,
                                    z: 0,
                                }, 800)
                                .easing(TWEEN.Easing.Exponential.InOut)
                                .start()
                                .onComplete(() => {
                                    stillAnimating = false;
                                });
                        }
                    }
                    
                }




                //CONTINUOUS SECTION

                if(this.props.section == 0){


                    for(let i = 0; i < objects.length; i++){
                        
                        let rM = rotationMatrix(o2, o1, o3);

                        let position = positions[i];
                        let newpos = multiplyMatrices(rM, [[objects[i].position.x], [objects[i].position.y], [objects[i].position.z]]);
                        
                        objects[i].position.x = newpos[0][0];
                        objects[i].position.y = newpos[1][0];
                        objects[i].position.z = newpos[2][0];

                    }
                } else if(this.props.section == 1){

                    //fix this part set delay if it just changed to this section

                    if(stillAnimating == false){


                        for(let i = 0; i < objects.length; i++){
                            let x = objects[i].position.x;
                            let newX = x + 0.02;

                            if(newX > xScale/2){
                                newX = -xScale/2;
                            }

                            let newY = 1/(1 + Math.exp(-newX)) * yScale - yScale / 2;

                            if(i > objects.length/2){
                                newY = -1 * newY;
                            }

                            objects[i].position.x = newX;
                            objects[i].position.y = newY;

                        }
                    }
                } else if(this.props.section == 3){
                    if(stillAnimating == false){
                        for(let i = 0; i < objects.length; i++){
                            let x = objects[i].position.x;
                            let newX = x - 0.02;
                            if(newX < -xScale/2){
                                newX += xScale;
                            }

                            objects[i].position.x = newX;

                        }
                    }
                } else if(this.props.section == 4){

                    if(stillAnimating == false){

                        for(let i = 0; i < objects.length / 2; i++){
                            let newX = objects[i].position.x + 0.01;
                            if(newX > xScale/2){
                                newX = -xScale/2;
                            }
                            let newY;
                            if(Math.abs(newX) < 5){
                                newY = 0;
                            } else {
                                if(newX > 0){
                                    newY = ((newX-5) * (newX-5));
                                } else {
                                    newY = ((newX+5) * (newX+5));
                                }

                            }

                            objects[i].position.x = newX;
                            objects[i].position.y = newY;

                        }

                        for(let i = objects.length / 2; i < objects.length; i++){
                            let newX = objects[i].position.x + 0.01;
                            if(newX > xScale/2){
                                newX = -xScale/2;
                            }
                            let newY;
                            if(Math.abs(newX) < 5){
                                newY = 0;
                            } else {
                                if(newX > 0){
                                    newY = ((newX-5) * (newX-5));
                                } else {
                                    newY = ((newX+5) * (newX+5));
                                }

                            }

                            objects[i].position.x = newX;
                            objects[i].position.y = -newY;
                        }
                    }

                }






                    

            }
        }
        animate();


        for(let i = 0; i < 2; i++){
            pointer.visible = true;
            await delay(blinkingDelay);
            pointer.visible = false;
            await delay(blinkingDelay);
        }
        pointer.visible = true;

        let line = 0;
        
        let morse = [];
        let morse2 = [];
        


        for(let i = 0; i < nameSequence.length; i++){
            await delay(typingDelay);
            sequence += nameSequence[i];

            let yPos = (line == 0) ? 0: -0.5;
        
            if(nameSequence[i] === " "){
                if(line == 0){
                    morse.push("");
                } else {
                    morse2.push("");
                }
            } else if(nameSequence[i] === "."){
                var dot = new THREE.Mesh(dotGeometry, material);
                dot.position.y = yPos - 0.1;
                scene.add(dot);
                objects.push(dot);
                dots.push(dot);
                if(line == 0){
                    morse.push(dot);
                } else {
                    morse2.push(dot);
                }
            } else if(nameSequence[i] === "-"){
                var hash = new THREE.Mesh(hashGeometry, material);
                hash.position.y = yPos;
                scene.add(hash);
                objects.push(hash);
                dashes.push(hash);
                if(line == 0){
                    morse.push(hash);
                } else {
                    morse2.push(hash);
                }
            } else if(nameSequence[i] === "/"){
                line++;

                pointer.position.y = -0.5;
                pointer.position.x = 0;

                pointer.visible = false;
                await delay(200);
                pointer.visible = true;
                continue;
            }

            for(let j = 0; j < morse.length; j++){
                let newOffset = (j - morse.length / 2) * 0.3;
                if(morse[j] === ""){
                    continue;
                }
                morse[j].position.x = newOffset;
            }
            for(let j = 0; j < morse2.length; j++){
                let newOffset = (j - morse2.length / 2) * 0.3;
                if(morse2[j] === ""){
                    continue;
                }
                morse2[j].position.x = newOffset;
            }
            if(line == 0){
                
                pointer.position.x = (morse.length / 2) * 0.3;
                pointer.position.y = yPos;
            } else {
                pointer.position.x = (morse2.length / 2) * 0.3;
                pointer.position.y = yPos;
            }
            
        }

        await delay(postTypingDelay);
        pointer.visible = false;

        scene.remove(pointer);

        let lefts = objects.filter((obj) => obj.position.x < 0);
        let rights = objects.filter((obj) => obj.position.x > 0);
        let middles = objects.filter((obj) => obj.position.x == 0);

        let firstDot = true;
        objects.forEach((obj) => {
            let tAnimation = new TWEEN.Tween(obj.position)
                .to({
                    x: 0,
                    y: 0,
                    z: 0,
                }, squishTime)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start();
            if(firstDot == true){
                firstDot = false;
                tAnimation.onComplete(async () => {
                    dots = [objects[0]];
                    for(let i = 1; i < objects.length; i++){
                        scene.remove(objects[i]);
                    }

                    await delay(500);
                    
                    //////////////CIRCLE
                    camera.lookAt(0, 0, 0);
                    
                    camera.rotation.x = 0;
                    camera.rotation.y = 0;
                    camera.rotation.z= -Math.PI/4;

                    
                    let rho = 0.05;


                    let dotGeometry2 = new THREE.SphereGeometry(0.02);
                    objects = [];

                    

                    let numDots = 700;


                    let goldenPhi = Math.PI * (Math.sqrt(5.0) - 1.0);

                    scene.remove(dots[0]);

                    let fAnim = true;
                    
                    for(let i = 0; i < numDots; i++){
                        let theta = 2 * Math.PI * i / goldenPhi;
                        let phi = Math.acos(1 - 2 * i / (numDots));


                        let x = rho * Math.sin(phi) * Math.cos(theta);
                        let z = rho * Math.sin(phi) * Math.sin(theta);
                        let y = rho * Math.cos(phi);

                        let postx = postrho * Math.sin(phi) * Math.cos(theta);
                        let posty = postrho * Math.cos(phi);
                        let postz = postrho * Math.sin(phi) * Math.sin(theta);

                        let dot = new THREE.Mesh(dotGeometry2, material);
                        dot.visible = false;
                        dot.position.x = postx;
                        dot.position.y = posty;
                        dot.position.z = postz;

                        scene.add(dot);
                        objects.push(dot);

                        phase = 1;



                    
                    }
                });

            }
        });

        dots.forEach((dot) => {
            new TWEEN.Tween(dot.scale)
                .to({
                    x: 0,
                    y: 0,
                    z: 0,
                }, squishTime)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start();
            });
        

        dashes.forEach((dash) => {
            new TWEEN.Tween(dash.scale)
                .to({
                    x: 0,
                }, squishTime)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start().onComplete(() => {
                    scene.remove(dash);
                });
        });



        
        /*
        for(let i = 0; i < 2000; i++){
            await delay(0.1);
            for(let j = 0; j < lefts.length; j++){
                lefts[j].position.x -= 0.01;
            }
            for(let j = 0; j < rights.length; j++){
                rights[j].position.x += 0.01;
            }
        
        }

        for(let i = 0; i < 5; i++){
            middles[0].position.y -= 0.01;
            await delay(1);
        }

        for(let i = 0; i < 200; i++){
            await delay(1);
            for(let j = 0; j < lefts.length; j++){
                lefts[j].position.x += 0.1;
            }
            for(let j = 0; j < rights.length; j++){
                rights[j].position.x -= 0.1;
            }
        
        }*/


    }

    componentWillUnmount(){
        window.removeEventListener("resize", () => {
            let width = window.innerWidth;
            let height = window.innerHeight;
        
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });

    }



    render(){
        return (
            <div style={{zIndex: 1}} id="three-container"></div>
        )
    }
}