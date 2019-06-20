import {
    storageService
} from './storage.service.js';
import {
    utilService
} from './util.service.js';

const KEEP_KEY = 'keeps';


export const keepService = {
    query
}

function query() {
    let keeps = storageService.load(KEEP_KEY);
    if (!keeps || !keeps.length) {
        keeps = _generateKeeps()
        storageService.store(KEEP_KEY, keeps);
    }
    return Promise.resolve(keeps);
}

function _generateKeeps() {
    return [{
            "id": "5d0b7e6d1c0394bf6396932f",
            "title": "ad",
            "txt": "Do aliqua veniam est consectetur.",
            "bgColor": "lightgrey",
            "img": null,
            "date": 1561034349321
        },
        {
            "id": "5d0b7e6df4538eded0775251",
            "title": "mollit",
            "txt": "Proident in sint qui culpa occaecat excepteur.",
            "bgColor": "lightgrey",
            "img": null,
            "date": 1561034349322
        },
        {
            "id": "5d0b7e6d4b923864edb9067e",
            "title": "et",
            "txt": "Sint aliqua cillum cupidatat laborum labore culpa quis consequat ut minim tempor mollit laborum.",
            "bgColor": "lightgrey",
            "img": null,
            "date": 1561034349322
        },
        {
            "id": "5d0b7e6df6bb783818c26171",
            "title": "dolore",
            "txt": "Nisi consequat consequat eiusmod culpa occaecat incididunt cillum proident.",
            "bgColor": "lightgrey",
            "img": null,
            "date": 1561034349322
        }
    ]
}