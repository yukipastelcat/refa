let init = function () {
    document.querySelector('.tag-checker').addEventListener('change', function () {
        let checked = this.querySelector(`input[type='checkbox']`).checked;
        document.querySelectorAll('.tag').forEach(tag => {
            let input = tag.querySelector(`input[type='checkbox']`)
            input.checked = checked;
        });
    });
}

exports.init = init;