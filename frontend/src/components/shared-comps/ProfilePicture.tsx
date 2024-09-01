import { memo,  useEffect, useState } from "react";
import { GetImageViaImageHash } from "../../../wailsjs/go/main/App";
import type { main } from "../../../wailsjs/go/models";
import type { ClientId } from "../../utils/types/customTypes";
import {
	DEFAULT_HOVER_COLOR,
	DEFAULT_STROKE_COLOR,
} from "../../utils/variables/variables";

type ProfilePictureProps = {
	pictureHash: string | null;
	clientDbId: ClientId;
	pictureUrl: string | null;
	properties: string | null;
	style: {
		width: string | "40px";
		height: string | "40px";
		borderColor?: string;
		opacity?: string;
	} | null;
};

const ProfilePicture = memo((props: ProfilePictureProps) => {
	// state
	const [hover, setHover] = useState(false);
	const [imageData, setImageData] = useState<string | null>(null);
	// state

	useEffect(() => {
		async function fetchImage() {
			if (props.pictureHash === null) {
				return Promise.resolve();
			}
			return (await GetImageViaImageHash(
				props.pictureHash,
			)) as main.DbRow;
		}

		fetchImage().then((image) => {
			if (!image) {
				return;
			}
			setImageData(image.data);
		});
	}, [props.pictureHash]);

	if (!imageData) {
		return (
			<img
				data-testid="dummy-profile-picture"
				className={`rounded-full border-2 ${props.properties} transition duration-300 ease-in-out`}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				style={{
					...props.style,
					borderColor: hover
						? DEFAULT_HOVER_COLOR
						: props.style?.borderColor ?? DEFAULT_STROKE_COLOR,
				}}
				src={"logo.png"}
				alt={""}
			/>
		);
	}

	return (
		<>
			<img
				data-testid="profile-picture"
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				style={{
					...props.style,
					borderColor: hover
						? DEFAULT_HOVER_COLOR
						: props.style?.borderColor ?? DEFAULT_STROKE_COLOR,
				}}
				className={`rounded-full border-2 ${props.properties} transition duration-300 ease-in-out`}
				src={imageData}
				alt=""
			/>
		</>
	);
});

ProfilePicture.displayName = "ProfilePicture";

export { ProfilePicture };
