import mongoose from "mongoose";

const companyDriveSchema = new mongoose.Schema({
  company_name: String,
  drive_date: Date,
  students_appeared: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("CompanyDrive", companyDriveSchema);
