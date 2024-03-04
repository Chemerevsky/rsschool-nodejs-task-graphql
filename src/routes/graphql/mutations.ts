import { GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
} from 'graphql';
import { PostType, CreatePostInputType } from './types/post.js';
import { UserType, CreateUserInputType } from './types/user.js';
import { ProfileType, CreateProfileInputType } from './types/profile.js'; 
import { PrismaClient } from '@prisma/client';

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
        }
    }
});

export const getMutation = (prismaArg: PrismaClient) => {
    prisma = prismaArg;

    return Mutation;
}