import React, { useContext, useEffect, useState } from 'react';
import { getIngredients } from './api';

export const IngredientsContext = React.createContext({});

export const useIngredient = ()=>{
    const { ingredients, addItem }= useContext(IngredientsContext)

  
    const hasIngredient = (ing) => ingredients.filter((e) => e.ingredient === ing).length > 0;

    const getMissingIngredients=(recipe) => {
        const completedIngredients =  recipe.filter((ingredient)=>ingredients.map((e)=>e.ingredient)
        .includes(ingredient));

        const setRecipe = new Set(completedIngredients);
        const missingIngredients = new Set([...recipe].filter((x) => !setRecipe.has(x)));

        return {
            missingIngredients,
            completed: completedIngredients.length ===recipe.lengt
        }
    }

    return { ingredients, addItem,hasIngredient,getMissingIngredients }
}

export const ShoppingListManager = ({children}) =>{
    const [items, setItems] = useState([]);
    const addItem = (item)=>{
        setItems((it) => [...it, item]);
   }
   return(
    <IngredientsContext.Provider value={{ingredients: items,addItem}}>
        {children}
    </IngredientsContext.Provider>
   )

}