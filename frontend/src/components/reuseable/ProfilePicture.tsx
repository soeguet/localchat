import { memo, useCallback } from "react";
import { useProfilePictureStore } from "../../stores/profilePictureStore";
import type { ClientId } from "../../utils/customTypes";

type ProfilePictureProps = {
	clientDbId: ClientId;
	pictureUrl?: string;
	properties?: string;
	style?: {
		width: string | "40px";
		height: string | "40px";
		borderColor?: string;
		opacity?: string;
	};
};

const ProfilePicture = memo((props: ProfilePictureProps) => {
	const profilePicture = useProfilePictureStore((state) => {
		return state.profilePictureMap.get(props.clientDbId);
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const pictureSelection = useCallback(() => {
		if (props.pictureUrl !== undefined) {
			return props.pictureUrl;
		}

		if (profilePicture !== undefined) {
			return profilePicture.data;
		}

		return "";
	}, [props.pictureUrl, profilePicture, props.clientDbId]);

	const picturePresent = () => {
		if (profilePicture === undefined || profilePicture === null) {
			return false;
		}
		return true;
	};
	const urlPresent = () => {
		if (
			props.pictureUrl === undefined ||
			props.pictureUrl === null ||
			props.pictureUrl === ""
		) {
			return false;
		}
		return true;
	};

	// default profile picture
	if (!picturePresent() && !urlPresent()) {
		return (
			<img
				data-testid="dummy-profile-picture"
				style={props.style}
				className={`rounded-full border-2 ${props.properties} transition duration-300 ease-in-out`}
				src={"logo.png"}
				alt={""}
			/>
		);
	}

	return (
		<>
			<img
				data-testid="profile-picture"
				style={props.style}
				className={`rounded-full border-2 ${props.properties} transition duration-300 ease-in-out`}
				src={pictureSelection()}
				alt=""
			/>
		</>
	);
});

ProfilePicture.displayName = "ProfilePicture";

export { ProfilePicture };
