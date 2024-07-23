import { ReadFileAsBase64 } from "../../../wailsjs/go/main/App";
import { OnFileDrop } from "../../../wailsjs/runtime/runtime";
import { useImageStore } from "../../stores/imageStore";

function useDragAndDropHook() {
	OnFileDrop((_x, _y, paths) => {
		ReadFileAsBase64(paths[0]).then((base64String) => {
			useImageStore.getState().setDroppedImage(base64String);
		});
	}, false);
}

export { useDragAndDropHook };
