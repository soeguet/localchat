import {useVersionStore} from "../../../stores/versionStore";

function UpdateBanner() {

    const updateAvailable = useVersionStore()

	return (
		<>
            {updateAvailable.needsUpdate &&
            <div className="absolute top-0 right-0 text-white text-sm bg-red-500 p-2">
                Update available:
                `{updateAvailable.major}.{updateAvailable.minor}.{updateAvailable.patch}`
            </div>}
		</>
	);
}

export { UpdateBanner };