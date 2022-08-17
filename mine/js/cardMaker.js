import { domMaker } from "./fn.js";

export function fake_card_data_maker(limit){
    const url = "https://source.unsplash.com/";
    const ImgID = ["1ddol8rgUH8","178j8tJrNlc", "eWqOgJ-lfiI","1sCXwVoqKAw","B0aCvAVSX8E","L7EwHkq1B2s","TiVPTYCG_3E","CnXVHyO1GGA","IYfp2Ixe9nM","yFV39g6AZ5o"];
    const TXT = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam tempore nostrum autem vel esse libero! 어쩌고 저쩌고 얄리얄리 얄랑셩 얄라".split(' ');
    
    const result = [];

    for(let i=0; i<limit; i++){
        const obj = {};
        
        const randomImg = ImgID[Math.floor(Math.random() * ImgID.length)];
        const IMG = `${url}${randomImg}`;
        obj.img = IMG;
        
        const start = Math.round(Math.random() * 3);
        const final = Math.round(Math.random() * TXT.length) + 3;
        obj.txt = TXT.slice(start,final).join(' ');
        result.push(obj);
    }//for
    return result;
}//fake_card_data_maker


export class CardMaker{
    constructor(data){
        this.data = data;
        this.$wrap = document.getElementById('wrap-card');
        this.init();
    }//constructor

    init(){
        const $frag = document.createDocumentFragment();
        this.data.forEach(data => {
            const $card = this.make_card(data);
            $frag.appendChild($card);
        });

        this.$wrap.appendChild($frag);
    }//init

    make_card(data){
        const {img,txt} = data;
        const $card = domMaker('SECTION','card'); 
        
        const $img = new Image();
        $img.src = img;
        
        const $txt = domMaker('ARTICLE','card-txt');
        $txt.textContent = txt;

        const $btns = domMaker('ARTICLE','card-btns');
        const btn1 = domMaker('BUTTON','card-btn','blue');
        btn1.textContent = "Details";
        const btn2 = domMaker('BUTTON','card-btn');
        btn2.textContent = "Contact Seller";
        $btns.appendChild(btn1);
        $btns.appendChild(btn2);

        $card.appendChild($img);
        $card.appendChild($txt);
        $card.appendChild($btns);
        return $card;
    }//make_card
}//CardMaker