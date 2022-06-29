export const configuration = () => {
    return {
        db: {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        },
        jwt: {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRE
        },
        mail: {
            login: process.env.EMAIL_USER,
            password: process.env.EMAIL_PASS
        }
    }
}