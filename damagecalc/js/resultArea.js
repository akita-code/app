
var resultAreaMod = resultAreaMod || {};

resultAreaMod = (function () {
    var attack = document.getElementById("attack");
    var calc = document.getElementById("calc");
    var result = document.getElementById("result");
    var cardSel = document.getElementById("card_sel");
    var npCard = document.getElementById("np_card");
    var basicAttackMin = document.getElementById("basic_attack_min");
    var basicAttackAvr = document.getElementById("basic_attack_avr");
    var basicAttackMax = document.getElementById("basic_attack_max");
    var atkSel1 = document.getElementById("atk_sel1");
    var atkSel2 = document.getElementById("atk_sel2");
    var atkSel3 = document.getElementById("atk_sel3");
    var npMagnification = document.getElementById("np_magnification");
    var npBuffAvail11 = document.getElementById("np_buff_avail11");
    var npBuffAvail12 = document.getElementById("np_buff_avail12");
    var npBuffAvail31 = document.getElementById("np_buff_avail13");
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
        npMagnification: 0,
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

    var getBasicAttack = function(){
        if(atkSel1.checked) {
            return toN(basicAttackMin.textContent);
        } else if(atkSel2.checked) {
            return toN(basicAttackAvr.textContent);
        } else if(atkSel3.checked) {
            return toN(basicAttackMax.textContent);
        }
    };

    var getCardCombnationList = function (list, e, combList){
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

    var getResultDataList = function (){
        var combList = []
        getCardCombnationList((cardSel.value + npCard.value).split(''), [], combList);

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
                    damage = 0;
                    for(var i in fxArr) {
                        damage = fxArr[i](damage, cards, num, isCrt)
                    }
                    return damage;
                }
            };
            resultList.push({
                cardName : convertId2Name(cards),
                fstCard : cards.substr(0, 1),
                fstDmg : calcCompose(cards, 1, false)([calcDamage, calcBuff, plusBusterChainBonus]),
                fstCrt : calcCompose(cards, 1, true)([calcDamage, calcBuff, plusBusterChainBonus]),
                sndCard : cards.substr(2, 1),
                sndDmg : calcCompose(cards, 2, false)([calcDamage, calcBuff, plusBusterChainBonus]),
                sndCrt : calcCompose(cards, 2, true)([calcDamage, calcBuff, plusBusterChainBonus]),
                trdCard : cards.substr(4, 1),
                trdDmg : calcCompose(cards, 3, false)([calcDamage, calcBuff, plusBusterChainBonus]),
                trdCrt : calcCompose(cards, 3, true)([calcDamage, calcBuff, plusBusterChainBonus]),
                extDmg : calcCompose(cards, 4, false)([calcDamage, calcBuff]),
            });
        }
        return resultList;
    };

    /**
     * @param {number} damage ダメージ
     * @param {string} cards カードの構成
     * @param {number} n カードの順番
     * @param {boolean} isCrt クリティカル判定
     */
    var calcDamage = function(damage, cards, n, isCrt){
        var cardArr = cards.split(",");
        var is1stBuster = (cardArr[0] === CARD.B || cardArr[0] === CARD.NB);
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

        // カード順序補正
        magnification *= n === 1 ? 1.0
            : n === 2 ? 1.2
            : n === 3 ? 1.4
            : 1.0;

        // 1stBusterボーナス
        magnification += is1stBuster ? 0.5 : 0;

        // エクストラアタック補正
        if(n === 4) {
            magnification *= (isBusterChain || isArtsChain || isQuickChain) ? 3.5 : 2.0;
        }

        damage = Math.floor(basicAttack * magnification);

        return damage;
    };

    var calcBuff = function(damage, cards, n, isCrt){
        var cardArr = cards.split(",");
        var cardUp = 0;

        if(cardArr[n-1] === CARD.NB || cardArr[n-1] === CARD.NA || cardArr[n-1] === CARD.NQ) {
            if (!npBuffAvail11.checked) {
                npBuffPlus(npBuff1.value, npBuffSel1.value);
            }
            if (!npBuffAvail21.checked) {
                npBuffPlus(npBuff1.value, npBuffSel1.value);
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

        return Math.floor(damage
            // 攻撃力強化
            * ((model.atkUp + model.dfcDown + 100) / 100)
            // カード強化・耐性ダウン
            * ((cardUp + 100) / 100)
            // その他強化
            * ((crtUp + model.spGrant + 100) / 100)
            );
    };

    var plusBusterChainBonus = function (damage, cards) {
        var isBusterChain = isSingleChains(cards.split(","), CARD.B, CARD.NB);
        damage += isBusterChain ? Math.floor(model.attack * 0.2) : 0;
        return damage;
    }

    var calcNpDamage = function () {
        var cardUp = 0;
        var cardCor = 0;

        if (npBuffAvail12.checked) {
            npBuffPlus(npBuff1.value, npBuffSel1.value);
        }
        if (npBuffAvail22.checked) {
            npBuffPlus(npBuff2.value, npBuffSel2.value);
        }

        if(npCard.value === CARD.NB) {
            cardUp = model.bstUp + model.bstDown;
            cardCor = 1.5;
        } else if(npCard.value === CARD.NA) {
            cardUp = model.artUp + model.artDown;
            cardCor = 1.0;
        } else if(npCard.value === CARD.NQ) {
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

    var npBuffPlus = function (npBuff, npBuffSel) {
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
            case UP_BUFF.NP_UP:
                model.npUp += n;
                break;
            case UP_BUFF.CRT_UP:
                model.crtUp += n;
                break;
            case UP_BUFF.SP_GRANT:
                model.spGrant += n;
                break;
            default:
        }
    };

    var setModel = function () {
        model.attack = parseFloat(attack.value);
        model.basicAttack = getBasicAttack();
        model.npMagnification = parseFloat(npMagnification.value);
        model.atkUp = parseFloat(atkUp.value);
        model.dfcDown = parseFloat(dfcDown.value);
        model.bstUp = parseFloat(bstUp.value);
        model.artUp = parseFloat(artUp.value);
        model.qckUp = parseFloat(qckUp.value);
        model.bstDown = parseFloat(bstDown.value);
        model.artDown = parseFloat(artDown.value);
        model.qckDown = parseFloat(qckDown.value);
        model.npUp = parseFloat(npUp.value);
        model.crtUp = parseFloat(crtUp.value);
        model.spGrant = parseFloat(spGrant.value);
        model.npSp = parseFloat(npSp.value);
        model.bCrtUp = parseFloat(bCrtUp.value);
        model.aCrtUp = parseFloat(aCrtUp.value);
        model.qCrtUp = parseFloat(qCrtUp.value);
    };

    var makeResult = function() {
        setModel();
        var basicAttack = getBasicAttack();
        var buildHtml = "";
        var npDmg = calcNpDamage();
        var npDmgPer = Math.round(npDmg / basicAttack * 100);
        buildHtml += '<div class="row bg-primary text-white mb-2"><h2>▼計算結果</h2></div>';
        buildHtml += '<div class="row ' + getCellStyle(npCard.value) + '">';
        buildHtml += '<div class="col-sm-3" style="font-size:1.0rem;">宝具ダメージ</div>';
        buildHtml += '<div class="col-sm-3" style="font-size:1.0rem;">' + npDmgPer + '% / ' + npDmg + '</div>';
        buildHtml += '</div>';

        var resultList = getResultDataList();

        var i, j;
        var table = '<table id="result_table" class="table table-sm">';
        table += '<tr class="row">'
        table += '<th class="col-sm-2"></th>'
        table += '<th class="col-sm-2">1st</th>'
        table += '<th class="col-sm-2">2nd</th>'
        table += '<th class="col-sm-2">3rd</th>'
        table += '<th class="col-sm-2">extra</th>'
        table += '<th class="col-sm-2">total</th>'
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
                        table += '<div>' + Math.round(r.fstDmg / basicAttack * 100) + '%(' + Math.round(r.fstCrt / basicAttack * 100) + '%)</div>';
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
                        table += '<div>' + Math.round(r.sndDmg / basicAttack * 100) + '%(' + Math.round(r.sndCrt / basicAttack * 100) + '%)</div>';
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
                        table += '<div>' + Math.round(r.trdDmg / basicAttack * 100) + '%(' + Math.round(r.trdCrt / basicAttack * 100) + '%)</div>';
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
                    table += '<div>' + Math.round(r.extDmg / basicAttack * 100) + '%</div>';
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

    var isSingleChains = function (cardArr, card, npCard) {
        return (
            (cardArr[0] === card || cardArr[0] === npCard)
            && (cardArr[1] === card || cardArr[1] === npCard)
            && (cardArr[2] === card || cardArr[2] === npCard)
        );
    }

    var getCellStyle = function (c) {
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

    var convertId2Name = function (id) {
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

    var isBAQ = function (c) {
        return (c === CARD.B || c === CARD.A || c === CARD.Q);
    }

    var toN = function (s) {return Number(s);}

    return {
        calc : calc,
        result : result,
        makeResult : makeResult,
    };
}());

resultAreaMod.calc.addEventListener('click', function(e){
    resultAreaMod.result.innerHTML = resultAreaMod.makeResult();
}, false);