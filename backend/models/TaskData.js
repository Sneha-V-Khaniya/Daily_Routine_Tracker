const mongoose = require("mongoose");

const taskDataSchema = new mongoose.Schema(
    {
        taskID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        },
        date: Date,
        value: {
            type: Number,
            min: 0,
            max: 1,
        },
    });

module.exports = mongoose.model("TaskData", taskDataSchema);
