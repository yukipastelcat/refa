let entriesTable = require('../blocks/entries-table/entries-table');
let tag = require('../blocks/tag/tag');
let search = require('../blocks/search/search')

entriesTable.makeSortable();
tag.tagSearchable();
search.initOmnibox();
