import express from 'express';
import Guide from '../model/guide';
let router = express.Router();


router.get('/check', (req, res)=> {
    Guide.findOne({}, (err, data)=> {
        if (err) throw err;
        if (!data) {
            console.log('find nothing');
            res.json({success: true,    message: '', step: 0})
        } else {
            console.log('find data:', data);
            res.json(data);
        }
    })
});

router.post('/step/:step', (req, res)=> {
    let step = req.params.step;
    let guide = new Guide({
        status : false,
        step : step
    });
    guide.save((err)=>{
        if (err) {
            res.status(500).json({});
        }else {
            res.json({success:true});
        }
    })
});


export default router;