import express from 'express';
import child_process from 'child_process';
import co from 'co';
import Guide from '../model/guide';
let router = express.Router();
let exec = child_process.exec;

//get step
router.get('/step', (req, res)=> {
    Guide.findOne({}, (err, data)=> {
        if (err) throw err;
        if (!data) {
            console.log('find nothing');
            res.json({success: true, message: '', step: 0})
        } else {
            console.log('find data:', data);
            res.json(data);
        }
    })
});

//set step
router.post('/step/:step', (req, res)=> {
    let step = req.params.step;
    let guide = new Guide({
        status: false,
        step: step
    });
    guide.save((err)=> {
        if (err) {
            res.status(500).json({});
        } else {
            res.json({success: true});
        }
    })
});

//check env
router.get('/check', (req, res)=> {
    co(check()).then((result)=>{
        res.json({success: true, message: result});
    });
});

function* check() {
    let result = {};
    let gitInfo = yield checkCmd('git --version');
    result.git = gitInfo;
    let hexoInfo = yield checkCmd('hexo version');
    result.hexo = hexoInfo;
    return yield new Promise((resolve)=>{
       resolve(result);
    });
}


function checkCmd(command) {
    //check git
    return new Promise((resolve, reject)=> {
        exec(command, (err, stdout, stderr)=> {
            if (err || stderr) {
                resolve({
                    success: false,
                    message: err || stderr
                })
            } else {
                resolve({
                    success: true,
                    message: stdout
                })
            }
        });
    });
}



export default router;