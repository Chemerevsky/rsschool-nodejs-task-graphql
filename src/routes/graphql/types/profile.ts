import { GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLNonNull
} from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './user.js';
import { MemberTypeType, MemberTypeId } from './memberType.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(UUIDType),
        },
        isMale: {
            type: GraphQLBoolean,
        },
        yearOfBirth: {
            type: GraphQLInt,
        },
        user: {
            type: UserType,
        },
        userId: {
            type: GraphQLString,
        },
        memberType: {
            type: MemberTypeType,
            resolve: async ({ memberTypeId }: { memberTypeId: string }) => {
                return await prisma.memberType.findUnique({ where: { id: memberTypeId } });
            }
        },
        memberTypeId: {
            type: MemberTypeId,
        }
    }),
});