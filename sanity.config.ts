import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "@/sanity/schemas";

const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  title: process.env.NEXT_PUBLIC_SANITY_TITLE,
  basePath: process.env.NEXT_PUBLIC_SANITY_BASE_PATH,
  plugins: [deskTool()],
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  schema: { types: schemas },
});

export default config;
