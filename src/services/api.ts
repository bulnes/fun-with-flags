const ApiClient = (baseURL: string) => ({
  async get(endpoint: string) {
    try {
      const response = await fetch(`${baseURL}${endpoint}`);

      if (!response.ok) {
        return [null, response.statusText];
      }

      const data = await response.json();
      return [data, null];
    } catch (error) {
      return [null, error];
    }
  }
});

const api = ApiClient("https://restcountries.com/v3.1");

const countriesApi = {
  getAll: () => api.get("/all?filters=cca3,flags,name,capital,region,population")
};

export { countriesApi };
