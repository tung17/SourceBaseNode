import {generateToken,verifyToken} from '~shared/helper/jwt';
import { JWT_Config } from "~shared/config";
import { ErrorHandler } from "~shared/helper/error";

const generateAccessToken = async (req, res, next) => {
try{
    const accessToken = generateToken(req.user,JWT_Config.serectKey,JWT_Config.tokenLife);

    const refreshToken = generateToken(req.user,JWT_Config.serectRefreshKey,JWT_Config.tokenRefreshLife);
  
    req.body = {
      accessToken,
      refreshToken,
    };
    next();
}
catch(err){
    let errCustom =  new ErrorHandler(500,err.name)
    next(errCustom)
}
};

const authentication = async (req, res, next) => {
  try {
    let decode = await jwt.verify(req.authorization, JWT_Config.serectKey);
    console.log('decode',decode);
    req.user = {
        id = decode.userId
    }
    req.isRefresh = false;
    next()
  } catch (err) {
    let errCustom =  new ErrorHandler(500,err.name)
    next(errCustom)
  }
};

const refreshToken = (req, res, next) => {
    try{
        const refreshTokenFromClient = req.body.refreshToken;
        const decode = await jwt.verify(refreshTokenFromClient,JWT_Config.serectRefreshKey);

        //tao ms access va refresh
        const accessToken = generateToken(req.user,JWT_Config.serectKey,JWT_Config.tokenLife);

        const refreshToken = generateToken(req.user,JWT_Config.serectRefreshKey,JWT_Config.tokenRefreshLife);
        req.body = {
            accessToken,
            refreshToken
        }
        next()
    }
    catch(err){
        let errCustom =  new ErrorHandler(500,err.name)
        next(errCustom)
    }
};

export const middleware = {
  generateAccessToken,
  authentication,
  refreshToken,
};
