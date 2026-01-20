const ratelimit = require("../config/upstash")

const ratelimiter = async(req,res,next)=>{
      try {
        const {success} = await ratelimit.limit("my-limit-key")

        if(!success){
            return res.status(429).json({
                message:"too many requests"
            })
        }
        next()
      } catch (error) {
        console.log("ratelimiting error", error)        
      }
}

module.exports = ratelimiter