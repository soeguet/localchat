import { useState } from "react";
import { NewSettingsModal } from "./NewSettingsModal";

function NewSettingsModalButton() {
    const [isOpened, setIsOpened] = useState(false);

    function openModal() {
        setIsOpened(true);
    }

    function closeModal() {
        setIsOpened(false);
    }

    return (
        <>
            <button
                data-testid="settings-menu-button"
                className="block w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
                onClick={openModal}
            >
                [WIP] Settings
            </button>

            {isOpened && (
                <NewSettingsModal isOpen={isOpened} onClose={closeModal} />
            )}
        </>
    );
}

export { NewSettingsModalButton };
