let searchService = require('../../../services/searchService');
let tagSearchable = () => {
    document.querySelectorAll('.tag').forEach(tag => {
        tag.querySelector(`input[type='checkbox']`).addEventListener('change', function () {
            let include = [];
            let exclude = [];
            this.closest('form').querySelectorAll(`input[type='checkbox']:checked`).forEach(checked => {
                include.push(checked.value);
            });
            this.closest('form').querySelectorAll(`input[type='checkbox']:not(:checked)`).forEach(unchecked => {
                exclude.push(unchecked.value);
            });
            let regex = searchService.tagQuery(include, exclude);
            document.querySelectorAll('.entries-table__publication').forEach(publication => {
                if (!publication.dataset.tags.match(regex)) {
                    publication.classList.add('entries-table__publication_hidden_tag');
                }
                else {
                    publication.classList.remove('entries-table__publication_hidden_tag');
                }
            });
        });
    })
}

exports.tagSearchable = tagSearchable;