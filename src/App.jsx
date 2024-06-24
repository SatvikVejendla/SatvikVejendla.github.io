import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Cursor from './components/Cursor/Cursor.jsx';

import Home from "./pages/Home/Home.jsx";
import THREEComponent from "./components/THREEComponent/THREEComponent.jsx";

const style = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -3,
}



let sections = [100, 400, 700, 3400];


class Background extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      lastSection: -1,
    }

    this.scrollListener = this.scrollListener.bind(this);
  }

  scrollListener = (e) => {


    if(this.props.section != this.state.curSection){
      
      this.setState(
          {
              lastSection: this.state.curSection,
              curSection: this.props.section
          }
      );
      
  }
    let dir = Math.atan2(e.clientY - window.innerHeight / 2, e.clientX - window.innerWidth / 2) * (180 / Math.PI);

      let color;
      let scrollY = window.scrollY;
      if(scrollY == 0){
        color = `linear-gradient(90deg, var(--primary-color), var(--primary-color))`;
        
      } else if(scrollY <= sections[0] && scrollY > 0){
        let percent = sections[0] - window.scrollY;
        if(percent < 0){
          percent = 0;
        }
        color= `linear-gradient(135deg, var(--primary-color) ${percent}%, var(--tertiary-color))`;
      } else if(scrollY <= sections[2]-100 && scrollY > sections[1] - 100){
        let percent = sections[1] - window.scrollY;
        if(percent < 0){
          percent = 0;
        }
        color= `linear-gradient(135deg, var(--primary-color), var(--tertiary-color) ${percent}%, var(--secondary-color))`;
      } else if(scrollY <= sections[3] && scrollY > sections[2] - 100){
        let percent = sections[2] - window.scrollY;
        if(percent < 0){
          percent = 0;
        }
        color= `linear-gradient(135deg, var(--tertiary-color) , var(--secondary-color) ${percent}%, var(--secondary-color))`;
      }
      document.querySelector(".background").style.background = color;
    }

  componentDidMount() {

    document.querySelector(".background").style.background = `linear-gradient(90deg, var(--primary-color), var(--primary-color))`;
    
    window.addEventListener('scroll', this.scrollListener);
  }
  
  componentWillUnmount() {
      window.removeEventListener('scroll', this.scrollListener);
  }

  render = () => {

    
    return (
      <div className="background" style={style}>
        <div className={"skillsBackground " + (this.props.section < 2 ? "hidden" : "") + (this.props.section > 2 ? "expanded": "") + ((this.props.section == 2 && this.state.lastSection > 2) ? "shrink": "")} style={{zIndex: -2}}>
        </div>
      </div>
    )
  }
}
class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
        section: 0,
        threeComplete: false,
    }

    this.handleScroll = this.handleScroll.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
  }


  handleScroll = (e) => {      
      

      let section;

      let scroll = window.scrollY;
      if(scroll < sections[0]){
          section = 0;
      } else if(scroll < sections[1]){
          section = 1;
      } else if(scroll < sections[2]){
          section = 2;
      } else if(scroll < sections[3]){
          section = 3;
      } else {
          section = 4;
      }


      if(this.state.section != section){
      this.setState({
          section: section
      })
    }


  }

  handleThree = (e) => {
      this.setState({
          threeComplete: true
      })
  }
  
  scrollUp = (e) => {
      window.scrollTo(0, 0);
  }


  componentDidMount() {
    
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('threeComplete', this.handleThree);
      window.addEventListener("beforeunload", this.scrollUp);

  }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('threeComplete', this.handleThree);
      window.removeEventListener("beforeunload", this.scrollUp);
  }


  render() {

    return (
      <>
        <div className="rootDiv">
          <Cursor />
          <Background section={this.state.section}/>
          <THREEComponent section={this.state.section}/>
          {
            this.state.threeComplete ? <Home section={this.state.section} /> : null
          }
        </div>
        <div className="failedDiv">This website only supports desktop screens as of now. Mobile support coming in future updates.</div>
      </>
    )
  }
}

export default App;
