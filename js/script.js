'use strict';
const TDL = document.querySelector('.tdl'),
    TDLInput = document.querySelector('.tdl__input'),
    TDLItem = document.querySelector('.tdl__item');

const func = (d) => {
    const target = d.target,
        InputText = TDLInput.value;
    if (target.closest('.tdl__add-button') || d.code == 'Enter') {
        if (InputText == "") alert('Поле не заполнено!');
        else {
            console.log(InputText);
            TDLInput.value = '';
        }
    }
}
TDL.addEventListener('click', (e) => {
    func(e);
});

TDLInput.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
        func(e);
    }
});