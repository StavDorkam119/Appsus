import {
    storageService
} from './storage.service.js';
import {
    utilService
} from './util.service.js';

const KEEP_KEY = 'keeps';
let keeps;
let DEFAULT_COLOR = '#FFFF99';


export const keepService = {
    query,
    getEmptyKeep,
    addKeep,
    getEmptyNote,
    getEmptyCheckItem,
    getById,
    addDataToKeep,
    saveKeep,
    deleteKeep
}

function query() {
    keeps = storageService.load(KEEP_KEY);
    if (!keeps || !keeps.length) {
        keeps = _generateKeeps()
        storageService.store(KEEP_KEY, keeps);
    }
    return Promise.resolve(keeps);
}


function getEmptyKeep() {
    return {
        id: utilService.makeId(),
        isEditing: false,
        type: 'note',
        title: '',
        data: null,
        bgColor: DEFAULT_COLOR,
        img: null,
        date: null,
        tag: '',
        isPined: false
    }
}

function getEmptyNote() {
    return {
        content: '',
        isEditing: true
    }
}

function getEmptyCheckItem() {
    return {
        id: utilService.makeId(),
        content: '',
        isEditing: false,
        isDone: false,
        priority: 0
    }
}

function getById(keepId) {
    keeps = storageService.load(KEEP_KEY);
    const keep = keeps.find(keep => keep.id === keepId);
    return Promise.resolve(keep)
}


function addKeep(keep) {
    keeps = storageService.load(KEEP_KEY);
    keeps.unshift(keep)
    storageService.store(KEEP_KEY, keeps);
}

function addDataToKeep(data) {
    keeps = storageService.load(KEEP_KEY);
    keep.data = data;
    storageService.store(KEEP_KEY, keeps);
}

function saveKeep() {
    storageService.store(KEEP_KEY, keeps);

}

function deleteKeep(idx) {
    keeps = storageService.load(KEEP_KEY);
    keeps.splice(idx, 1)
    storageService.store(KEEP_KEY, keeps);
}



function _generateKeeps() {
    return [
        {
            "id": "5d10b3",
            "type": "checkList",
            "isEditing": false,
            "data": [{
                "id": "5d10f",
                "content": "cillum commodo occaecat",
                "isEditing": false,
                "priority": 0,
                "isDone": true
            },
            {
                "id": "5d1fa2",
                "content": "commodo quis eiusmod",
                "isEditing": false,
                "priority": 0,
                "isDone": false
            },
            {
                "id": "5d10b2b70d",
                "content": "veniam do qui",
                "isEditing": false,
                "priority": 0,
                "isDone": true
            },
            {
                "id": "12bb5c4",
                "content": "laborum nostrud tempor",
                "isEditing": false,
                "priority": 0,
                "isDone": true
            },
            ],
            "tag": "eiusmod",
            "title": "Elit",
            "bgColor": "#FFFF99",
            "img": null,
            "isRead": true,
            "date": 1561374177887,
            "isPined": true
        },
        {
        "id": "5d10a",
        "type": "note",
        "isEditing": false,
        "data": {
            "content": "Laborum consequat in laboris consectetur.",
            "isEditing": false
        },
        "tag": "exercitation",
        "title": "Nostrud",
        "bgColor": "#44608c",
        "img": null,
        "date": 1561374177886,
        "isPined": false
    },
    {
        "id": "5d100a",
        "type": "note",
        "isEditing": false,
        "data": {
            "content": "quat in lglk kjhsaf hd",
            "isEditing": false
        },
        "tag": "sunt",
        "title": "Cillum et",
        "bgColor": "#D2D2D2",
        "img": 'https://wallpapercave.com/wp/wp1874286.jpg',
        "date": 1561374177886,
        "isPined": true
    },
    {
        "id": "5d10ade1cbf93518a55ee925",
        "type": "note",
        "isEditing": false,
        "data": {
            "content": "Magna ipsum labore adipisicing qui Lorem aliquip tempor elit ex, knlf nkcabj adlkns fsfxa.",
            "isEditing": false
        },
        "tag": "commodo",
        "title": "In fugiat",
        "bgColor": "#37a39a",
        "img": null,
        "date": 1561374177887,
        "isPined": false
    },
    {
        "id": "5d107cb3",
        "type": "note",
        "isEditing": false,
        "data": {
            "content": "",
            "isEditing": false
        },
        "tag": "eiusmod",
        "title": "Id elit",
        "bgColor": "#ffab7a",
        "img": 'https://wallpapercave.com/wp/wp3395260.jpg',
        "date": 1561374177887,
        "isPined": true
    },
    {
        "id": "528eeb2",
        "type": "note",
        "isEditing": false,
        "data": {
            "content": "Et id in aliqua , kjsfkj bsjcbhacfl hsad reprehenderit tempor.",
            "isEditing": false
        },
        "tag": "nostrud",
        "title": "Do pariatur",
        "bgColor": "#8af282",
        "img": null,
        "isRead": true,
        "date": 1561374177887,
        "isPined": false
    },
    {
        "id": "1fd016c",
        "type": "checkList",
        "isEditing": false,
        "data": [{
            "id": "12d4c0e0c",
            "content": "fdopsi jlghaj ljsdljgpu qf",
            "isEditing": false,
            "priority": 0,
            "isDone": true
        },
        {
            "id": "93f4e4a2",
            "content": "slddhlf hlfhoyisdkk jkldfhks ",
            "isEditing": false,
            "priority": 0,
            "isDone": false
        },
        {
            "id": "d1080cfd",
            "content": "dd  iaslhfj pfdgs asfby dfg",
            "isEditing": false,
            "priority": 0,
            "isDone": true
        },
        {
            "id": "b8c10f4",
            "content": "apfy mfow bsdfer dflg",
            "isEditing": false,
            "priority": 0,
            "isDone": true
        },
        {
            "id": "8a129e6a",
            "content": "flk ldsp lkgofialsdg",
            "isEditing": false,
            "priority": 0,
            "isDone": false
        }
        ],
        "tag": "smod",
        "title": "id elit",
        "bgColor": "#c9ffe0",
        "img": null,
        "date": 1561374177887,
        "isPined": false
    },
    {
        "id": "1fd01seg6c",
        "type": "checkList",
        "isEditing": false,
        "data": [{
            "id": "12d4egc0e0c",
            "content": "sr tufkgwo fdlow dgg",
            "isEditing": false,
            "priority": 0,
            "isDone": true
        },
        {
            "id": "93f4sdge4a2",
            "content": "gaarjnf rg dfdas",
            "isEditing": false,
            "priority": 0,
            "isDone": false
        },
        {
            "id": "d1080sdgcfd",
            "content": "dgkid  idas osdfpafl  dgm aldkgoi",
            "isEditing": false,
            "priority": 0,
            "isDone": true
        },
        {
            "id": "b8c10f4rt",
            "content": "amdifi nhs vsp kasu fkad",
            "isEditing": false,
            "priority": 0,
            "isDone": true
        },
        ],
        "tag": "opa",
        "title": "Booka",
        "bgColor": "#FFFF99",
        "img": null,
        "date": 1561374177887,
        "isPined": false
    },
    {
        "id": "528esfgeb2",
        "type": "note",
        "isEditing": false,
        "data": {
            "content": "nasfh  hfgaubjkf sdnklfdihsd jkasojh asfb  hfdhkasfh afhk asf asf ,afkh  kasflasf.",
            "isEditing": false
        },
        "tag": "iasjv",
        "title": "Efhvadfhl",
        "bgColor": "#FFFF99",
        "img": null,
        "isRead": true,
        "date": 1561374177887,
        "isPined": true
    },
    {
        "id": "528541ffab2",
        "type": "note",
        "isEditing": false,
        "data": {
            "content": "moi  ash asfh lhkasfh asffahklaf asfhf asfhasf kha askhf asf adgsagd.",
            "isEditing": false
        },
        "tag": "ytrs",
        "title": "Ysf svtwld",
        "bgColor": "#FFFF99",
        "img": null,
        "isRead": true,
        "date": 1561374177887,
        "isPined": false
    },

    ]
}


