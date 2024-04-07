import { User } from '../model/index';
import { ICreateUser, IGetUsers, IUpdateUser } from '../../interfaces/user';

class UserRepository {
    // create user
    async createUser(data: ICreateUser): Promise<IGetUsers> {
        try {
            const user = await User.create(data);
            return user.toObject() as IGetUsers;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('User creation failed');
        }
    }

    // update user
    async updateUser(data: IUpdateUser): Promise<IGetUsers> {
        try {
            const updateUser = await User.findByIdAndUpdate(data._id, data, { new: true });

            if (!updateUser) {
                throw new Error(`User with id ${data._id} not found`);
            }
            return updateUser.toObject() as IGetUsers;

        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('User updation failed');
        }
    }

    // delete User
    async deleteUser(id: string): Promise<any> {
        try {
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            return true;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('User deletion failed');
        }
    }

    // get User
    async getUserById(id: string): Promise<IGetUsers> {
        try {

            const user = await User.findById(id);
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            return user.toObject() as IGetUsers;
        } catch (error) {
            console.error('Error getting user:', error);
            throw new Error('User not found');
        }
    }

    // get user by email
    async getUserByEmail(email: string): Promise<any> {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return false;
            }
            return user.toObject() as IGetUsers;
        } catch (error) {
            console.error('Error getting user:', error);
            throw new Error('User not found');
        }
    }

    // fetch all user
    async getAllUsers(): Promise<IGetUsers[]> {
        try {
            let users = await User.find();
            return users.map((user) => user.toObject()) as IGetUsers[];
        } catch (error) {
            console.error('Error getting users:', error);
            throw new Error('Users not found');
        }
    }

    // Total count
    async GetUserCount(): Promise<any> {
        try {
            const userCount = await User.countDocuments();
            return { userCount };
        } catch (error) {
            console.error('Error getting userCount:', error);
            throw new Error('User count not found');
        }
    }
}

export default UserRepository;