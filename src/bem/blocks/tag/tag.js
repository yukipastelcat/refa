let tagSearchable = () => {
    document.querySelectorAll('.tag').forEach(tag => {
        tag.querySelector(`input[type='checkbox']`).addEventListener('change', function () {
            let regexString = '';
            this.closest('form').querySelectorAll(`input[type='checkbox']:checked`).forEach(checked => {
                regexString += `${checked.value}|`;
            });
            regexString = regexString.substring(0, regexString.length - 1);
            let regex = new RegExp(regexString, 'g');
            document.querySelectorAll('.entries-table__publication').forEach(publication => {
                if (!regex.test(publication.dataset.tags)) {
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