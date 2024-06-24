import React from "react";

import "./Projects.css";


import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";



import ReactIcon from '../../assets/icons/react.jsx';
import CPLUSPLUS from '../../assets/icons/c++.jsx';
import HTMLIcon from '../../assets/icons/html.jsx';
import CSSIcon from '../../assets/icons/css.jsx';
import NodeIcon from '../../assets/icons/node.jsx';
import THREEIcon from '../../assets/icons/three.jsx';
import JavascriptIcon from '../../assets/icons/javascript.jsx';
import ViteIcon from '../../assets/icons/vite.jsx';
import SassIcon from '../../assets/icons/sass.jsx';
import GithubIcon from '../../assets/icons/github.jsx';
import PROSIcon from '../../assets/icons/pros.jsx';
import PythonIcon from '../../assets/icons/python.jsx';
import TensorflowIcon from '../../assets/icons/tensorflow.jsx';
import KerasIcon from '../../assets/icons/keras.jsx';
import MatplotlibIcon from '../../assets/icons/matplotlib.jsx';
import DiscordIcon from '../../assets/icons/discord.jsx';
import ExpressIcon from '../../assets/icons/express.jsx';
import SQLIcon from '../../assets/icons/mysql.jsx';
import RIcon from '../../assets/icons/R.jsx';
import FirebaseIcon from '../../assets/icons/firebase.jsx';
import AndroidIcon from '../../assets/icons/androidstudio.jsx';
import JavaIcon from '../../assets/icons/java.jsx';
import PuppeteerIcon from '../../assets/icons/puppeteer.jsx';
import SklearnIcon from '../../assets/icons/sklearn.jsx';
import OpenCVIcon from '../../assets/icons/opencv.jsx';

import Project1Image from '../../assets/projects/project1.png';
import Project2Image from '../../assets/projects/project2.png';
import NeuralNetworkImage from '../../assets/projects/neuralnetwork.png';
import SpotifyStatsImage from "../../assets/projects/spotifystats.png";
import PurePursuitImage from "../../assets/projects/purepursuit.png";
import AqualiusImage from "../../assets/projects/aqualius.png";
import VEXImage from "../../assets/projects/vex.jpg";
import ScoutingApp from "../../assets/projects/scoutingapp.png";
import TitanicImage from "../../assets/projects/titanic.png";
import CartpoleImage from "../../assets/projects/cartpole.png";
import CovidImage from "../../assets/projects/covid.png";
import HeartDiseaseImage from "../../assets/projects/heartdisease.png";
import BarnesWorkspaceImage from "../../assets/projects/barnesworkspace.png";
import NewsClassificationImage from "../../assets/projects/newsclassification.png";
import MentalthImage from "../../assets/projects/mentalth.png";
import SPACImage from "../../assets/projects/spac.png";
import IndependentStudyImage from "../../assets/projects/independentstudy.png";

//path: P:\Code\Personal\Projects\satvikvejendla\src\assets\projects

//['SatvikVejendla.github.io', 'Neat.JS', 'VEX 750B', 'Mentalth', 'Pure Pursuit Algorithm', 'Spotify Stats', 'VEX Scouting', 'Heart Disease Analysis', 'Cartpole AI', 'Titanic Survival AI', 'Multilayer Neural Network', 'Aqualius', 'LoL', 'Independent Study', 'Covid Visualization', 'NewsClassification', 'Barnes Workspace', 'SPAC Stock Market Automation']


let projects = [
    {
        image: Project1Image,
        name: "SatvikVejendla.github.io",
        description: "My porftolio website created to showcase my projects, skills, and experiences.",
        features: [
            "Responsive design",
            "3D Interactive Animations",
            "5000+ lines of code"
        ],
        skills: [ReactIcon, HTMLIcon, CSSIcon, NodeIcon, THREEIcon, ViteIcon, SassIcon],
        fontScale: 1,
    },
    {
        image: Project2Image,
        name: "Neat.JS",
        description: "A NPM module implementation of the NEAT algorithm with vanilla JS",
        features: [
            "Created completely from scratch",
            "Detailed documentation on usage",
            "Packaged and ready for external use"
        ],
        skills: [JavascriptIcon, NodeIcon],
        github: [
            {
                name: "Code",
                link: "https://github.com/SatvikVejendla/neat-js/tree/main",
            }
        ],
        
    },
    {
        name: "VEX 750B",
        image: VEXImage,
        description: "As the lead programmer, I implemented several complex pathing algorithms in the autonomous section which led us to place 1st place skills in the state tournament.",
        features: [
            "PurePursuit Pathing",
            "PID Control",
            "Odometry Tracking"
        ],
        skills: [CPLUSPLUS, PROSIcon],
        
    },
    {
        name: "Mentalth",
        image: MentalthImage,
        description: "A Mental Health Discord bot which is meant to help provide support to those having negative thoughts. This bot keeps track of depressional, suicidal, and cyberbullying messages from users or to users.",
        features: [
            "Trained on a custom web scraped dataset from Twitter",
            "Integrated with Discord Bot API",
        ],
        skills: [JavascriptIcon, NodeIcon, DiscordIcon, PythonIcon, TensorflowIcon, KerasIcon, MatplotlibIcon],
        github: [
            {
                name: "Code",
                link: "https://github.com/SatvikVejendla/Mentalth",
            }
        ]
        
    },
    {
        name: "Pure Pursuit Algorithm",
        image: PurePursuitImage,
        description: "Visualization of Pure Pursuit algorithm in 2D space to help document the development process for my VEX Robotics team.",
        features: [
            "Customizable Data Inputs",
            "Smooth 2D Visualization",
        ],
        skills: [PythonIcon, MatplotlibIcon],
        github: [
            {
                name: "Code",
                link: "https://github.com/SatvikVejendla/PurePursuit",
            }
        ],
        fontScale: 0.8,
    },
    {
        name: "Spotify Stats",
        image: SpotifyStatsImage,
        description: "A full-stack web application that provides users with insights and statistics about their Spotify listening habits. By connecting to the Spotify API, users can view detailed analytics about their most played tracks, artists, genres, and more.",
        features: [
            "Seamless User Authentication with Spotify API workflow",
            "SQL Database integration for retention of user tokens",
            "Lightweight and responsive design with minimal libraries",
            "Fully responsive design",
            "Express.JS backend server for API token authentications",
        ],
        skills: [ReactIcon, NodeIcon, JavascriptIcon, HTMLIcon, CSSIcon, ExpressIcon, SQLIcon],
        github: [
            {
                name: "Frontend",
                link: "https://github.com/SatvikVejendla/SpotifyStats",
            },
            {
                name: "Backend",
                link: "https://github.com/SatvikVejendla/SpotifyStatsBackend/tree/main",
            }
        ],
    },
    {
        name: "VEX Scouting",
        image: ScoutingApp,
        description: "A simple app to scout out your opponents for VEX VRC competitions",
        features: [
            "Minimalistic interface for quick scouting",
            "Data visualization for easy analysis",
            "Custom skill metric formulated over numerous iterations",
            "Detailed statistics about each team",
            "Outcome predictions on theoretical match outcomes",

        ],
        skills: [ReactIcon, NodeIcon, JavascriptIcon, HTMLIcon, CSSIcon],
        github: [
            {
                name: "Analysis",
                link: "https://github.com/SatvikVejendla/VEXScoutingApp/blob/main/README.md",
            }
        ],
        fontScale: 0.8
    },
    {
        name: "Heart Disease Analysis",
        image: HeartDiseaseImage,
        description: "A model trained on a heart disease dataset to identify likelihood of receiving a heart disease.",
        features: [
            "Comphrensive EDA for feature selection",
            "Comparison with multiple prebuilt models",
            "Hyperparameter tuning",
        ],
        skills: [PythonIcon, TensorflowIcon, KerasIcon, MatplotlibIcon, SklearnIcon, RIcon],
        github: [
            {
                name: "Code",
                link: "https://github.com/SatvikVejendla/Heart-Disease-Analysis",
            },
            {
                name: "Analysis",
                link: "https://github.com/SatvikVejendla/Heart-Disease-Analysis/blob/main/README.md",
            }
        ],

    },
    {
        name: "Cartpole AI",
        image: CartpoleImage,
        description: "Multiple reinforcement learning models trained on the OpenAI Cartpole environment to compare performance",
        features: [
            "Deep Q Learning Model",
            "Actor Critic Model",
            "Visualization and Performance Analysis of Models"
        ],
        skills: [PythonIcon, TensorflowIcon, KerasIcon, MatplotlibIcon, RIcon],
        github: [
            {
                name: "DQN Code",
                link: "https://github.com/SatvikVejendla/Cartpole-DQN",
            },
            {
                name: "Actor Critic Code",
                link: "https://github.com/SatvikVejendla/Actor-Critic-Cartpole",
            }
        ],
        fontScale: 0.8,
    },
    {
        name: "Titanic Survival AI",
        image: TitanicImage,
        description: "A model trained on the Titanic dataset to predict the likelihood of survival of a passenger.",
        features: [
            "Comphrensive EDA for feature selection",
            "Hyperparameter tuning for optimal performance",
            "89% accuracy on test dataset",
        ],
        skills: [PythonIcon, TensorflowIcon, MatplotlibIcon, SklearnIcon, RIcon],
        github: [
            {
                name: "Code",
                link: "https://github.com/SatvikVejendla/Titanic-Survival-AI/tree/main",
            },
            {
                name: "Analysis",
                link: "https://github.com/SatvikVejendla/Titanic-Survival-AI/blob/main/README.md",
            }
        ],
        fontScale: 0.8
    },
    {
        name: "Multilayer Neural Network",
        image: NeuralNetworkImage,
        description: "A implementation of a multilayer neural network in Javascript from scratch.",
        features: [
            "Customizable layer structure and activation functions",
            "Packaged and ready for external use with detailed documentation",
            "Utilizes a custom matrix library made by me coded from scratch",
        ],
        skills: [JavascriptIcon, NodeIcon],
        github: [
            {
                name: "Code",
                link: "https://github.com/SatvikVejendla/Neural-Network-Module",
            },
            {
                name: "Documentation",
                link: "https://github.com/SatvikVejendla/Neural-Network-Module/blob/main/README.md",
            },
            {
                name: "Matrix Library",
                link: "https://github.com/SatvikVejendla/numpy-matrix-js",
            }
        ]
    },
    {
        name: "Aqualius",
        image: AqualiusImage,
        description: "A diverse Discord moderation bot with the numerous utility functions",
        features: [
            "Firebase Integration for User Data Storage",
            "Server Moderation, Music Playback, Fortnite & Valorant API integrations, and etc.",
        ],
        skills: [JavascriptIcon, NodeIcon, DiscordIcon, FirebaseIcon],
        github: [
            {
                name: "Code",
                link: "https://github.com/SatvikVejendla/Aqualius",
            }
        ]
    },
    {
        name: "Independent Study: AI",
        image: IndependentStudyImage,
        description: "Work for my high school independent study course in which I researched and implemented various AI libraries.",
        features: [
            "Computer-vision based AI models",
            "Road Lane Detection",
            "Reinforcement Learning Models",
        ],
        skills: [PythonIcon, OpenCVIcon]
    },
    {
        name: "Covid Visualization",
        image: CovidImage,
        description: "A React JS Web App that renders a 3D globe to visualize Covid related data such as confirmed cases, deaths, and etc.",
        features: [],
        skills: [ReactIcon, THREEIcon, JavascriptIcon, NodeIcon, HTMLIcon, CSSIcon],
        github: [
            {
                name: "Code",
                link: "https://github.com/SatvikVejendla/Covid-Visualization/tree/main",
            }
        ],
    },
    {
        name: "News Classification",
        image: NewsClassificationImage,
        description: "A model trained on a news dataset to classify news articles into different categories.",
        features: [
            "Easy model serialization for later access",
        ],
        skills: [PythonIcon, TensorflowIcon, KerasIcon],
        github: [
            {
                name: "Code",
                link: "https://github.com/SatvikVejendla/NewsClassification",
            },
        ]
    },
    {
        name: "Barnes Workspace",
        image: BarnesWorkspaceImage,
        description: "An app for Honors Algebra II and AP Calculus AB students of my high school to view the solutions to their homework problems.",
        features: [
            "Customizable app themes",
            "Easy access to problem solutions",
        ],
        note: ["Unfortunately, although this app was once published to the Google Play Store, it has since been removed due to the lack of maintenance."],
        skills: [AndroidIcon, JavaIcon, FirebaseIcon],
        github: [
            {
                name: "Code",
                link: "https://github.com/SatvikVejendla/BarnesWorkSpace",
            }
        ],
        fontScale: 0.8,
    },
    {
        name: "SPAC Stock Market Automation",
        image: SPACImage,
        description: "A headless automation script that fetches live data from active and pre-IPO SPAC filters",
        features: [
            "Compact data storage to easily readable file formats",

        ],
        skills: [NodeIcon, PuppeteerIcon],
        github: [
            {
                name: "Code",
                link: "https://github.com/SatvikVejendla/SPACStockMarketStats",
            }
        ],
        fontScale: 0.8,
    }


]
export default class Projects extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            selected: 0,
        };
        this.projectsDiv = React.createRef();

        this.handleScroll = this.handleScroll.bind(this);
        this.setSelection = this.setSelection.bind(this);

        this.mouseOver = this.mouseOver.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);

    }



    mouseOver = (i) => {
        this.setState({link: i});
        document.querySelector(".cursor").classList.add("hover");
        document.querySelector(".trail").classList.add("hover");
    }

    mouseLeave = () => {
        this.setState({link: 0});
        document.querySelector(".cursor").classList.remove("hover");
        document.querySelector(".trail").classList.remove("hover");
    }

    setSelection = (index) => {
        console.log(index);
        this.setState({selected: index});

    }

    handleScroll = (e) => {
        this.projectsDiv.current.style.transform = "translateY(" + (3400 - window.scrollY) + "px)";
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <div ref={this.projectsDiv} className={"projectsWrapper " + (this.props.section == 4 ? "": "hidden")} style={{zIndex: this.props.section == 4 ? 3 : 2, transform: "translateY(" + (3400 - window.scrollY) + "px)"}}>
                <div className="projectsGrid" onMouseLeave={() => this.setSelection(0)}>
                    
                    {
                        projects.map((project, index) => {
                            return <div className={"project project" + (index+1)} onMouseEnter={() => this.setSelection(index+1)}>
                                
                                <img className={"projectimage " + (this.state.selected == index+1 ? "hide": "")} src={project.image}/>

                                <div className={"projectInfo " + (this.state.selected == index+1 ? "show": "")}>
                                    <div style={{textAlign: 'center', alignSelf: 'center', fontSize: "calc(80vw * 0.02" + (project.fontScale ? ` * ${project.fontScale}` : "")}}>{project.name}</div>
                                    <div style={{marginTop: 10 * project.fontScale, marginLeft: 10, fontSize: "calc(80vw * 0.01" + (project.fontScale ? ` * ${project.fontScale}` : "")}}>{project.description}</div>
                                    {
                                        project.features ?
                                        <ul>
                                            {
                                                project.features.map((feature, index) => {
                                                    return <li style={{fontSize: "calc(80vw * 0.01" + (project.fontScale ? ` * ${project.fontScale}` : "")}}>{feature}</li>
                                                })
                                            }
                                        </ul>
                                        : null
                                    }
                                    {
                                        project.skills ?
                                            <div className="projectSkills">
                                                {
                                                    project.skills.map((Icon, index) => {
                                                        return (
                                                            <div className="projectSkillIcon">{<Icon/>}</div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        : null
                                    }

                                    {
                                        project.github ?
                                        <div className="projectGithub">
                                            {
                                                project.github.map((github, index) => {
                                                    return <a className="githubEntry" href={github.link} target="_blank">
                                                        <div style={{marginRight: 5}}>{github.name}</div>
                                                        <GithubIcon width="30px" height="30px"/>
                                                        
                                                    </a>
                                                })
                                            }
                                        </div>
                                        : null
                                    }
                                </div>
                            </div>
                        })
                    }


                        
                </div>


                <div className="contactWrapper">
                    <div className="contactsRow">
                        <div onMouseEnter={() => this.mouseOver(1)} onMouseLeave={() => this.mouseLeave()} className="contactIcon"><a href="https://www.instagram.com/satvikvejendla/" target="_blank"><FaInstagram color={(this.state.link == 1 ? "#911007": "")} size={50}/></a></div>
                        <div onMouseEnter={() => this.mouseOver(2)} onMouseLeave={() => this.mouseLeave()} className="contactIcon"><a href="https://www.linkedin.com/in/satvikvejendla/" target="_blank"><FaLinkedin color={(this.state.link == 2 ? "#1d418c": "")} size={50}/></a></div>
                        <div onMouseEnter={() => this.mouseOver(3)} onMouseLeave={() => this.mouseLeave()} className="contactIcon"><a href="https://github.com/SatvikVejendla" target="_blank"><FaGithub color={(this.state.link == 3 ? "#178a21": "")} size={50}/></a></div>
                    </div>

                    <div className="contactsDescriptions">
                        <div className="contactDescription">
                            <div className="contactIcon2"><MdEmail size={30}/></div>
                            <div className="contactText">satvej1@gmail.com</div>
                        </div>


                        
                        <div className="contactDescription">
                            <div className="contactIcon2"><FaPhoneAlt size={30}/></div>
                            <div className="contactText">(609) 578-8198</div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}