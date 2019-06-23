import {
    storageService
} from './storage.service.js';
import {
    utilService
} from './util.service.js';

const KEEP_KEY = 'keeps';
// let keeps;


export const keepService = {
    query,
    getEmptyKeep,
    addKeep,
    getEmptyNote,
    getEmptyCheckItem,
    toggleCheckItem,
    getById,
    addDataToKeep
}

function query() {
    let keeps = storageService.load(KEEP_KEY);
    if (!keeps || !keeps.length) {
        keeps = _generateKeeps()
        storageService.store(KEEP_KEY, keeps);
    }
    return Promise.resolve(keeps);
}


function getEmptyKeep() {
    return {
        id: utilService.makeId(),
        isEditing:true,
        type: 'checkList',
        title: '',
        data: null,
        bgColor: '#ffff94',
        img: null,
        date: null,
        tag:'',
        isPined: false
    }
}

function getEmptyNote() {
    return {
        content: '',
        isEditing: true
    }
}


function getById(keepId) {
    const keep = keeps.find(keep => keep.id === keepId);
    return Promise.resolve(keep)
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


function addKeep(keep) {
    let keeps = storageService.load(KEEP_KEY);
    keeps.unshift(keep)
    storageService.store(KEEP_KEY, keeps);
}

function addDataToKeep(data) {
    let keeps = storageService.load(KEEP_KEY);
    keep.data = data;
    storageService.store(KEEP_KEY, keeps);
}


function toggleCheckItem(item) {
    item.isDone = !item.isDone;
}


function _generateKeeps() {
    return [
        {
            "id": "5d0b7e6d1c0394bf6396932f",
            "isEditing": true,
            "type": "note",
            "data": {
                "content": "adding style to the presentation is very important.",
                "isEditing": false,
            },
            "title": "presintation",
            "tag":"work",
            "bgColor": "#ffff94",
            "img": null,
            "date": 1561034349321,
            "isPined": false
        }
    ]
}