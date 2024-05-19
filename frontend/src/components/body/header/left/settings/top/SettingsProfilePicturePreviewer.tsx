import useSettingsStore from "../../../../../../stores/settingsStore";
import { useUserStore } from "../../../../../../stores/userStore";
import { ProfilePicture } from "../../../../../reuseable/ProfilePicture";
import { SettingsSelectedPicturePreview } from "./SettingsSelectedPicturePreview";

function SettingsProfilePicturePreviewer() {
    const { myId } = useUserStore();

    const localColor = useSettingsStore((state) => state.localColor);
    const clientSelectedColor = useUserStore((state) => state.myColor);

    const profilepictureUrl = useSettingsStore(
        (state) => state.localProfilePictureUrl
    );
    const profilePicture = useSettingsStore(
        (state) => state.localProfilePicture
    );

    return (
        <>
            <div
                data-testid="settings-profile-picture-preview"
                className="col-span-2 mx-auto my-auto"
            >
                <div className="grid">
                    {profilePicture ?? profilepictureUrl ? (
                        <>
                            <SettingsSelectedPicturePreview
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    borderColor:
                                        localColor || clientSelectedColor,
                                }}
                            />
                            <span
                                data-testid="profile-picture-preview-banner"
                                className="mt-2 rounded bg-red-200 p-1 text-center text-xs text-gray-600"
                            >
                                preview
                            </span>
                        </>
                    ) : (
                        <>
                            <ProfilePicture
                                clientDbId={myId}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    borderColor:
                                        localColor || clientSelectedColor,
                                }}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export { SettingsProfilePicturePreviewer };
