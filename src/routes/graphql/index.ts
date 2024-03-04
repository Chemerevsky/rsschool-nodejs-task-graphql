import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql } from 'graphql';
import { getQuery } from './queries.js';
import { getMutation } from './mutations.js';


const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
        const { query, variables } = req.body;
        const schema = new GraphQLSchema({
            query: getQuery(fastify.prisma),
            mutation: getMutation(fastify.prisma),
        });
        return await graphql({
            schema: schema,
            source: String(query),
            variableValues: variables,
        });
    },
  });
};

export default plugin;
