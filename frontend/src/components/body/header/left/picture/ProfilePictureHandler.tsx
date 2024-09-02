import { useClientStore } from "../../../../../stores/clientStore";
import { useDoNotDisturbStore } from "../../../../../stores/doNotDisturbStore";
import { useMenuStore } from "../../../../../stores/menuStore";
import { useUserStore } from "../../../../../stores/userStore";
import { DEFAULT_STROKE_COLOR } from "../../../../../utils/variables/variables";
import { ProfilePicture } from "../../../../shared-comps/ProfilePicture";
import { DoNotDisturb } from "../../../../svgs/disturb/DoNotDisturb";

/**
 * checks if the user is in do not disturb mode and displays the appropriate profile picture
 */
function ProfilePictureHandler() {
	const doNotDisturb = useDoNotDisturbStore((state) => state.doNotDisturb);
	const clientDbId = useUserStore((state) => state.myId);
	const clientColor = useClientStore(
		(state) => state.getClientFromMapById(clientDbId)?.clientColor,
	);
	const clientProfilePictureHash = useUserStore(
		(state) => state.myProfilePictureHash,
	);
	const profilePictureStyle = {
		width: "70px",
		height: "70px",
		borderColor: clientColor ?? DEFAULT_STROKE_COLOR,
	};

	const menuOpen = useMenuStore((state) => state.menuOpen);
	const setMenuOpen = useMenuStore((state) => state.setMenuOpen);

	return (
		<>
			<div
				className="cursor-pointer"
				onClick={() => setMenuOpen(!menuOpen)}>
				{doNotDisturb ? (
					<DoNotDisturb style={profilePictureStyle} />
				) : (
					<ProfilePicture
						pictureUrl={null}
						properties={null}
						pictureHash={clientProfilePictureHash}
						clientDbId={clientDbId}
						style={profilePictureStyle}
					/>
				)}
			</div>
		</>
	);
}

export { ProfilePictureHandler };