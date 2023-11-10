import { useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset }, ref) {

    const dialog = useRef();
    const userLost = remainingTime<=0;
    const formattedRemainingTime = (remainingTime/1000).toFixed(2);
    const score = Math.round((1- remainingTime/(targetTime*1000))* 100)

    useImperativeHandle(ref, ()=>{
        return {
            open(){
                dialog.current.showModal();
            }
        }
    })

    // Dialog elements allow users to close the dialog by pressing ESC. This will cause the site to not reset when esc is used to close the dialog instead of Submit (button click).
    // By binding onClose to onReset, this prevents that scenario from happening.

    return (
        createPortal(<dialog className="result-modal" ref={dialog} onClose={onReset}> 
            {userLost && <h2>You lost!</h2>}
            {!userLost && <h2>Your score:{score}</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>, document.getElementById("modal"))
    )
})

export default ResultModal;