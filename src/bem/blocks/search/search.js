window.model = {};
window.model.synonyms = [];
let search = function (regex) {
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

let findSynonym = function (regex) {
    let BreakException = {};
    let synonymRegex;
    window.model.synonyms.forEach(synonym => {
        try {
            if (regex.test(synonym)) {
                synonymRegex = new RegExp(synonym, 'i');
                throw BreakException;
            }
        }
        catch(err) {
            if (err !== BreakException) throw err;
        }
    });
    return synonymRegex || '';
}

let initOmnibox = function () {
    document.querySelector(`.search input[type='search']`).addEventListener('input', function () {
        if (!this.value) {
            search(/(?:)/i);
            return;
        }
        let regex = new RegExp(this.value.replace(/ /g, '|'), 'i');
        let synonyms = findSynonym(regex);
            if (synonyms) {
                search(synonyms);
            }
            else {
                search(regex);
            }
    }, { passive: true });
}

exports.initOmnibox = initOmnibox;