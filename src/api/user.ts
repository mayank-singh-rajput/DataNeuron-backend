import { Express, Request, Response, NextFunction } from 'express';
import {UserService} from '../service';
import {UserMiddleware} from '../middlewares';

export default (app: Express) => {
    const userService = new UserService();
    const userMiddleware = new UserMiddleware();

    // create user
    app.post('/user', userMiddleware.createUser, userService.createUser);

    //update user
    app.put('/user', userMiddleware.updateUser, userService.updateUser);

    //delete user
    app.delete('/user', userMiddleware.deleteUser, userService.deleteUser);

    // get user by email
    app.get('/user', userMiddleware.getUserByEmail, userService.getUserByEmail);

    // get all users
    app.get('/user/all', userService.getAllUsers);

    // Total count
    app.get('/user/count', userService.GetUserCount);

    // get user by id
    app.get('/user/:id', userMiddleware.getUserById, userService.getUserById);
}
