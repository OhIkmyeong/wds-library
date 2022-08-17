export class ModalMaker{
    constructor(data){
        this.data = data;
        this.$$focus = document.querySelectorAll('[data-focus="focus"]');
    }//constructor

    init(){
        console.log(this.$$focus);
    }//init
}//ModalMaker