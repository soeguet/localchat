import {useTranslation} from "react-i18next";
import {useState} from "react";
import {InfoMenuModal} from "./InfoMenuModal";

function InfoMenuButton() {

    const {t} = useTranslation();
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <>
            <button
                className="block w-full border-t-2 px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
                onClick={openModal}
            >
                {t("menu_item_info")}
            </button>
            <InfoMenuModal isOpen={isModalOpen} onClose={closeModal}>
                InfoMenuModal
            </InfoMenuModal>
        </>
    );
}

export {InfoMenuButton};