import useSettingsStore from "../../../../../../stores/settingsStore";
import { useUserStore } from "../../../../../../stores/userStore";
import { ProfilePicture } from "../../../../../reuseable/ProfilePicture";

function SettingsProfilePicturePreviewer() {
    const { myId } = useUserStore();
    const localColor = useSettingsStore((state) => state.localColor);
    const profilepictureUrl = useSettingsStore((state) => state.profilePicture);
    const profilePicture = useSettingsStore((state) => state.profilePicture);
    return (
        <>
            <div
                data-testid="settings-profile-picture-preview"
                className="col-span-2 mx-auto my-auto"
            >
                {profilePicture ? (
                    <div className="grid">
                        <ProfilePicture
                            clientDbId={myId}
                            pictureUrl={profilepictureUrl}
                            style={{
                                width: "70px",
                                height: "70px",
                                borderColor: localColor || "lightgrey",
                            }}
                        />
                        <span className="rounded bg-red-200 p-1 text-center text-xs text-gray-600">
                            preview
                        </span>
                    </div>
                ) : (
                    <ProfilePicture
                        clientDbId={myId}
                        style={{
                            width: "70px",
                            height: "70px",
                            borderColor: localColor || "lightgrey",
                        }}
                    />
                )}
            </div>
        </>
    );
}

export { SettingsProfilePicturePreviewer };