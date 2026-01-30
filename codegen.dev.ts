import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from "dotenv"

dotenv.config({path: ".env.local"});
const config: CodegenConfig = {
  overwrite: true,

  schema: {[process.env.NEXT_PUBLIC_NHOST_GRAPHQL_URL!]: {
    headers: {
      'x-hasura-admin-secret': process.env.NEXT_PUBLIC_NHOST_ADMIN_SECRET!
    }
  }},
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
