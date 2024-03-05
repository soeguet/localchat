import { useState } from "react";
import FontSizeSvg from "../../../svgs/font/FontSizeSvg";
import FontSizePopup from "./FontSizePopup";

function FontSizeButton() {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <>
            <div className="mx-3">
                <div>
                    <button
                        onClick={() => setShowPopup(true)}
                        className="rounded-full border-2 border-black text-white transition duration-300 ease-in-out hover:border-cyan-500"
                    >
                        <FontSizeSvg />
                    </button>
                </div>
            </div>
            <FontSizePopup showPopup={showPopup} setShowPopup={setShowPopup} />
        </>
    );
}

export default FontSizeButton;
