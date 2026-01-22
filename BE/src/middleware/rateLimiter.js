const ratelimit = require("../config/upstash");

const rateLimiter = async (req, res, next) => {
  try {
    const identifier =
      req.ip || req.headers["x-forwarded-for"] || "anonymous";

    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests. Please slow down.",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limiting error:", error);

    // Fail open (do NOT block app if limiter fails)
    next();
  }
};

module.exports = rateLimiter;
