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

let initOmnibox = function () {
    document.querySelector(`.search input[type='search']`).addEventListener('input', function () {
        let regex = new RegExp(this.value.replace(/ /g, '|'), 'i');
        search(regex);
    });
}

exports.initOmnibox = initOmnibox;