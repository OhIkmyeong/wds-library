import { CardMaker, fake_card_data_maker } from "./cardMaker.js";
import { ModalMaker } from "./modalMaker.js";

const cardData = fake_card_data_maker(10);
const modalData = [
    {
        title : "Hello World",
        body : "<p>This the first Tutorial of Blah Blah...</p><p>잘 따라 와보셈</p>",
    },
    {
        title : "Title(2)",
        body : "집중 되니???",
        focus : true
    },
    {
        title : "Title(3)",
        body : "했다가 안 했다가 할 수도 있습니다.",
        focus : true
    },
    {
        title : "조금만 더 견뎌봐요",
        body : "피카츄 라이츄 파이리 꼬부기",
    },
    {
        title : "존버",
        body : "버터플 야도란 피존투 또가스",
        focus : true
    },
    {
        title : "Title(4)",
        body : "짠짠 마지막 포커스",
        focus : true
    },
    {
        title : "끝!",
        body : "수고했졍",
    },
];

new CardMaker(cardData);
const modalMaker  = new ModalMaker(modalData);
const $btnDemo = document.getElementById('btn-live-demo');
modalMaker.init();

$btnDemo.addEventListener('click',()=>{
    modalMaker.reset_idx();
    modalMaker.reset_ftr_btn();
    modalMaker.display_modal();
});