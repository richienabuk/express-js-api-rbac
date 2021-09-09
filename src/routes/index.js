import authRouter from "./authRouter";
import express from "express";
import { sendErrorResponse } from "../utils/sendResponse";
import adminRouter from "./adminRouter";

export default (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1', adminRouter);

    app.all('*', (req, res) => sendErrorResponse(res, 404, 'Route does not exist'));
};
