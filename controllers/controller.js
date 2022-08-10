const Todo = require("../models/model");
const catchAsync = require("../utils/catchAsync");

// Rendering the view
exports.getTodoView = catchAsync(async (req, res, next) => {
  const tasks = await Todo.find();
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("main", {
      title: "Todo App",
      tasks,
    });
});

// Create New Task
exports.createTask = catchAsync(async (req, res, next) => {
  try {
    const newTask = await Todo.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newTask,
      },
    });
  } catch {
    res.status(204).json({
      status: "error",
    });
  }
});

// Update if the task is completed
exports.updateTaskCompleted = catchAsync(async (req, res, next) => {
  const updatedTask = await Todo.findByIdAndUpdate(req.params.id, {
    completed: true,
  }).then(res.redirect("/"));
  if (!updatedTask) {
    return next();
  }
  res.status(201).json({
    status: "success",
    data: {
      updatedTask,
    },
  });
});

// Update if the task is not completed
exports.updateTaskActive = catchAsync(async (req, res, next) => {
  const updatedTask = await Todo.findByIdAndUpdate(req.params.id, {
    completed: false,
  }).then(res.redirect("/"));
  if (!updatedTask) {
    return next();
  }
  res.status(200).json({
    status: "success",
    data: {
      updatedTask,
    },
  });
});

// Delete the task
exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Todo.findByIdAndDelete(req.params.id).then(
    res.redirect("/")
  );
  if (!task) {
    return next();
  }
});

// See all active tasks
exports.activeTask = catchAsync(async (req, res, next) => {
  // const check = await Todo.aggregate([
  //   {
  //     $match: { completed: { $eq: false } },
  //   },
  // ]);
  const tasks = await Todo.find({ completed: false });
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("main", {
      title: "Todo App",
      tasks,
    });
});

// See all completed tasks
exports.completedTask = catchAsync(async (req, res, next) => {
  // const check = await Todo.aggregate([
  //   {
  //     $match: { completed: { $eq: true } },
  //   },
  // ]);

  const tasks = await Todo.find({ completed: true });
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("main", {
      title: "Todo App",
      tasks,
    });
});
