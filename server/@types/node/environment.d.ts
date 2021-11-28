declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_URL: BigInteger
            DB_USER: string
            DB_PWD: string
            DB_NAME: string
            AUTH_KEY: string
            NODE_ENV: 'development' | 'production';
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }