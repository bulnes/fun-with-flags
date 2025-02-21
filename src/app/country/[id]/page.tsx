"use client";

import { DetailedCountry } from "@/@types/detailed-country";
import { countriesApi } from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Country() {
  const params = useParams<{ id: string }>();

  const [id, setId] = useState<string>();
  const [country, setCountry] = useState<DetailedCountry>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params?.id && params.id !== id) {
      setId(params.id);
    }
  }, [params, id]);

  useEffect(() => {
    const fetchCountry = async () => {
      const [response, error] = await countriesApi.getCountry(id as string);
      setLoading(false);

      if (error) {
        setError(error);
        return;
      }

      setCountry(response);
    };

    if (id) {
      fetchCountry();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const {
    cca3,
    flags,
    name,
    capital,
    region,
    population,
    languages,
    currencies,
    tld,
    borders,
  } = country || {};

  const { svg: flag } = flags || { svg: "" };
  const { common: countryName } = name || { common: "" };
  const [capitalName] = capital || [""];

  const languagesNames = Object.values(languages || {}).join(", ");
  const currenciesNames = Object.values(currencies || {})
    .map(({ name, symbol }) => `${name} (${symbol})`)
    .join(", ");
  const [topLevelDomain] = tld || [];
  const bordersNames = borders?.join(", ");

  return (
    <>
      <div className="mb-8">
        <Link href="/">
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 font-semibold py-2 px-4 rounded"
          >
            Back
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 items-center">
        <div className="flex items-center max-w-[400px]">
          <Image
            src={flag || "/flag-placehold.svg"}
            alt={`Flag of ${countryName}`}
            width={600}
            height={400}
            className="rounded-lg max-h-80 object-cover"
            priority
          />
        </div>

        <div className="p-6 text-sm text-gray-600">
          <h2 className="text-xl font-semibold mb-4">
            {countryName} ({cca3})
          </h2>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <span>Capital:</span>
              <span>{capitalName}</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Region:</span>
              <span>{region}</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Population:</span>
              <span>{population}</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Languages:</span>
              <span>{languagesNames}</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Currencies:</span>
              <span>{currenciesNames}</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Top Level Domain:</span>
              <span>{topLevelDomain}</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Border:</span>
              <span>{bordersNames}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
