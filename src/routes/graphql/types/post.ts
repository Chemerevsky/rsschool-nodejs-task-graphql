import { GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './user.js';

export const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(UUIDType),
        },
        title: {
            type: GraphQLString,
        },
        content: {
            type: GraphQLString,
        },
        author: {
            type: UserType
        },
        authorId: {
            type: UUIDType
        }
    }),
});