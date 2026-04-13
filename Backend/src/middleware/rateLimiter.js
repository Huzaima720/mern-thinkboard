// import ratelimit from './../config/upstash.js';
// const rateLimiter = async (req , res , next) => {
//     try {
//         const {success} = await ratelimit.limit("my-limit-key")
//         if (!success){
//             return res.json({
//                 message : "Too many requests. Please Try again later"
//             })
//         }
//         next()
//     } catch (error) {
//         console.log("Rate limit Error", error);
//         next(error)
        
//     }
    
// }

// export default rateLimiter