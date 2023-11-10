import { useState, useRef } from 'react';
import ResultModal from './ResultModal.jsx';

export default function TimerChallenge({ title, targetTime }) {

    const timer = useRef();
    const dialog = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000)

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0){ //time is up
        clearInterval(timer.current);
        handleReset();
        dialog.current.open();
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10) //this will keep executing whether the timer is up or not.
        }, 10); //milliseconds. also the reason why the initial value of timeReaining is targetTime*1000
        
    }

    function handleStop() {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemaining(targetTime * 1000); //this can be dangerous since using this function to update a state will cause the component function to refresh again. However, this is in an 'if' block, so an infinite loop won't happen.
    }

    return (
        <>
            <ResultModal targetTime={targetTime} result="lost" ref={dialog} remainingTime={timeRemaining} onReset={handleReset}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Timer is running' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}
