const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  "src/api/page/content-types/page/schema.json": `{
  "kind": "collectionType",
  "collectionName": "pages",
  "info": {
    "singularName": "page",
    "pluralName": "pages",
    "displayName": "Page",
    "description": "Simple editorial pages used in the main navigation"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "subtitle": {
      "type": "string"
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true,
      "unique": true
    },
    "image": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": [
        "images"
      ]
    },
    "description": {
      "type": "text"
    },
    "showInMenu": {
      "type": "boolean",
      "default": true
    }
  }
}
`,

  "src/api/page/controllers/page.ts": `/**
 * page controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::page.page");
`,

  "src/api/page/services/page.ts": `/**
 * page service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::page.page");
`,

  "src/api/page/routes/page.ts": `/**
 * page router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::page.page");
`,
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(root, relativePath);

  fs.mkdirSync(path.dirname(fullPath), {
    recursive: true,
  });

  fs.writeFileSync(fullPath, content, "utf8");

  console.log(`✅ ${relativePath}`);
}

console.log("");
console.log("🎉 Backend Page creado.");
console.log("Ahora reinicia Strapi.");