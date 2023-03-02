const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
    solution: {
        type: Array,
        required: true
    },
    puzzle: {
        type: Array,
        required: true
    },
    author: {
        type: String
    },
    dateSubmitted: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    dailyBoard: {
        type: String
    }
});

module.exports = mongoose.model("Board", BoardSchema);