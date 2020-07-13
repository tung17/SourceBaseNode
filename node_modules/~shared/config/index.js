require("dotenv").config();

const JWT_Config = {
    serectKey:process.env.serect_key,
    serectRefreshKey:Number(process.env.serect_key_refresh),
    tokenLife:Number(process.env.tokenLife),
    tokenRefreshLife:Number(process.env.token_refresh_life)
}

export {
    JWT_Config
}