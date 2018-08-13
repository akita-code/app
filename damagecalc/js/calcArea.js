var calcAreaMod = calcAreaMod || {};

calcAreaMod = (function (){
    "use strict";
    var npMagnification = document.getElementById("np_magnification");
    var npBuffAvail11 = document.getElementById("np_buff_avail11");
    var npBuffAvail12 = document.getElementById("np_buff_avail12");
    var npBuffAvail13 = document.getElementById("np_buff_avail13");
    var npBuffAvail21 = document.getElementById("np_buff_avail21");
    var npBuffAvail22 = document.getElementById("np_buff_avail22");
    var npBuffAvail23 = document.getElementById("np_buff_avail23");
    var npBuff1 = document.getElementById("np_buff1");
    var npBuffSel1 = document.getElementById("np_buff_sel1");
    var npBuff2 = document.getElementById("np_buff2");
    var npBuffSel2 = document.getElementById("np_buff_sel2");
    var atkUp = document.getElementById("atk_up"); 
    var dfcDown = document.getElementById("dfc_down"); 
    var bstUp = document.getElementById("bst_up"); 
    var artUp = document.getElementById("art_up"); 
    var qckUp = document.getElementById("qck_up"); 
    var bstDown = document.getElementById("bst_down"); 
    var artDown = document.getElementById("art_down"); 
    var qckDown = document.getElementById("qck_down"); 
    var npUp = document.getElementById("np_up"); 
    var crtUp = document.getElementById("crt_up"); 
    var spGrant = document.getElementById("sp_grant"); 
    var npSp = document.getElementById("np_sp"); 
    var bCrtUp = document.getElementById("b_crt_up"); 
    var aCrtUp = document.getElementById("a_crt_up"); 
    var qCrtUp = document.getElementById("q_crt_up"); 
    
    var inputPerCheck = function (input) {
        if (input.value.length > 5) {
            input.value = input.value.slice(0, 5);
        }
    };

    return {
        npMagnification: npMagnification,
        npBuffAvail11: npBuffAvail11,
        npBuffAvail12: npBuffAvail12,
        npBuffAvail13: npBuffAvail13,
        npBuffAvail21: npBuffAvail21,
        npBuffAvail22: npBuffAvail22,
        npBuffAvail23: npBuffAvail23,
        npBuff1: npBuff1,
        npBuffSel1: npBuffSel1,
        npBuff2: npBuff2,
        npBuffSel2: npBuffSel2,
        atkUp: atkUp,
        dfcDown: dfcDown,
        bstUp: bstUp,
        artUp: artUp,
        qckUp: qckUp,
        bstDown: bstDown,
        artDown: artDown,
        qckDown: qckDown,
        npUp: npUp,
        crtUp: crtUp,
        spGrant: spGrant,
        npSp: npSp,
        inputPerCheck: inputPerCheck,
        bCrtUp: bCrtUp,
        aCrtUp: aCrtUp,
        qCrtUp: qCrtUp
    };
}());

calcAreaMod.npMagnification.addEventListener('input', function () {
    if (calcAreaMod.npMagnification.value.length > 5) {
        calcAreaMod.npMagnification.value = calcAreaMod.npMagnification.value.slice(0, 5);
    }
}, false);
calcAreaMod.npBuffAvail11.addEventListener('change', function(e){
    if (this.checked) {
        calcAreaMod.npBuff1.disabled = true;
        calcAreaMod.npBuffSel1.value = 0;
        calcAreaMod.npBuffSel1.disabled = true;
    }
}, false);
calcAreaMod.npBuffAvail21.addEventListener('change', function(e){
    if (this.checked) {
        calcAreaMod.npBuff2.disabled = true;
        calcAreaMod.npBuffSel2.value = 0;
        calcAreaMod.npBuffSel2.disabled = true;
    }
}, false);
calcAreaMod.npBuffAvail12.addEventListener('change', function(e){
    if (this.checked) {
        calcAreaMod.npBuff1.disabled = false;
        calcAreaMod.npBuffSel1.disabled = false;
    }
}, false);
calcAreaMod.npBuffAvail22.addEventListener('change', function(e){
    if (this.checked) {
        calcAreaMod.npBuff2.disabled = false;
        calcAreaMod.npBuffSel2.disabled = false;
    }
}, false);
calcAreaMod.npBuffAvail13.addEventListener('change', function(e){
    if (this.checked) {
        calcAreaMod.npBuff1.disabled = false;
        calcAreaMod.npBuffSel1.disabled = false;
    }
}, false);
calcAreaMod.npBuffAvail23.addEventListener('change', function(e){
    if (this.checked) {
        calcAreaMod.npBuff2.disabled = false;
        calcAreaMod.npBuffSel2.disabled = false;
    }
}, false);
calcAreaMod.atkUp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
calcAreaMod.dfcDown.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
calcAreaMod.bstUp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
calcAreaMod.artUp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
calcAreaMod.qckUp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
calcAreaMod.bstDown.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
calcAreaMod.artDown.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
calcAreaMod.qckDown.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
calcAreaMod.npUp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
calcAreaMod.crtUp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
calcAreaMod.spGrant.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
calcAreaMod.npSp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
calcAreaMod.bCrtUp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
calcAreaMod.aCrtUp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);
calcAreaMod.qCrtUp.addEventListener('input', function(){
    calcAreaMod.inputPerCheck(this);
}, false);