import authModel from '../models/Auth.js';

export const createNewUser = async (user) => {
    const existingDoc = await authModel.findOne({ email: user.email });
    // User already has an account
    if (existingDoc) { 
        existingDoc.isAccountExisting = true;
        return existingDoc;
    }
    return await authModel.create(user);
}

export const findUserByEmail = async (email) => {
    const existingDoc = await authModel.findOne({ email: email });
    if (existingDoc) {
        return existingDoc 
    }
    return null; // Return null if there's no user found that is registered
}

export const findUserById = async (id) => {
    const existingDoc = await authModel.findOne({_id: id})
    if (existingDoc) {
        return existingDoc
    }
    return null;
}
