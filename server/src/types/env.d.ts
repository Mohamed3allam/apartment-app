declare namespace NodeJS {
    export interface ProcessEnv {
        // MAIN CONFIGURATION
        PORT: string;
        MONGO_URI: string;
        // AWS CONFIGURATION
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_BUCKET_NAME: string;
        // JWT CONFIGURATION
        JWT_SECRET: string;
    }
}