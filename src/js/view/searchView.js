import { elements } from './base';
// image_url: 'http://forkify-api.herokuapp.com/images/burger53be.jpg';
// publisher: 'The Pioneer Woman';
// publisher_url: 'http://thepioneerwoman.com';
// recipe_id: '46892';
// social_rank: 99.99999283988569;
// source_url: 'http://thepioneerwoman.com/cooking/2012/10/supreme-pizza-burgers/';
// title: 'Supreme Pizza Burgers';

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

export const clearSearchResultList = () =>
  (elements.searchResultList.innerHTML = '');

export const getSearchInput = () => elements.searchInput.value;

export const renderRecipes = (recipes) => {
  recipes.forEach(renderRecipe);
};
