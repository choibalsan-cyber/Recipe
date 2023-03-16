import Search from './model/search';

const r = new Search('pasta');

r.doSearch().then((r) => console.log(r));
