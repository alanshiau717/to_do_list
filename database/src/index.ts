import { connection } from "mongoose";
import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import {User} from "./entity/User";
import {UserRepository} from "./repositories/UserRepository"
createConnection().then(async connection => {

    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.email="testemail"
    // user.password="testpassword"
    // // user.isDeleted=false
    // user.activated=false
    // // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    // console.log("Here you can setup and run express/koa/any other framework.");
        
    const userRepo = new UserRepository()




    userRepo.create({
        firstName: "test",
        lastName: "test",
        password: "test",
        email: "test"
    }).then((res)=> {
        console.log(res)
    })
    



}).catch(error => console.log(error));


// const userRepo = createConnection().getRepository(User);





