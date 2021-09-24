/**
 * Server-side configuration-related variables
 * avoiding hardcoded
 * @env : environment variables between devlopment and production modes
 * @port : listening port for server
 * @jwtSecret : The secret key of JWT
 * @mongoUri : MongoDB location  
 */

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || '@key_default',
    mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST
        || 'mongodb://' + (process.env.IP || 'localhost') + ':'
        + (process.env.MONGO_PORT || '27107') + '/ecoShopping'
}


export default config