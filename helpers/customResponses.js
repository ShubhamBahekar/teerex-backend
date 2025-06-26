const CustomResponses = {
  success(result, statusCode = 200) {
    return this.status(statusCode).json({
      success: true,
      result,
    });
  },


 badRequest(msg) {
    return this.status(400).json({
      success: false,
      error: msg,
    });
  },


  unauthorized(msg) {
    return this.status(401).json({
      success: false,
      error: msg || 'unauthorized',
    });
  },

 


  notFound(msg) {
    return this.status(404).json({
      success: false,
      error: msg || 'not_found',
    });
  },


  validatorsError(customError) {
    return this.status(405).json({
      success: false,
      errors: customError || 'validation error',
    });
  },
  validationError(error) {
    if (!error || !error.errors) {
      return this.serverError();
    }

    let errorResponse = {};
    const typeFields = extractValidationType(error.errors);
    if (typeFields.length > 0) {
      errorResponse = typeFields;
    }

    return this.unprocessableEntity(errorResponse);
  },

  conflict(msg){
    return this.status(409).json({success: false, error : msg
    });
  },

  blocked() {
    return this.status(410).json({
      success: false,
      error: 'version_blocked',
    });
  },


 preconditionFailed(customError) {
    return this.status(412).json({
      success: false,
      error: customError || 'precondition_failed',
    });
  },

  unprocessableEntity(customError) {
    return this.status(422).json({
      success: false,
      payload: 'unprocessable_entity',
      error: customError,
    });
  },


 

  noContent(msg) {
    return this.status(204).json({
      success: false,
      error: msg,
    });
  },

  serverError(msg) {
    return this.status(503).json({
      success: false,
      error: msg || 'Internal Server Error',
    });
  },
};

module.exports = (req, res, next) => {
  Object.assign(res, CustomResponses);
  next();
};

function extractValidationType(errors) {
  const fields = Object.keys(errors);
  return fields
    .map(key => errors[key])
    .map(validation => ({
      errorOnField: validation.path,
      message: validation.message,
    }));
}