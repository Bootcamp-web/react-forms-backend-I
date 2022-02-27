# React-forms-backend-I

0. [Viene de proyectos anteriores](#schema0)
1. [# 1 Inicializamos NPM con instalamos paquetes necesarios y ejecutamos tsc](#schema1)
1. [# 2 Modificamos estructura del proyecto y generamos node_modules para la parte general del proyecto.](#schema2)
1. [ # 3 Modificamos lerna](#schema3)
1. [ # 4 Configuramos `api`](#schema4)
1. [ # 5 Creamos el `server.ts`, `config.ts` y `main_routers.ts`](#schema5)
1. [ Modificamos `FullRecipe.tsx` para dejar solo el componente y ponemos la lógica en el contexto.](#schema6)
1. [ Crearmos `ShoppingListManager` en `useIngredients.tsx` ](#schema7)
1. [ Le ponemos estilos a `App.tsx`](#schema8)


<hr>

<a name="schema0"></a>

# 0 Viene de proyectos anteriores

https://github.com/Bootcamp-web/react-hook-forms-II


<hr>

<a name="schema1"></a>


# 1 Inicializamos NPM con instalamos paquetes necesarios y ejecutamos tsc
~~~
npm install
~~~
~~~
tsc --init
~~~
~~~
npm init @eslint/config
~~~

<hr>

<a name="schema2"></a>

# 2 Modificamos estructura del proyecto y generamos node_modules para la parte general del proyecto.
```
packages
│
└───front
│   │   src
│   │   index.html
│   │   package.json
│   │   tsconfig.jon
│
api
│   │   src
|   |   .env
│   │   package.json
│   │   tsconfig.jon
```
~~~
npm init -y
npm install
npm install typescript eslint parcel react react-dom 
npm install @types/react @types/react-dom
~~~
~~~
npm install lerna
~~~
Arrancamos lerna
~~~
npx lerna init
~~~
<hr>

<a name="schema3"></a>

# 3 Modificamos lerna
- `lerna.json`
~~~json
{
  "packages": [
    "packages/*"
  ],
  "version": "0.0.0",
  "nmpClient":"npm",
  "useWorkspaces":true

}

~~~
- package.json
~~~json
  "scripts": {
    "dev": "lerna run dev --stream"
  },

  "workspaces":[
    "packages/*"
  ],
~~~
Prepara los workspaces con:
~~~
npx lerna bootstrap
~~~
Arrancamos lerna
~~~
npm run dev
~~~
<hr>

<a name="schema4"></a>

# 4 Configuramos `api`
~~~
npm init -y
npm install typescript nodemon fastify
~~~
Modificamos el `tsconfig.api`
~~~json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
~~~

~~~
npm install fastify pino pino-pretty dotenv ts-node @types/node @types/pino    
~~~
<hr>

<a name="schema5"></a>

# 5 Creamos el `server.ts`, `config.ts` y `main_routers.ts`
- `config.ts`
~~~ts
import dotenv from 'dotenv';

dotenv.config();

const checkEnv = (envVar: string) => {
  if (!process.env[envVar]) {
    throw new Error(`Please define the Enviroment variable ${envVar}`);
  } else {
    return process.env[envVar] as string;
  }
};

export const PORT: number = parseInt(checkEnv('PORT'), 10);

~~~
- `server.ts`
~~~ts
import fastify from 'fastify';
import { main_app } from './app';

import { PORT } from './config';
import { main_router } from './routers/main_routers';

const server = fastify({
  logger: {
    prettyPrint: true,
  },
  disableRequestLogging: true,
});

server.register(main_app);
server.listen(PORT, '0.0.0.0');
~~~
- `main_router`
~~~ts
import { FastifyPluginAsync } from 'fastify';

export const main_router: FastifyPluginAsync = async (app) => {
  app.get('/', async () => ({ hello: 'world' }));
};
~~~
- `app.ts`
~~~ts
import { FastifyPluginAsync } from 'fastify';
import { main_router } from './routers/main_routers';

export const main_app: FastifyPluginAsync = async (app) => {

  app.register(main_router);

};
~~~

# 6 Instalamos mongoose en la api
~~~
npm install mongoose
~~~
- Arrancamos mongo compas y conectar  a mongo
~~~
sudo systemctl start mongod
~~~
~~~
sudo systemctl status mongod
~~~
~~~
mongodb-compass
~~~
~~~
mongodb://localhost:27017
~~~
- Modificamos `config.ts`
~~~ts
import dotenv from 'dotenv';

dotenv.config();

const checkEnv = (envVar: string) => {
  if (!process.env[envVar]) {
    throw new Error(`Please define the Enviroment variable ${envVar}`);
  } else {
    return process.env[envVar] as string;
  }
};

export const PORT: number = parseInt(checkEnv('PORT'), 10);
export const DB_URL: string = checkEnv('DB_URL');
~~~
- Creamos `Ingredient.model.ts`
~~~ts
import mongoose, { Document, Schema } from 'mongoose';

export interface iIngredient extends Document {
    name: String,
    quantity: String,
    secret: Boolean
}

const schema = new Schema({
  name: { type: String, require: true },
  quantity: { type: String, require: true },
  secret: { type: Boolean, require: false },
});

export const Ingredient = mongoose.model<iIngredient>('Ingredient', schema);
~~~
- Creamos `seed.ts`
~~~ts
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
~~~

# 7 Creamos `db.ts`
~~~ts
import mongoose from 'mongoose';
import { DB_URL } from '../config';

export const conectDB = async () => mongoose.connect(DB_URL).then(() => {
  console.log(`📦 Connected to ${DB_URL}`);
  return {
    close: () => mongoose.disconnect(),
  };
});
~~~

# 8 Creamos `ingredients_router.ts ` para poder ver los ingredientes que tenemos en al BBDD en una paǵina de la api
~~~ts

import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { Ingredient } from '../models/Ingredient.model';

export const ingredients_router: FastifyPluginAsync = async (app) => {
  app.get('/', async () => {

      const ingredients = await Ingredient.find().lean();
      return ingredients;
      
    });
};
~~~

Modificamos `app.ts`
~~~ts
import { FastifyPluginAsync } from 'fastify';
import { conectDB } from './lib/db';
import { ingredients_router } from './routers/ingredients_router';
import { main_router } from './routers/main_routers';

export const main_app: FastifyPluginAsync = async (app) => {
    conectDB();
  
    app.register(main_router);
    app.register(ingredients_router, { prefix: '/ingredients' });
};
~~~