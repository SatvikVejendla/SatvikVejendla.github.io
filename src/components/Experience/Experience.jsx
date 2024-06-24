import React, { useState } from "react";

import Education from "./Education.jsx";
import WorkExperience from "./WorkExperience.jsx";
import Dates from "./Dates.jsx";

import "./Experience.css";
import { IoMdClose } from "react-icons/io";
import { FaGear } from "react-icons/fa6";
import { FaCode } from "react-icons/fa6";
import { FaHandPaper } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa";
import { IoCube } from "react-icons/io5";



import UnityIcon from '../../assets/icons/unity.jsx';
import JSIcon from '../../assets/icons/javascript.jsx';
import PythonIcon from '../../assets/icons/python.jsx';
import NodeJSIcon from '../../assets/icons/node.jsx';
import CPLUSPLUSIcon from '../../assets/icons/c++.jsx';
import ScratchIcon from '../../assets/icons/scratch.jsx';
import CSharpIcon from '../../assets/icons/csharp.jsx';



import sbhs from "../../assets/sbhs.png";
import rutgers from "../../assets/rutgers.png";
import logiq from "../../assets/logiqminds.png";
import vex from "../../assets/vex.png";
import codeninjas from "../../assets/codeninjas.png";

let images = [sbhs, rutgers, logiq, codeninjas, rutgers, vex];
let places = ["South Brunswick High School", "Rutgers University", "LogiQMinds", "CodeNinjas", "Rutgers University", "VEX Robotics"];



let information1 = {
    index: 1,
    image: sbhs,
    place: "South Brunswick High School",
    role: "Graduate with Honors",
    type: "school",
    gpa: 4.3,
    date: "2019-2023",
    awards: ["National Honors Society", "Math Honors Society", "Science Honors Society", "Computer Science Honors Society", "Technology Honors Society", "Spanish Honors Society"],
    clubs: [
        {
            name: "Robotics Team",
            role: "Captain & Lead Programmer",
            icon: <FaGear className="clubIcon" size={40}/>,
        },
        {
            name: "Computer Science Club",
            role: "Secretary",
            icon: <FaCode className="clubIcon" size={40}/>,
        },
        {
            name: "Viking Volunteers",
            icon: <FaHandPaper className="clubIcon" size={40}/>,
        },
        {
            name: "Mathletes Club",
            icon: <FaCalculator className="clubIcon" size={40}/>,
        }
    ],
    classes: [
        "AP Physics C",
        "Multivariable Calculus",
        "Linear Algebra",
        "Differential Equations",
        "Mobile App Development",
        "Data Structures & Algorithms",
        "Virtual Reality & Game Development",
        "Independent Study: AI",
    ]

}

let information2 = {
    index: 2,
    image: rutgers,
    place: "Rutgers University - SASHP",
    role: "B.S. in CS",
    type: "school",
    gpa: 3.8,
    date: "2023-2027",
    awards: ["Dean's List (Fall)", "SAS Honors Program"],
    clubs: [
        {
            name: "VEX Robotics",
            icon: <FaGear className="clubIcon" size={40}/>,
        },
        {
            name: "USACS",
            icon: <FaCode className="clubIcon" size={40}/>,
        },
        {
            name: "RU3D",
            icon: <IoCube className="clubIcon" size={40}/>,
        }
    ],
    classes: [
        "Data Structures",
        "Data 101",
        "Discrete Structures I",
        "Discrete Structures II",
        "Computer Architecture",
        "Intro to AI",
        "Multivariable Calculus",
        "Linear Algebra",
    ]
}

let information3 = {
    index: 3,
    image: logiq,
    place: "LogiQMinds",
    role: "CS/Robotics Teaching Assistant",
    type: "work",
    date: "Dec 2021 - Jun 2022",
    skills: [ScratchIcon],
    description: [
        "Tailored an interactive, engaging environment to educate students about VEX IQ Robotics and Scratch programming"
    ]

}

let information4 = {
    index: 4,
    image: codeninjas,
    place: "CodeNinjas",
    role: "Computer Science Sensei",
    type: "work",
    date: "May 2022 - Aug 2023",
    skills: [ScratchIcon, JSIcon, UnityIcon, CSharpIcon],
    description: [
        "Responsible for creating a comprehensive FLL robotics curriculum for elementary school students and guiding them to the state competition",
        "Manage and teach middle school students about concepts ranging from Scratch up to Unity game development with C#"
    ]
}

let information5 = {
    index: 5,
    image: rutgers,
    place: "Rutgers University",
    role: "Engineering Lab Research Assistant",
    type: "work",
    date: "Sep 2023 - Present",
    skills: [NodeJSIcon],
    description: [
        "Managed an accurate inventory of laboratory materials and equipment",
        "Assisted with collecting and analyzing data for research projects",
    ],

}

let information6 = {
    index: 6,
    image: vex,
    place: "VEX Robotics",
    role: "Captain & Lead Programmer",
    type: "work",
    date: "Sep 2021 - Aug 2023",
    skills: [CPLUSPLUSIcon, NodeJSIcon],
    description: [
        "Programmed a completely autonomous skills routine which helped us get 1st place in the state competition of 50+ teams",
        "Lead my team to qualify for the VEX Worlds Competition for the first time in 4 years for my school",
        "Guided underclassmen to develop technical skills while encouraging a more closely bonded team"
    ]
}

let informations = [information1, information2, information3, information4, information5, information6];

export default class Experience extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            selection: 0,
            informations: null,
        }

        this.experience = React.createRef();

        this.selectItem = this.selectItem.bind(this);
    }

    handleScroll = () => {
        this.experience.current.style.transform = "translateX(" + (700 - window.scrollY) + "px)";
        this.setState({
            selection: 0,
        })


    }

    selectItem = (index) => {
        console.log(index);
        this.setState({
            selection: index,
        })

        if(index == 0){
            setTimeout(() => {
                this.setState({
                    information: null,
                })
            }, 400);
        } else {
            this.setState({
                information: informations[index - 1],
            })
        }
    }


    
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    render() {
        return (
            <div>
                <div ref={this.experience} className={"experience " + (this.props.section == 3 ? "" : "hidden") + (this.state.selection != 0 ? "background": "")} style={{zIndex: (this.props.section == 3) ? 4 : 2, transform: "translateX(" + (700 - window.scrollY) + "px)"}}>
                    <div className="experienceRelative">
                        <Education setSelection={this.selectItem}/>
                        <WorkExperience setSelection={this.selectItem}/>
                        <Dates/>
                    </div>
                </div>
                <div className="absoluteDescription" style={{zIndex: (this.state.selection != 0) ? 4 : 2, opacity: (this.props.section != 3) ? 0: 1}}>
                    <div className={"descriptionBorder " + ((this.state.selection == 0 || this.props.section != 3) ? "hidden": "")}>
                        <div className="descriptionbox">
                            <IoMdClose size={50} onClick={() => this.selectItem(0)}  className="closeIcon"/>
                            {this.state.information == null ? <div></div> :
                                <div className="descriptionPlaceWrapper">
                                    <img src={this.state.information.image} style={{marginRight: "10px"}} className="placeIcon"/>
                                    <div className="descriptionPlaceVertical">
                                        <div className="descriptionPlace">{this.state.information.place}</div>
                                        <div className="descriptionRoleHorizontal">
                                            <div className="descriptionRole">{this.state.information.role}</div>
                                            {this.state.information.type == "school" ? <div className="descriptionGPA">GPA: {this.state.information.gpa}</div> : <div></div>}

                                        </div>

                                        {this.state.information.type == "school" ?
                                            <div>
                                                <div className="descriptionDate">{this.state.information.date}</div>
                                            </div>
                                            :
                                            <div>
                                                <div className="descriptionDate">{this.state.information.date}</div>
                                            </div>
                                        }
                                        

                                    </div>
                                </div>
                            }


                            { (this.state.information != null && this.state.information.type=="school") ? 
                                <div className="descriptionAbout">
                                        <div className="awardsCol">
                                            {
                                                this.state.information.index == 1 ? 
                                                    <div className="awardsRow">

                                                        <div className="awardItem left">
                                                            <div className="awardItemText">
                                                                {this.state.information.awards[0]}
                                                            </div>
                                                        </div>

                                                        <div className="awardItem middle">
                                                            <div className="awardItemText">
                                                                {this.state.information.awards[1]}
                                                            </div>
                                                        </div>

                                                        <div className="awardItem right">
                                                            <div className="awardItemText">
                                                                {this.state.information.awards[2]}
                                                            </div>
                                                        </div>

                                                    </div>
                                                : <div></div>
                                            }

                                            {
                                                this.state.information.index == 1 ? 
                                                    <div className="awardsRow2">

                                                        <div className="awardItem left">
                                                            <div className="awardItemText">
                                                                {this.state.information.awards[3]}
                                                            </div>
                                                        </div>

                                                        <div className="awardItem middle">
                                                            <div className="awardItemText">
                                                                {this.state.information.awards[4]}
                                                            </div>
                                                        </div>

                                                        <div className="awardItem right">
                                                            <div className="awardItemText">
                                                                {this.state.information.awards[5]}
                                                            </div>
                                                        </div>

                                                    </div>
                                                : <div></div>
                                            }


                                            {
                                                this.state.information.index == 2 ? 
                                                    <div className="awardsRow3">

                                                        <div className="awardItem left">
                                                            <div className="awardItemText">
                                                                {this.state.information.awards[0]}
                                                            </div>
                                                        </div>

                                                        <div className="awardItem middle2"></div>

                                                        <div className="awardItem right">                              
                                                            <div className="awardItemText">
                                                                {this.state.information.awards[1]}
                                                            </div>
                                                        </div>

                                                    </div>
                                                : <div></div>
                                            }
                                        </div>
                                        <div className={this.state.information.clubs.length == 3 ? "clubsRow2" : "clubsRow"}>
                                            {
                                                this.state.information.clubs.map((club) => {
                                                    return <div className="clubItem">
                                                        {club.icon}
                                                        <div className="clubDescription">
                                                            <div className="clubName">{club.name}</div>
                                                            <div className="clubRole">{club.role}</div>
                                                        </div>
                                                    </div>
                                                })

                                            }
                                        </div>

                                        {
                                            this.state.information.type == "school" ? 
                                                <div className="courses">

                                                    {
                                                        this.state.information.classes.map((course) => {
                                                            return <div className="courseItem">
                                                                <div className="courseText">{course}</div>
                                                            </div>
                                                        })
                                                    
                                                    }

                                                </div>
                                            : <div></div>
                                        }
                                </div>
                                : <div></div>
                            }
                        
                        { (this.state.information != null && this.state.information.type=="work") ? 
                            <div className="descriptionOuter">
                                <div className="descriptionList">
                                    {
                                        this.state.information.description.map((desc) => {
                                            return <div className="descriptionItem">
                                                <div className="descriptionText">- {desc}</div>
                                            </div>
                                        })
                                    }
                                </div>
                                <div className="skillsAbout">
                                    {
                                        this.state.information.skills.map((Skill) => {
                                            return <div className="skillItem">
                                                <Skill className="skillIcon"/>
                                            </div>
                                        })
                                    }

                                </div>
                            </div>
                            : <div></div>
                        }

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}