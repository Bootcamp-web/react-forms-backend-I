import React, { useState } from 'react';
import {Item} from './Item'
import {InputItem} from './InputItem'
import { useIngredient } from '../lib/useIngredients';

export const ShoppingList = ()=>{
 
    const { addItem , ingredients } =useIngredient();
    return(

        <div>
            {ingredients.map((it)=><Item  key={it.ingredient} item={it}/>)}
            <div>
                <InputItem onAddItem={addItem}/>
            </div>      
        </div>
    )
}