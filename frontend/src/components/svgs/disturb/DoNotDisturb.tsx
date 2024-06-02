import type React from "react";

type DoNotDisturbProps = {
    style: React.CSSProperties;
};

function DoNotDisturb(props: DoNotDisturbProps) {
    return (
        <>
            <div
                className="rounded-full border-2 border-black bg-white transition duration-300 ease-in-out hover:border-cyan-500">
                <svg
                    data-testid="do-not-disturb-svg"
                    style={props.style}
                    viewBox="0 0 1024 1024"
                    className="icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M513.28 80.64c-226.56 0-409.6 183.04-409.6 409.6s183.04 409.6 409.6 409.6 409.6-183.04 409.6-409.6-184.32-409.6-409.6-409.6z m0 153.6c47.36 0 92.16 12.8 129.28 35.84L293.12 619.52c-23.04-38.4-35.84-81.92-35.84-129.28 0-140.8 113.92-256 256-256z m0 512c-47.36 0-92.16-12.8-129.28-35.84l350.72-350.72c23.04 38.4 35.84 81.92 35.84 129.28-1.28 142.08-116.48 257.28-257.28 257.28z"
                            fill="#D82621"
                        ></path>
                        <path
                            d="M513.28 912.64c-232.96 0-422.4-189.44-422.4-422.4s189.44-422.4 422.4-422.4 422.4 189.44 422.4 422.4-189.44 422.4-422.4 422.4z m0-819.2c-218.88 0-396.8 177.92-396.8 396.8s177.92 396.8 396.8 396.8 396.8-177.92 396.8-396.8-177.92-396.8-396.8-396.8z m0 665.6c-47.36 0-94.72-12.8-136.96-37.12-3.84-2.56-5.12-5.12-6.4-8.96 0-3.84 1.28-7.68 3.84-10.24l350.72-350.72c2.56-2.56 6.4-3.84 10.24-3.84 3.84 0 7.68 2.56 8.96 6.4C768 395.52 780.8 442.88 780.8 491.52c1.28 147.2-120.32 267.52-267.52 267.52z m-108.8-51.2c33.28 16.64 71.68 25.6 108.8 25.6 134.4 0 243.2-108.8 243.2-243.2 0-37.12-8.96-75.52-25.6-108.8L404.48 707.84z m-111.36-75.52h-1.28c-3.84 0-7.68-2.56-8.96-6.4-24.32-40.96-37.12-88.32-37.12-136.96 0-148.48 120.32-268.8 268.8-268.8 47.36 0 94.72 12.8 136.96 37.12 3.84 2.56 5.12 5.12 6.4 8.96s-1.28 7.68-3.84 10.24L302.08 628.48c-2.56 2.56-6.4 3.84-8.96 3.84z m220.16-385.28c-134.4 0-243.2 108.8-243.2 243.2 0 37.12 8.96 75.52 25.6 108.8l326.4-326.4c-34.56-16.64-71.68-25.6-108.8-25.6z"
                            fill="#231C1C"
                        ></path>
                    </g>
                </svg>
            </div>
        </>
    );
}

export {DoNotDisturb};