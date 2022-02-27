import { conectDB } from '../lib/db';
import { Ingredient } from '../models/Ingredient.model';


(async () => {
    const { close } = await conectDB();
 
    try {
        await Ingredient.collection.drop();
    } catch (error) {
        console.log('There are no ingredients to drop from db');
    }

    const recipe = [{ apples: '1kg' }, { flour: '2cups' }, { butter: '3spoons' }, { eggs: '6uds' }, { milk: '1l' }];

    await Promise.all(recipe.map(async (ing) => {
        await Ingredient.create({ name: Object.keys(ing)[0], quantity: Object.values(ing)[0] }).then((e) => console.log(`🍊Create ingredient ${e.name}`));
    }));

  
    await close();
})();