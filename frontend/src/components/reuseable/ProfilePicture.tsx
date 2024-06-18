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

	// TODO test this
	// default profile picture
	if (
		profilePicture === undefined ||
		profilePicture === null ||
		profilePicture === ""
	) {
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
