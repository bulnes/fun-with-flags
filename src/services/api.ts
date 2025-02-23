const ApiClient = (baseURL: string) => ({
  async get(endpoint: string) {
    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        cache: 'force-cache',
      });

      if (!response.ok) {
        return [null, response.statusText];
      }

      const data = await response.json();
      return [data, null];
    } catch (error) {
      const { message } = error as Error;
      return [null, message || "An error occurred"];
    }
  }
});

const countriesApiClient = ApiClient("https://restcountries.com/v3.1");

const countriesApi = {
  getAll: () => countriesApiClient.get("/all?filters=cca3,flags,name,capital,region,population"),
  getCountry: (id: string) => countriesApiClient.get(`/alpha/${id}?fields=cca3,flags,name,capital,region,population,languages,tld,borders,currencies`)
};

export { countriesApi };
