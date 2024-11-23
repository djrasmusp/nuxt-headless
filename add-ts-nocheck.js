import fs from "fs/promises";

const generatedFilePath = "types/graphql/gql.ts";

(async () => {
    try {
        const data = await fs.readFile(generatedFilePath, "utf8");
        const updatedContent = `// @ts-nocheck\n${data}`;
        await fs.writeFile(generatedFilePath, updatedContent, "utf8");
        console.log(`Added "// @ts-nocheck" to ${generatedFilePath}`);
    } catch (err) {
        console.error("Error:", err);
    }
})();