import express from 'express';
import { db } from '../utils/Utils';

const router = express().Router();

router.use('/guide/setStep/:step',(req,res,next)=>{
    let step = req.params.step;
    
    next();
});

function setStep(step) {
    let db = yield db()
}