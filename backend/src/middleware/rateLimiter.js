import ratelimit from "../config/upstash.js";

const rateLimiter = async (req,res,next) => {
    try {
        // replace "my-limit-key" with userID for rate limit per user and not the entire app 
        const {success} = await ratelimit.limit("my-limit-key")

        if(!success){
            return res.status(429).json({
                message: "Too many requests, please try again later"
            })
        }
        next();
    } catch (error) {
        console.log("Rate limit error",error)
        next(error);
    }
}

export default rateLimiter;