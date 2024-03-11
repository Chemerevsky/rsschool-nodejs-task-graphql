import { GraphQLObjectType,
    GraphQLNonNull,
    GraphQLBoolean
} from 'graphql';
import { PostType, CreatePostInputType, ChangePostInputType } from './types/post.js';
import { UserType, CreateUserInputType, ChangeUserInputType } from './types/user.js';
import { ProfileType, CreateProfileInputType, ChangeProfileInputType } from './types/profile.js'; 
import { PrismaClient } from '@prisma/client';
import { UUIDType } from './types/uuid.js';

let prisma: PrismaClient;

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createPost: {
            type: PostType,
            args: {
                dto: {
                    type: CreatePostInputType
                }
            },
            resolve: async (_, args: { dto }) => {
                return await prisma.post.create({ data: args.dto });
            }
        },
        deletePost: {
            type: GraphQLBoolean,
            args: {
                id: {
                    type: UUIDType
                },
            },
            resolve: async (_, { id }: { id: string }) => {
                await prisma.post.delete({ where: { id }});
                return true;
            }
        },
        changePost: {
            type: PostType,
            args: {
                id: {
                    type: UUIDType
                },
                dto: {
                    type: ChangePostInputType
                },
            },
            resolve: async (_, { id, dto }: { id: string; dto}) => {
                return await prisma.post.update({
                    where: { id },
                    data: dto,
                });
            }
        },
        createUser: {
            type: UserType,
            args: {
                dto: {
                    type: CreateUserInputType
                }
            },
            resolve: async (_, args: { dto }) => {
                return await prisma.user.create({ data: args.dto });
            }
        },
        deleteUser: {
            type: GraphQLBoolean,
            args: {
                id: {
                    type: UUIDType
                },
            },
            resolve: async (_, { id }: { id: string }) => {
                await prisma.user.delete({ where: { id }});
                return true;
            }
        },
        changeUser: {
            type: UserType,
            args: {
                id: {
                    type: UUIDType
                },
                dto: {
                    type: ChangeUserInputType
                },
            },
            resolve: async (_, { id, dto }: { id: string; dto}) => {
                return await prisma.user.update({
                    where: { id },
                    data: dto,
                });
            }
        },
        subscribeTo: {
            type: UserType,
            args: {
                userId: {
                    type: new GraphQLNonNull(UUIDType)
                },
                authorId: {
                    type: new GraphQLNonNull(UUIDType)
                }
            },
            resolve: async (_, { userId, authorId }: { userId: string; authorId: string }) => {
                return await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        userSubscribedTo: {
                            create: {
                                authorId: authorId,
                            },
                        },
                    },
                });
            }
        },
        unsubscribeFrom: {
            type: GraphQLBoolean,
            args: {
                userId: {
                    type: new GraphQLNonNull(UUIDType)
                },
                authorId: {
                    type: new GraphQLNonNull(UUIDType)
                }
            },
            resolve: async (_, { userId, authorId }: { userId: string; authorId: string }) => {
                const result: object = await prisma.subscribersOnAuthors.delete({
                    where: {
                        subscriberId_authorId: {
                            subscriberId: userId,
                            authorId: authorId,
                        },
                    }
                });
                if (result.hasOwnProperty('subscriberId')) {
                    return true;
                }
                return false;
            }
        },
        createProfile: {
            type: ProfileType,
            args: {
                dto: {
                    type: CreateProfileInputType
                }
            },
            resolve: async (_, args: { dto }) => {
                return await prisma.profile.create({ data: args.dto });
            }
        },
        deleteProfile: {
            type: GraphQLBoolean,
            args: {
                id: {
                    type: UUIDType
                },
            },
            resolve: async (_, { id }: { id: string }) => {
                await prisma.profile.delete({ where: { id }});
                return true;
            }
        },
        changeProfile: {
            type: PostType,
            args: {
                id: {
                    type: UUIDType
                },
                dto: {
                    type: ChangeProfileInputType
                },
            },
            resolve: async (_, { id, dto }: { id: string; dto}) => {
                return await prisma.profile.update({
                    where: { id },
                    data: dto,
                });
            }
        },
    }
});

export const getMutation = (prismaArg: PrismaClient) => {
    prisma = prismaArg;

    return Mutation;
}