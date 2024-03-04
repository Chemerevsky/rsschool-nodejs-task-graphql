import { GraphQLObjectType, GraphQLList, GraphQLNonNull } from 'graphql';
import { UserType } from './types/user.js';
import { UUIDType } from './types/uuid.js';
import { MemberTypeType, MemberTypeId } from './types/memberType.js';
import { PostType } from './types/post.js';
import { ProfileType } from './types/profile.js';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
        type: new GraphQLList(UserType),
        resolve: async () => prisma.user.findMany(),
    },
    user: {
        type: UserType,
        args: {
            id: {
                type: new GraphQLNonNull(UUIDType)
            }
        },
        resolve: async (_, { id }: { id: string }) => {
            try {
                const user = await prisma.user.findUnique({
                    where: { id },
                });
                return user;
            } catch {
                return null;
            }
        },
    },
    memberTypes: {
        type: new GraphQLList(MemberTypeType),
        resolve: async () => prisma.memberType.findMany(),
    },
    memberType: {
        type: MemberTypeType,
        args: {
            id: {
                type: MemberTypeId
            }
        },
        resolve: async (_, { id }: { id: string } ) => {
            try {
                const memberType = await prisma.memberType.findUnique({
                    where: { id }
                });
                return memberType;
            } catch {
                return null;
            }
        },
    },
    posts: {
        type: new GraphQLList(PostType),
        resolve: async () => prisma.post.findMany(),
    },
    post: {
        type: PostType,
        args: {
            id: {
                type: new GraphQLNonNull(UUIDType)
            }
        },
        resolve: async (_, { id }: { id: string }) => {
            try {
                const post = await prisma.post.findUnique({
                    where: { id },
                });
                return post;
            } catch {
                return null;
            }
        },
    },
    profiles: {
        type: new GraphQLList(ProfileType),
        resolve: async () => prisma.profile.findMany(),
    },
    profile: {
        type: ProfileType as GraphQLObjectType,
        args: {
            id: {
                type: new GraphQLNonNull(UUIDType)
            }
        },
        resolve: async (_, { id }: { id: string } ) => {
            try {
                const profile = await prisma.profile.findUnique({
                    where: { id },
                });
                return profile;
            } catch {
                return null;
            }
        },
    },
  },
});

export const getQuery = (prismaArg: PrismaClient) => {
    prisma = prismaArg;

    return Query;
}