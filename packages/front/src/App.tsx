import React from 'react';
import { Recipe } from './components/Recipe';
import { ShoppingList } from './components/ShoppingList'
import { ShoppingListManager } from './lib/useIngredients';
import styled from 'styled-components';

const Flex = styled.div`
display:flex;
align-items: flex-start;
justify-content: center;
flex-wrap: wrap;
`;

const Box = styled.div`
padding: 10px;
border: 1px solid red;
`;
export const App = () => (
    <div>
      <ShoppingListManager>
        <Flex>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <h2>App Shopping list</h2>
          </div>
          <Box>
            <ShoppingList />
          </Box>
          <Box>
            <Recipe />
          </Box>
        </Flex>
      </ShoppingListManager>
    </div>
  );