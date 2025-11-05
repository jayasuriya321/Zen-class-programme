import mongoose from "mongoose";

const companyDriveSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  drive_date: { type: Date, required: true },
  students_appeared: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("CompanyDrive", companyDriveSchema);
