import dotenv from "dotenv";

dotenv.config({
    path: `/config/${process.env.NODE_ENV}.env`
});

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3030;

const MONO_DB = process.env.MONGO_DB || 'Vehicle';
const MONGO_USER = process.env.MONGO_USER || 'admin';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'admin123!';

const JWT_KEY = process.env.JWT_KEY || '77f5ef30-b63b-4420-a1f2-b788b17b3491';

export {
    HOST,
    PORT,
    MONO_DB,
    MONGO_USER, 
    MONGO_PASSWORD,
    JWT_KEY
};