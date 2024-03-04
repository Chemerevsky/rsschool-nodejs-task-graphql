import { GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
} from 'graphql';
import { PostType, CreatePostInputType } from './types/post.js';
import { UserType, CreateUserInputType } from './types/user.js';
import { ProfileType, CreateProfileInputType } from './types/profile.js'; 
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
                await prisma.post.delete({ where: { id }});
                return true;
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
                await prisma.post.delete({ where: { id }});
                return true;
            }
        },
    }
});

export const getMutation = (prismaArg: PrismaClient) => {
    prisma = prismaArg;

    return Mutation;
}