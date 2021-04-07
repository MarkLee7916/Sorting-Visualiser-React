import React from "react"

interface Props {
    isVisible: boolean
    hide: () => void
}

export const Modal = ({ isVisible, hide }: Props) => {
    const visibility = isVisible ? "visible" : "hidden";

    return (
        <div id="modal" style={{ visibility: visibility }}>
            <p>Array already sorted!</p>

            <button onClick={hide}>Close</button>
        </div>
    )
}