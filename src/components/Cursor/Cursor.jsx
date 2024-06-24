import React, { Component } from 'react'

import "./Cursor.css";

class Dot {
    
  constructor(className, offset){
      this.x = 0;
      this.y = 0;
      
      var n = document.createElement("div");
      n.className = className + " hidden";
      document.body.appendChild(n);
      n.style.position = "fixed";
      this.node = n;
      this.offset = offset;
  }

  draw() {
      this.node.style.left = this.x + "px";
      this.node.style.top = this.y + "px";
  }
}

let cursor = new Dot("cursor", 0);
let trail = new Dot("trail", 0);

let dots = {
  cursor: cursor,
  trail: trail
}
let mouse = {
  cursor: {
    x: -100,
    y: -100,
  },
  trail: {
    x: -100,
    y: -100,
  }
};

function draw(dotName) {
  // Make sure the mouse position is set everytime
    // draw() is called.
  var x = mouse[dotName].x,
      y = mouse[dotName].y;
 
  let dot = dots[dotName]

  dot.x = x - dot.offset;
  dot.y = y - dot.offset;

  dot.draw()
 }
 
 function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
 }

 function updatePos(e, dotName) {
  if(mouse.cursor.x == -100 && mouse.cursor.y == -100 && mouse.trail.x == -100 && mouse.trail.y == -100){
    dots.cursor.node.classList.remove("hidden");
    dots.trail.node.classList.remove("hidden");

    mouse.trail.x = e.x;
    mouse.trail.y = e.y;

    mouse.cursor.x = e.x;
    mouse.cursor.y = e.y;

  }
  var relPos = {
    x: e.x,
    y : e.y
  };

  if(dotName == "trail"){
    relPos.x -= 1
    relPos.y -= 1;
  }
  mouse[dotName].x = relPos.x;
  mouse[dotName].y = relPos.y;
 }


 window.addEventListener("mousemove", async function(e) {

  updatePos(e, "cursor")
 
  draw("cursor")
  await sleep(100)
  updatePos(e, "trail")

  draw("trail")
  

 });


export default class mouseTrail extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

