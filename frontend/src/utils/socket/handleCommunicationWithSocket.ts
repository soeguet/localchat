import useSettingsStore from "../../stores/settingsStore";
import { useUserStore } from "../../stores/userStore";
import { useWebsocketStore } from "../../stores/websocketStore";
import {
  type ClientUpdatePayloadV2,
  type NewProfilePicturePayload,
  PayloadSubTypeEnum,
} from "../types/customTypes";
import { useProfilePictureStore } from "../../stores/profilePictureStore";
import {
  checkIfImageChanged, hashBase64Image,
} from "../picture/pictureComparator";

// TODO implement hashing for profile pictures instead of sending the whole image all the time
export async function handleProfileSettingsUpdatesWithSocketV2() {
  // grab the websocket
  const wsReference = useWebsocketStore.getState().getNullsafeWebsocket();

  // check if image changed
  const didImageChange = checkIfImageChanged();

  let imageHashForSocket =
    useProfilePictureStore.getState().thisClientProfilePictureObject?.imageHash;
  if (didImageChange) {
    const newBase64Image = useSettingsStore.getState().localProfilePicture;
    imageHashForSocket = hashBase64Image(newBase64Image);
    profilePictureUpdate(imageHashForSocket, wsReference);
  }

  // since this cannot be if there is no flaw in the logic.. :D
  if (imageHashForSocket === null || imageHashForSocket === undefined) {
    imageHashForSocket = "";
  }

  profileUpdate(imageHashForSocket, wsReference);
}

function profileUpdate(newImageHash: string, wsReference: WebSocket) {
  // the socket is keeping track of the client id (cannot be changed by user), username, profile color and profile picture
  const newUsername = useSettingsStore.getState().localName;
  const newColor = useSettingsStore.getState().localColor;

  const clientUpdatePayload: ClientUpdatePayloadV2 = {
    payloadType: PayloadSubTypeEnum.enum.profileUpdateV2,
    clientUsername: newUsername || useUserStore.getState().myUsername,
    clientDbId: useUserStore.getState().myId,
    clientColor: newColor || useUserStore.getState().myColor,
    // TODO change this to hash
    clientProfileImage: newImageHash,
    availability: useSettingsStore.getState().availability,
  };

  wsReference.send(JSON.stringify(clientUpdatePayload));
}

function profilePictureUpdate(newImageHash: string, wsReference: WebSocket) {
  const pictureData = useSettingsStore.getState().localProfilePicture;

  const picturePayload: NewProfilePicturePayload = {
    payloadType: PayloadSubTypeEnum.enum.newProfilePicture,
    clientDbId: useUserStore.getState().myId,
    imageHash: pictureData ? newImageHash : "",
    data: pictureData ? pictureData : "",
  };

  wsReference.send(JSON.stringify(picturePayload));
}