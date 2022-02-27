import React from 'react';
import { useIngredient } from '../lib/useIngredients';

export const FullRecipe = ({ recipe }) => {
    const { getMissingIngredients } = useIngredient();
    const { missingIngredients, completed } = getMissingIngredients(recipe);
 
    if (completed) {
      return (<p>✅Receta completa</p>);
    }
    return (
      <p>
        ❌
        {' '}
        <b>Faltan ingredients: </b>
        {[...missingIngredients].join(', ')}
      </p>
    );
  };