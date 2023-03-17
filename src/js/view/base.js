export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResultDiv: document.querySelector('.results'),
  searchResultList: document.querySelector('.results__list'),
};

export const elementsString = {
  loader: 'loader1',
};

export const renderLoader = (parent) => {
  const loader = `<div class=${elementsString.loader}>Loading...</div>`;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementsString.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};
