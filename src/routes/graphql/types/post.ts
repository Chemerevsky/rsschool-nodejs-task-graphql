import { GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType
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

export const CreatePostInputType = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    fields: () => ({
        title: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        },
        authorId: {
            type: GraphQLString
        }
    })
});

export const ChangePostInputType = new GraphQLInputObjectType({
    name: 'ChangePostInput',
    fields: () => ({
        title: {
            type: GraphQLString
        }
    })
});