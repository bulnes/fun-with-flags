"use client";

import { Country as CountryType } from "@/@types/country";
import { countriesApi } from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Country() {
  const params = useParams<{ id: string }>();

  const [id, setId] = useState<string>();
  const [country, setCountry] = useState<CountryType>();
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
        <div className="w-full max-w-[400px] aspect-video">
          <Image
            src={country?.flags?.svg || "/flag-placehold.svg"}
            alt={`Flag of ${country?.name?.common}`}
            width={600}
            height={400}
            className="w-full h-full rounded"
            priority
          />
        </div>

        <div className="p-6 text-sm text-gray-600">
          <h2 className="text-xl font-semibold mb-4">
            {country?.name.common} ({country?.cca3})
          </h2>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <span>Capital:</span>
              <span>{country?.capital}</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Region:</span>
              <span>{country?.region}</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Population:</span>
              <span>{country?.population}</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Languages:</span>
              <span>{Object.values(country?.languages || {})}</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Currencies:</span>
              <span>{Object.keys(country?.currencies || {})}</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Top Level Domain:</span>
              <span>{country?.tld}</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Border:</span>
              <span>{country?.borders?.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
