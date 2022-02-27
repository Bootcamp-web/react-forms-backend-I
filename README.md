# React-forms-backend-I

0. [Viene de proyectos anteriores](#schema0)
1. [# 1 Inicializamos NPM con instalamos paquetes necesarios y ejecutamos tsc](#schema1)
1. [# 2 Modificamos estructura del proyecto y generamos node_modules para la parte general del proyecto.](#schema2)
1. [ # 3 Modificamos lerna](#schema3)
1. [ Creamos nuevo componente `FullRecipe.tsx` y modificamos `Recipe.tsx` ](#schema4)
1. [ Modificamos `useIngredients.tsx` y modificamos `HaveIngredients.tsx` ](#schema5)
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

~~~
npx lerna bootstrap
~~~
Arrancamos lerna
~~~
npm run dev
~~~

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