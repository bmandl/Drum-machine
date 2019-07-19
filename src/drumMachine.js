import React from 'react';

const keyArray = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];


class DrumPad extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.handleKey = this.handleKey.bind(this);
        this.playClip = this.playClip.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKey);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKey);
    }

    handleKey(e) {
        if (e.keyCode === this.props.keyCode) {
            this.playClip();
        }
    }

    playClip(e) {
        const clip = document.getElementById(this.props.keyTrigger);
        clip.currentTime = 0;
        clip.play();
        console.log(this.props.clipiD);
        this.props.setClip(this.props.clipiD);
    }

    render() {
        return (
            <div id={this.props.clipiD} className="drum-pad" onClick={this.playClip}>
                <audio id={this.props.keyTrigger} src={this.props.clip} className="clip" />
                <p>{this.props.keyTrigger}</p>
            </div>
        );
    }
}

class Keyboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };

    this.setCurrentClip = this.setCurrentClip.bind(this);
    }

    
    setCurrentClip(clip) {
           
        this.props.update(clip);    
    }

    render() {
        let keyboard = keyArray.map((KeyObj, i, keyArray) => {
            return (
                <DrumPad
                    key={keyArray[i].id}
                    clipiD={keyArray[i].id}
                    clip={keyArray[i].url}
                    keyTrigger={keyArray[i].keyTrigger}
                    keyCode={keyArray[i].keyCode}
                    setClip={this.setCurrentClip}
                />
            );
        })
        return (
            <div className="keyboard">
                {keyboard}
            </div>
        );
    }
}

const Display = (props) => {
    return (
        <div id="display">
            <p>{props.text}</p>
        </div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentClip: ''
        }

        this.updateDisplay = this.updateDisplay.bind(this);
    }

    updateDisplay(text) {
        this.setState(
            {
                currentClip: text
            }
        );
    }

    render() {
        return (
            <div id="drum-machine">
                <Keyboard update={this.updateDisplay} />
                <Display text={this.state.currentClip} />
            </div>
        );
    }
}

export default App;