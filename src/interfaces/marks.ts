export interface ICreateMark {
    userId: string;
    MarksA?: number;
    MarksB?: number;
    MarksC?: number;
    MarksD?: number;
    MarksE?: number;
}

export interface IGetMarks {
    _id: string;
    userId: string;
    MarksA: number;
    MarksB: number;
    MarksC: number;
    MarksD: number;
    MarksE: number;
}

export interface IUpdateMark {
    _id: string;
    userId?: string;
    MarksA?: number;
    MarksB?: number;
    MarksC?: number;
    MarksD?: number;
    MarksE?: number;
}