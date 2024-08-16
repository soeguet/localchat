import {z} from "zod";

enum PayloadTypes {
    auth = 0,
    message = 1,
    clientList = 2,
    profileUpdate = 3,
    messageList = 4,
    typing = 5,
    force = 6,
    reaction = 7,
    delete = 8,
    edit = 9,
    emergencyInit = 10,
    emergencyMessage = 11,
    allEmergencyMessages = 12,
    newProfilePicture = 13,
    fetchProfilePicture = 14,
    fetchAllProfilePictures = 15,
    fetchCurrentClientProfilePictureHash = 16,
    fetchAllProfilePictureHashes = 20,
    profileUpdateV2 = 17,
    fetchAllBanners = 18,
    modifyBanner = 19,
}

export const PayloadSubTypeEnum = z.nativeEnum(PayloadTypes);
export type PayloadSubType = z.infer<typeof PayloadSubTypeEnum>;

export const ProfilePictureSchema = z.string();
export type ProfilePicture = z.infer<typeof ProfilePictureSchema>;

export const ProfilePictureHashSchema = z.string();
export type ProfilePictureHash = z.infer<typeof ProfilePictureHashSchema>;

export const ClientIdSchema = z.string();
export type ClientId = z.infer<typeof ClientIdSchema>;

export const HashSchema = z.string();
export type Hash = z.infer<typeof HashSchema>;

export const ProfilePicturesHashesSchema = z.object({
    clientDbId: ClientIdSchema,
    imageHash: HashSchema,
});
export type ProfilePicturesHashes = z.infer<typeof ProfilePicturesHashesSchema>;

export const AllProfilePictureHashesPayloadSchema = z.object({
    payloadType: PayloadSubTypeEnum,
    profilePictureHashes: z.array(ProfilePicturesHashesSchema).optional(),
});
export type AllProfilePictureHashesPayload = z.infer<typeof AllProfilePictureHashesPayloadSchema>;

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
    payloadType: PayloadSubTypeEnum,
    banner: BannerObjectSchema,
    action: BannerActionSchema,
});
export type BannerPayload = z.infer<typeof BannerPayloadSchema>;

export const BannerListPayloadSchema = z.object({
    payloadType: PayloadSubTypeEnum,
    banners: z.array(BannerObjectSchema).optional(),
});
export type BannerListPayload = z.infer<typeof BannerListPayloadSchema>;

export const ProfilePictureObjectSchema = z.object({
    clientDbId: ClientIdSchema,
    imageHash: ProfilePictureHashSchema,
    data: ProfilePictureSchema,
});
export type ProfilePictureObject = z.infer<typeof ProfilePictureObjectSchema>;

export const NewProfilePicturePayloadSchema = z.object({
    payloadType: PayloadSubTypeEnum,
    clientDbId: ClientIdSchema,
    imageHash: ProfilePictureHashSchema,
    data: ProfilePictureSchema,
});
export type NewProfilePicturePayload = z.infer<typeof NewProfilePicturePayloadSchema>;

export const ProfilePicturePayloadSchema = z.object({
    payloadType: PayloadSubTypeEnum,
    profilePictureDbId: z.number(),
    clientDbId: ClientIdSchema,
    imageHash: ProfilePictureHashSchema,
    data: ProfilePictureSchema,
});
export type ProfilePicturePayload = z.infer<typeof ProfilePicturePayloadSchema>;

export const FetchAllProfilePicturesPayloadSchema = z.object({
    payloadType: PayloadSubTypeEnum,
    profilePictures: z.array(ProfilePictureObjectSchema).optional(),
});
export type FetchAllProfilePicturesPayload = z.infer<typeof FetchAllProfilePicturesPayloadSchema>;

export const EmergencyInitPayloadSchema = z.object({
    payloadType: PayloadSubTypeEnum,
    active: z.boolean(),
    emergencyChatId: z.string(),
    initiatorClientDbId: ClientIdSchema,
});
export type EmergencyInitPayload = z.infer<typeof EmergencyInitPayloadSchema>;

export const EmergencyMessagePayloadSchema = z.object({
    payloadType: PayloadSubTypeEnum,
    emergencyChatId: z.string(),
    clientDbId: ClientIdSchema,
    messageDbId: z.string(),
    time: z.string(),
    message: z.string(),
});
export type EmergencyMessagePayload = z.infer<typeof EmergencyMessagePayloadSchema>;

export const EmergencyMessageSchema = EmergencyMessagePayloadSchema.omit({payloadType: true});
export type EmergencyMessage = z.infer<typeof EmergencyMessageSchema>;

export const AllEmergencyMessagesPayloadSchema = z.object({
    payloadType: PayloadSubTypeEnum,
    emergencyMessages: z.array(EmergencyMessageSchema).optional(),
    emergencyChatId: z.string(),
});
export type AllEmergencyMessagesPayload = z.infer<typeof AllEmergencyMessagesPayloadSchema>;

export const VersionEntitySchema = z.object({
    major: z.number(),
    minor: z.number(),
    patch: z.number(),
});
export type VersionEntity = z.infer<typeof VersionEntitySchema>;

export const ClientEntitySchema = z.object({
    clientDbId: ClientIdSchema,
    clientUsername: z.string(),
    clientColor: z.string().optional(),
    // TODO rename this property to clientProfileImageHash
    clientProfileImage: z.string().optional(),
    availability: z.boolean(),
});
export type ClientEntity = z.infer<typeof ClientEntitySchema>;

export const AuthenticationPayloadSchema = z.union([z.object({
    payloadType: PayloadSubTypeEnum,
    version: VersionEntitySchema,
}), ClientEntitySchema.pick({clientDbId: true, clientUsername: true})]);
export type AuthenticationPayload = z.infer<typeof AuthenticationPayloadSchema>;

export const ImageEntitySchema = z.object({
    imageDbId: z.string(),
    type: z.string(),
    data: z.string(),
});
export type ImageEntity = z.infer<typeof ImageEntitySchema>;

export const ClientUpdatePayloadV2Schema = z.union([z.object({
    payloadType: PayloadSubTypeEnum
}), ClientEntitySchema]);
export type ClientUpdatePayloadV2 = z.infer<typeof ClientUpdatePayloadV2Schema>;

export const ClientListPayloadSchema = z.object({
    payloadType: PayloadSubTypeEnum,
    clients: z.array(ClientEntitySchema)
});
export type ClientListPayload = z.infer<typeof ClientListPayloadSchema>;

export const VersionStateTypeSchema = z.object({
    major: z.number(),
    minor: z.number(),
    patch: z.number(),
    updateAvailable: z.boolean().optional(),
});
export type VersionStateType = z.infer<typeof VersionStateTypeSchema>;

export const ClientListPayloadEnhancedSchema = z.object({
    payloadType: PayloadSubTypeEnum,
    clients: z.array(ClientEntitySchema),
    version: VersionStateTypeSchema,
});
export type ClientListPayloadEnhanced = z.infer<typeof ClientListPayloadEnhancedSchema>;

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
    quoteDbId: z.string(),
    quoteClientId: z.string(),
    quoteMessageContext: z.string(),
    quoteTime: z.string(),
    quoteDate: z.string(),
});
export type QuoteEntity = z.infer<typeof QuoteEntitySchema>;

export const ReactionEntitySchema = z.object({
    reactionDbId: z.number(),
    reactionMessageId: z.string(),
    reactionContext: z.string(),
    reactionClientId: z.string(),
});
export type ReactionEntity = z.infer<typeof ReactionEntitySchema>;

export const MessagePayloadSchema = z.object({
    payloadType: PayloadSubTypeEnum,
    messageType: MessageEntitySchema,
    clientType: ClientEntitySchema.pick({clientDbId: true}),
    quoteType: QuoteEntitySchema.optional(),
    reactionType: ReactionEntitySchema.omit({reactionDbId: true}).array().optional(),
    imageType: ImageEntitySchema.optional(),
});
export type MessagePayload = z.infer<typeof MessagePayloadSchema>;

export const MessageListPayloadSchema = z.object({
    payloadType: PayloadSubTypeEnum,
    messageList: z.array(MessagePayloadSchema),
});
export type MessageListPayload = z.infer<typeof MessageListPayloadSchema>;