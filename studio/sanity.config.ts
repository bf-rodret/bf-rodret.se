// sanity.config.js
import { defineConfig } from "sanity";
import {deskTool} from "sanity/desk";
import { visionTool } from "@sanity/vision";
import schemas from "./schemas/schema";
import deskStructure from "./deskStructure";

const projectId = "bjnjq7k1";

const plugins = [
  deskTool({
    structure: deskStructure
  }),
  visionTool()
];

const schema = {
  types: schemas,
};

// Only show admin tools for admins
const tools = (prev, context) => {
  const isAdmin = context.currentUser.roles
    .find(({ name }) => name === 'administrator')
  if (isAdmin) {
    return prev
  }
  return prev.filter((tool) => !['vision', 'duplicator'].includes(tool.name))
};

// These document types can only have "one instance". You should not be able to create new, duplicate etc
const settingsTypeDocuments = [
  'start',
];

const document = {
  newDocumentOptions: (prev, { creationContext }) => {
    if (creationContext.type === 'global') {
      return prev.filter((templateItem) => !settingsTypeDocuments.includes(templateItem.templateId))
    }
    return prev
  },
  actions: (prev, { schemaType }) => {
    if (settingsTypeDocuments.includes(schemaType)) {
      return prev.filter(({ action }) => !['unpublish', 'delete','duplicate'].includes(action))
    }
    return prev
  },
};

export default defineConfig([
  {
    name: "production",
    title: "Bf Rodret",
    dataset: "production",
    basePath: "/prod",
    projectId,
    plugins,
    schema,
    document,
    tools,
  },
  {
    name: "development",
    title: "Bf Rodret (Development)",
    basePath: "/dev",
    dataset: "development",
    projectId,
    plugins,
    schema,
    document,
    tools,
  }
]);
