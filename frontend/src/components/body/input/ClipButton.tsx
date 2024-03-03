import React from "react";
import { WindowUnminimise, WindowMinimise, WindowShow } from "../../../../wailsjs/runtime/runtime";

function ClipButton() {
    
    function handleClipClick() {
        //console.log("Clip clicked");
        setTimeout(() => {
            //MakeWindowsTaskIconFlash("localchat");
            setTimeout(() => {
                WindowUnminimise();
            }, 1000);
            WindowMinimise();
            WindowShow();
        }, 3000);
    }

    return (
        <>
            <button
                onClick={handleClipClick}
                className="mx-1 my-auto text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                <i className="far fa-paperclip">📎</i>
            </button>
        </>
    );
}

export default React.memo(ClipButton);
