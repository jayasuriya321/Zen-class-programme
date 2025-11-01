import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import User from "./models/User.js";
import Mentor from "./models/Mentor.js";
import Codekata from "./models/Codekata.js";
import Attendance from "./models/Attendance.js";
import Topic from "./models/Topic.js";
import Task from "./models/Task.js";
import CompanyDrive from "./models/CompanyDrive.js";

dotenv.config();
await connectDB();

const seedData = async () => {
  try {
    // Clear old data
    await Promise.all([
      User.deleteMany(),
      Mentor.deleteMany(),
      Codekata.deleteMany(),
      Attendance.deleteMany(),
      Topic.deleteMany(),
      Task.deleteMany(),
      CompanyDrive.deleteMany(),
    ]);

    // ----------------------------
    // Mentors
    // ----------------------------
    const mentors = await Mentor.insertMany([
      { mentor_name: "Sundar", mentee_ids: [] },
      { mentor_name: "Priya", mentee_ids: [] },
    ]);

    // ----------------------------
    // Users
    // ----------------------------
    const users = await User.insertMany([
      { name: "John", email: "john@gmail.com", mentor_id: mentors[0]._id, codekata_solved: 120 },
      { name: "Asha", email: "asha@gmail.com", mentor_id: mentors[1]._id, codekata_solved: 80 },
      { name: "Ravi", email: "ravi@gmail.com", mentor_id: mentors[0]._id, codekata_solved: 95 },
    ]);

    // Assign mentees
    await Mentor.updateOne({ _id: mentors[0]._id }, { $set: { mentee_ids: [users[0]._id, users[2]._id] } });
    await Mentor.updateOne({ _id: mentors[1]._id }, { $set: { mentee_ids: [users[1]._id] } });

    // ----------------------------
    // Codekata
    // ----------------------------
    await Codekata.insertMany([
      { user_id: users[0]._id, total_problems_solved: 120 },
      { user_id: users[1]._id, total_problems_solved: 80 },
      { user_id: users[2]._id, total_problems_solved: 95 },
    ]);

    // ----------------------------
    // Topics
    // ----------------------------
    const topics = await Topic.insertMany([
      { topic_name: "HTML Basics", topic_date: new Date("2020-10-10") },
      { topic_name: "CSS Layouts", topic_date: new Date("2020-10-15") },
      { topic_name: "JavaScript Functions", topic_date: new Date("2020-10-25") },
      { topic_name: "React Components", topic_date: new Date("2020-11-05") },
    ]);

    // ----------------------------
    // Tasks
    // ----------------------------
    await Task.insertMany([
      {
        topic_id: topics[0]._id,
        task_name: "HTML page structure",
        due_date: new Date("2020-10-12"),
        submitted: true,
        user_id: users[0]._id,
      },
      {
        topic_id: topics[2]._id,
        task_name: "JS array methods",
        due_date: new Date("2020-10-26"),
        submitted: false,
        user_id: users[1]._id,
      },
      {
        topic_id: topics[2]._id,
        task_name: "JS array methods",
        due_date: new Date("2020-10-26"),
        submitted: false,
        user_id: users[2]._id,
      },
    ]);

    // ----------------------------
    // Attendance
    // ----------------------------
    await Attendance.insertMany([
      { user_id: users[0]._id, date: new Date("2020-10-16"), status: "Present" },
      { user_id: users[1]._id, date: new Date("2020-10-17"), status: "Absent" },
      { user_id: users[2]._id, date: new Date("2020-10-20"), status: "Absent" },
    ]);

    // ----------------------------
    // Company Drives
    // ----------------------------
    await CompanyDrive.insertMany([
      {
        company_name: "Google",
        drive_date: new Date("2020-10-20"),
        students_appeared: [users[0]._id, users[2]._id],
      },
      {
        company_name: "Amazon",
        drive_date: new Date("2020-10-28"),
        students_appeared: [users[1]._id],
      },
      {
        company_name: "Netflix",
        drive_date: new Date("2020-11-05"),
        students_appeared: [],
      },
    ]);

    console.log("✅ Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
