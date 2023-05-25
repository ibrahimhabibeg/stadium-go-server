
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/schema.gql",
  emitLegacyCommonJSImports: false,
  generates: {
    "src/types/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
