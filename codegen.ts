import type { CodegenConfig } from "@graphql-codegen/cli";
import 'dotenv/config';

const config: CodegenConfig = {
    overwrite: true,
    schema: {
        [`${process.env.NUXT_PUBLIC_WORDPRESS_API_URL}/graphql`]: {
            headers: {
                "User-Agent": "Codegen",
            },
        },
    },
    generates: {
        "types/graphql/": {
            preset: "client",
        },
        "types/graphql/schema.gql": {
            plugins: ["schema-ast"],
        },
    },
};

export default config;