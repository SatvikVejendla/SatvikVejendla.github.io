import React from "react";

import "./Education.css";

import sbhs from "../../assets/sbhs.png";
import rutgers from "../../assets/rutgers.png";

export default class Education extends React.Component {
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
            <div className="educationSection">
                <div className="educationSectionRelative">
                    <div onMouseOver={() => this.mouseOver(1)} onMouseLeave={() => this.mouseLeave(0)} onMouseDown={() => this.props.setSelection(1)} className={"educationItem1 " + (this.state.selected == 1 ? "hover": "")}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: 'center'}} className="education-title">
                            <img src={sbhs} style={{marginRight: "10px"}} width="60px" height="60px"/>
                            <div className="education-title">South Brunswick High School</div>
                        </div>
                        <div>Honors Society</div>
                        <div>GPA: 4.3</div>
                    </div>
                    <div className="eidate ei1">
                        <div className="eirelative">
                            <div onMouseOver={() => this.hoverItem(1)} onMouseLeave={() => this.hoverItem(0)} className={"eistart ei1 " + (this.state.selected == 1 ? "hover": "")}></div>
                            <div onMouseOver={() => this.hoverItem(1)} onMouseLeave={() => this.hoverItem(0)} className={"eiline ei1 " + (this.state.selected == 1 ? "hover": "")}></div>
                            <div onMouseOver={() => this.hoverItem(1)} onMouseLeave={() => this.hoverItem(0)} className={"eiend ei1 " + (this.state.selected == 1 ? "hover": "")}></div>

                        </div>
                    </div>


                    <div onMouseOver={() => this.mouseOver(2)} onMouseLeave={() => this.mouseLeave(0)} onMouseDown={() => this.props.setSelection(2)} className={"educationItem2 " + (this.state.selected == 2 ? "hover": "")}>
                        <div style={{display: "flex", flexDirection: "row", alignItems: 'center'}} className="education-title">
                            <img src={rutgers} style={{marginRight: "10px"}} width="60px" height="60px"/>
                            <div className="education-title">Rutgers University</div>
                        </div>
                        <div>Computer Science</div>
                        <div>GPA: 3.8</div>
                    </div>
                    <div className="eidate ei2">
                        <div className="eirelative">
                            <div onMouseOver={() => this.hoverItem(2)} onMouseLeave={() => this.hoverItem(0)} className={"eistart ei2 " + (this.state.selected == 2 ? "hover": "")}></div>
                            <div onMouseOver={() => this.hoverItem(2)} onMouseLeave={() => this.hoverItem(0)} className={"eiline ei2 " + (this.state.selected == 2 ? "hover": "")}></div>
                            <div onMouseOver={() => this.hoverItem(2)} onMouseLeave={() => this.hoverItem(0)} className={"eiend ei2 " + (this.state.selected == 2 ? "hover": "")}></div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}