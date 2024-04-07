import mongoose, { Document, Schema, Model } from 'mongoose';

interface IMark extends Document {
    userId: mongoose.Types.ObjectId;
    MarksA: number;
    MarksB: number;
    MarksC: number;
    MarksD: number;
    MarksE: number;

}

const Markchema: Schema<IMark> = new Schema<IMark>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        MarksA: {
            type: Number,
        },
        MarksB: {
            type: Number,
        },
        MarksC: {
            type: Number,
        },
        MarksD: {
            type: Number,
        },
        MarksE: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

const Mark: Model<IMark> = mongoose.model<IMark>('Mark', Markchema);

export default Mark;
