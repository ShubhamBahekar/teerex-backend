const MESSAGES  = require("../helpers/messages");

const handleAsync = (fn) => async(req, res, next) =>{
try{
  await fn(req, res, next);
}catch(err){
  console.error(err);
  res.status(500).send({error: MESSAGES.errorTypes.INTERNAL_SERVER_ERROR})
}
}

module.exports = handleAsync;