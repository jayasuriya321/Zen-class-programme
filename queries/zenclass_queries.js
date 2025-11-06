// 1. Find all topics and tasks taught in October
db.topics.find({ date: { $gte: ISODate("2020-10-01"), $lte: ISODate("2020-10-31") } });
db.tasks.find({ date: { $gte: ISODate("2020-10-01"), $lte: ISODate("2020-10-31") } });

// 2. Find all company drives between 15-Oct-2020 and 31-Oct-2020
db.company_drives.find({ date: { $gte: ISODate("2020-10-15"), $lte: ISODate("2020-10-31") } });

// 3. Find all company drives and students who appeared for placement
db.company_drives.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "students_appeared",
      foreignField: "_id",
      as: "appeared_students"
    }
  }
]);

// 4. Find number of problems solved by user in codekata
db.codekata.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user"
    }
  },
  { $project: { "user.name": 1, problems_solved: 1 } }
]);

// 5. Find mentors with mentee count more than 15
db.mentors.find({ mentees_count: { $gt: 15 } });

// 6. Find users who are absent and task not submitted between 15-Oct and 31-Oct
db.attendance.aggregate([
  {
    $match: {
      date: { $gte: ISODate("2020-10-15"), $lte: ISODate("2020-10-31") },
      status: "absent"
    }
  },
  {
    $lookup: {
      from: "tasks",
      localField: "user_id",
      foreignField: "user_id",
      as: "task_details"
    }
  },
  { $match: { "task_details.submitted": false } },
  { $count: "users_absent_and_not_submitted" }
]);
