import { defineConfig } from "prisma/config";

export default defineConfig({
  earlyAccess: true,
  schema: "src/prisma/schema",
});
