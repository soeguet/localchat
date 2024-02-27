import {svgSize} from "../../../utils/variables";

function UnreadMessages() {
    return (
        <svg style={svgSize} viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="#000000">
            <g id="SVGRepo_bgCarrier" strokeWidth="0">
                <rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#ffffff" strokeWidth="0"></rect>
            </g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    d="M10 21H3.86159C3.47768 21 3.23699 20.5853 3.42747 20.2519L4.64529 17.6317C4.7226 17.4653 4.70168 17.2707 4.59721 17.1199C3.5901 15.6665 3 13.9021 3 12C3 7.02944 7.02944 3 12 3C17.297 3 21.524 7.76292 20.9451 13"
                    stroke="#ff0000" strokeWidth="2" strokeLinecap="round"></path>
                <path
                    d="M19 18C19 19.6569 17.6569 21 16 21C14.3431 21 13 19.6569 13 18C13 16.3431 14.3431 15 16 15C17.6569 15 19 16.3431 19 18Z"
                    stroke="#ff0000" strokeWidth="2"></path>
            </g>
        </svg>
    );
}

export default UnreadMessages;