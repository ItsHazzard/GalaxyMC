"use strict";
const TimerChar = (props) => {
    const ref = React.useRef(null);
    const colon = props.char === ":";
    if (colon) {
        return (React.createElement("h1", { className: "timer-char colon" }, ":"));
    }
    const number = parseInt(props.char);
    const getCharSlider = () => {
        let options = [];
        for (let i = 0; i <= 9; i++) {
            const classes = classNames("timer-char-slider-option", {
                active: number === i
            });
            options.push(React.createElement("span", { key: i, className: classes }, i));
        }
        const height = ref.current ? ref.current.offsetHeight : 0, top = `${number * height * -1}px`;
        return (React.createElement("div", { className: "timer-char-slider", style: { top } }, options));
    };
    return (React.createElement("div", { ref: ref, className: "timer-char number" }, getCharSlider()));
};

const Timer = () => {
    const [timeRemaining, setTimeRemaining] = React.useState(calculateTimeRemaining());

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const formatSegment = (segment) => {
        return segment < 10 ? `0${segment}` : segment;
    };

    const calculateTimeRemaining = () => {
        const today = new Date();
        const christmasDate = new Date(today.getFullYear(), 11, 25); // December is 11 (0-indexed)
        if (today > christmasDate) {
            christmasDate.setFullYear(christmasDate.getFullYear() + 1);
        }
        const timeDifference = christmasDate - today;

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return {
            days,
            hours,
            minutes,
            seconds
        };
    };

    const getChars = () => {
        const { days, hours, minutes, seconds } = timeRemaining;
        const timeString = `${formatSegment(days)}:${formatSegment(hours)}:${formatSegment(minutes)}:${formatSegment(seconds)}`;
        return timeString.split("").map((char, index) => (
            <TimerChar key={index} char={char} />
        ));
    };

    return (
        <div id="timer">
            <div id="timer-text">{getChars()}</div>
        </div>
    );
};

const App = () => {
    return (
        <div id="app">
            <Timer />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
