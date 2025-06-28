const MESSAGES = {

resCode :{
    HTTP_OK : 200,
    HTTP_CREATE : 201,
    HTTP_NO_CONTENT : 204,
    HTTP_BAD_REQUEST : 400,
    HTTP_UNAUTHORIZED : 401,
    HTTP_FORBIDDEN: 403,
    HTTP_NOT_FOUND : 404,
    HTTP_METHOD_NOT_ALLOWED : 405,
    HTTP_CONFLICT : 409,
    HTTP_INTERNAL_SERVER_ERROR : 500,
    HTTP_SERVICE_UNAVAILABLE : 503,    
},

errorTypes :{
  INTERNAL_SERVER_ERROR : "Internal Server Error"
},

apiErrorStrings :{
SERVER_ERROR :"Oops! something went wrong", 
DATA_NOT_EXISTS : (data) =>`${data} does not exists`,
DATA_ALREADY_EXISTS: (data) =>`${data} already exists`,
DATA_IS_INCORRECT : (data) => `${data} is incorrect`,
DATA_IS_EXPIRED : (data) => `${data} is expired`,
UNAUTHORIZED : (data) => `${data} is unauthorized`,
EXPIRED : (data) =>`${data} is expired. Please login again`
},

apiSuccessStrings :{
    CREATE: (value) => `${value} created successfully`,
    UPDATE: (value) => `${value} updated successfully`,
    DELETE: (value) => `${value} deleted successfully`,
    LOGIN: (value) => `${value} login successfully`,
    SEND : (value) => `${value} sent successfully`,
    VERIFIED : (value) => `${value} verified successfully`
}

}

module.exports = MESSAGES ;