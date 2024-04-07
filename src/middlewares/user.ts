import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { FormatError } from '../utils/parser';

class UserMiddleware {
    // create user middleware
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            // check if these fields are present in req.body
            const { userName, email, age } = req.body;

            if (!userName) {
                throw new Error('userName is required');
            }

            if (!email) {
                throw new Error('email is required');
            }

            // check email using regex
            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(email)) {
                throw new Error('email is invalid');
            }

            req.body = {
                userName,
                email: email.toLowerCase(),
                age,
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // update user middleware
    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            // check if these fields are present in req.body
            const { _id, userName, email, age } = req.body;

            if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
                throw new Error('id is required & must be a valid ObjectId');
            }

            if(email) {
                // check email using regex
                const emailRegex = /\S+@\S+\.\S+/;
                if (!emailRegex.test(email)) {
                    throw new Error('email is invalid');
                }
            }

            req.body = {
                _id,
                userName,
                email: email.toLowerCase(),
                age,
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // delete user middleware
    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            // check if these fields are present in req.body
            const { email } = req.body;
            if (!email) {
                throw new Error('email is required');
            }

            // check email using regex
            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(email)) {
                throw new Error('email is invalid');
            }

            req.body = {
                email: email.toLowerCase(),
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // get all the user data for every repository by user id
    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            // check if these fields are present in req.body
            const { id } = req.params;
            if (!id) {
                throw new Error('id is required');
            }

            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('id must be a valid ObjectId');
            }

            req.body = {
                id
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // get user by email middleware
    async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            // check if these fields are present in req.body
            const { email } = req.body;
            if (!email) {
                throw new Error('email is required');
            }

            // check email using regex
            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(email)) {
                throw new Error('email is invalid');
            }

            req.body = {
                email: email.toLowerCase(),
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }
}

export default UserMiddleware;
