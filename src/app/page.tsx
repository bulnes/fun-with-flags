import { Card, Footer, Header } from "./components";

const countries = [
  {
    id: 1,
    country: "Brazil",
    capital: "Brasília",
    region: "Americas",
    population: 206135893,
  },
  {
    id: 2,
    country: "Germany",
    capital: "Berlin",
    region: "Europe",
    population: 81770900,
  },
  {
    id: 3,
    country: "India",
    capital: "New Delhi",
    region: "Asia",
    population: 1295210000,
  },
  {
    id: 4,
    country: "Nigeria",
    capital: "Abuja",
    region: "Africa",
    population: 186988000,
  },
  {
    id: 5,
    country: "United States",
    capital: "Washington, D.C.",
    region: "Americas",
    population: 323947000,
  },
  {
    id: 6,
    country: "China",
    capital: "Beijing",
    region: "Asia",
    population: 1377422166,
  },
  {
    id: 7,
    country: "Indonesia",
    capital: "Jakarta",
    region: "Asia",
    population: 258705000,
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {countries.map(({ id, country, capital, region, population }) => (
          <Card
            key={id}
            country={country}
            capital={capital}
            region={region}
            population={population}
          />
        ))}
      </main>
      <Footer />
    </>
  );
}
