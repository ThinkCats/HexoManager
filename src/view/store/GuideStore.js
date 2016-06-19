import alt from '../alt';
import GuideAction from '../action/GuideAction';
import {json} from '../component/common/Functions';

class GuideStore {
    constructor() {
        this.bindListeners({
            handleInit: GuideAction.handleInit,
            handleGuide: GuideAction.handleCheckEnv
        });

        this.state= {
            step : -1,
            loadingHidden : false,
            envResult :{}
        }
    }

    handleInit = ()=>{
        json('/guide/step').then((data)=>{
            console.log('data:',data);
                if (data) {
                    console.log('step:', data.step);
                    this.setState({step: data.step});
                }
        });
    }

    handleGuide = ()=>{
        json('/guide/check').then((data)=>{
           this.setState({envResult:data,loadingHidden:true});
        });
    }
}

export default alt.createStore(GuideStore , 'GuideStore');