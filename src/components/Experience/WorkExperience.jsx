import React from "react";

import "./WorkExperience.css";
import logiq from "../../assets/logiqminds.png";
import vex from "../../assets/vex.png";
import codeninjas from "../../assets/codeninjas.png";
import rutgers from "../../assets/rutgers.png";

export default class WorkExperience extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: 0,
        }

        this.mouseOver = this.mouseOver.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
    }


    hoverItem = (index) => {

        this.setState({
            selected: index,
        })

    }

    mouseOver(i) {
        this.hoverItem(i);
        document.querySelector(".cursor").classList.add("hover");
        document.querySelector(".trail").classList.add("hover");
    }
    
    mouseLeave(i) {
        this.hoverItem(i);
        document.querySelector(".cursor").classList.remove("hover");
        document.querySelector(".trail").classList.remove("hover");
    }

    render() {
        return (
            <div ref={this.educationSection} className="workSection">
                <div className="workSectionRelative">
                    <div onMouseOver={() => this.mouseOver(1)} onMouseLeave={() => this.mouseLeave(0)} onMouseDown={() => this.props.setSelection(3)} className={"workItem1 " + (this.state.selected == 1 ? "hover": "")}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: 'center'}} className="education-title">
                            <img src={logiq} width="60px" height="60px"/>
                            <div className="education-title">LogiQMinds</div>
                        </div>
                        <div style={{marginTop: "10px"}}>CS/Robotics Teaching Assistant</div>
                    </div>
                    <div className="eidate wi1">
                        <div className="eirelative">
                            <div onMouseOver={() => this.hoverItem(1)} onMouseLeave={() => this.hoverItem(0)} className={"eistart wi1 " + (this.state.selected == 1 ? "hover": "")}></div>
                            <div onMouseOver={() => this.hoverItem(1)} onMouseLeave={() => this.hoverItem(0)} className={"eiline wi1 " + (this.state.selected == 1 ? "hover": "")}></div>
                            <div onMouseOver={() => this.hoverItem(1)} onMouseLeave={() => this.hoverItem(0)} className={"eiend wi1 "  + (this.state.selected == 1 ? "hover": "")}></div>
                        </div>
                    </div>



                    <div onMouseOver={() => this.mouseOver(2)} onMouseLeave={() => this.mouseLeave(0)} onMouseDown={() => this.props.setSelection(4)} className={"workItem2 " + (this.state.selected == 2 ? "hover": "")}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: 'center'}} className="education-title">
                            <img src={codeninjas} style={{marginRight: "10px"}} width="60px" height="60px"/>
                            <div className="education-title">CodeNinjas</div>
                        </div>
                        <div>Computer Science Sensei</div>
                    </div>
                    <div className="eidate wi2">
                        <div className="eirelative">
                            <div onMouseOver={() => this.hoverItem(2)} onMouseLeave={() => this.hoverItem(0)} className={"eistart wi2 " + (this.state.selected == 2 ? "hover": "")}></div>
                            <div onMouseOver={() => this.hoverItem(2)} onMouseLeave={() => this.hoverItem(0)} className={"eiline wi2 " + (this.state.selected == 2 ? "hover": "")}></div>
                            <div onMouseOver={() => this.hoverItem(2)} onMouseLeave={() => this.hoverItem(0)} className={"eiend wi2 " + (this.state.selected == 2 ? "hover": "")}></div>

                        </div>
                    </div>



                    <div onMouseOver={() => this.mouseOver(3)} onMouseLeave={() => this.mouseLeave(0)} onMouseDown={() => this.props.setSelection(5)} className={"workItem3 " + (this.state.selected == 3 ? "hover": "")}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: 'center'}} className="education-title">
                            <img src={rutgers} style={{marginRight: "10px"}} width="60px" height="60px"/>
                            <div className="education-title">Rutgers University</div>
                        </div>
                        <div>Engineering Lab Research Assistant</div>
                    </div>
                    <div className="eidate wi3">
                        <div className="eirelative">
                            <div onMouseOver={() => this.hoverItem(3)} onMouseLeave={() => this.hoverItem(0)} className={"eistart wi3 " + (this.state.selected == 3 ? "hover": "")}></div>
                            <div onMouseOver={() => this.hoverItem(3)} onMouseLeave={() => this.hoverItem(0)} className={"eiline wi3 " + (this.state.selected == 3 ? "hover": "")}></div>
                            <div onMouseOver={() => this.hoverItem(3)} onMouseLeave={() => this.hoverItem(0)} className={"eiend wi3 " + (this.state.selected == 3 ? "hover": "")}></div>

                        </div>
                    </div>





                    <div onMouseOver={() => this.mouseOver(4)} onMouseLeave={() => this.mouseLeave(0)} onMouseDown={() => this.props.setSelection(6)} className={"workItem4 " + (this.state.selected == 4 ? "hover": "")}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: 'center'}} className="education-title">
                            <img src={vex} style={{marginRight: "10px"}} width="60px" height="60px"/>
                            <div className="education-title">SBHS VEX 750B</div>
                        </div>
                        <div>Captain & Lead Programmer</div>
                    </div>
                    <div className="eidate wi4">
                        <div className="eirelative">
                            <div onMouseOver={() => this.hoverItem(4)} onMouseLeave={() => this.hoverItem(0)} className={"eistart wi4 " + (this.state.selected == 4 ? "hover": "")}></div>
                            <div onMouseOver={() => this.hoverItem(4)} onMouseLeave={() => this.hoverItem(0)} className={"eiline wi4 " + (this.state.selected == 4 ? "hover": "")}></div>
                            <div onMouseOver={() => this.hoverItem(4)} onMouseLeave={() => this.hoverItem(0)} className={"eiend wi4 " + (this.state.selected == 4 ? "hover": "")}></div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}