let entriesTable = require('../blocks/entries-table/entries-table');
let tag = require('../blocks/tag/tag');
let search = require('../blocks/search/search');
let tagChecker = require('../blocks/tag-checker/tag-checker');

entriesTable.makeSortable();
tag.tagSearchable();
search.initOmnibox();
tagChecker.init();
