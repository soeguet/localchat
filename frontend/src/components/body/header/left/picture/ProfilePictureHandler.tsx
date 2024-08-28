import { DoNotDisturb } from "../../../../svgs/disturb/DoNotDisturb";
import { useDoNotDisturbStore } from "../../../../../stores/doNotDisturbStore";
import { useClientStore } from "../../../../../stores/clientStore";
import { useUserStore } from "../../../../../stores/userStore";
import { ProfilePicture } from "../../../../reuseable/ProfilePicture";
import { useMenuStore } from "../../../../../stores/menuStore";
import {DEFAULT_STROKE_COLOR} from "../../../../../utils/variables/variables";

/**
 * checks if the user is in do not disturb mode and displays the appropriate profile picture
 */
function ProfilePictureHandler() {
	const doNotDisturb = useDoNotDisturbStore((state) => state.doNotDisturb);
	const clientDbId = useUserStore((state) => state.myId);
	const clientColor = useClientStore(
		(state) =>
			state.clients.find((c) => c.clientDbId === clientDbId)?.clientColor,
	);
	const clientProfilePictureHash = useUserStore((state) => state.myProfilePictureHash);
	const profilePictureStyle = {
		width: "70px",
		height: "70px",
		borderColor: clientColor ?? DEFAULT_STROKE_COLOR,
	};

	const menuOpen = useMenuStore((state) => state.menuOpen);
	const setMenuOpen = useMenuStore((state) => state.setMenuOpen);

	return (
		<>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				className="cursor-pointer"
				onClick={() => setMenuOpen(!menuOpen)}
			>
				{doNotDisturb ? (
					<DoNotDisturb style={profilePictureStyle} />
				) : (
					<ProfilePicture pictureHash={clientProfilePictureHash}  clientDbId={clientDbId} style={profilePictureStyle} />
				)}
			</div>
		</>
	);
}

export { ProfilePictureHandler };