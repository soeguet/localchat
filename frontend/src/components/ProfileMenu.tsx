import { useEffect, useRef } from "react";

type ProfileMenuPropsType = {
    showMenu: boolean;
    setShowMenu: (show: boolean) => void;
    setShowProfileModal: (show: boolean) => void;
};

function ProfileMenu(props: ProfileMenuPropsType) {
    const menuRef = useRef<HTMLDivElement>(null);

    /**
     * Handles the click outside of the menu.
     * @param event - The mouse event object.
     */
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            const { left, top, right, bottom } = menuRef.current.getBoundingClientRect();
            const { clientX, clientY } = event;

            if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
                props.setShowMenu(false);
            }
        }
    };

    useEffect(() => {
        if (props.showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props.showMenu]);

    return (
        <>
            <div
                ref={menuRef}
                className={"absolute left-2 top-16 mr-12 z-20 mt-2 w-48 rounded-md border-2 bg-white py-1 shadow-xl"}
            >
                <button
                    className="block w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
                    onClick={() => {
                        props.setShowProfileModal(true);
                        props.setShowMenu(false);
                    }}
                >
                    Edit
                </button>
                <button
                    className="block w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
                    onClick={() => console.log("???")}
                >
                    ???
                </button>
            </div>
        </>
    );
}

export default ProfileMenu;
