import { Mark } from '../model/index';
import { ICreateMark, IGetMarks, IUpdateMark } from '../../interfaces/marks';

class MarkRepository {
    // create Mark
    async createMark(data: ICreateMark): Promise<IGetMarks> {
        try {
            const mark = await Mark.create(data);
            return mark.toObject() as IGetMarks;
        } catch (error) {
            console.error('Error creating Mark:', error);
            throw new Error('Mark creation failed');
        }
    }

    // update Mark
    async updateMark(data: IUpdateMark): Promise<IGetMarks> {
        try {
            const updateMark = await Mark.findByIdAndUpdate(data._id, data, { new: true });

            if (!updateMark) {
                throw new Error(`Mark with id ${data._id} not found`);
            }
            return updateMark.toObject() as IGetMarks;

        } catch (error) {
            console.error('Error updating Mark:', error);
            throw new Error('Mark updation failed');
        }
    }

    // delete Mark
    async deleteMark(id: string): Promise<any> {
        try {
            const mark = await Mark.findByIdAndDelete(id);
            if (!mark) {
                throw new Error(`Mark with id ${id} not found`);
            }
            return true;
        } catch (error) {
            console.error('Error deleting Mark:', error);
            throw new Error('Mark deletion failed');
        }
    }

    // get Mark
    async getMarkById(id: string): Promise<IGetMarks> {
        try {

            const mark = await Mark.findById(id).populate('userId');
            if (!mark) {
                throw new Error(`Mark with id ${id} not found`);
            }
            return mark.toObject() as IGetMarks;
        } catch (error) {
            console.error('Error getting Mark:', error);
            throw new Error('Mark not found');
        }
    }

    // get Mark by userId
    async getMarkByUserId(userId: string): Promise<IGetMarks> {
        try {
            const mark = await Mark.findOne({ userId }).populate('userId');
            if (!mark) {
                throw new Error(`Mark with userId ${userId} not found`);
            }
            return mark.toObject() as IGetMarks;
        } catch (error) {
            console.error('Error getting Mark:', error);
            throw new Error('Mark not found');
        }
    }

    // fetch all Mark
    async getAllMarks(): Promise<IGetMarks[]> {
        try {
            let marks = await Mark.find().populate('userId');
            return marks.map((mark) => mark.toObject()) as IGetMarks[];
        } catch (error) {
            console.error('Error getting Marks:', error);
            throw new Error('Marks not found');
        }
    }

    // Total count
    async GetMarkCount(): Promise<any> {
        try {
            const markCount = await Mark.countDocuments();
            return { markCount };
        } catch (error) {
            console.error('Error getting MarkCount:', error);
            throw new Error('Mark count not found');
        }
    }
}

export default MarkRepository;