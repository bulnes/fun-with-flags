"use client";

import { Card, Grid } from "@/components";
import { countriesApi } from "@/services/api";
import Link from "next/link";
import { useEffect, useState } from "react";

type Country = {
  cca3: string;
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
  capital: string[];
  region: string;
  population: number;
};

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
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

  return (
    <Grid>
      {countries.map((country, index) => {
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
  );
}
