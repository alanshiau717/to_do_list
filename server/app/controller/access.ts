import db from "../models/index";
import { Request, Response } from "express";
const User = db.user;
const UserSession = db.usersession;

//TO-Do Figure what to send for errors

exports.signup = (req: Request, res: Response) => {
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
  User.find({ email: lower_email }, (err: Error, previousUsers: any) => {
    if (err) {
      res.status(400).send({ message: "Error: Internal Server Error" });
      return res.end();
    } else if (previousUsers.length > 0) {
      res.status(400).send({ message: "Error: Email Exists" });
      return res.end();
    }

    const newUser = new User();

    newUser.email = lower_email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = newUser.generateHash(password);
    newUser.save((err: Error, user: any) => {
      if (err) {
        res.status(400).send({ message: "Error: Internval Server Error" });
      }
      res.status(200).send(user);
    });
  });
};

exports.signin = (req: Request, res: Response) => {
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
    userSession.userId = user._id;
    userSession.save((err: Error, doc: any) => {
      if (err) {
        return res.status(401).send({
          message: err,
        });
      }
      return res.status(200).send(doc);
    });
  });
};

exports.verify = (req: Request, res: Response) => {
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
};

exports.logout = (req: Request, res: Response) => {
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
};
