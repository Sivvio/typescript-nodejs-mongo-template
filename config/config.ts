export interface Config {
    jwtSecret: string;
    mongoUri: string;
}

const validateConfig = (): Config => {
    const config = {
        jwtSecret: process.env.JWT_KEY,
        mongoUri: process.env.MONGO_URI
    }

    if (!config.jwtSecret) {
        throw new Error('JWT_KEY must be defined');
    }

    if (!config.mongoUri) {
        throw new Error('MONGO_URI must be defined');
    }

    return config as Config;
}
export const initConfig = () => {
    global.appConfig = validateConfig();
}



