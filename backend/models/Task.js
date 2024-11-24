const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        taskName: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
