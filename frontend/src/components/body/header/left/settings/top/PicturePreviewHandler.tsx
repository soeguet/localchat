import { RefObject } from "react";
import { handleFileChange } from "../../../../../../utils/pictureHelper";

type PicturePreviewHandlerProps = {
    preferPictureUrl: boolean;
    urlInputRef: RefObject<HTMLInputElement>;
    setLocalProfilePicture: (url: string) => void;
};

function PicturePreviewHandler(props: PicturePreviewHandlerProps) {
    return (
        <>
            <div data-testid="picture-preview-container">
                {props.preferPictureUrl ? (
                    <input
                        type="text"
                        ref={props.urlInputRef}
                        placeholder="link here"
                        id="profilePicture"
                        onChange={(e) =>
                            props.setLocalProfilePicture(e.target.value)
                        }
                        className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    />
                ) : (
                    <input
                        type="file"
                        id="profilePicture"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleFileChange}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2"
                    />
                )}
            </div>
        </>
    );
}

export { PicturePreviewHandler };
