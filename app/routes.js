const {Router}  = require("express");
const router = Router();
const apiRouter = require("./controllers/v1/routes")

router.use("/v1",apiRouter);


module.exports = router;