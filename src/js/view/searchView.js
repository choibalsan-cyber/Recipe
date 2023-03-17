import { elements } from './base';
//  image_url: 'http:forkify-api.herokuapp.com/images/burger53be.jpg';
//  publisher: 'The Pioneer Woman';
//  publisher_url: 'http:thepioneerwoman.com';
//  recipe_id: '46892';
//  social_rank: 99.99999283988569;
//  source_url: 'http:thepioneerwoman.com/cooking/2012/10/supreme-pizza-burgers/';
//  title: 'Supreme Pizza Burgers';

const renderRecipe = (recipe) => {
  /*
 
  */
  const markup = `
  <li>
    <a class="results__link" href="${recipe.recipe_id}">
      <figure class="results__fig">
        <img src=${recipe.image_url} alt="imageName" />
      </figure>
      <div class="results__data">
        <h4 class="results__name">${recipe.title}</h4>
        <p class="results__author">${recipe.publisher}</p>
      </div>
    </a>
  </li> 
  `;
  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

export const clearSearchQuery = () => (elements.searchInput.value = '');

export const clearSearchResultList = () => {
  elements.searchResultList.innerHTML = '';
  elements.pagesResult.innerHTML = '';
};

export const getSearchInput = () => elements.searchInput.value;
const createButton = (currentPage, type, direction) => {
  let buttonHtml = `
    <button class="btn-inline results__btn--${type}" data-goto=${currentPage}>
        <span>Хуудас ${currentPage}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${direction}"></use>
        </svg>
    </button>`;
  if (type === '' && direction === '') buttonHtml = '';

  elements.pagesResult.insertAdjacentHTML('afterbegin', buttonHtml);
};

const renderButton = (currentPage, totalPages) => {
  if (currentPage === 1 && totalPages > 1) {
    // Эхний хуудас дээр байна
    createButton(currentPage + 1, 'next', 'right');
  } else if (currentPage === totalPages) {
    // Сүүлийн хуудас дээр байна
    if (currentPage === 1 && totalPages === 1) {
      createButton(currentPage, '', '');
    } else createButton(currentPage - 1, 'prev', 'left');
  } else if (currentPage < totalPages) {
    // Голын хуудас дээр байна
    createButton(currentPage - 1, 'prev', 'left');
    createButton(currentPage + 1, 'next', 'right');
  }
};

export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
  //  Хайлтын үр дүнг хуудаслах
  const start = (currentPage - 1) * resPerPage;
  const end = currentPage * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);

  //  Хуудасны товчуудыг гаргаж ирэх
  const totalPages = Math.ceil(recipes.length / resPerPage);

  renderButton(currentPage, totalPages);
};
