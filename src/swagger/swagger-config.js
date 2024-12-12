const swaggerAutogen = require('swagger-autogen')();
const path = require('path');

const doc = {
    swagger: "2.0",
    info: {
        title: 'Customer Management API',
        description: 'API documentation for managing customers in the system',
        version: '1.0.0'
    },
    host: 'localhost:3205',
    basePath: '/',
    schemes: ['http', 'https'],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'Enter your bearer token in the format **Bearer <token>**'
        }
    },
    paths: {
        "/api/auth/login": {
            post: {
                description: "Login to the system",
                parameters: [
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        schema: {
                            type: "object",
                            properties: {
                                email: { type: "string", example: "user@example.com" },
                                password: { type: "string", example: "password123" }
                            }
                        }
                    }
                ],
                responses: {
                    "200": { description: "OK" },
                    "401": { description: "Unauthorized" },
                    "500": { description: "Internal Server Error" }
                }
            }
        },
        "/api/users/create_user": {
            post: {
                description: "Create a new user",
                parameters: [
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        schema: {
                            type: "object",
                            properties: {
                                User_Details_Id: { type: "integer", example: 1 },
                                User_Details_Name: { type: "string", example: "John Doe" },
                                Password: { type: "string", example: "securePassword123" },
                                User_Type_Id: { type: "integer", example: 2 },
                                User_Type_Name: { type: "string", example: "Admin" },
                                Working_Status_Id: { type: "integer", example: 1 },
                                Working_Status_Name: { type: "string", example: "Active" },
                                Mobile_No: { type: "string", example: "1234567890" },
                                Email: { type: "string", example: "john.doe@example.com" },
                                Is_Applogin: { type: "boolean", example: true },
                                DeleteStatus: { type: "boolean", example: false }
                            }
                        }
                    }
                ],
                responses: {
                    "200": { description: "OK" },
                    "201": { description: "Created" },
                    "401": { description: "Unauthorized" },
                    "500": { description: "Internal Server Error" }
                }
            }
        },
        "/api/customer/Create_Customer": {
            post: {
                description: "Create a new customer",
                parameters: [
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        schema: {
                            type: "object",
                            properties: {
                                Leads_Id: { type: "integer", example: 1 },
                                Customer_Name: { type: "string", example: "John Doe" },
                                Contact_No: { type: "string", example: "1234567890" },
                                Email: { type: "string", example: "john.doe@example.com" },
                                Service_No: { type: "integer", example: 1 },
                                Date: { type: "string", format: "date", example: "2024-03-15" },
                                To_User_Id: { type: "integer", example: 1 },
                                To_User_Name: { type: "string", example: "Admin" },
                                Package_Id: { type: "integer", example: 1 },
                                Package_Name: { type: "string", example: "Basic Package" },
                                Package_Amount: { type: "number", format: "float", example: 99.99 },
                                Payment_Mode_Id: { type: "integer", example: 1 },
                                Payment_Mode_Name: { type: "string", example: "Credit Card" },
                                Tip_Amount: { type: "number", format: "float", example: 5.00 },
                                Tip_Payment_Mode_Id: { type: "integer", example: 1 },
                                Tip_Payment_Mode_Name: { type: "string", example: "Cash" },
                                Descriptions: { type: "string", example: "Customer description" },
                                DeleteStatus: { type: "boolean", example: false },
                                Additional_Amount: { type: "number", format: "float", example: 10.00 },
                                Additional_Amount_Payment_Mode_Id: { type: "integer", example: 1 }
                            }
                        }
                    }
                ],
                responses: {
                    "200": { description: "OK" },
                    "500": { description: "Internal Server Error" }
                }
            }
        }
    },
    definitions: {
        Package: {
            type: "object",
            properties: {
                Package_Id: { type: "integer", example: 123 },
                Package_Name: { type: "string", example: "Premium Package" },
                Service_Amount: { type: "number", format: "float", example: 299.99 },
                DeleteStatus: { type: "boolean", example: false }
            },
            required: ["Package_Id", "Package_Name", "Service_Amount"]
        },
        Customer: {
            type: "object",
            properties: {
                Leads_Id: { type: "integer", example: 1 },
                Customer_Name: { type: "string", example: "John Doe" },
                Contact_No: { type: "string", example: "1234567890" },
                Email: { type: "string", example: "john.doe@example.com" },
                Service_No: { type: "integer", example: 1 },
                Date: { type: "string", format: "date", example: "2024-03-15" },
                To_User_Id: { type: "integer", example: 1 },
                To_User_Name: { type: "string", example: "Admin" },
                Package_Id: { type: "integer", example: 1 },
                Package_Name: { type: "string", example: "Basic Package" },
                Package_Amount: { type: "number", format: "float", example: 99.99 },
                Payment_Mode_Id: { type: "integer", example: 1 },
                Payment_Mode_Name: { type: "string", example: "Credit Card" },
                Tip_Amount: { type: "number", format: "float", example: 5.00 },
                Tip_Payment_Mode_Id: { type: "integer", example: 1 },
                Tip_Payment_Mode_Name: { type: "string", example: "Cash" },
                Descriptions: { type: "string", example: "Customer description" },
                DeleteStatus: { type: "boolean", example: false },
                Additional_Amount: { type: "number", format: "float", example: 10.00 },
                Additional_Amount_Payment_Mode_Id: { type: "integer", example: 1 }
            },
            required: [
                "Leads_Id",
                "Customer_Name",
                "Contact_No",
                "Email",
                "Service_No",
                "Date",
                "To_User_Id",
                "Package_Id",
                "Payment_Mode_Id"
            ]
        }
    }
};

const outputFile = './src/swagger/swagger-output.json';
const routes = [
    './src/index.js'  // Point to your main app.js file
];

// Generate swagger.json
swaggerAutogen(outputFile, routes, doc).then(() => {
    console.log('Swagger documentation generated successfully');
}).catch((err) => {
    console.error('Error generating swagger documentation:', err);
});
