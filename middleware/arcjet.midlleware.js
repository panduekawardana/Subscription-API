import aj from "../config/arcjet.js"

const arrcjetMiddleware = async(req, res, next) => {
   try {
      const decision = await aj.protect(req, {requested: 1});
      if (decision.isDenied()) {
         if(decision.reason.isRateLimit()) return res.status(429).json({
            error: "Rate limit exceeded",
         })
         return res.status(403).json({
            error: "Access denied"
         })
      }
      next();
   } catch(error){
      console.log(`Arcjet Middleware Error: ${err}`);
      next(error);
   }
}

export default arrcjetMiddleware;