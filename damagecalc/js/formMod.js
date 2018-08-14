var formMod = formMod || {};

formMod = (function (){
    "use strict";
    var attack = document.getElementById("attack");
    var servantClassSel = document.getElementById("servant_class_sel");
    var servantClassPer = document.getElementById("servant_class_per");
    var classAdvantageSel = document.getElementById("class_advantage_sel");
    var classAdvantagePer = document.getElementById("class_advantage_per");
    var ttzList = document.getElementById("ttz_list");
    var ttzPer = document.getElementById("ttz_per");
    var basicAttackMin = document.getElementById("basic_attack_min");
    var basicAttackAvr = document.getElementById("basic_attack_avr");
    var basicAttackMax = document.getElementById("basic_attack_max");
    var atkSel1 = document.getElementById("atk_sel1");
    var atkSel2 = document.getElementById("atk_sel2");
    var atkSel3 = document.getElementById("atk_sel3");

    var cardSel = document.getElementById("card_sel");
    var npCard = document.getElementById("np_card");
    var npMagnification = document.getElementById("np_magnification");
    var npBuff1None = document.getElementById("np_buff1_none");
    var npBuff1Before = document.getElementById("np_buff1_before");
    var npBuff1After = document.getElementById("np_buff1_after");
    var npBuff2None = document.getElementById("np_buff2_none");
    var npBuff2Before = document.getElementById("np_buff2_before");
    var npBuff2After = document.getElementById("np_buff2_after");
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
    
    var calc = document.getElementById("calc");
    var result = document.getElementById("result");
    var fileExport = document.getElementById("file_export");
    var fileImport = document.getElementById("file_import");

    return {
        attack: attack,
        servantClassSel: servantClassSel,
        servantClassPer: servantClassPer,
        classAdvantageSel: classAdvantageSel,
        classAdvantagePer: classAdvantagePer,
        ttzList: ttzList,
        ttzPer: ttzPer,
        basicAttackMin: basicAttackMin,
        basicAttackAvr: basicAttackAvr,
        basicAttackMax: basicAttackMax,
        atkSel1: atkSel1,
        atkSel2: atkSel2,
        atkSel3: atkSel3,
        cardSel: cardSel,
        npCard: npCard,
        npMagnification: npMagnification,
        npBuff1None: npBuff1None,
        npBuff1Before: npBuff1Before,
        npBuff1After: npBuff1After,
        npBuff2None: npBuff2None,
        npBuff2Before: npBuff2Before,
        npBuff2After: npBuff2After,
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
        bCrtUp: bCrtUp,
        aCrtUp: aCrtUp,
        qCrtUp: qCrtUp,
        calc: calc,
        result: result,
        fileExport: fileExport,
        fileImport: fileImport
    };
}());