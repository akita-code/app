var calcAreaMod = calcAreaMod || {};

calcAreaMod = (function (){
    "use strict";

    var inputPerCheck = function (input) {
        if (input.value.length > 5) {
            input.value = input.value.slice(0, 5);
        }
    };

    return {
        inputPerCheck: inputPerCheck
    };

}());

formMod.npMagnification.addEventListener('input', function () {
    if (formMod.npMagnification.value.length > 5) {
        formMod.npMagnification.value = formMod.npMagnification.value.slice(0, 5);
    }
}, false);
formMod.npBuff1None.addEventListener('change', function(e){
    if (this.checked) {
        formMod.npBuff1.value = 0;
        formMod.npBuff1.disabled = true;
        formMod.npBuffSel1.value = 0;
        formMod.npBuffSel1.disabled = true;
    }
}, false);
formMod.npBuff2None.addEventListener('change', function(e){
    if (this.checked) {
        formMod.npBuff2.value = 0;
        formMod.npBuff2.disabled = true;
        formMod.npBuffSel2.value = 0;
        formMod.npBuffSel2.disabled = true;
    }
}, false);
formMod.npBuff1Before.addEventListener('change', function(e){
    if (this.checked) {
        formMod.npBuff1.disabled = false;
        formMod.npBuffSel1.disabled = false;
    }
}, false);
formMod.npBuff2Before.addEventListener('change', function(e){
    if (this.checked) {
        formMod.npBuff2.disabled = false;
        formMod.npBuffSel2.disabled = false;
    }
}, false);
formMod.npBuff1After.addEventListener('change', function(e){
    if (this.checked) {
        formMod.npBuff1.disabled = false;
        formMod.npBuffSel1.disabled = false;
    }
}, false);
formMod.npBuff2After.addEventListener('change', function(e){
    if (this.checked) {
        formMod.npBuff2.disabled = false;
        formMod.npBuffSel2.disabled = false;
    }
}, false);
formMod.atkUp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
formMod.dfcDown.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
formMod.bstUp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
formMod.artUp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
formMod.qckUp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
formMod.bstDown.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
formMod.artDown.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
formMod.qckDown.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
formMod.npUp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
formMod.crtUp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
formMod.spGrant.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
formMod.npSp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
formMod.bCrtUp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
formMod.aCrtUp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
formMod.qCrtUp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);