import Topic from "../models/Topic.js";
import Task from "../models/Task.js";
import CompanyDrive from "../models/CompanyDrive.js";
import User from "../models/User.js";
import Codekata from "../models/Codekata.js";
import Mentor from "../models/Mentor.js";
import Attendance from "../models/Attendance.js";

// 1️⃣ Topics and Tasks in October
export const getOctoberTopicsAndTasks = async (req, res) => {
  try {
    const data = await Topic.aggregate([
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "topic_id",
          as: "related_tasks",
        },
      },
      {
        $match: {
          topic_date: {
            $gte: new Date("2020-10-01"),
            $lte: new Date("2020-10-31"),
          },
        },
      },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2️⃣ Company drives between 15–31 Oct 2020
export const getOctoberCompanyDrives = async (req, res) => {
  try {
    const drives = await CompanyDrive.find({
      drive_date: { $gte: new Date("2020-10-15"), $lte: new Date("2020-10-31") },
    });
    res.json(drives);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3️⃣ Company drives with students appeared
export const getCompanyDrivesWithStudents = async (req, res) => {
  try {
    const data = await CompanyDrive.find()
      .populate("students_appeared", "name email");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4️⃣ Problems solved by each user
export const getCodekataStats = async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $lookup: {
          from: "codekatas",
          localField: "_id",
          foreignField: "user_id",
          as: "codekata_data",
        },
      },
      {
        $project: {
          name: 1,
          total_problems_solved: { $sum: "$codekata_data.total_problems_solved" },
        },
      },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 5️⃣ Mentors with more than 15 mentees
export const getMentorsWithMoreThan15 = async (req, res) => {
  try {
    const mentors = await Mentor.find({
      $expr: { $gt: [{ $size: "$mentee_ids" }, 15] },
    });
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 6️⃣ Users absent & task not submitted between 15–31 Oct
export const getAbsentAndNotSubmitted = async (req, res) => {
  try {
    const data = await Attendance.aggregate([
      {
        $match: {
          date: { $gte: new Date("2020-10-15"), $lte: new Date("2020-10-31") },
          status: "Absent",
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "user_id",
          foreignField: "user_id",
          as: "user_tasks",
        },
      },
      { $unwind: "$user_tasks" },
      { $match: { "user_tasks.submitted": false } },
      { $group: { _id: "$user_id" } },
      { $count: "users_absent_and_not_submitted" },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
