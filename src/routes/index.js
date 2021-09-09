import authRouter from "./authRouter";
import express from "express";

export default (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/api/v1/auth', authRouter);

// Create a catch-all route for testing the installation.
    app.all('*', (req, res) => res.status(200).send({
        message: 'Hello World!',
    }));
};
