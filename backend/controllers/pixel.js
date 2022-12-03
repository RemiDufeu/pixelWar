const Pixel = require("../models/Pixel");
const jwt = require('jsonwebtoken')
const PixelBoard = require('../models/PixelBoard')

const User = require('../models/User')


exports.getUserPixel = (req, res, next) => {
    Pixel.findOne({x: req.params.x, y: req.params.y, board: req.params.id})
        .then(pixel => User.findOne({_id: pixel.creator})
            .then(user => res.status(200).json({user: user, pixel: pixel})))
        .catch(error => res.status(404).json({error}))
}

exports.getAllPixelBoardsByUser = (req, res, next) => {
    // init empty array
    let boardTab = [];
    let boardTabId = [];
    //init counter
    let counter = 0;
    Pixel.find({creator: req.params.id})
        .then(pixels =>{
            pixels.forEach(pixel => {
                if(!boardTabId.includes(pixel.board.toString())){
                    boardTabId.push(pixel.board.toString())
                }
            });
            boardTabId.forEach(boardId => {
                PixelBoard.findOne({_id : boardId})
                    .then(board => {
                        boardTab.push(board)
                        counter++;
                        if(counter === boardTabId.length){
                            res.status(200).json({
                                    boardTab: boardTab,
                                    size: boardTab.length
                                }
                            )
                        }
                    })
            })
            if(boardTabId.length==0)
            {
                res.status(200).json({
                        boardTab: boardTab,
                        size: boardTab.length
                    }
                )
            }
        })
        .catch(error => res.status(404).json({error}))
}

exports.getNbPixelByUser = (req, res, next) => {
    Pixel.find({creator: req.params.id})
            .then(pixels => res.status(200).json({nbPixels: pixels.length }))
        .catch(error => res.status(404).json({error}))
}