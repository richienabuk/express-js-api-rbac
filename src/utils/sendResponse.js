export const sendErrorResponse = (res, code, errorMessage, e = null) => res.status(code).send({
    status: 'error',
    error: errorMessage,
    e: e?.toString(),
});

export const sendSuccessResponse = (res, code, data, message = 'Successful') => res.status(code).send({
    status: 'success',
    data,
    message,
});
