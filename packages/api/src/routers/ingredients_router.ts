
import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { Ingredient } from '../models/Ingredient.model';

export const ingredients_router: FastifyPluginAsync = async (app) => {
  app.get('/', async () => {

      const ingredients = await Ingredient.find().lean();
      return ingredients;
      
    });
};