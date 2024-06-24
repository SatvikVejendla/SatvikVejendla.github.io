import React, { useState } from "react";

import DateObject from "./DateObject.jsx";
import "./Dates.css";



export default class Dates extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            scroll: 0,
        }

        this.workSection = React.createRef();
    }

    


    render() {
        return (
            <div ref={this.educationSection} className="datesSection">
                <div className="datesSectionRelative">
                    <DateObject date="Sep19" className="sep2019"/>

                    <DateObject date="Sep21" className="sep2021"/>

                    <DateObject date="Dec21" className="dec2021"/>
                    <DateObject date="May22" className="may2022"/>

                    <DateObject date="Jun22" className="jun2022"/>

                    <DateObject date="Aug23" className="aug2023"/>
                    <DateObject date="Sep23" className="sep2023"/>




                    <div className="present">
                        <div style={{display: "flex", flexDirection: "row"}}>
                        {
                            "Present".split("").map((letter, index) => {
                                return <div key={index} className="presentletter">{letter}</div>
                            })
                        }
                        </div>
                    </div>



                    
                </div>
                
            </div>
        )
    }
}