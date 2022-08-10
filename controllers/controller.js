const Todo = require("../models/model");
const catchAsync = require("../utils/catchAsync");

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

exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Todo.findByIdAndDelete(req.params.id).then(
    res.redirect("/")
  );
  if (!task) {
    return next();
  }
});

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
