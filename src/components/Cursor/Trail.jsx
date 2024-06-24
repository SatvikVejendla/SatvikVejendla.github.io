
export default class Trail extends React.Component {
    constructor(props){
        super(props);

        this.state.cursor = new Cursor
    }

    componentDidMount(){
        document.addEventListener("mousemove", this.updateMouse);
        this.interval = setInterval(this.updateTrail, 1000/60);
    }

    componentWillUnmount(){
        document.removeEventListener("mousemove", this.updateMouse);
        clearInterval(this.interval);
    }

    updateMouse = (e) => {
        this.setState({
            cursor: {
                x: e.clientX,
                y: e.clientY
            }
        });
    }

    updateTrail = () => {
        this.setState({
            trail: {
                x: this.state.trail.x + (this.state.cursor.x - this.state.trail.x) / 12,
                y: this.state.trail.y + (this.state.cursor.y - this.state.trail.y) / 12
            }
        });
    }

    render(){
        return (
            <div className="trail" style={{left: this.state.trail.x, top: this.state.trail.y}}>
                <div className="trail-dot"></div>
            </div>
        );
    }
}