import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { FormatError } from '../utils/parser';

class MarkMiddleware {
    // create Mark middleware
    async createMark(req: Request, res: Response, next: NextFunction) {
        try {
            // check if these fields are present in req.body
            const { email, MarksA, MarksB, MarksC, MarksD, MarksE } = req.body;

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
                MarksA, MarksB, MarksC, MarksD, MarksE,
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // update Mark middleware
    async updateMark(req: Request, res: Response, next: NextFunction) {
        try {
            // check if these fields are present in req.body
            const { _id, MarksA, MarksB, MarksC, MarksD, MarksE } = req.body;

            if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
                throw new Error('id is required & must be a valid ObjectId');
            }

            req.body = {
                _id,
                MarksA, MarksB, MarksC, MarksD, MarksE,
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // delete Mark middleware
    async deleteMark(req: Request, res: Response, next: NextFunction) {
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

    // get Mark by id middleware
    async getMarkById(req: Request, res: Response, next: NextFunction) {
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

    // get Mark by email middleware
    async getMarkByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            // check if these fields are present in req.body
            const { email } = req.query;

            if (!email) {
                throw new Error('email is required');
            }

            // check email using regex
            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(email as string)) {
                throw new Error('email is invalid');
            }

            req.body = {
                email: (email as string).toLowerCase(),
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }
}

export default MarkMiddleware;
