import { useState } from "react";
import { FontSizeSvg } from "../../../../../svgs/font/FontSizeSvg";
import { FontSizePopup } from "../font-size-popup/FontSizePopup";

function FontSizeButton() {
	const [showPopup, setShowPopup] = useState(false);

	return (
		<>
			<button
				onClick={() => setShowPopup((prev) => !prev)}
				className=" mx-3 rounded-full border-2 border-black text-white transition duration-300 ease-in-out hover:border-cyan-500"
			>
				<FontSizeSvg />
			</button>
			<FontSizePopup showPopup={showPopup} setShowPopup={setShowPopup} />
		</>
	);
}

export { FontSizeButton };
