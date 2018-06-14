window.model = {};
window.model.synonyms = [];
let searchService = require('../../../services/searchService');
let filter = function (regex) {
    document.querySelectorAll('.entries-table__publication').forEach(publication => {
        if (!regex.test(publication.dataset.tags)) {
            publication.classList.add('entries-table__publication_hidden_search');
        }
        else {
            publication.classList.remove('entries-table__publication_hidden_search');
        }
    });
    document.querySelectorAll('.tag').forEach(tag => {
        if (!regex.test(tag.getAttribute('title'))) {
            tag.classList.add('tag_hidden');
        }
        else {
            tag.classList.remove('tag_hidden');
        }
    });
}
let initOmnibox = function () {
    document.querySelector(`.search input[type='search']`).addEventListener('input', function () {
        if (this.value) {
            filter(searchService.searchQuery(this.value, window.model.synonyms));
        }
        else {
            filter(/(?!:)/g);
        }
    }, { passive: true });
}

exports.initOmnibox = initOmnibox;