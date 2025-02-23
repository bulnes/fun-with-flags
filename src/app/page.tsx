"use client";

import { Country } from "@/@types/country";
import { Card, Grid, Search, Select } from "@/components";
import { countriesApi } from "@/services/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const allRegionsLabel = "All regions";

  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(allRegionsLabel);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const [response, error] = await countriesApi.getAll();
      setLoading(false);

      if (error) {
        setError(error);
        return;
      }

      setCountries(response);
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const regionOptions = [
    "All regions",
    ...new Set(countries.map((country) => country.region).sort()),
  ];

  const sortedCountries = countries.sort((a, b) =>
    a.name.common.localeCompare(b.name.common, "en-US")
  );

  const filteredCountries = sortedCountries.filter((country) => {
    const nameMatches = country.name.common
      .toLowerCase()
      .includes(search.toLowerCase());

    const regionMatches =
      selected === allRegionsLabel || country.region === selected;

    return nameMatches && regionMatches;
  });

  return (
    <>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="col-span-1">
          <Search
            count={filteredCountries.length}
            search={search}
            setSearch={setSearch}
          />
        </div>

        <div className="hidden xl:block xl:col-span-1" />

        <div className="col-span-1">
          <Select
            label="Filter by region"
            options={regionOptions}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>

      <Grid>
        {filteredCountries.map((country, index) => {
          const { cca3, flags, name, capital, region, population } = country;
          const { svg: flag } = flags || { svg: "" };
          const { common: countryName } = name || { common: "" };
          const [capitalName] = capital || [""];

          return (
            <Link key={cca3} href={`/country/${cca3}`}>
              <Card
                index={index}
                flag={flag}
                name={countryName}
                capital={capitalName}
                region={region}
                population={population}
              />
            </Link>
          );
        })}
      </Grid>
    </>
  );
}
