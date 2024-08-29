import useSettingsStore from "../../../../../../../../../stores/settingsStore";
import {useUserStore} from "../../../../../../../../../stores/userStore";

type SettingsSelectedPicturePreviewProps = {
	pictureUrl?: string;
	properties?: string;
	style?: {
		width: string | "30px";
		height: string | "30px";
		borderColor?: string;
		opacity?: string;
	};
};

function SettingsSelectedPicturePreview(
	props: SettingsSelectedPicturePreviewProps,
) {
	const picture = useSettingsStore((state) => state.localProfilePictureUrl) ?? useUserStore.getState().myProfilePhoto;
	const url = useSettingsStore((state) => state.localProfilePicture);

	return (
		<>
			<img
				data-testid="settings-picture-preview"
				style={props.style}
				className={`rounded-full border-2 ${props.properties} transition duration-300 ease-in-out`}
				src={url ?? picture}
				alt={""}
			/>
		</>
	);
}

export { SettingsSelectedPicturePreview };