let makeSortable = function () {
    const getCellValue = function (tr, index) {
        return tr.children[index].innerText || tr.children[index].textContent
    }

    const compare = function (index, ascending) {
        return function (el1, el2) {
            return function (val1, val2) {
                return val1 !== '' && val2 !== '' && !isNaN(val1) && !isNaN(val2) ? val1 - val2 : val1.toString().localeCompare(val2);
            }(getCellValue(ascending ? el1 : el2, index), getCellValue(ascending ? el2 : el1, index));
        }
    }
    
    document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
        let others = document.querySelectorAll('th').forEach(other => other.removeAttribute('data-sortable'));
        this.ascending ? th.setAttribute('data-sortable', 'ascending') : th.setAttribute('data-sortable', 'descending');
        const table = th.closest('table');
        Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
            .sort(compare(Array.from(th.parentNode.children).indexOf(th), this.ascending = !this.ascending))
            .forEach(tr => table.appendChild(tr));
    })));
};

exports.makeSortable = makeSortable;