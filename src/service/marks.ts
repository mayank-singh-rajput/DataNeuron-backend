import { Request, Response } from 'express';
import { MarkRepository, UserRepository } from "../database/repository";
import { ICreateMark, IUpdateMark } from '../interfaces/marks';
import { FormatData, FormatError } from "../utils/parser";

const markRepository = new MarkRepository();
const userRepository = new UserRepository();

class MarkService {
    // create Mark
    async createMark(req: Request, res: Response) {
        try {
            const { email, MarksA, MarksB, MarksC, MarksD, MarksE } = req.body;

            // Check if email already exists
            const emailExist = await userRepository.getUserByEmail(email);
            if (!emailExist) {
                return res.status(400).json({ error: "email not exists" });
            }

            let result;
            const existingMarks = await markRepository.getMarkByUserId(emailExist._id);
            if(existingMarks) {
                // Create Mark
                const data: IUpdateMark = {
                    _id: existingMarks?._id,
                    MarksA,
                    MarksB,
                    MarksC,
                    MarksD,
                    MarksE
                }

                // Update Mark
                result = await markRepository.updateMark(data);
                if (!result) {
                    return res.status(500).json({ error: "Mark not updated" });
                }
            }
            else {
                // Create Mark
                const data: ICreateMark = {
                    userId: emailExist?._id,
                    MarksA,
                    MarksB,
                    MarksC,
                    MarksD,
                    MarksE
                }
    
                result = await markRepository.createMark(data);
                if (!result) {
                    return res.status(500).json({ error: "Mark not created" });
                }
            }

            const response_data = FormatData(result);
            return res.status(200).json(response_data);

        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // update Mark
    async updateMark(req: Request, res: Response) {
        try {
            const { ...data } = req.body;

            // Update Mark
            const result = await markRepository.updateMark(data);
            if (!result) {
                return res.status(500).json({ error: "Mark not updated" });
            }

            const response_data = FormatData(result);
            return res.status(200).json(response_data);

        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // delete Mark
    async deleteMark(req: Request, res: Response) {
        try {
            const { email } = req.body;

            // Check if email already exists
            const emailExist = await userRepository.getUserByEmail(email);
            if (!emailExist) {
                return res.status(400).json({ error: "email not exists" });
            }

            // Check if email already exists
            const marksExist = await markRepository.getMarkByUserId(emailExist._id);
            if (!marksExist) {
                return res.status(400).json({ error: "Marks not exists" });
            }

            // Delete Mark
            const result = await markRepository.deleteMark(marksExist._id);
            if (!result) {
                return res.status(500).json({ error: "Mark not deleted" });
            }

            const response_data = FormatData(result);
            return res.status(200).json(response_data);
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // get all Marks
    async getAllMarks(req: Request, res: Response) {
        try {        
            // Get Marks
            const result = await markRepository.getAllMarks();
            if (!result) {
                return res.status(500).json({ error: "Marks not found" });
            }

            const response_data = FormatData(result);
            return res.status(200).json(response_data);

        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // get Mark by id
    async getMarkById(req: Request, res: Response) {
        try {
            const { id } = req.body;

            // Get Mark
            const result = await markRepository.getMarkById(id);
            if (!result) {
                return res.status(500).json({ error: "Mark not found" });
            }

            const response_data = FormatData(result);
            return res.status(200).json(response_data);

        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // get Mark by email
    async getMarkByEmail(req: Request, res: Response) {
        try {
            const { email } = req.body;            

            // Check if email already exists
            const emailExist = await userRepository.getUserByEmail(email);
            if (!emailExist) {
                return res.status(400).json({ error: "email not exists" });
            }

            // Check if email already exists
            const result = await markRepository.getMarkByUserId(emailExist._id);
            if (!result) {
                return res.status(400).json({ error: "Marks not exists" });
            }

            const response_data = FormatData(result);
            return res.status(200).json(response_data);

        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // Total count
    async GetMarkCount(req: Request, res: Response) {
        try {
            const MarkCount = await markRepository.GetMarkCount();
            if (!MarkCount) {
                return res.status(500).json({ error: "Mark count not found" });
            }

            const response_data = FormatData(MarkCount);
            return res.status(200).json(response_data);

        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }
}

export default MarkService;
