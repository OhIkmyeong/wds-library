export function domMaker(domName,...clssList){
    const $dom = document.createElement(domName);
    for(const clssName of clssList){
        $dom.classList.add(clssName);
    }//for
    return $dom;
}//domMaker