// import type { CodegenConfig } from '@graphql-codegen/cli';

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: "./src/graphql/schema.graphql",
//   documents: ['./src/graphql/**/*.graphql', 
//     './src/**/*.{tsx,ts,js,jsx}',
//     '!./src/**/*.test.{tsx,ts,js,jsx}',
//     '!./src/**/*.spec.{tsx,ts,js,jsx}',
//     '!./node_modules/**/*'],
//   generates: {
//     "./src/graphql/__generated__/": {
//       preset: "client",
//       plugins: []
//       // plugins: ["typescript", "typescript-operations", "typescript-react-apollo"]
//     },
//     "./graphql.schema.json": {
//       plugins: ["introspection"]
//     }
//   }
// };

// export default config;



import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from "dotenv"

dotenv.config({path: ".env.local"});

const config: CodegenConfig = {
  overwrite: true,

  schema: `${process.env.NHOST_GRAPHQL_URL}`,
  documents: ['./src/graphql/**/*.graphql'],
  config: {
    ignoreNoFields: true,  // This might help
  },
  generates: {
    "./src/graphql/__generated__/": {
       preset: "client",
      
      
    
    },
    // "./graphql.schema.json": {
    //   plugins: ["introspection"]
    // }
  }
};

export default config;
