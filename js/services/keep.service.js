import {
    storageService
} from './storage.service.js';
import {
    utilService
} from './util.service.js';

const KEEP_KEY = 'keeps';
let keeps;
let DEFAULT_COLOR = '#ffffc7';


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

function saveKeep(keep) {
    let selectedKeep = getById(keep.id);
    if (!selectedKeep) {
        addKeep(keep);
    } else storageService.store(KEEP_KEY, keeps);
}

function deleteKeep(idx) {
    keeps = storageService.load(KEEP_KEY);
    keeps.splice(idx, 1)
    storageService.store(KEEP_KEY, keeps);
}



function _generateKeeps() {
    return [
        {
            "id": "5d10ade1b50ab63f07a600ae",
            "type": "note",
            "isEditing": false,
            "data": {
                "content": "Laborum consequat in laboris consectetur.",
                "isEditing": false
            },
            "tag": "exercitation consectetur",
            "title": "sit nostrud",
            "bgColor": "#8756895",
            "img": null,
            "isRead": true,
            "date": 1561374177886,
            "isPined": false
        },
        {
            "id": "5d10ade1b946b1ee761da00a",
            "type": "note",
            "isEditing": false,
            "data": {
                "content": "Eiusmod ut velit cillum labore laboris velit ad labore cupidatat et.",
                "isEditing": false
            },
            "tag": "tempor sunt",
            "title": "cillum et",
            "bgColor": "#14547184",
            "img": null,
            "isRead": true,
            "date": 1561374177886,
            "isPined": true
        },
        {
            "id": "5d10ade1cbf93518a55ee925",
            "type": "note",
            "isEditing": false,
            "data": {
                "content": "Magna ipsum labore adipisicing qui Lorem aliquip tempor elit ex.",
                "isEditing": false
            },
            "tag": "consectetur commodo",
            "title": "in fugiat",
            "bgColor": "#13184217",
            "img": null,
            "isRead": false,
            "date": 1561374177887,
            "isPined": false
        },
        {
            "id": "5d10ade1ffdd016c4e547cb3",
            "type": "note",
            "isEditing": false,
            "data": {
                "content": "Consectetur qui id laboris pariatur.",
                "isEditing": false
            },
            "tag": "in eiusmod",
            "title": "id elit",
            "bgColor": "#ffff09",
            "img": null,
            "isRead": true,
            "date": 1561374177887,
            "isPined": true
        },
        {
            "id": "5d10ade17e1e5aefe528eeb2",
            "type": "note",
            "isEditing": false,
            "data": {
                "content": "Et id in aliqua reprehenderit tempor.",
                "isEditing": false
            },
            "tag": "duis nostrud",
            "title": "do pariatur",
            "bgColor": "#14323283",
            "img": null,
            "isRead": true,
            "date": 1561374177887,
            "isPined": false
        },
        {
            "id": "5d10ade4e547cb3",
            "type": "checkList",
            "isEditing": false,
            "data": [
                {
                    "id": "5d10b2b8f3a1ba49e0c",
                    "content": "cillum commodo occaecat",
                    "isEditing": false,
                    "priority": 0,
                    "isDone": true
                },
                {
                    "id": "5d10b2b8048d6dfa2",
                    "content": "commodo quis eiusmod",
                    "isEditing": false,
                    "priority": 0,
                    "isDone": false
                },
                {
                    "id": "5d10b2b8182e867f3ca80d",
                    "content": "veniam do qui",
                    "isEditing": false,
                    "priority": 0,
                    "isDone": true
                },
                {
                    "id": "5d10b2b819dc1996bb5c4",
                    "content": "laborum nostrud tempor",
                    "isEditing": false,
                    "priority": 0,
                    "isDone": true
                },
                {
                    "id": "5d10b2b8821a427a3129a",
                    "content": "nostrud elit consectetur",
                    "isEditing": false,
                    "priority": 0,
                    "isDone": false
                }
            ],
            "tag": "in eiusmod",
            "title": "id elit",
            "bgColor": "#fffff",
            "img": null,
            "isRead": true,
            "date": 1561374177887,
            "isPined": false
        },
        {
            "id": "5d10ade1ffdd016c",
            "type": "checkList",
            "isEditing": false,
            "data": [
                {
                    "id": "0b2b8f3a1ba492d4c0e0c",
                    "content": "cillum commodo occaecat",
                    "isEditing": false,
                    "priority": 0,
                    "isDone": true
                },
                {
                    "id": "5d2b8048d6df93f41e4a2",
                    "content": "commodo quis eiusmod",
                    "isEditing": false,
                    "priority": 0,
                    "isDone": false
                },
                {
                    "id": "5d10b182e867f3ca80cfd",
                    "content": "veniam do qui",
                    "isEditing": false,
                    "priority": 0,
                    "isDone": true
                },
                {
                    "id": "5d10b2b8c1996bb5c50f4",
                    "content": "laborum nostrud tempor",
                    "isEditing": false,
                    "priority": 0,
                    "isDone": true
                },
                {
                    "id": "5d10b2b8821a129e36a",
                    "content": "nostrud elit consectetur",
                    "isEditing": false,
                    "priority": 0,
                    "isDone": false
                }
            ],
            "tag": "in eiusmod",
            "title": "id elit",
            "bgColor": "#10246832",
            "img": null,
            "isRead": true,
            "date": 1561374177887,
            "isPined": false
        },

    ]
}

