import express, { Express } from "express";
import cors from "cors";
import HandleErrors from "./utils/error_handler";
import { Mark, User } from "./api";

export const configureExpress = async (app: Express) => {

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(cors({
    origin: "*",
    credentials: true,
  }));

  // API
  User(app);
  Mark(app);
  

  // Error Handler
  app.use(HandleErrors);
};

export default configureExpress;
