import React from "react";

type FontSizeAdjustButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
};

function FontSizeAdjustButton({
    onClick,
    children,
}: FontSizeAdjustButtonProps) {
    return (
        <button
            className="rounded bg-gray-200 px-2 text-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default FontSizeAdjustButton;
