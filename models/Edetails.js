import mongoose from "mongoose";
import { type } from "os";

const EdetailsSchema = new mongoose.Schema({
    Emp_id: Number, 
    Employee_name:String,
    Join_Date: Date,  
    Salary: Number,
    language: String,
    city: String,
    isManger: Boolean
})
export const Edetails = mongoose.model('Edetails',EdetailsSchema)

