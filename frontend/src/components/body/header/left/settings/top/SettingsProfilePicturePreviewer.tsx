import useSettingsStore from "../../../../../../stores/settingsStore";
import { useUserStore } from "../../../../../../stores/userStore";
import { ProfilePicture } from "../../../../../reuseable/ProfilePicture";

type SettingsProfilePicturePreviewerProps = {
    preferPictureUrl: boolean;
};

function SettingsProfilePicturePreviewer(
    props: SettingsProfilePicturePreviewerProps
) {
    const { myId } = useUserStore();

    const localColor = useSettingsStore((state) => state.localColor);
    const clientSelectedColor = useUserStore((state) => state.myColor);

    const profilepictureUrl = useSettingsStore(
        (state) => state.localProfilePictureUrl
    );
    const profilePicture = useSettingsStore(
        (state) => state.localProfilePicture
    );

    function handlePreviewPicker() {
        if (props.preferPictureUrl) {
            return profilepictureUrl;
        }

        return profilePicture;
    }

    return (
        <>
            <div
                data-testid="settings-profile-picture-preview"
                className="col-span-2 mx-auto my-auto"
            >
                {/* {profilePicture ? (
                    <div className="grid">
                        <ProfilePicture
                            clientDbId={myId}
                            pictureUrl={profilepictureUrl}
                            style={{
                                width: "70px",
                                height: "70px",
                                borderColor: localColor || clientSelectedColor,
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
                            borderColor: localColor || clientSelectedColor,
                        }}
                    />
                )} */}
                <div className="grid">
                    <ProfilePicture
                        clientDbId={myId}
                        pictureUrl={profilepictureUrl}
                        style={{
                            width: "70px",
                            height: "70px",
                            borderColor: localColor || clientSelectedColor,
                        }}
                    />
                    {handlePreviewPicker() && (
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
