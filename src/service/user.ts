import { Request, Response } from 'express';
import { UserRepository } from "../database/repository";
import { ICreateUser } from '../interfaces/user';
import { FormatData, FormatError } from "../utils/parser";

const userRepository = new UserRepository();

class UserService {
    // create user
    async createUser(req: Request, res: Response) {
        try {
            const { userName, email, age } = req.body;

            let result;

            // Check if email already exists
            const emailExist = await userRepository.getUserByEmail(email);
            if (emailExist) {
                result = emailExist;
            } else {
                // Create user
                const data: ICreateUser = {
                    userName,
                    email,
                    age
                }
    
                result = await userRepository.createUser(data);
            }

            if (!result) {
                return res.status(500).json({ error: "User not created" });
            }

            const response_data = FormatData(result);
            return res.status(200).json(response_data);

        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // update user
    async updateUser(req: Request, res: Response) {
        try {
            const { ...data } = req.body;

            // Update user
            const result = await userRepository.updateUser(data);
            if (!result) {
                return res.status(500).json({ error: "User not updated" });
            }

            const response_data = FormatData(result);
            return res.status(200).json(response_data);

        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // delete user
    async deleteUser(req: Request, res: Response) {
        try {
            const { email } = req.body;

            // Check if email already exists
            const emailExist = await userRepository.getUserByEmail(email);
            if (!emailExist) {
                return res.status(400).json({ error: "email not exists" });
            }

            // Delete user
            const result = await userRepository.deleteUser(emailExist._id);
            if (!result) {
                return res.status(500).json({ error: "User not deleted" });
            }

            const response_data = FormatData(result);
            return res.status(200).json(response_data);

        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // get all users
    async getAllUsers(req: Request, res: Response) {
        try {        
            // Get users
            const result = await userRepository.getAllUsers();

            if (!result) {
                return res.status(500).json({ error: "Users not found" });
            }

            const response_data = FormatData(result);
            return res.status(200).json(response_data);

        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // get user by id
    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.body;

            // Get user
            const user = await userRepository.getUserById(id);
            if (!user) {
                return res.status(500).json({ error: "User not found" });
            }

            const response_data = FormatData(user);
            return res.status(200).json(response_data);

        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // get user by email
    async getUserByEmail(req: Request, res: Response) {
        try {
            const { email } = req.body;

            // Get user
            const user = await userRepository.getUserByEmail(email);
            if (!user) {
                return res.status(500).json({ error: "User not found" });
            }

            const response_data = FormatData(user);
            return res.status(200).json(response_data);

        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // Total count
    async GetUserCount(req: Request, res: Response) {
        try {
            const userCount = await userRepository.GetUserCount();
            if (!userCount) {
                return res.status(500).json({ error: "User count not found" });
            }

            const response_data = FormatData(userCount);
            return res.status(200).json(response_data);

        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }
}

export default UserService;
