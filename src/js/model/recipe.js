import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    let result = await axios(
      'https://forkify-api.herokuapp.com/api/get?rId=' + this.id
    );
    result = result.data.recipe;

    this.publisher = result.publisher;
    this.image_url = result.image_url;
    this.ingredients = result.ingredients;
    this.publisher_url = result.publisher_url;
    this.social_rank = result.social_rank;
    this.source_url = result.source_url;
    this.title = result.title;
    console.log(this.title);
    console.log(this.ingredients);
  }
}
