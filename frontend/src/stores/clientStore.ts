import { type StoreApi, type UseBoundStore, create } from "zustand";
import { GetImageViaImageHash, PersistImage } from "../../wailsjs/go/main/App";
import {
	type ClientEntity,
	DeliverPicturePayloadSchema,
	PayloadSubTypeEnum,
} from "../utils/types/customTypes";
import { useUserStore } from "./userStore";

/**
 * Represents a registered user.
 */
export type ClientStore = {
	clientMap: Map<string, ClientEntity>;
	setClientMap: (clientMap: Map<string, ClientEntity>) => void;
	getClientFromMapById: (id: string) => ClientEntity | null;
	// clients: ClientEntity[];
	// setClients: (clients: ClientEntity[]) => void;
	// getClientById: (id: string) => ClientEntity | undefined;
};

const useClientStore: UseBoundStore<StoreApi<ClientStore>> =
	create<ClientStore>((set) => ({
		clientMap: new Map<string, ClientEntity>(),
		setClientMap: (clientMap: Map<string, ClientEntity>) =>
			set({ clientMap: clientMap }),
		getClientFromMapById: (id: string): ClientEntity | null => {
			const clients = useClientStore.getState().clientMap;
			return clients.get(id) || null;
		},
		// clients: [],
		// // inc: () => set((state) => ({ count: state.count + 1 })),
		// setClients: async (_newClients) => {
		// 	const newClientListWithProfilePictures: ClientEntity[] = [];
		// 	const oldClientListState = useClientStore.getState().clients;
		//
		// 	for (const client of _newClients) {
		// 		if (
		// 			client.clientProfilePictureHash === null ||
		// 			client.clientProfilePictureHash === undefined ||
		// 			client.clientProfilePictureHash === ""
		// 		) {
		// 			newClientListWithProfilePictures.push(client);
		// 			continue;
		// 		}
		//
		// 		let oldProfilePicture: string | undefined | null = undefined;
		//
		// 		for (const oldClient of oldClientListState) {
		// 			if (oldClient.clientDbId === client.clientDbId) {
		// 				oldProfilePicture =
		// 					oldClient.clientProfilePictureBase64;
		// 				break;
		// 			}
		// 		}
		//
		// 		if (
		// 			oldProfilePicture !== undefined &&
		// 			oldProfilePicture !== null
		// 		) {
		// 			newClientListWithProfilePictures.push({
		// 				...client,
		// 				clientProfilePictureBase64: oldProfilePicture,
		// 			});
		// 			newClientListWithProfilePictures.push(client);
		// 			continue;
		// 		}
		//
		// 		// try getting the profile picture from the sqlite db
		// 		const profilePicture = await GetImageViaImageHash(
		// 			client.clientProfilePictureHash,
		// 		);
		//
		// 		if (
		// 			profilePicture.data !== null &&
		// 			profilePicture.data !== ""
		// 		) {
		// 			newClientListWithProfilePictures.push({
		// 				...client,
		// 				clientProfilePictureBase64: profilePicture.data,
		// 			});
		// 			newClientListWithProfilePictures.push(client);
		// 			continue;
		// 		}
		//
		// 		// if all hope is lost, hit a fetch req at the api
		// 		const serverIp = useUserStore.getState().socketIp;
		// 		const serverPort = useUserStore.getState().socketPort;
		// 		const serverUrl = `http://${serverIp}:${serverPort}/v1/fetchImage`;
		//
		// 		const fetchedProfilePicture = await fetch(serverUrl, {
		// 			method: "POST",
		// 			headers: {
		// 				"Content-Type": "application/json",
		// 			},
		// 			body: JSON.stringify({
		// 				payloadType: PayloadSubTypeEnum.enum.fetchPicture,
		// 				imageHash: client.clientProfilePictureHash,
		// 			}),
		// 		});
		//
		// 		if (fetchedProfilePicture.status === 200) {
		// 			const fetchedProfilePictureJson =
		// 				await fetchedProfilePicture.json();
		//
		// 			const validatedPayload =
		// 				DeliverPicturePayloadSchema.safeParse(
		// 					fetchedProfilePictureJson,
		// 				);
		//
		// 			if (validatedPayload.success) {
		// 				// cache it
		// 				newClientListWithProfilePictures.push({
		// 					...client,
		// 					clientProfilePictureBase64:
		// 						validatedPayload.data.data,
		// 				});
		//
		// 				// persist it
		// 				await PersistImage({
		// 					imageHash: validatedPayload.data.imageHash,
		// 					data: validatedPayload.data.data,
		// 				});
		// 			}
		// 		}
		// 	}
		//
		// 	set({ clients: newClientListWithProfilePictures });
		// },
		// getClientById: (id: string): ClientEntity | undefined => {
		// 	const clients = useClientStore.getState().clients;
		// 	return clients.find((client) => client.clientDbId === id);
		// },
	}));

export { useClientStore };