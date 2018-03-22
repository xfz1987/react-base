import {useStrict, observable, action} from 'mobx';

useStrict(true);

class MainStore {
    constructor(){
      this.getName();
    }
    @observable user = {};
    @action getName = async () => {
        console.log('我执行一次，我是单例模式');
        this.user = {id: 1, name: 'xfz'};   
    };
}

export default new MainStore();