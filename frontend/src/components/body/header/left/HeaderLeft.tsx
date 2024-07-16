import { ProfileMenu } from "./ProfileMenu";
import { ProfilePictureHandler } from "./ProfilePictureHandler";
import { ClientName } from "./ClientName";

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
