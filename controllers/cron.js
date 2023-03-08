const Board = require("../models/Board");

const helper = require("../helper/helper");

let setDaily = async (puzzle) => {
    await Board.findOneAndUpdate({ puzzle: puzzle }, { $set: { dailyBoard: helper.getTodaysDate().split(' ')[0] } })
}

module.exports = {
    postDaily: async (req, res) => {
        Board.find({ dailyBoard: { $exists: false } }, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                if (result.length === 0) {
                    Board.find({ dailyBoard: { $exists: true } }).sort({ dailyBoard: 1 }).limit(1).exec(function (err, result) {
                        if (err) {
                            console.log(err)
                            res.sendStatus(400)
                        } else {
                            setDaily(result[0].puzzle)
                            res.sendStatus(200)
                        }
                    })
                } else {
                    Board.find({ dailyBoard: { $exists: false } }, function (err, result) {
                        if (err) {
                            console.log(err)
                            res.sendStatus(400)
                        } else {
                            let selected = helper.randomBoard(result)[0]
                            setDaily(selected.puzzle)
                            res.sendStatus(200)
                        }
                    })
                }
            }
        })
    },
}