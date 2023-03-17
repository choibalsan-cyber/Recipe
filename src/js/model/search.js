import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }
  async doSearch() {
    try {
      const result = await axios(
        'https://forkify-api.herokuapp.com/api/search?q=' + this.query
      );
      this.result = result.data.recipes;
      return this.recipes;
    } catch (err) {
      console.log('Алдаа гарлаа : ' + err);
    }
  }
}
