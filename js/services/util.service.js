function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function makeId(length=5) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function makeLorem(length) {

    var randStr = '';
    while (randStr.length < length) {
        var wordLength = getRandomInt(3, 6);
        var word = createWord(wordLength);

        if (Math.random() > 0.9) word += ',';

        randStr += word + ' ';
    }
    randStr = randStr.substring(0, length);
    randStr = randStr[0].toUpperCase() + randStr.substr(1)

    return randStr;
}

function colorLog(message, color) {

    color = color || "black";

    switch (color) {
        case "success":  
             color = "Green"; 
             break;
        case "info":     
                color = "DodgerBlue";  
             break;
        case "error":   
             color = "Red";     
             break;
        case "warning":  
             color = "Orange";   
             break;
        default: 
             color = color;
    }

    console.log("%c" + message, "color:" + color);
}

function getRandChar() {
    var LETTERS = 'abcdefghijklmnopqrstuvwxyz';
    var randIndex = parseInt(Math.random() * LETTERS.length)
    return LETTERS.charAt(randIndex);
}

function createWord(length) {
    var word = '';
    while (word.length < length) {
        var randChar = getRandChar();
        word += randChar;
    }

    return word;
}

export const utilService = {
    getRandomInt,
    makeLorem,
    makeId,
    colorLog,
    timeConverter,
    checkIfMobile
}


function checkIfMobile () {
    if (window.innerWidth <= 560) return true;
    else return false;
}



function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}