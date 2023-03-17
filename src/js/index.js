import Search from './model/search';
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from './view/searchView';

/*********
 * Web app төлөв
 * query
 */

const controlSearch = async () => {
  // 1. Хайлтын query-г дэлгэцнээс гаргаж авна
  const query = searchView.getSearchInput();

  if (query) {
    // 2. Хайлтын query-р Хайлтын шинэ обьект үүсгэнэ
    state.search = new Search(query);

    // 3. Хайлтанд зориулж дэлгэцийн UI бэлтгэнэ
    searchView.clearSearchQuery();
    searchView.clearSearchResultList();
    renderLoader(elements.searchResultDiv);

    // 4. Хайлтыг гүйцэтгэнэ
    await state.search.doSearch();

    // 5. Хайлтын үр дүнг дэлгэцэнд үзүүлнэ
    clearLoader();
    if (state.search.result === undefined) alert('Хайлтаар илэрцгүй');
    else searchView.renderRecipes(state.search.result);
  }
};

const state = {};
elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});
