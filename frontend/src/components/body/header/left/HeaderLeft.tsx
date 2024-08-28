import { ProfileMenu } from "./menu/ProfileMenu";
import { ProfilePictureHandler } from "./picture/ProfilePictureHandler";
import { ClientName } from "./name/ClientName";

function HeaderLeft() {
	return (
		<div
			className="relative flex items-center"
			data-testid="header-left-div">
			<ProfilePictureHandler />
			<ProfileMenu />
			<ClientName />
		</div>
	);
}

export { HeaderLeft };