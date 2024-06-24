import React from 'react';

import "./DateObject.css";

export default class DateObject extends React.Component {
    constructor(props){
        super(props);
        
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className="yr yr1">{this.props.date[3]}</div>
                <div className="vertDate">
                    {
                        this.props.date ? this.props.date.split("").slice(0, 3).map((letter, index) => {
                            return <div key={index} className={"letter " + (index == 0 ? "letter1" : "") + (index == 2 ? "letter3": "")}>{letter}</div>
                        }) : ""
                    }
                </div>
                <div className="yr yr2">{this.props.date[4]}</div>
            </div>
        );
    }
}