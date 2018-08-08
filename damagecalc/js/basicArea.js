var basicAreaMod = basicAreaMod || {};

basicAreaMod = (function (){

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

    var getServantClassPer = function (i) {
        return SERVANT_CLASS_PER_ARR[i];
    };

    var getClassAdvantagePer = function (i, j) {
        return CLASS_ADVANTAGE_PER_2DARR[i][j];
    };

    var calcBasicAttack = function () {
        basicAttackAvr.innerText = Math.floor(attack.value * 0.23
            * (servantClassPer.value / 100)
            * (classAdvantagePer.value / 100)
            * (ttzPer.value / 100));
        console.log(basicAttackAvr.innerText);
        basicAttackMin.innerText = Math.floor(Number(basicAttackAvr.innerText) * 0.9);
        basicAttackMax.innerText = Math.floor(Number(basicAttackAvr.innerText) * 1.1);
    };

    return {
        attack: attack,
        servantClassSel: servantClassSel,
        getServantClassPer: getServantClassPer,
        servantClassPer: servantClassPer,
        classAdvantageSel: classAdvantageSel,
        getClassAdvantagePer: getClassAdvantagePer,
        classAdvantagePer: classAdvantagePer,
        ttzList: ttzList,
        ttzPer: ttzPer,
        calcBasicAttack: calcBasicAttack
    };
}());

basicAreaMod.attack.addEventListener('input', function (e) {
    basicAreaMod.attack.value = Number(basicAreaMod.attack.value);
    if (basicAreaMod.attack.value.length > 5) {
        basicAreaMod.attack.value = basicAreaMod.attack.value.slice(0, 5);
    }
}, false);

basicAreaMod.attack.addEventListener('change', function (e) {
    basicAreaMod.calcBasicAttack();
}, false);

basicAreaMod.servantClassSel.addEventListener('change', function (e) {
    basicAreaMod.servantClassPer.value = basicAreaMod.getServantClassPer(
        basicAreaMod.servantClassSel.value);
    basicAreaMod.classAdvantagePer.value = basicAreaMod.getClassAdvantagePer(
        basicAreaMod.servantClassSel.value, basicAreaMod.classAdvantageSel.value);
    basicAreaMod.calcBasicAttack();
}, false);

basicAreaMod.classAdvantageSel.addEventListener('change', function (e) {
    basicAreaMod.classAdvantagePer.value = basicAreaMod.getClassAdvantagePer(
        basicAreaMod.servantClassSel.value, basicAreaMod.classAdvantageSel.value);
    basicAreaMod.calcBasicAttack();
}, false);

basicAreaMod.ttzList.addEventListener('change', function (e) {
    basicAreaMod.ttzPer.value = basicAreaMod.ttzList.value;
    basicAreaMod.calcBasicAttack();
}, false);