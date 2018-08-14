
var resultAreaMod = resultAreaMod || {};

resultAreaMod = (function(){
    "use strict";

    var CARD = { B: "1", A: "2", Q: "3", NB: "4", NA: "5", NQ: "6" };
    var NP_BUFF = {
        ATK_UP: "1",
        DFC_DOWN: "2",
        BST_UP: "3",
        ART_UP: "4",
        QCK_UP: "5",
        BST_DOWN: "6",
        ART_DOWN: "7",
        QCK_DOWN: "8",
        NP_UP: "9",
        CRT_UP: "10",
        SP_GRANT: "11"
    };

    var model = {
        attack: 0,
        basicAttack: 0,
        cardSel: "",
        npCard: "",
        npMagnification: 0,
        npBuffSel1: "",
        npBuff1: 0,
        npBuffSel2: "",
        npBuff2: 0,
        atkUp: 0,
        dfcDown: 0,
        cardUp: 0,
        bstUp: 0,
        artUp: 0,
        qckUp: 0,
        bstDown: 0,
        artDown: 0,
        qckDown: 0,
        npUp: 0,
        crtUp: 0,
        apGrant: 0,
        npSp: 0
    };

    /**
     * 結果となるHTMLテーブルを組み立てて返却します。
     */
    var makeResult = function(){
        setModel();
        var basicAttack = model.basicAttack;
        var npCard = model.npCard;
        var buildHtml = "";
        var npDmg = calcNpDamage();
        var npDmgPer = Math.round(npDmg / basicAttack * 100);
        buildHtml += '<div class="row bg-primary text-white mb-2"><h2>▼計算結果</h2></div>';
        buildHtml += '<div class="row ' + getCellStyle(npCard) + '">';
        buildHtml += '<div class="col-sm-3" style="font-size:1.0rem;">宝具ダメージ</div>';
        buildHtml += '<div class="col-sm-3" style="font-size:1.0rem;">' + npDmgPer + '% / ' + npDmg + '</div>';
        buildHtml += '</div>';

        var resultList = getResultDataList();

        var i, j;
        var table = '<table id="result_table" class="table table-sm">';
        table += '<tr class="row">';
        table += '<th class="col-sm-2"></th>';
        table += '<th class="col-sm-2">1st</th>';
        table += '<th class="col-sm-2">2nd</th>';
        table += '<th class="col-sm-2">3rd</th>';
        table += '<th class="col-sm-2">extra</th>';
        table += '<th class="col-sm-2">total</th>';
        table += '</tr>';
        for (var i in resultList) {
            var r = resultList[i];
            var ttlDmg = 0;
            var ttlCrt = 0;
            table += '<tr class="row">';
            for (j = 0; j < 6; j++) {
                if (j === 0) {
                    table += '<td class="col-sm-2" style="font-size:1.2rem; display:flex; align-items:center;">';
                    table += resultList[i].cardName + '</td>';
                } else if(j === 1){
                    table += '<td class="col-sm-2 ' + getCellStyle(r.fstCard) + '">';
                    if (isBAQ(r.fstCard)) {
                        ttlDmg += r.fstDmg;
                        ttlCrt += r.fstCrt;
                        table += '<div>' + r.fstDmgPer + '%(' + r.fstCrtPer + '%)</div>';
                        table += '<div>' + r.fstDmg + '(' + r.fstCrt + ')</div>';
                    } else {
                        ttlDmg += npDmg;
                        ttlCrt += npDmg;
                        table += '<div>' + npDmgPer + '%</div>';
                        table += '<div>' + npDmg + '</div>';
                    }
                    table += '</td>';
                } else if(j === 2){
                    table += '<td class="col-sm-2 ' + getCellStyle(r.sndCard) + '">';
                    if (isBAQ(r.sndCard)) {
                        ttlDmg += r.sndDmg;
                        ttlCrt += r.sndCrt;
                        table += '<div>' + r.sndDmgPer + '%(' + r.sndCrtPer + '%)</div>';
                        table += '<div>' + r.sndDmg + '(' + r.sndCrt + ')</div>';
                    } else {
                        ttlDmg += npDmg;
                        ttlCrt += npDmg;
                        table += '<div>' + npDmgPer + '%</div>';
                        table += '<div>' + npDmg + '</div>';
                    }
                    table += '</td>';
                } else if(j === 3){
                    table += '<td class="col-sm-2 ' + getCellStyle(r.trdCard) + '">';
                    if (isBAQ(r.trdCard)) {
                        ttlDmg += r.trdDmg;
                        ttlCrt += r.trdCrt;
                        table += '<div>' + r.trdDmgPer + '%(' + r.trdCrtPer + '%)</div>';
                        table += '<div>' + r.trdDmg + '(' + r.trdCrt + ')</div>';
                    } else {
                        ttlDmg += npDmg;
                        ttlCrt += npDmg;
                        table += '<div>' + npDmgPer + '%</div>';
                        table += '<div>' + npDmg + '</div>';
                    }
                    table += '</td>';
                } else if(j === 4){
                    ttlDmg += r.extDmg;
                    ttlCrt += r.extDmg;
                    table += '<td class="col-sm-2 table-secondary">';
                    table += '<div>' + r.extDmgPer + '%</div>';
                    table += '<div>' + r.extDmg + '</div>';
                    table += '</td>';
                } else if(j === 5){
                    table += '<td class="col-sm-2 table-warning" style="display:flex; align-items:center;">';
                    table += ttlDmg + '(' + ttlCrt + ')' + '</td>';
                }
            }
            table += '</tr>';
        }
        table += '</table>';
        return buildHtml + table;
    };

    /**
     * カードの組み合わせごとに計算結果を設定したリストを返却します。
     */
    var getResultDataList = function(){
        var combList = []
        getCardCombnationList((model.cardSel + model.npCard).split(''), [], combList);

        combList = combList.filter(function (x, i, self) {
            return self.indexOf(x) === i;
        }).sort(function (x, y){
            return x < y ? -1 : 1;
        });

        var resultList = [];
        for(var i in combList) {
            // 宝具バフを考慮するため毎行モデルを初期化する
            setModel();
            var cards = combList[i];
            // 計算系の関数を合成
            var calcCompose = function(cards, num, isCrt){
                return function(fxArr){
                    var damage = 0;
                    for(var i in fxArr) {
                        damage = fxArr[i](damage, cards, num, isCrt)
                    }
                    return damage;
                }
            };
            resultList.push({
                cardName : convertId2Name(cards),
                fstCard : cards.split(",")[0],
                fstDmg : calcCompose(cards, 1, false)([calcDamage, calcBuff, plusBusterChainBonus]),
                fstCrt : calcCompose(cards, 1, true)([calcDamage, calcBuff, plusBusterChainBonus]),
                sndCard : cards.split(",")[1],
                sndDmg : calcCompose(cards, 2, false)([calcDamage, calcBuff, plusBusterChainBonus]),
                sndCrt : calcCompose(cards, 2, true)([calcDamage, calcBuff, plusBusterChainBonus]),
                trdCard : cards.split(",")[2],
                trdDmg : calcCompose(cards, 3, false)([calcDamage, calcBuff, plusBusterChainBonus]),
                trdCrt : calcCompose(cards, 3, true)([calcDamage, calcBuff, plusBusterChainBonus]),
                extDmg : calcCompose(cards, 4, false)([calcDamage, calcBuff])
            });
            var toPer = function(n){return Math.round(n / model.basicAttack * 100);};
            resultList[i].fstDmgPer = toPer(resultList[i].fstDmg);
            resultList[i].fstCrtPer = toPer(resultList[i].fstCrt);
            resultList[i].sndDmgPer = toPer(resultList[i].sndDmg);
            resultList[i].sndCrtPer = toPer(resultList[i].sndCrt);
            resultList[i].trdDmgPer = toPer(resultList[i].trdDmg);
            resultList[i].trdCrtPer = toPer(resultList[i].trdCrt);
            resultList[i].extDmgPer = toPer(resultList[i].extDmg);
        }
        return resultList;
    };
    
    /**
     * 選択したカード構成に対して、選択時の組み合わせリストを返却します。
     */
    var getCardCombnationList = function(list, e, combList){
        for(var i in list) {
            e.push(list[i]);
            if (e.length >= 3) {
                combList.push(e.concat().join());
                e.pop();
                continue;
            }
            var l = list.concat();
            l.splice(i, 1);
            e = getCardCombnationList(l, e, combList);
        }
        e.pop();
        return e;
    };

    /**
     * バフ前のダメージを計算して設定します。
     *
     * @param {number} damage ダメージ
     * @param {array} cards カードの構成
     * @param {number} n カードの順番
     * @param {boolean} isCrt クリティカル判定
     */
    var calcDamage = function(damage, cards, n, isCrt){
        var cardArr = cards.split(",");
        var isBusterChain = isSingleChains(cardArr, CARD.B, CARD.NB);
        var isArtsChain = isSingleChains(cardArr, CARD.A, CARD.NA);
        var isQuickChain = isSingleChains(cardArr, CARD.Q, CARD.NQ);
        var basicAttack = isCrt ? model.basicAttack * 2 : model.basicAttack;
        var magnification = 0;

        // カード種類補正
        magnification = cardArr[n-1] === CARD.B ? 1.5
            : cardArr[n-1] === CARD.A ? 1.0
            : cardArr[n-1] === CARD.Q ? 0.8
            : 1.0;

        // エクストラアタック補正
        if(n === 4) {
            magnification *= (isBusterChain || isArtsChain || isQuickChain) ? 3.5 : 2.0;
        }

        damage = Math.floor(basicAttack * magnification);

        return damage;
    };

    /**
     * バフを計算してダメージに結果を反映します。
     *
     * @param {number} damage ダメージ
     * @param {array} cards カードの構成
     * @param {number} n カードの順番
     * @param {boolean} isCrt クリティカル判定
     */
    var calcBuff = function(damage, cards, n, isCrt){
        var cardArr = cards.split(",");
        var cardUp = 0;
        var is1stBuster = (cardArr[0] === CARD.B || cardArr[0] === CARD.NB);

        if(cardArr[n-1] === CARD.NB || cardArr[n-1] === CARD.NA || cardArr[n-1] === CARD.NQ) {
            if (!formMod.npBuff1None.checked) {
                plusNpBuff(model.npBuff1, model.npBuffSel1);
            }
            if (!formMod.npBuff1None.checked) {
                plusNpBuff(model.npBuff2, model.npBuffSel2);
            }
        }

        var crtUp = isCrt ? model.crtUp : 0;

        if(cardArr[n-1] === CARD.B) {
            cardUp = model.bstUp + model.bstDown;
            crtUp += isCrt ? model.bCrtUp : 0;
        } else if(cardArr[n-1] === CARD.A) {
            cardUp = model.artUp + model.artDown;
            crtUp += isCrt ? model.aCrtUp : 0;
        } else if(cardArr[n-1] === CARD.Q) {
            cardUp = model.qckUp + model.qckDown;
            crtUp += isCrt ? model.qCrtUp : 0;
        }

        // カード順序補正
        var sortCor = n === 1 ? 1.0
            : n === 2 ? 1.2
            : n === 3 ? 1.4
            : 1.0;

        // 1stBusterボーナス
        var firstBonus = is1stBuster ? 0.5 : 0;

        return Math.floor(damage
            // 攻撃力強化
            * ((model.atkUp + model.dfcDown + 100) / 100)
            // カード強化・耐性ダウン
            * ((((cardUp + 100) * sortCor) + (firstBonus * 100)) / 100)
            // その他強化
            * ((crtUp + model.spGrant + 100) / 100)
            );
    };

    /**
     * バスターチェーンボーナスをダメージに加算します。
     *
     * @param {number} damage ダメージ
     * @param {array} cards カードの構成
     */
    var plusBusterChainBonus = function(damage, cards){
        var isBusterChain = isSingleChains(cards.split(","), CARD.B, CARD.NB);
        damage += isBusterChain ? Math.floor(model.attack * 0.2) : 0;
        return damage;
    }

    /**
     * 宝具ダメージを計算して設定します。
     */
    var calcNpDamage = function(){
        var cardUp = 0;
        var cardCor = 0;

        if (formMod.npBuff1Before.checked) {
            plusNpBuff(model.npBuff1, model.npBuffSel1);
        }
        if (formMod.npBuff2Before.checked) {
            plusNpBuff(model.npBuff2, model.npBuffSel2);
        }

        if(model.npCard === CARD.NB) {
            cardUp = model.bstUp + model.bstDown;
            cardCor = 1.5;
        } else if(model.npCard === CARD.NA) {
            cardUp = model.artUp + model.artDown;
            cardCor = 1.0;
        } else if(model.npCard === CARD.NQ) {
            cardUp = model.qckUp + model.qckDown;
            cardCor = 0.8;
        }

        return Math.floor(model.basicAttack * cardCor
            // 宝具倍率
            * (model.npMagnification / 100)
            // 攻撃力強化
            * ((model.atkUp + model.dfcDown + 100) / 100)
            // カード性能アップ
            * ((cardUp + 100) / 100)
            // その他強化
            * ((model.npUp + model.spGrant + 100) / 100)
            // 宝具特攻
            * ((model.npSp + 100) / 100)
            );
    };
 
    /**
     * 宝具使用によるバフをカテゴリごとのバフ率に加算します。
     *
     * @param {number} npBuff 割合
     * @param {string} npBuffSel バフの種類
     */
    var plusNpBuff = function(npBuff, npBuffSel){
        var n = parseFloat(npBuff);
        switch (npBuffSel) {
            case NP_BUFF.ATK_UP:
                model.atkUp += n;
                break;
            case NP_BUFF.DFC_DOWN:
                model.dfcDown += n;
                break;
            case NP_BUFF.BST_UP:
                model.bstUp += n;
                break;
            case NP_BUFF.ART_UP:
                model.artUp += n;
                break;
            case NP_BUFF.QCK_UP:
                model.qckUp += n;
                break;
            case NP_BUFF.BST_DOWN:
                model.bstDown += n;
                break;
            case NP_BUFF.ART_DOWN:
                model.artDown += n;
                break;
            case NP_BUFF.QCK_DOWN:
                model.qckDown += n;
                break;
            case NP_BUFF.NP_UP:
                model.npUp += n;
                break;
            case NP_BUFF.CRT_UP:
                model.crtUp += n;
                break;
            case NP_BUFF.SP_GRANT:
                model.spGrant += n;
                break;
            default:
        }
    };

    /**
     * 計算結果保持用のモデルに画面からの値を設定します。
     */
    var setModel = function(){
        model.attack = parseFloat(formMod.attack.value);
        model.basicAttack = (function(){
            if(formMod.atkSel1.checked) {
                return Number(formMod.basicAttackMin.textContent);
            } else if(formMod.atkSel2.checked) {
                return Number(formMod.basicAttackAvr.textContent);
            } else if(formMod.atkSel3.checked) {
                return Number(formMod.basicAttackMax.textContent);
            }
        })();
        model.cardSel = formMod.cardSel.value;
        model.npCard = formMod.npCard.value;
        model.npMagnification = Number(formMod.npMagnification.value);
        model.npBuffSel1 = formMod.npBuffSel1.value;
        model.npBuff1 = parseFloat(formMod.npBuff1.value);
        model.npBuffSel2 = formMod.npBuffSel2.value;
        model.npBuff2 = parseFloat(formMod.npBuff2.value);
        model.atkUp = parseFloat(formMod.atkUp.value);
        model.dfcDown = parseFloat(formMod.dfcDown.value);
        model.bstUp = parseFloat(formMod.bstUp.value);
        model.artUp = parseFloat(formMod.artUp.value);
        model.qckUp = parseFloat(formMod.qckUp.value);
        model.bstDown = parseFloat(formMod.bstDown.value);
        model.artDown = parseFloat(formMod.artDown.value);
        model.qckDown = parseFloat(formMod.qckDown.value);
        model.npUp = parseFloat(formMod.npUp.value);
        model.crtUp = parseFloat(formMod.crtUp.value);
        model.spGrant = parseFloat(formMod.spGrant.value);
        model.npSp = parseFloat(formMod.npSp.value);
        model.bCrtUp = parseFloat(formMod.bCrtUp.value);
        model.aCrtUp = parseFloat(formMod.aCrtUp.value);
        model.qCrtUp = parseFloat(formMod.qCrtUp.value);
    };

    /**
     * 指定のカード種類のみで構成されたチェーンかを判定します。
     *
     * @param {array} cardArr カード配列
     * @param {string} card 通常カード
     * @param {string} npCard 宝具カード
     */
    var isSingleChains = function(cardArr, card, npCard){
        return (
            (cardArr[0] === card || cardArr[0] === npCard)
            && (cardArr[1] === card || cardArr[1] === npCard)
            && (cardArr[2] === card || cardArr[2] === npCard)
        );
    }

    /**
     * カード種類によるテーブルセルのスタイルを返却します。
     *
     * @param {string} c カード
     */
    var getCellStyle = function(c){
        if (c === CARD.B) {
            return "table-danger";
        } else if (c === CARD.A) {
            return "table-primary";
        } else if (c === CARD.Q) {
            return "table-success";
        } else if (c === CARD.NB) {
            return "bg-danger text-white";
        } else if (c === CARD.NA) {
            return "bg-primary text-white";
        } else if (c === CARD.NQ) {
            return "bg-success text-white";
        }
        return "";
    };

    /**
     * カードIDからカード名称に変換して返却します。
     *
     * @param {string} id カードID
     */
    var convertId2Name = function(id){
        var name = [];
        var idArr = id.split(",");
        for(var i in idArr){
            if (idArr[i] === CARD.B) {
                name.push("B");
            } else if (idArr[i] === CARD.A) {
                name.push("A");
            } else if (idArr[i] === CARD.Q) {
                name.push("Q");
            } else {
                name.push("N");
            }
        }
        name.push("E");

        return name.join().replace(/,/g, "");
    }

    /**
     * 対象カードがBAQのいずれかである（宝具ではない）ことを判定します。
     * @param {string} c カード
     */
    var isBAQ = function(c){
        return (c === CARD.B || c === CARD.A || c === CARD.Q);
    }

    return {
        makeResult: makeResult
    };
}());

formMod.calc.addEventListener('click', function(){
    formMod.result.innerHTML = resultAreaMod.makeResult();
}, false);