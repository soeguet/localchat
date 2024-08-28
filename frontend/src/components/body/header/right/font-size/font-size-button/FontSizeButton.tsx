import {useState} from "react";
import {FontSizeSvg} from "../../../../../svgs/font/FontSizeSvg";
import {FontSizePopup} from "../font-size-popup/FontSizePopup";
import {useUserStore} from "../../../../../../stores/userStore";
import {DEFAULT_HOVER_COLOR} from "../../../../../../utils/variables/variables";

function FontSizeButton() {
    const [showPopup, setShowPopup] = useState(false);
    const [hover, setHover] = useState(false);
    const thisClientColor = useUserStore((state) => state.myColor);

    return (
        <>
            <button
                onClick={() => setShowPopup((prev) => !prev)}
                className="mx-3 rounded-full border-2 text-white transition duration-300 ease-in-out"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                    borderColor: hover ? DEFAULT_HOVER_COLOR : thisClientColor,
                }}
            >
                <FontSizeSvg />
            </button>
            <FontSizePopup showPopup={showPopup} setShowPopup={setShowPopup} />
        </>
    );
}

export {FontSizeButton};