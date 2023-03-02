const Board = require("../models/Board");

const helper = require("../helper/helper");

const schedule = require('node-schedule');

schedule.scheduleJob('0 0 * * *', () => {
    Board.find({ dailyBoard: { $exists: false } }, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            if (result.length === 0) {
                Board.find({ dailyBoard: { $exists: true } }).sort({ dailyBoard: 1 }).limit(1).exec(function (err, result) {
                    if (err) {
                        console.log(err)
                    } else {
                        setDaily(result[0].puzzle)
                    }
                })
            } else {
                Board.find({ dailyBoard: { $exists: false } }, function (err, result) {
                    if (err) {
                        console.log(err)
                    } else {
                        let selected = helper.randomBoard(result)[0]
                        setDaily(selected.puzzle)
                    }
                })
            }
        }
    })
})

let setDaily = async (puzzle) => {
    await Board.findOneAndUpdate({ puzzle: puzzle }, { $set: { dailyBoard: helper.getTodaysDate().split(' ')[0] } })
}

module.exports = {
    getAll: async (req, res) => {
        Board.find({}, function (err, result) {
            if (err) {
                console.log(err)
                return res.status(500).json({ 'msg': "Unknown error." })
            } else {
                res.status(200).json(result)
            }
        })
    },
    getRandom: async (req, res) => {
        Board.find({}, function (err, result) {
            if (err) {
                console.log(err)
                return res.status(500).json({ 'msg': "Unknown error." })
            } else {
                res.status(200).json(helper.randomBoard(result))
            }
        })
    },
    getDaily: async (req, res) => {
        let date = req.params.date || helper.getTodaysDate().split(' ')[0]
        let dateCheck = date.split("-")
        if (dateCheck.length !== 3) {
            return res.status(400).json({ 'msg': "Date is not in valid YYYY-MM-DD format." })
        }

        try {
            let x = parseInt(dateCheck[0])
            let y = parseInt(dateCheck[1])
            let z = parseInt(dateCheck[2])
            if (!(x >= 1000 && x <= 9999) ||
                !(y >= 1 && y <= 12) ||
                !(z >= 1 && z <= 31)) return res.status(400).json({ 'msg': "Date is not in valid YYYY-MM-DD format." })
        } catch {
            return res.status(400).json({ 'msg': "Date is not in valid YYYY-MM-DD format." })
        }

        Board.find({ dailyBoard: date }, function (err, result) {
            if (err) {
                console.log(err)
                return res.status(500).json({ 'msg': "Unknown error." })
            } else {
                res.status(200).json(result)
            }
        })
    },
    postBoard: async (req, res) => {
        Board.find({ puzzle: req.body.puzzle }, function (err, result) {
            if (err) {
                console.log(err)
                return res.status(500).json({ 'msg': "Unknown error." })
            } else if (result.length === 0) {
                let origBoard = JSON.parse(JSON.stringify(req.body.puzzle))
                let solved = JSON.parse(JSON.stringify(req.body.puzzle))
                let solvable = helper.validSudoku(solved)
                if (!solvable) return res.status(400).json({ 'msg': "This board is not solvable." }) // Status 400: Unsolvable
                solved = helper.solver(solved)
                Board.create({
                    solution: solved,
                    puzzle: origBoard,
                    author: req.body.author ? req.body.author : "Anonymous",
                    dateSubmitted: helper.getTodaysDate(),
                    difficulty: req.body.difficulty
                })
                res.status(200).json({ 'msg': "Board was successfully added!" }) // Successful
            } else {
                res.status(400).json({ 'msg': "This board has already been added." }) // Unknown Error
            }
        })
    },
}