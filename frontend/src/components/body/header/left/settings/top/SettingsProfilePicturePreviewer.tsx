import { useEffect } from "react";
import useSettingsStore from "../../../../../../stores/settingsStore";
import { useUserStore } from "../../../../../../stores/userStore";
import { ProfilePicture } from "../../../../../reuseable/ProfilePicture";

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

    useEffect(() => {
        useSettingsStore
            .getState()
            .setLocalProfilePicture(useUserStore.getState().myProfilePhoto);
    }, []);

    return (
        <>
            <div
                data-testid="settings-profile-picture-preview"
                className="col-span-2 mx-auto my-auto"
            >
                <div className="grid">
                    <ProfilePicture
                        clientDbId={myId}
                        pictureUrl={profilepictureUrl ?? profilePicture}
                        style={{
                            width: "70px",
                            height: "70px",
                            borderColor: localColor || clientSelectedColor,
                        }}
                    />
                    {(profilePicture ?? profilepictureUrl) && (
                        <span className="rounded bg-red-200 p-1 text-center text-xs text-gray-600">
                            preview
                        </span>
                    )}
                </div>
            </div>
        </>
    );
}

export { SettingsProfilePicturePreviewer };
