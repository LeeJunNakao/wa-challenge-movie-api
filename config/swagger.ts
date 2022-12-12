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
        title: "W.A. Movie API documentation",
        version: "1.0.0",
        description: "An API where you can fetch a catalog of Ghibli movies",
      },
    },

    apis: ["app/**/*.ts", "assets/*.yml", "start/routes.ts"],
    basePath: "/",
  },
  mode: "RUNTIME",
  specFilePath: "/assets/swagger.yml",
} as SwaggerConfig;
