import React from "react";
import "./Home.css";

import Header from "../../components/Header/Header.jsx";
import About from "../../components/About/About.jsx";
import Skills from "../../components/Skills/Skills.jsx";
import Experience from "../../components/Experience/Experience.jsx";
import Projects from "../../components/Projects/Projects.jsx";

export default class Home extends React.Component {

    constructor(props){
        super(props);

    }

    render() {
        return (
            <div className="home">
                <div className="column">
                    <Header section={this.props.section}/>
                    <About section={this.props.section}/>
                    <Skills section={this.props.section}/>
                    <Experience section={this.props.section}/>
                    <Projects section={this.props.section}/>
                    

                </div>
            
            </div>
        );
    }
}