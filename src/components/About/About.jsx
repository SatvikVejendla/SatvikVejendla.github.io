import React from "react";
import "./About.css";

import Skills from "../Skills/Skills.jsx";
import FullStackIcon from "../../assets/icons/roles/fullstack.jsx";
import MLIcon from "../../assets/icons/roles/ml.jsx";
import SEIcon from "../../assets/icons/roles/se.jsx";
import DSIcon from "../../assets/icons/roles/ds.jsx";

export default class About extends React.Component{

    constructor(props){
        super(props);

        this.ref1 = React.createRef();
        this.ref2 = React.createRef();
        this.ref3 = React.createRef();
        this.ref4 = React.createRef();

        this.dref1 = React.createRef();
        this.dref2 = React.createRef();
        this.dref3 = React.createRef();
        this.dref4 = React.createRef();

        this.r = React.createRef();

        this.mouseMove = this.mouseMove.bind(this);
    }

    mouseMove(e){

        if(this.props.section == 1){

            let mouseX = e.clientX - window.innerWidth/2;
            let mouseY = window.innerHeight/2 - e.clientY;

            //check section one then morph to the text
            let yScale = 550;

            let xScale = 550 / 4;

            let sinX = mouseX / xScale;

            sinX = Math.abs(sinX);

            let upperY = 1/(1 + Math.exp(-sinX)) * yScale - yScale / 2;
            let lowerY = -(1/(1 + Math.exp(-sinX)) * yScale - yScale / 2);

            if(mouseX > 0 && mouseY < upperY && mouseY > lowerY){
                this.dref3.current.classList.add("visible");
                this.ref3.current.classList.add("hidden");
            } else {
                this.dref3.current.classList.remove("visible");
                this.ref3.current.classList.remove("hidden");
            }
            if(mouseX < 0 && mouseY < upperY && mouseY > lowerY){
                this.dref1.current.classList.add("visible");
                this.ref1.current.classList.add("hidden");
            } else {
                this.dref1.current.classList.remove("visible");
                this.ref1.current.classList.remove("hidden");
            }

            if(mouseY > 0 && mouseY > upperY){
                this.dref4.current.classList.add("visible");
                this.ref4.current.classList.add("hidden");
            } else {
                this.dref4.current.classList.remove("visible");
                this.ref4.current.classList.remove("hidden");
            }

            if(mouseY < 0 && mouseY < lowerY){
                this.dref2.current.classList.add("visible");
                this.ref2.current.classList.add("hidden");
            } else {
                this.dref2.current.classList.remove("visible");
                this.ref2.current.classList.remove("hidden");
            }
        }


    }


    componentDidMount() {
        window.addEventListener("mousemove", this.mouseMove);
    }

    componentWillUnmount() {
        window.removeEventListener("mousemove", this.mouseMove);
    }


    render(){
        if(this.r.current != null){
            if(this.props.section != 1){
                this.ref1.current.classList.add("hidden");
                this.ref2.current.classList.add("hidden");
                this.ref3.current.classList.add("hidden");
                this.ref4.current.classList.add("hidden");

                this.dref1.current.classList.remove("visible");
                this.dref2.current.classList.remove("visible");
                this.dref3.current.classList.remove("visible");
                this.dref4.current.classList.remove("visible");
            } else {
                this.r.current.classList.remove("hidden");
            }
        }
        if(this.ref1.current != null){
            if(this.props.section != 1){
                this.ref1.current.classList.add("hidden");
                this.ref2.current.classList.add("hidden");
                this.ref3.current.classList.add("hidden");
                this.ref4.current.classList.add("hidden");
            } else {
                this.ref1.current.classList.remove("hidden");
                this.ref2.current.classList.remove("hidden");
                this.ref3.current.classList.remove("hidden");
                this.ref4.current.classList.remove("hidden");
            }
        }
        return (
            <div className="aboutPosition about column">
                    
                <div ref={this.r} className="body hidden" style={{zIndex: (this.props.section == 1) ? 3: 2}}>
                    <div className="roles">
                        <div ref={this.ref1} className="role title1 hidden">
                            <FullStackIcon className="titleicon fsicon"/>
                        </div>
                        <div ref={this.dref1} className="description desc1">
                            Full-Stack Developer
                        </div>
                        <div ref={this.ref2} className="role title2 hidden">
                            <SEIcon className="titleicon seicon"/>
                        </div>
                        <div ref={this.dref2} className="description desc2">
                            Software Engineer
                        </div>
                        <div ref={this.ref3} className="role title3 hidden">
                            <MLIcon className="titleicon mlicon"/>
                        </div>
                        <div ref={this.dref3} className="description desc3">
                            Machine Learning Engineer
                        </div>
                        <div ref={this.ref4} className="role title4 hidden">
                            <DSIcon className="titleicon dsicon"/>
                        </div>
                        <div ref={this.dref4} className="description desc4">
                            Data Scientist
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}