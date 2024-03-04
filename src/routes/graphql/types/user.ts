import { GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLList,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostType } from './post.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(UUIDType),
        },
        name: {
            type: GraphQLString,
        },
        balance: {
            type: GraphQLFloat,
        },
        profile: {
            type: ProfileType,
            resolve: async ({ id }: { id: string }) => {
                return await prisma.profile.findUnique({ where: { userId: id } });
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve: async ({ id }: { id: string }) => {
                return await prisma.post.findMany({ where: { authorId: id } });
            }
        },
        userSubscribedTo: {
            type: new GraphQLList(UserType),
            resolve: async ({ id }: { id: string }) => {
                return await prisma.user.findMany({
                    where: {
                        subscribedToUser: {
                            some: {
                                subscriberId: id,
                            },
                        },
                    },
                });
            }
        },
        subscribedToUser: {
            type: new GraphQLList(UserType),
            resolve: async ({ id }: { id: string }) => {
                return await prisma.user.findMany({
                    where: {
                        userSubscribedTo: {
                            some: {
                                authorId: id,
                            },
                        },
                    }
                });
            }
        }
    }),
});