import Search from './model/search';
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from './view/searchView';
import Recipe from './model/recipe';
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

elements.pagesResult.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-inline');
  btn;

  if (btn) {
    const pageN = parseInt(btn.dataset.goto, 10);
    searchView.clearSearchResultList();
    searchView.renderRecipes(state.search.result, pageN);
  }
});

const r = new Recipe(47746);
r.getRecipe();
