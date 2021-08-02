'use struct';
Number.prototype.toFixedDown = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};

const infoBill = document.getElementById('infoBill');
const infoPeople = document.getElementById('infoPeople');
const infoPercent = document.getElementById('infoPercent');

function mod(element, variable){
    if(element['value'] >= 0){
        if(element['value'] == 0){
            element.parentElement.classList.add('tip-form__group--invalid')
            variable['value'] = ''
        }else{
            element.parentElement.classList.remove('tip-form__group--invalid')
            variable['value'] = element['value'];
        }
    }
    if(element['value'] < 0){
        element['value'] = element['value'] * (-1)
    }
}
function serializable(){
    const form = document.querySelector('.tip-form');
    let data = new URLSearchParams(new FormData(form)).toString()
    let parse = data.split('&')
    let json = {
        'bill': 0,
        'percent': 0,
        'people': 0
    }
    parse.forEach((p)=>{
        let temp = p.split('=')
        switch (temp[0]) {
            case 'infoBill':  json['bill'] = temp[1]
            break;
            case 'infoPeople': json['people'] = temp[1]
            break;
            case 'infoPercent': json['percent'] = temp[1]
            break;
        }
    })
    maths(json)
}
function maths(data){
    let btn = document.getElementById('btn-reset')
    if(data['bill'] !== '' && data['percent'] !== '' && data['people'] !== '' ){
        btn.disabled = false
        resultTip = (data['bill'] * data['percent'] ) / data['people'];
        resultTotal = (data['bill'] / data['people']) ;
        const tips = document.getElementById('tip-amount')
        tips.innerHTML = (resultTip.toFixedDown(2))
        const total = document.getElementById('total-amount')
        total.innerHTML =  ((resultTotal+resultTip).toFixed(2))
    }else{
        btn.disabled = true
    }
    
}
const bill = document.getElementById('bill');
bill.addEventListener('keypress', ()=>{
    mod(bill, infoBill)
    serializable()
})
bill.addEventListener('change', ()=>{
    mod(bill, infoBill)
    serializable()
})
const people = document.getElementById('people');
people.addEventListener('keypress', ()=>{
    mod(people, infoPeople)
    serializable()
})
people.addEventListener('change', ()=>{
    mod(people, infoPeople)
    serializable()
})
const custom = document.getElementById('custom');
custom.addEventListener('keypress', ()=>{
    if(custom['value'] >= 0){
        if(custom['value'] == 0){
            custom.classList.add('tips__input--invalid')
            infoPercent['value'] = ''
        }else{
            custom.classList.remove('tips__input--invalid')
            infoPercent['value'] = Number(custom['value'] / 100);
            serializable()
        }
    }
    if(custom['value'] < 0){
        custom['value'] = custom['value'] * (-1)
        infoPercent['value'] = Number(custom['value'] / 100);
    }
})
custom.addEventListener('change', ()=>{
    if(custom['value'] >= 0){
        if(custom['value'] == 0){
            custom.classList.add('tips__input--invalid')
            infoPercent['value'] = ''
        }else{
            custom.classList.remove('tips__input--invalid')
            infoPercent['value'] = Number(custom['value'] / 100);
            serializable()
        }
    }
    if(custom['value'] < 0){
        custom['value'] = custom['value'] * (-1)
        infoPercent['value'] = Number(custom['value'] / 100);
    }
})
custom.addEventListener('click', ()=>{
    document.getElementById('custom-percent').checked = true
})
const radio = document.getElementsByName('tip-percent')
radio.forEach((r)=>{
    r.addEventListener('click', ()=>{
        infoPercent['value'] = r['value'];
        serializable()
    })
})
const btn = document.getElementById('btn-reset')
btn.addEventListener('click', ()=>{
    let form = document.getElementById('tip-form');
    form.reset();
    btn.disabled = true;
    const tips = document.getElementById('tip-amount')
    tips.innerHTML = 0
    const total = document.getElementById('total-amount')
    total.innerHTML =  0
})