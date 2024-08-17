import { Notification } from "../../wailsjs/go/main/App";
import { type Reply, useReplyStore } from "../stores/replyStore";
import { useUserStore } from "../stores/userStore";
import { useWebsocketStore } from "../stores/websocketStore";
import { generateSimpleId } from "./functionality";
import { useDoNotDisturbStore } from "../stores/doNotDisturbStore";
import { getTimeWithHHmmFormat } from "./time";
import {
  type AuthenticationPayload,
  type ClientId,
  type MessagePayload,
  PayloadSubTypeEnum,
} from "./customTypes";
import { encodeFileToBase64, getMimeType, utf8ToBase64 } from "./encoder";
import { useImageStore } from "../stores/imageStore";
import { useClientStore } from "../stores/clientStore";
import { errorLogger } from "../logger/errorLogger";
import { handleIncomingMessages } from "./handleIncomingMessages";
import { useVersionStore } from "../stores/versionStore";

let socket: WebSocket;

export const initWebSocket = () => {
  socket = new WebSocket(
    `ws://${useUserStore.getState().socketIp}:${
      useUserStore.getState().socketPort
    }/chat`,
  );

  socket.onopen = async () => {
    if (!useDoNotDisturbStore.getState().doNotDisturb) {
      await Notification("localchat", "Connection opened");
    }

    // register user with the server
    const authPayload: AuthenticationPayload = {
      version: {
        major: useVersionStore.getState().major,
        minor: useVersionStore.getState().minor,
        patch: useVersionStore.getState().patch,
      },
      payloadType: PayloadSubTypeEnum.enum.auth,
      clientUsername: useUserStore.getState().myUsername,
      clientDbId: useUserStore.getState().myId,
    };

    setTimeout(() => {
      socket.send(JSON.stringify(authPayload));
    }, 1000);

    useWebsocketStore.getState().setIsConnected(true);

    retrieveClientListFromSocket();
    retrieveProfilePicturesHashesFromSocket();
    retrieveMessageListFromSocket();
    retrieveBannersFromSocket();
  };

  socket.onclose = async () => {
    if (!useDoNotDisturbStore.getState().doNotDisturb) {
      await Notification("localchat", "Connection closed");
    }
  };

  socket.onmessage = async (event: MessageEvent) => {
    handleIncomingMessages(event).catch((error) => {
      errorLogger.logError(error);
    });
  };

  socket.onerror = (event: Event) => {
    console.error("Websocket closed");
    useWebsocketStore.getState().setIsConnected(false);
    closeWebSocket();
  };

  useWebsocketStore.getState().setWs(socket);
};

function closeWebSocket() {
  socket.close();
  useWebsocketStore.getState().setWs(null);
}

async function sendClientMessageToWebsocket(message: string): Promise<void> {
  const replyMessage: Reply | null = useReplyStore.getState().replyMessage;
  const id = useUserStore.getState().myId;
  const username = useClientStore.getState().getClientById(id)?.clientUsername;
  const selectedImage = useImageStore.getState().selectedImage;
  const droppedImage = useImageStore.getState().droppedImage;

  if (
    username === null ||
    username === undefined ||
    id === null ||
    username === "" ||
    id === ""
  ) {
    await errorLogger.logError(`username or id is null${username}${id}`);
    throw new Error(`username or id is null${username}${id}`);
  }

  const base64EncodedMessage = utf8ToBase64(message);

  const payload: MessagePayload = {
    payloadType: PayloadSubTypeEnum.enum.message,
    clientType: {
      clientDbId: id,
    },
    messageType: {
      messageContext: base64EncodedMessage,
      deleted: false,
      edited: false,
      messageTime: getTimeWithHHmmFormat(new Date()),
      messageDate: new Date().toDateString(),
      messageDbId: generateSimpleId(),
    },
  };

  // if there is a replyMessage message, add it to the payload
  if (replyMessage) {
    payload.quoteType = {
      quoteDbId: replyMessage.id,
      quoteClientId: replyMessage.senderId,
      quoteMessageContext: replyMessage.message,
      quoteTime: replyMessage.time,
      quoteDate: replyMessage.date,
    };
  }

  if (selectedImage) {
    payload.imageType = {
      imageDbId: generateSimpleId(),
      type: selectedImage.type,
      data: await encodeFileToBase64(selectedImage),
    };
    useImageStore.getState().setSelectedImage(null);
  } else if (droppedImage) {
    payload.imageType = {
      imageDbId: generateSimpleId(),
      type: getMimeType(droppedImage),
      data: droppedImage,
    };
    useImageStore.getState().setDroppedImage(null);
  }

  socket.send(JSON.stringify(payload));
}

function retrieveClientListFromSocket() {
  const payload = {
    payloadType: PayloadSubTypeEnum.enum.clientList,
  };

  socket.send(JSON.stringify(payload));
}

function retrieveBannersFromSocket() {
  const payload = {
    payloadType: PayloadSubTypeEnum.enum.fetchAllBanners,
  };

  socket.send(JSON.stringify(payload));
}

function retrieveProfilePicturesFromSocket(id: ClientId) {
  const payload = {
    payloadType: PayloadSubTypeEnum.enum.fetchProfilePicture,
    clientDbId: id,
  };

  socket.send(JSON.stringify(payload));
}

function retrieveProfilePicturesHashesFromSocket() {
  const payload = {
    payloadType: PayloadSubTypeEnum.enum.fetchAllProfilePictureHashes,
  };

  socket.send(JSON.stringify(payload));
}

function retrieveMessageListFromSocket() {
  const payload = {
    payloadType: PayloadSubTypeEnum.enum.messageList,
  };

  socket.send(JSON.stringify(payload));
}

export {
  closeWebSocket,
  sendClientMessageToWebsocket,
  socket,
  retrieveMessageListFromSocket,
  retrieveBannersFromSocket,
  retrieveProfilePicturesHashesFromSocket,
  retrieveProfilePicturesFromSocket,
  retrieveClientListFromSocket,
};