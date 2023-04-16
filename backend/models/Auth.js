import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true}
})

// module.exports = mongoose.model("Auth", registerSchema);
export default mongoose.model("Auth",registerSchema);
