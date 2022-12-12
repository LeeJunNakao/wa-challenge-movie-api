import { SwaggerConfig } from "@ioc:Adonis/Addons/Swagger";

export default {
  uiEnabled: true, //disable or enable swaggerUi route
  uiUrl: "/documentation", // url path to swaggerUI
  specEnabled: true, //disable or enable swagger.json route
  specUrl: "/assets/swagger.yml",

  middleware: [], // middlewares array, for protect your swagger docs and spec endpoints

  options: {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Application with swagger docs",
        version: "1.0.0",
        description: "My application with swagger docs",
      },
    },

    apis: ["app/**/*.ts", "assets/*.yml", "start/routes.ts"],
    basePath: "/",
  },
  mode: process.env.NODE_ENV === "production" ? "PRODUCTION" : "RUNTIME",
  specFilePath: "assets/swagger.yml",
} as SwaggerConfig;
