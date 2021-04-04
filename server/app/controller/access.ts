import { Request, Response } from "express";
import User from "../models/User";
import UserSession from "../models/UserSession";
import jwt from "jsonwebtoken";
import config from "../config/auth.config";
import { ListModel as List } from "../models/lists";
import { FolderModel as Folder } from "../models/folders";

const access = {
  signup: (req: Request, res: Response) => {
    const { body } = req;
    const { firstName, lastName, email, password } = body;
    if (!firstName) {
      res.status(400).send({ message: "Error: FirstName cannot be blank" });
      return res.end();
    }
    if (!lastName) {
      res.status(400).send({ message: "Error: LastName cannot be blank" });
      return res.end();
    }
    if (!email) {
      res.status(400).send({ message: "Error: Email cannot be blank" });
      return res.end();
    }
    if (!password) {
      res.status(400).send({ message: "Error: Password cannot be blank" });
      return res.end();
    }

    const lower_email = email.toLowerCase();
    User.find({ email: lower_email }, (err, previousUsers) => {
      if (err) {
        res.status(400).send({ message: "Error: Internal Server Error" });
        return res.end();
      } else if (previousUsers.length > 0) {
        res.status(400).send({ message: "Error: Email Exists" });
        return res.end();
      }
      //creating new user
      const newUser = new User();
      newUser.email = lower_email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, output) => {
        if (err) {
          res.status(400).send(err);
        }
        // creating newUser
        const newFolder = new Folder();
        newFolder.name = "default";
        newFolder.order = 1;
        newFolder.user = newUser._id;
        newFolder.lists = [];
        newFolder.save((err, output) => {
          if (err) {
            res.status(400).send(err);
          }
          const newList = new List();
          newList.name = "Inbox";
          newList.user = newUser._id;
          newList.order = 1;
          newList.folder = newFolder._id;
          newFolder.lists.push(newList._id);
          newFolder.save((err, output) => {
            if (err) {
              console.log(err);
            }
          });
          newList.save((err, output) => {
            if (err) {
              console.log(err);
              res.status(400).send(err);
            }
          });
        });
        res.status(200).send(output);
      });
    });
  },
  signin: (req: Request, res: Response) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;
    email = email.toLowerCase();

    if (!email) {
      res.status(401).send({ message: "Error: Email cannot be blank" });
      return res.end();
    }
    if (!password) {
      res.status(401).send({ message: "Error: Password cannot be blank" });
      return res.end();
    }

    User.find({ email: email }, (err: Error, users: any) => {
      if (err) {
        return res.status(401).send({ message: "Error: Email not found" });
      }
      if (users.length != 1) {
        return res.status(401).send({
          message: "Invalid Email",
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.status(401).send({
          message: "Invalid Password",
        });
      }

      const userSession = new UserSession();
      if (config.secret != undefined) {
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400,
        });
        userSession.userId = user._id;
        userSession.save((err, output) => {
          if (err) {
            return res.status(401).send({
              message: err,
            });
          }
          return res.status(200).send({ accessToken: token });
        });
      } else {
        res.status(500).send({
          message: "Internal Server Error",
        });
      }
    });
  },
  verify: (req: Request, res: Response) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token = test
    // Verify the token is one of a kind and not deleted
    UserSession.find(
      {
        _id: token,
        isDeleted: false,
      },
      (err: Error, sessions: any) => {
        if (err) {
          return res.status(400).send({
            success: false,
            message: "Error: Server error",
          });
        }
        if (sessions.length != 1) {
          return res.status(400).send({
            success: false,
            message: "Error: No Sessions Found",
          });
        } else {
          return res.status(200).send({
            success: true,
            message: "Good",
          });
        }
      }
    );
  },
  logout: (req: Request, res: Response) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token = test
    // Verify the token is one of a kind and not deleted
    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false,
      },
      { $set: { isDeleted: true } },
      null,
      (err: Error, data: any) => {
        if (err) {
          return res.status(400).send({
            success: false,
            message: "Error: Server error",
          });
        } else {
          return res.status(200).send({
            success: true,
            message: "Good",
          });
        }
      }
    );
  },
};

export default access;
