import express, { Response as ExResponse, Request as ExRequest } from "express";
import methodOverride from "method-override";
import { ValidateError } from "tsoa";
// import { environment } from "../node/environment";
import { log } from "./utils/log";
import { RegisterRoutes } from "./routes";
import { HttpStatusCode } from "./common/http-status-code";
import { OperationError } from "./common/operation-error";
import swaggerUi from "swagger-ui-express";
import { InternalServerError } from "./common/internal-server-error";
import { AuthError } from "./common/auth-error";
// import {ObjectType, Field, ID} from "type-graphql"
// import { Entity } from "typeorm";

interface IError {
  status?: number;
  fields?: string[];
  message?: string;
  name?: string;
}

export const registerRoutes = (app: express.Express) => {
  app
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    
    .use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
      return res.send(
        swaggerUi.generateHTML(await import("./swagger.json"))
      );
    })
    .use(methodOverride())
    .use((_req, res, next) => {
      // res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        `Origin, X-Requested-With, Content-Type, Accept, Authorization`
      );
      next();
    });

  RegisterRoutes(app);

  const getErrorBody = (err: unknown) => {
    if (err instanceof ValidateError) {
      return {
        message: err.message,
        status: HttpStatusCode.BAD_REQUEST,
        fields: err.fields,
        name: err.name,
      };
    } else if (err instanceof OperationError) {
      return {
        message: err.message,
        status: err.status,
      };
    } 
    else if (err instanceof InternalServerError) {
      return {
        message: err.message,
        status: err.status,
      }
    }
    else if (err instanceof AuthError) {
      return {
        message: err.message,
        status: err.status
      }
    }
    
    else {
      return {
        message: "UNKNOWN_ERROR",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  };

  app.use(
    (
      err: IError,
      _req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (process.env.NODE_ENV === "dev") {
        log.error(err);
      }

      const body = getErrorBody(err);
      res.status(body.status).json(body);
      next();
    }
  );
};
