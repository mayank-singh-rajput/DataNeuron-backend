import { Express, Request, Response, NextFunction } from 'express';
import {MarkService} from '../service';
import {MarkMiddleware} from '../middlewares';

export default (app: Express) => {
    const markService = new MarkService();
    const markMiddleware = new MarkMiddleware();

    // create mark
    app.post('/marks', markMiddleware.createMark, markService.createMark);

    //update mark
    app.put('/marks', markMiddleware.updateMark, markService.updateMark);

    //delete mark
    app.delete('/marks', markMiddleware.deleteMark, markService.deleteMark);

    // get mark by email
    app.get('/marks', markMiddleware.getMarkByEmail, markService.getMarkByEmail);

    // get all marks
    app.get('/marks/all', markService.getAllMarks);

    // Total count
    app.get('/marks/count', markService.GetMarkCount);

    // get mark by id
    app.get('/marks/:id', markMiddleware.getMarkById, markService.getMarkById);
}
