import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from "dotenv"

dotenv.config({path: ".env.local"});

const config: CodegenConfig = {
  overwrite: true,

  schema: process.env.NHOST_GRAPHQL_URL,
  documents: ['./src/graphql/**/*.graphql'],
  config: {
    ignoreNoFields: true,
  },
  generates: {
    "./src/graphql/__generated__/": {
       preset: "client",
    },

  }
};

export default config;
