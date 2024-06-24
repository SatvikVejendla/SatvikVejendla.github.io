import React, { useState } from "react";

import "./Header.css";





export default class App extends React.Component {

  constructor(props) {
    super(props);


    this.mouseOver = this.mouseOver.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);

  }


  mouseOver() {
    document.querySelector(".cursor").classList.add("hover");
    document.querySelector(".trail").classList.add("hover");
  }

  mouseLeave() {
    document.querySelector(".cursor").classList.remove("hover");
    document.querySelector(".trail").classList.remove("hover");
  }

  render() {

    return (

      <div className="headerPosition" style={{zIndex: (this.props.section == 0) ? 3 : 2}}>
        <div className="row" style={{justifyContent: "space-between", height: "100vh"}}>
            <div className="header column">
              <div style={{position: 'relative'}}>
                <div className={"name" + (this.props.section != 0 ? " slideLeft" : "")}><span>Satvik Vejendla</span></div>
                <div className={"title" + (this.props.section != 0 ? " slideLeft" : "")}><span>Full-Stack Developer</span></div>
                </div>
            </div>
            <div className="toc">
                <div className={"toc-item item1" + (this.props.section != 0 ? " slideRight" : "")} onMouseOver={() => this.mouseOver()} onMouseLeave={() => this.mouseLeave()} onClick={() => window.scrollTo({ top: 100, behavior: "smooth"})}>About</div>
                <div className={"toc-item item2" + (this.props.section != 0 ? " slideRight" : "")} onMouseOver={() => this.mouseOver()} onMouseLeave={() => this.mouseLeave()} onClick={() => window.scrollTo({ top: 400, behavior: "smooth"})}>Skills</div>
                <div className={"toc-item item3" + (this.props.section != 0 ? " slideRight" : "")} onMouseOver={() => this.mouseOver()} onMouseLeave={() => this.mouseLeave()} onClick={() => window.scrollTo({ top: 3400, behavior: "smooth"})}>Projects</div>
                <div className={"toc-item item4" + (this.props.section != 0 ? " slideRight" : "")} onMouseOver={() => this.mouseOver()} onMouseLeave={() => this.mouseLeave()} onClick={() => window.scrollTo({ top: 6200, behavior: "smooth"})}>Contact</div>
            </div>
        </div>
      </div>
    );
  }
}