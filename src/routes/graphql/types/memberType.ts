import { GraphQLEnumType,
    GraphQLObjectType,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
} from 'graphql';
import { UserType } from './user.js';

export const MemberTypeId = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
        basic: {
            value: 'basic'
        },
        business: {
            value: 'business'
        },
    },
  });

export const MemberTypeType = new GraphQLObjectType({
    name: 'MemberType',
    fields: () => ({
        id: {
            type: MemberTypeId,
        },
        discount: {
            type: GraphQLFloat,
        },
        postsLimitPerMonth: {
            type: GraphQLInt,
        },
        profiles: {
            type: new GraphQLList(UserType),
        },
    }),
});