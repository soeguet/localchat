import { z } from "zod";

enum PayloadTypes {
    auth = "auth",
    message = "message",
    clientList = "clientList",
    profileUpdate = "profileUpdate",
    messageList = "messageList",
    typing = "typing",
    force = "force",
    reaction = "reaction",
    delete = "delete",
    edit = "edit",
    emergencyInit = "emergencyInit",
    emergencyMessage = "emergencyMessage",
    allEmergencyMessages = "allEmergencyMessages",
    newProfilePicture = "newProfilePicture",
    fetchProfilePicture = "fetchProfilePicture",
    fetchAllProfilePictures = "fetchAllProfilePictures",
    fetchCurrentClientProfilePictureHash = "fetchCurrentClientProfilePictureHash",
    fetchAllProfilePictureHashes = "fetchAllProfilePictureHashes",
    profileUpdateV2 = "profileUpdateV2",
    fetchAllBanners = "fetchAllBanners",
    modifyBanner = "modifyBanner",
}

export const PayloadSubTypeEnum = z.nativeEnum(PayloadTypes);
export type PayloadSubType = z.infer<typeof PayloadSubTypeEnum>;

export const SimplePayloadSchema = z.object({
    payloadType: z.literal(PayloadSubTypeEnum.enum.auth),
});
export type SimplePayload = z.infer<typeof SimplePayloadSchema>;

export const ProfilePictureHashSchema = z.string();
export type ProfilePictureHash = z.infer<typeof ProfilePictureHashSchema>;

export const ClientIdSchema = z.string();
export type ClientId = z.infer<typeof ClientIdSchema>;

export const HashSchema = z.string();
export type Hash = z.infer<typeof HashSchema>;

export const TypingPayloadSchema = z.object({
    payloadType: z.literal(PayloadSubTypeEnum.enum.typing),
    clientDbId: ClientIdSchema,
    isTyping: z.boolean(),
});
export type TypingPayload = z.infer<typeof TypingPayloadSchema>;

export const ForcePayloadSchema = z.object({
    payloadType: z.literal(PayloadSubTypeEnum.enum.force),
    clientDbId: ClientIdSchema,
});
export type ForcePayload = z.infer<typeof ForcePayloadSchema>;

export const ProfilePicturesHashesSchema = z.object({
    clientDbId: ClientIdSchema,
    imageHash: HashSchema,
});
export type ProfilePicturesHashes = z.infer<typeof ProfilePicturesHashesSchema>;

export const AllProfilePictureHashesPayloadSchema = z.object({
    payloadType: z.literal(
        PayloadSubTypeEnum.enum.fetchAllProfilePictureHashes
    ),
    profilePictureHashes: z.array(ProfilePicturesHashesSchema).optional(),
});
export type AllProfilePictureHashesPayload = z.infer<
    typeof AllProfilePictureHashesPayloadSchema
>;

export const PrioritySchema = z.number();
export type Priority = z.infer<typeof PrioritySchema>;

export const BannerObjectSchema = z.object({
    id: HashSchema,
    title: z.string(),
    message: z.string(),
    priority: PrioritySchema,
    hidden: z.boolean(),
});
export type BannerObject = z.infer<typeof BannerObjectSchema>;

export const BannerActionSchema = z.enum(["add", "remove", "update"]);
export type BannerAction = z.infer<typeof BannerActionSchema>;

export const BannerPayloadSchema = z.object({
    payloadType: z.literal(PayloadSubTypeEnum.enum.modifyBanner),
    banner: BannerObjectSchema,
    action: BannerActionSchema,
});
export type BannerPayload = z.infer<typeof BannerPayloadSchema>;

export const BannerListPayloadSchema = z.object({
    payloadType: z.literal(PayloadSubTypeEnum.enum.fetchAllBanners),
    banners: z.array(BannerObjectSchema).optional(),
});
export type BannerListPayload = z.infer<typeof BannerListPayloadSchema>;

export const ProfilePictureSchema = z.string();
export type ProfilePicture = z.infer<typeof ProfilePictureSchema>;

export const ProfilePictureObjectSchema = z.object({
    clientDbId: ClientIdSchema,
    imageHash: ProfilePictureHashSchema,
    data: ProfilePictureSchema,
});
export type ProfilePictureObject = z.infer<typeof ProfilePictureObjectSchema>;

export const NewProfilePicturePayloadSchema = z.object({
    payloadType: z.literal(PayloadSubTypeEnum.enum.newProfilePicture),
    clientDbId: ClientIdSchema,
    imageHash: ProfilePictureHashSchema,
    data: ProfilePictureSchema,
});
export type NewProfilePicturePayload = z.infer<
    typeof NewProfilePicturePayloadSchema
>;

export const ProfilePicturePayloadSchema = z.object({
    payloadType: z.literal(PayloadSubTypeEnum.enum.fetchProfilePicture),
    profilePictureDbId: z.number(),
    clientDbId: ClientIdSchema,
    imageHash: ProfilePictureHashSchema,
    data: ProfilePictureSchema,
});
export type ProfilePicturePayload = z.infer<typeof ProfilePicturePayloadSchema>;

export const FetchAllProfilePicturesPayloadSchema = z.object({
    payloadType: z.literal(PayloadSubTypeEnum.enum.fetchAllProfilePictures),
    profilePictures: z.array(ProfilePictureObjectSchema).optional(),
});
export type FetchAllProfilePicturesPayload = z.infer<
    typeof FetchAllProfilePicturesPayloadSchema
>;

export const EmergencyInitPayloadSchema = z.object({
    payloadType: z.literal(PayloadSubTypeEnum.enum.emergencyInit),
    active: z.boolean(),
    emergencyChatId: z.string(),
    initiatorClientDbId: ClientIdSchema,
});
export type EmergencyInitPayload = z.infer<typeof EmergencyInitPayloadSchema>;

export const EmergencyMessagePayloadSchema = z.object({
    payloadType: z.literal(PayloadSubTypeEnum.enum.emergencyMessage),
    emergencyChatId: z.string(),
    clientDbId: ClientIdSchema,
    messageDbId: z.string(),
    time: z.string(),
    message: z.string(),
});
export type EmergencyMessagePayload = z.infer<
    typeof EmergencyMessagePayloadSchema
>;

export const EmergencyMessageSchema = EmergencyMessagePayloadSchema.omit({
    payloadType: true,
});
export type EmergencyMessage = z.infer<typeof EmergencyMessageSchema>;

export const AllEmergencyMessagesPayloadSchema = z.object({
    payloadType: z.literal(PayloadSubTypeEnum.enum.allEmergencyMessages),
    emergencyMessages: z.array(EmergencyMessageSchema).optional(),
    emergencyChatId: z.string(),
});
export type AllEmergencyMessagesPayload = z.infer<
    typeof AllEmergencyMessagesPayloadSchema
>;

export const VersionEntitySchema = z.object({
    major: z.number(),
    minor: z.number(),
    patch: z.number(),
});
export type VersionEntity = z.infer<typeof VersionEntitySchema>;

export const ClientEntitySchema = z.object({
    clientDbId: ClientIdSchema,
    clientUsername: z.string(),
    clientColor: z.string().optional().nullable(),
    // TODO rename this property to clientProfilePictureHashHash
    clientProfilePictureHash: z.string().optional().nullable(),
    availability: z.boolean(),
});
export type ClientEntity = z.infer<typeof ClientEntitySchema>;

// export const AuthenticationPayloadSchema = ([z.object({
// 	payloadType: z.literal(PayloadSubTypeEnum.enum.auth),
// 	version: VersionEntitySchema,
// }), ClientEntitySchema.pick({clientDbId: true, clientUsername: true})]);

export const AuthenticationPayloadSchema = z.intersection(
    ClientEntitySchema.pick({ clientDbId: true, clientUsername: true }),
    z.object({
        payloadType: z.literal(PayloadSubTypeEnum.enum.auth),
        version: VersionEntitySchema,
    })
);
export type AuthenticationPayload = z.infer<typeof AuthenticationPayloadSchema>;

export const ImageEntitySchema = z.object({
    imageDbId: z.string().nullable(),
    type: z.string().nullable(),
    data: z.string().nullable(),
});
export type ImageEntity = z.infer<typeof ImageEntitySchema>;

export const ClientUpdatePayloadV2Schema = ClientEntitySchema.extend({
    payloadType: z.literal(PayloadSubTypeEnum.enum.profileUpdateV2),
});
export type ClientUpdatePayloadV2 = z.infer<typeof ClientUpdatePayloadV2Schema>;

export const ClientListPayloadSchema = z.object({
    payloadType: z.literal(PayloadSubTypeEnum.enum.clientList),
    clients: z.array(ClientEntitySchema),
});
export type ClientListPayload = z.infer<typeof ClientListPayloadSchema>;

export const VersionStateTypeSchema = z.object({
    major: z.number(),
    minor: z.number(),
    patch: z.number(),
    updateAvailable: z.boolean().optional().nullable(),
});
export type VersionStateType = z.infer<typeof VersionStateTypeSchema>;

export const ClientListPayloadEnhancedSchema = z.object({
    payloadType: z.literal(PayloadSubTypeEnum.enum.clientList),
    clients: z.array(ClientEntitySchema),
    version: VersionStateTypeSchema,
});
export type ClientListPayloadEnhanced = z.infer<
    typeof ClientListPayloadEnhancedSchema
>;

export const MessageEntitySchema = z.object({
    deleted: z.boolean(),
    edited: z.boolean(),
    messageDbId: z.string(),
    messageContext: z.string(),
    messageTime: z.string(),
    messageDate: z.string(),
});
export type MessageEntity = z.infer<typeof MessageEntitySchema>;

export const QuoteEntitySchema = z.object({
    quoteDbId: z.string().nullable(),
    quoteClientId: z.string().nullable(),
    quoteMessageContext: z.string().nullable(),
    quoteTime: z.string().nullable(),
    quoteDate: z.string().nullable(),
});
export type QuoteEntity = z.infer<typeof QuoteEntitySchema>;

export const ReactionEntitySchema = z.object({
    reactionDbId: z.string(),
    reactionMessageId: z.string(),
    reactionContext: z.string(),
    reactionClientId: z.string(),
});
export type ReactionEntity = z.infer<typeof ReactionEntitySchema>;

export const MessagePayloadSchema = z.object({
    payloadType: z.literal(PayloadSubTypeEnum.enum.message),
    messageType: MessageEntitySchema,
    clientType: ClientEntitySchema.pick({ clientDbId: true }),
    quoteType: QuoteEntitySchema.optional(),
    reactionType: ReactionEntitySchema.omit({ reactionDbId: true })
        .array()
        .optional(),
    imageType: ImageEntitySchema.optional(),
});
export type MessagePayload = z.infer<typeof MessagePayloadSchema>;

export const MessageListPayloadSchema = z.object({
    payloadType: z.literal(PayloadSubTypeEnum.enum.messageList),
    messageList: z.array(MessagePayloadSchema.omit({ payloadType: true })),
});
export type MessageListPayload = z.infer<typeof MessageListPayloadSchema>;

export const DeleteEntitySchema = z.object({
    payloadType: z.literal(PayloadSubTypeEnum.enum.delete),
    messageDbId: z.string(),
});
export type DeleteEntity = z.infer<typeof DeleteEntitySchema>;

export const EditEntitySchema = z.object({
    payloadType: z.literal(PayloadSubTypeEnum.enum.edit),
    messageDbId: z.string(),
    messageContext: z.string(),
});
export type EditEntity = z.infer<typeof EditEntitySchema>;

export const ProfilePicturesHashSchema = z.object({
    clientDbId: ClientIdSchema,
    imageHash: HashSchema,
});
export type ProfilePicturesHash = z.infer<typeof ProfilePicturesHashSchema>;

export const FetchProfilePicturePayloadSchema = z.object({
    payloadType: z.literal(PayloadSubTypeEnum.enum.fetchProfilePicture),
    clientDbId: ClientIdSchema,
});
export type FetchProfilePicturePayload = z.infer<
    typeof FetchProfilePicturePayloadSchema
>;

export const FetchCurrentClientProfilePictureHashPayloadSchema = z.object({
    payloadType: z.literal(
        PayloadSubTypeEnum.enum.fetchCurrentClientProfilePictureHash
    ),
    clientDbId: ClientIdSchema,
    clientProfilePictureHash: HashSchema,
});
export type FetchCurrentClientProfilePictureHashPayload = z.infer<
    typeof FetchCurrentClientProfilePictureHashPayloadSchema
>;

export const ReactionPayloadSchema = ReactionEntitySchema.extend({
    payloadType: z.literal(PayloadSubTypeEnum.enum.reaction),
});
export type ReactionPayload = z.infer<typeof ReactionPayloadSchema>;