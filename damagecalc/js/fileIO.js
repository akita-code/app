var fileIO = fileIO || {};

fileIO = (function (){
    var fileExport = function(){
        var text = JSON.stringify({
            attack: formMod.attack.value,
            servantClassSel: formMod.servantClassSel.value,
            servantClassPer: formMod.servantClassPer.value,
            classAdvantageSel: formMod.classAdvantageSel.value,
            classAdvantagePer: formMod.classAdvantagePer.value,
            ttzList: formMod.ttzList.value,
            ttzPer: formMod.ttzPer.value,
            basicAttackMin: formMod.basicAttackMin.innerText,
            basicAttackAvr: formMod.basicAttackAvr.innerText,
            basicAttackMax: formMod.basicAttackMax.innerText,
            atkSel1: formMod.atkSel1.checked,
            atkSel2: formMod.atkSel2.checked,
            atkSel3: formMod.atkSel3.checked,
            cardSel: formMod.cardSel.value,
            npCard: formMod.npCard.value,
            npMagnification: formMod.npMagnification.value,
            npBuff1AvailNone: formMod.npBuff1AvailNone.checked,
            npBuff1AvailBefore: formMod.npBuff1AvailBefore.checked,
            npBuff1AvailAfter: formMod.npBuff1AvailAfter.checked,
            npBuff2AvailNone: formMod.npBuff2AvailNone.checked,
            npBuff2AvailBefore: formMod.npBuff2AvailBefore.checked,
            npBuff2AvailAfter: formMod.npBuff2AvailAfter.checked,
            npBuff1: formMod.npBuff1.value,
            npBuffSel1: formMod.npBuffSel1.value,
            npBuff2: formMod.npBuff2.value,
            npBuffSel2: formMod.npBuffSel2.value,
            atkUp: formMod.atkUp.value,
            dfcDown: formMod.dfcDown.value,
            bstUp: formMod.bstUp.value,
            artUp: formMod.artUp.value,
            qckUp: formMod.qckUp.value,
            bstDown: formMod.bstDown.value,
            artDown: formMod.artDown.value,
            qckDown: formMod.qckDown.value,
            npUp: formMod.npUp.value,
            crtUp: formMod.crtUp.value,
            spGrant: formMod.spGrant.value,
            npSp: formMod.npSp.value,
            bCrtUp: formMod.bCrtUp.value,
            aCrtUp: formMod.aCrtUp.value,
            qCrtUp: formMod.qCrtUp.value
        });

        var fileName = "export.json";
        var blob = new Blob([text], {type: "text/plain"});

        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blob, fileName);
            URL.revokeObjectURL();
        } else {
            var a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.target = '_blank';
            a.download = fileName;
            a.click();
        }

    };

    var fileImport = function(e){
        var file = e.target.files[0];
        console.log(file.name);
        console.log(file.size);
        console.log(file.type);

        if (file.size > 10000) {
            alert("ファイルのサイズ不正");
            return;
        } else if (file.type !== "application/json") {
            alert("ファイルの形式不正");
            return;
        }

        var reader = new FileReader();
        reader.onload = (function(f){
            return function(e) {
                var obj = JSON.parse(e.target.result);
                formMod.attack.value = obj.attack;
                formMod.servantClassSel.value = obj.servantClassSel;
                formMod.servantClassPer.value = obj.servantClassPer;
                formMod.classAdvantageSel.value = obj.classAdvantageSel;
                formMod.classAdvantagePer.value = obj.classAdvantagePer;
                formMod.ttzList.value = obj.ttzList;
                formMod.ttzPer.value = obj.ttzPer;
                formMod.basicAttackMin.innerText= obj.basicAttackMin;
                formMod.basicAttackAvr.innerText = obj.basicAttackAvr;
                formMod.basicAttackMax.innerText = obj.basicAttackMax;
                formMod.atkSel1.checked = obj.atkSel1;
                formMod.atkSel2.checked = obj.atkSel2;
                formMod.atkSel3.checked = obj.atkSel3;
                formMod.cardSel.value = obj.cardSel;
                formMod.npCard.value = obj.npCard;
                formMod.npMagnification.value = obj.npMagnification;

                if (Boolean(obj.npBuff1AvailNone)) {
                    formMod.npBuff1AvailNone.click();
                } else if (Boolean(obj.npBuff1AvailBefore)) {
                    formMod.npBuff1AvailBefore.click();
                } else if (Boolean(obj.npBuff1AvailAfter)) {
                    formMod.npBuff1AvailAfter.click();
                }

                if (Boolean(obj.npBuff2AvailNone)) {
                    formMod.npBuff2AvailNone.click();
                } else if (Boolean(obj.npBuff2AvailBefore)) {
                    formMod.npBuff2AvailBefore.click();
                } else if (Boolean(obj.npBuff2AvailAfter)) {
                    formMod.npBuff2AvailAfter.click();
                }

                formMod.npBuff1.value = obj.npBuff1;
                formMod.npBuffSel1.value = obj.npBuffSel1;
                formMod.npBuff2.value = obj.npBuff2;
                formMod.npBuffSel2.value = obj.npBuffSel2;
                formMod.atkUp.value = obj.atkUp;
                formMod.dfcDown.value = obj.dfcDown;
                formMod.bstUp.value = obj.bstUp;
                formMod.artUp.value = obj.artUp;
                formMod.qckUp.value = obj.qckUp;
                formMod.bstDown.value = obj.bstDown;
                formMod.artDown.value = obj.artDown;
                formMod.qckDown.value = obj.qckDown;
                formMod.npUp.value = obj.npUp;
                formMod.crtUp.value = obj.crtUp;
                formMod.spGrant.value = obj.spGrant;
                formMod.npSp.value = obj.npSp;
                formMod.bCrtUp.value = obj.bCrtUp;
                formMod.aCrtUp.value = obj.aCrtUp;
                formMod.qCrtUp.value = obj.qCrtUp;
            };
        })(file);
        reader.readAsText(file);
    };

    return {
        fileExport: fileExport,
        fileImport: fileImport
    };
}());

formMod.fileExport.addEventListener('click', function(){
    fileIO.fileExport();
}, false);

formMod.fileImport.addEventListener('change', function(e){
    fileIO.fileImport(e);
}, false);