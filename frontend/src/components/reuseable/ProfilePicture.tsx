import { useClientStore } from "../../stores/clientStore";
import { memo } from "react";

type ProfilePictureProps = {
	clientDbId: string;
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
	const client = useClientStore((state) =>
		state.clients.find((c) => c.clientDbId === props.clientDbId),
	);

	const profilePicture = client?.clientProfileImage;
	const picturePresent = () => {
		if (
			profilePicture === undefined ||
			profilePicture === null ||
			profilePicture === ""
		) {
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
				src={props.pictureUrl ?? profilePicture}
				alt={""}
			/>
		</>
	);
});

ProfilePicture.displayName = "ProfilePicture";

export { ProfilePicture };
