import Search from './model/search';
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from './view/searchView';
import Recipe from './model/recipe';
import * as recipeView from './view/recipeView';

/*********
 * Web app төлөв
 * query
 */
const state = {};

// Хайлтын контроллер
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

// Жорын контроллер
const controlRecipe = async () => {
  // 1. Жорыг ID-г авна
  let id = window.location.hash.replace('#', '');

  console.log(id);
  // 2. ID-р recipe обьект үүсгэнэ
  state.recipe = new Recipe(id);

  // 3. Дэлгэцийг бэлтгэнэ
  recipeView.clearRecipe();
  renderLoader(elements.recipeDiv);

  // 4. Жороо татаж авчирна
  await state.recipe.getRecipe();
  // 5. Цаг хугацаа болон хэдэн хүний орцыг тооцоолно
  clearLoader();
  state.recipe.calcTime();
  state.recipe.calcHuniiToo();

  // 6. Дэлгэцэнд харуулна
  recipeView.renderRecipe(state.recipe);
  console.log(state.recipe);
};

// hashchange буюу window обьектийн хаяг өөрчлөгдөх бүрт дуудагддаг эвент листенер
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
