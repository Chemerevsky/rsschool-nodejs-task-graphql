import { GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { UserType } from './types/user.js';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                name: {
                    type: GraphQLString
                }
            }
        }
    }
});

export const getMutation = (prismaArg: PrismaClient) => {
    prisma = prismaArg;

    return Mutation;
}