import { Highlighter } from "./Highlighter.js";

export class ModalMaker{
    constructor(data){
        this.HIGH = new Highlighter();
        this.data = data;
        this.$$focus = this.make_focus_list();
        this.$modal = document.getElementById('modal');
        this.idx = 0;
    }//constructor

    reset_idx(){this.idx = 0;}
    
    init(){
        //pager 만들기
        this.add_pager();
        //하단 버튼 준비
        this.set_click_ftr_modal();
        //닫을 준비
        this.add_close_event();

        //모달 행동 총괄
        this.display_modal();

        //resize시 이벤트 추가
        this.add_on_resize();
    }//init

    display_modal(){
        //pager에 on 표시 
        this.on_pager();
        //모달 내용 바꾸기
        this.change_content();
        //모달 위치 조정
        this.set_pos_modal();
        //하이라이트 박스 조정
        this.HIGH.set_pos(this.$$focus[this.idx]);
        //해당 위치로 스크롤
        this.scroll_to_focus();
        //보이고, 
        if(this.$modal.classList.contains('off')) this.show_modal(true);
    }//display_modal

    /* focus list 만들기 */
    make_focus_list(){
        const $$focus = Array.from(document.querySelectorAll('[data-focus="focus"]'));
        const result = [];
        for(let i=0; i<this.data.length; i++){
            const {focus} = this.data[i];
            if(focus){
                result.push($$focus.shift());
            }else{
                result.push(null);
            }//if else
        }//for
        return result;
    }//make_focus_list
   
    /* pager 만들기 */
    add_pager(){
        const $pager = document.getElementById('modal-pager');
        const $frag = document.createDocumentFragment();
        for(let i=0; i<this.data.length; i++){
            const $li = document.createElement('LI');
            $frag.appendChild($li);
        }//for
        $pager.appendChild($frag);
    }//add_pager

    on_pager(){
        const $$li = document.getElementById('modal-pager').children;
        const target = $$li[this.idx];
        const $$sib = Array.prototype.filter.call($$li, $li => $li !== target);
        target.classList.add('on');
        $$sib.forEach($sib => $sib.classList.remove('on'));
    }//on_pager

    /* 하단 버튼 준비 */
    set_click_ftr_modal(){
        const $ftr = document.getElementById('modal-foot');
        $ftr.addEventListener('click',this.on_click_ftr_modal);
    }//set_click_ftr_modal

    /* Back, Next 버튼 누를 때 */
    on_click_ftr_modal = e =>{
        if(e.target.tagName !== "BUTTON") return;
        const btnType = e.target.id.match(/btn\-modal\-(\w*)/)[1];
        const $back = document.getElementById('btn-modal-back');
        const $next = document.getElementById('btn-modal-next');
            
        if(btnType == "next"){
            /* NEXT */
            this.idx++;
            $back.classList.remove('off');
            if(this.idx >= this.data.length){
                this.idx = this.data.length - 1;
                $next.classList.add('off');
            }//if
        }else{
            /* PREV */
            this.idx--;
            $next.classList.remove('off');

            if(this.idx < 0){
                this.reset_idx();
                $back.classList.add('off');
            }//if
        }//if else

        this.display_modal();
    }//on_click_ftr_modal

    /* 모달 내용 바꾸기 */
    change_content(){
        const data = this.data[this.idx];
        const {title,body} = data;
        const $head = document.getElementById('modal-head');
        const $body = document.getElementById('modal-body');
        $head.textContent = title;
        $body.innerHTML = body;
    }//change_content

    /* 모달 위치 지정*/
    set_pos_modal(){
        const $focus = this.$$focus[this.idx];
        const winHeiHalf = window.innerHeight / 2;
        const winWidHalf = window.innerWidth / 2;
        const mdHei = this.$modal.offsetHeight;
        const mdWid = this.$modal.offsetWidth;
        if(!$focus){
            const scY = window.scrollY;
            const TOP = scY + (winHeiHalf - mdHei / 2);
            const LEFT = winWidHalf - mdWid / 2;
            this.$modal.style.top = `${TOP}px`;
            this.$modal.style.left = `${LEFT}px`;
        }else{
            const dom = $focus.getBoundingClientRect();
            const focusTop = dom.top + (dom.height / 2) - (mdHei / 2);
            const focusLeft = dom.left;
            const TOP = focusTop + 10;
            const LEFT_LEFT = focusLeft - mdWid - 20
            const LEFT_RIGHT = focusLeft + dom.width + 20;
            let LEFT = focusLeft > winWidHalf ? LEFT_LEFT : LEFT_RIGHT ; 
            const is_full_wid = Math.ceil($focus.getBoundingClientRect().width + (16 * 4.5));
            if(window.innerWidth <= is_full_wid){LEFT = winWidHalf - mdWid / 2;}
            this.$modal.style.top = `${TOP  + window.scrollY}px`;
            this.$modal.style.left = `${LEFT}px`;
        }//else
    }//set_pos_modal

    /* 모달 보이기 */
    show_modal(bool){
        this.$modal.classList.toggle('off',!bool);
        this.HIGH.show_box(bool);
    }//show_modal

    /* 모달 X 버튼 */
    add_close_event(){
        const $close = document.getElementById('btn-modal-close');
        $close.addEventListener('click',()=>{
            this.show_modal(false);
        });
    }//add_close_event

    /* 그 위치로 스크롤 */
    scroll_to_focus(){
        const $focus = this.$$focus[this.idx];
        if(!$focus) return;
        window.scroll({
            top : $focus.getBoundingClientRect().top + window.scrollY - 30,
            behavior : 'smooth'
        });
    }//scroll_to_focus

    /* resize시 이벤트 추가 */
    add_on_resize(){
        window.addEventListener('resize',()=>{
            this.set_pos_modal();
            this.HIGH.set_pos(this.$$focus[this.idx]);
        });
    }//add_on_resize
}//ModalMaker