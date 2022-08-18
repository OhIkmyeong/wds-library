export class Highlighter{
    constructor(){
        this.$box = document.getElementById('highlighter-box');
    }//constructor

    show_box(bool){
        this.$box.classList.toggle('off',!bool);
    }//show_box

    set_pos($focus){
        if(!$focus){
            this.reset_box();
            return;
        }else{
            this.change_box($focus);
        };
    }//set_pos

    reset_box(){
        const TOP = (window.innerHeight / 2) + window.scrollY;
        const LEFT = (window.innerWidth / 2);
        this.$box.style.left = `${LEFT}px`;
        this.$box.style.top = `${TOP}px`;
        this.$box.style.width = '1px';
        this.$box.style.height = '1px';
    }//reset_box

    change_box($focus){
        const {left,top,width,height} = $focus.getBoundingClientRect();
        this.$box.style.left = `${left - 10}px`;
        this.$box.style.top = `${window.scrollY + top - 10}px`;
        this.$box.style.width = `${width + 20}px`;
        this.$box.style.height = `${height + 20}px`;
    }//change_box
}//Highlighter