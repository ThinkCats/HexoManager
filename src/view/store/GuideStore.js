import alt from '../alt';
import GuideAction from '../action/GuideAction';
import {json} from '../component/common/Functions';

class GuideStore {
    constructor() {
        this.bindListeners({
            handleInit: GuideAction.handleInit
        });

        this.state= {
            step : -1
        }
    }

    handleInit = ()=>{
        $.get('/guide/check',(data)=>{
            console.log('data:',data);
            if (data) {
                console.log('step:', data.step);
                this.setState({step: data.step});
            }
        });
    }
}

export default alt.createStore(GuideStore , 'GuideStore');