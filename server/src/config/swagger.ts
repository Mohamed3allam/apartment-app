import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Apartment App",
            version: "1.0.0",
            description: "API documentation for apartments",
        },
        tags: [
            { name: "Apartments", description: "Manage apartment units" },
            { name: "Upload", description: "File uploads" },
        ],
    },
    apis: ["src/docs/v1/*.yaml"], 
});
