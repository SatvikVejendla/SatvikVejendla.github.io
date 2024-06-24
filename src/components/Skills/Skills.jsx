import React from 'react';

import AndroidIcon from '../../assets/icons/androidstudio.jsx';
import BlenderIcon from '../../assets/icons/blender.jsx';
import CPLUSPLUSIcon from '../../assets/icons/c++.jsx';
import CSSIcon from '../../assets/icons/css.jsx';
import ExpressIcon from '../../assets/icons/express.jsx';
import FirebaseIcon from '../../assets/icons/firebase.jsx';
import FlaskIcon from '../../assets/icons/flask.jsx';
import GraphQLIcon from '../../assets/icons/graphql.jsx';
import HTMLIcon from '../../assets/icons/html.jsx';
import JavaIcon from '../../assets/icons/java.jsx';
import JavaScriptIcon from '../../assets/icons/javascript.jsx';
import JQueryIcon from '../../assets/icons/jquery.jsx';
import KerasIcon from '../../assets/icons/keras.jsx';
import MatplotlibIcon from '../../assets/icons/matplotlib.jsx';
import MySQLIcon from '../../assets/icons/mysql.jsx';
import NodeJSIcon from '../../assets/icons/node.jsx';
import P5Icon from '../../assets/icons/p5.jsx';
import PandasIcon from '../../assets/icons/pandas.jsx';
import PHPIcon from '../../assets/icons/php.jsx';
import PuppeteerIcon from '../../assets/icons/puppeteer.jsx';
import PythonIcon from '../../assets/icons/python.jsx';
import RIcon from '../../assets/icons/R.jsx';
import ReactIcon from '../../assets/icons/react.jsx';
import TensorFlowIcon from '../../assets/icons/tensorflow.jsx';
import ThreeJSIcon from '../../assets/icons/three.jsx';
import UnityIcon from '../../assets/icons/unity.jsx';

import "./Skills.css";
import "./SkillsBackground.css";


let icons = [
    AndroidIcon,
    BlenderIcon,
    CPLUSPLUSIcon,
    CSSIcon,
    ExpressIcon,
    FirebaseIcon,
    FlaskIcon,
    GraphQLIcon,
    HTMLIcon,
    JavaIcon,
    JavaScriptIcon,
    JQueryIcon,
    KerasIcon,
    MatplotlibIcon,
    MySQLIcon,
    NodeJSIcon,
    P5Icon,
    PandasIcon,
    PHPIcon,
    PuppeteerIcon,
    PythonIcon,
    RIcon,
    ReactIcon,
    TensorFlowIcon,
    ThreeJSIcon,
    UnityIcon,
];


const gridAreaNames = [
    "item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9",
    "item10", "item11", "item12", "item13", "item14", "item15", "item16", "item17",
    "item18", "item19", "item20", "item21", "item22", "item23", "item24", "item25", "item26"
];
const iconNames = [
    "Android", "Blender", "C++", "CSS", "Express", "Firebase", "Flask", "GraphQL", "HTML",
    "Java", "JavaScript", "JQuery", "Keras", "Matplotlib", "MySQL", "NodeJS", "P5",
    "Pandas", "PHP", "Puppeteer", "Python", "R", "React", "TensorFlow", "ThreeJS", "Unity"
];

let size = "60px";

export default class Skills extends React.Component {

    constructor(props){
        super(props);
        this.ref = React.createRef();
        this.skillsRef = React.createRef();
        this.ref.current = [];

        this.textRef = React.createRef();
        this.skillsTextRef = React.createRef();


        this.state = {
            lastSelected: -1,
            lastSection: -1,
            curSection: -1,
        }
    }

    callbackRef = (element) => {
        if(element){
            this.ref.current.push(element);
        }
    }

    changeSkill = (index) => {
        if(this.textRef.current != null){
                    
            document.querySelector(".cursor").classList.add("hover");
            document.querySelector(".trail").classList.add("hover");
            if(this.state.lastSelected == index){
                return;
            }
            if(!this.textRef.current.classList.contains("animating")){
                this.textRef.current.innerText = iconNames[index];
                this.textRef.current.style.zIndex = 3;
                this.textRef.current.classList.add("animating");

                this.skillsTextRef.current.style.zIndex = 1;
                this.skillsTextRef.current.classList.remove("animating");
            } else {
                this.skillsTextRef.current.innerText = iconNames[index];
                this.skillsTextRef.current.style.zIndex = 3;
                this.skillsTextRef.current.classList.add("animating");

                this.textRef.current.style.zIndex = 1;
                this.textRef.current.classList.remove("animating");
            }
            this.setState({lastSelected: index});
        }
    }
    resetSkill = (index) => {
        
      document.querySelector(".cursor").classList.remove("hover");
      document.querySelector(".trail").classList.remove("hover");
    }

    render() {
        if(this.skillsRef.current != null){
            if(this.props.section == 2){
                this.skillsRef.current.classList.remove("hidden");
                this.ref.current.forEach((element) => {
                    element.classList.remove("hidden");
                });
            } else {
                this.ref.current.forEach((element) => {
                    element.classList.add("hidden");
                });
            }
        }
        if(this.props.section != this.state.curSection){
            console.log("Last Section: " + this.state.curSection);
            console.log("Current Section: " + this.props.section);
            
            this.setState(
                {
                    lastSection: this.state.curSection,
                    curSection: this.props.section
                }
            );
            
        }
        return (
            <div ref={this.skillsRef} className="skills hidden" style={{zIndex: (this.props.section == 2) ? 3 : 2}}>
                <div className="skills-body" style={{zIndex: (this.props.section == 2) ? 3 : 2}}>
                    <div className="grid" style={{zIndex: (this.props.section == 2) ? 4 : 2}}>
                        {
                            icons.map((Icon, index) => {
                                return (
                                    <div ref={this.callbackRef} onMouseEnter={()=>this.changeSkill(index)} onMouseLeave={()=>this.resetSkill(index)} className={"gridItem hidden skillsItem" + gridAreaNames[index] } key={index} style={{gridArea: gridAreaNames[index] }}>
                                        <Icon/>
                                    </div>
                                );
                            })
                        }
                        
                    </div>
                    <div className={"skillsBackground " + (this.props.section != 2 ? "hidden" : "")} style={{zIndex: 1}}>
                        <div ref={this.skillsTextRef} className="skillsBackgroundTitle">
                            Skills
                        </div>
                        <div ref={this.textRef} className="currentSkill">
                            Android
                        </div>

                    </div>
                    
                    
                </div>
            </div>
        );
    }
}