var basicAreaMod = basicAreaMod || {};

basicAreaMod = (function (){
    "use strict";
    var SERVANT_CLASS_PER_ARR = [100, 95, 105, 100, 90, 90, 110, 100, 110, 110, 100, 100, 100];
    var CLASS_ADVANTAGE_PER_2DARR = [
          [100,  50, 200, 100, 100, 100, 200, 100,  50, 100, 100, 100, 100] // セイバー
        , [200, 100,  50, 100, 100, 100, 200, 100,  50, 100, 100, 100, 100] // アーチャー
        , [ 50, 200, 100, 100, 100, 100, 200, 100,  50, 100, 100, 100, 100] // ランサー
        , [100, 100, 100, 100, 200,  50, 200, 100,  50, 100, 100, 100, 100] // ライダー
        , [100, 100, 100,  50, 100, 200, 200, 100,  50, 100, 100, 100, 100] // キャスター
        , [100, 100, 100, 200,  50, 100, 200, 100,  50, 100, 100, 100, 100] // アサシン
        , [150, 150, 150, 150, 150, 150, 150, 100, 150, 150, 150, 150,  50] // バーサーカー
        , [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100] // シールダー
        , [100, 100, 100, 100, 100, 100, 200, 100, 100,  50, 200, 100, 100] // ルーラー
        , [100, 100, 100, 100, 100, 100, 200, 100, 200, 100,  50, 100, 100] // アヴェンジャー
        , [100, 100, 100, 100, 100, 100, 200, 100,  50, 200, 100, 100, 100] // ムーンキャンサー
        , [ 50,  50,  50, 150, 150, 150, 200, 100, 100, 100, 100, 100, 200] // アルターエゴ
        , [100, 100, 100, 100, 100, 100, 200, 100, 100, 100, 100,  50, 200] // フォーリナー
        ];

    var getServantClassPer = function (i) {
        return SERVANT_CLASS_PER_ARR[i];
    };

    var getClassAdvantagePer = function (i, j) {
        return CLASS_ADVANTAGE_PER_2DARR[i][j];
    };

    var calcBasicAttack = function () {
        formMod.basicAttackAvr.innerText = Math.floor(formMod.attack.value * 0.23
            * (formMod.servantClassPer.value / 100)
            * (formMod.classAdvantagePer.value / 100)
            * (formMod.ttzPer.value / 100));
        formMod.basicAttackMin.innerText = Math.floor(Number(formMod.basicAttackAvr.innerText) * 0.9);
        formMod.basicAttackMax.innerText = Math.floor(Number(formMod.basicAttackAvr.innerText) * 1.1);
    };

    return {
        getServantClassPer: getServantClassPer,
        getClassAdvantagePer: getClassAdvantagePer,
        calcBasicAttack: calcBasicAttack
    };
}());

formMod.attack.addEventListener('input', function () {
    if (formMod.attack.value.length > 5) {
        formMod.attack.value = formMod.attack.value.slice(0, 5);
    }
}, false);

formMod.attack.addEventListener('change', function () {
    basicAreaMod.calcBasicAttack();
}, false);

formMod.servantClassSel.addEventListener('change', function () {
    formMod.servantClassPer.value = basicAreaMod.getServantClassPer(
        formMod.servantClassSel.value);
    formMod.classAdvantagePer.value = basicAreaMod.getClassAdvantagePer(
        formMod.servantClassSel.value, formMod.classAdvantageSel.value);
    basicAreaMod.calcBasicAttack();
}, false);

formMod.classAdvantageSel.addEventListener('change', function () {
    formMod.classAdvantagePer.value = basicAreaMod.getClassAdvantagePer(
        formMod.servantClassSel.value, formMod.classAdvantageSel.value);
    basicAreaMod.calcBasicAttack();
}, false);

formMod.ttzList.addEventListener('change', function () {
    formMod.ttzPer.value = formMod.ttzList.value;
    basicAreaMod.calcBasicAttack();
}, false);