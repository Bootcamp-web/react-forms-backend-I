import React from 'react';
import { HaveIngredient } from './HaveIngredient';
import { FullRecipe } from './FullRecipe';

const recipe = ['apples', 'flour', 'eggs', 'milk'];

export const Recipe = () => {
  return(
    <div>
      <h2>Recipe</h2>
      {recipe.map((e) => <HaveIngredient key={e} ing={e} />)}
      <FullRecipe recipe={recipe} />
    </div>
  )

}