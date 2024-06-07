import express from 'express'
import { db } from '../db.js'
import dayjs from 'dayjs'
const authRouter = express.Router()

authRouter.post('/join', (req, res)=>{
   const {userId, userPw, userIrum} = req.body.addMember
   db.query("INSERT INTO membertbl (userId, userPw, userIrum) VALUES (?, ?, ? )", [userId, userPw, userIrum], (err, result)=>{
        if (err) {
            throw err
        } else {
            res.send(result)
        }
   })
})

authRouter.post('/idcheck', (req, res)=>{
    const userId = req.body.userId
    db.query("SELECT * FROM membertbl WHERE userId=?", [userId], (err, result)=>{
        if (err) {
            throw err
        } else {
            res.send(result)
        }
    })
 })

 authRouter.post('/login', (req, res)=>{
    const userId = req.body.userId
    const userPw = req.body.userPw
    db.query("SELECT * FROM membertbl WHERE userId=? AND userPw=?", [userId, userPw], (err, result)=>{
        if (err){
            throw err
        } else {
            res.send(result)
        }
    })
})

authRouter.post('/refresh', (req, res)=>{
    const userNo = req.body.userNo
    db.query("SELECT * FROM membertbl WHERE userNo=?", [userNo], (err, result)=>{
        if (err){
            throw err
        } else {
            res.send(result)
        }
    })
})

authRouter.post('/modify', (req, res)=>{
    const {userNo, userPw, userIrum } = req.body.userInfo
    db.query("UPDATE membertbl SET userPw=?, userIrum=? WHERE userNo=?", [userPw, userIrum, userNo], (err, result)=>{
         if (err) {
             throw err
         } else {
             res.send(result)
         }
    })
 })

 authRouter.post('/remove', (req, res)=>{
    const userNo = req.body.userNo
    db.query("DELETE FROM membertbl WHERE userNo=?", [userNo], (err, result)=>{
         if (err) {
             throw err
         } else {
             res.send(result)
         }
    })
 })

export default authRouter;