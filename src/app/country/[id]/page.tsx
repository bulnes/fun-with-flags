"use client";

import { Country as CountryType } from "@/@types/country";
import { countriesApi } from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Country() {
  const name = "Brazil";

  const params = useParams<{ id: string }>();

  const [id, setId] = useState<string>();
  const [countries, setCountries] = useState<CountryType>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params?.id) {
      setId(params.id);
    }
  }, [params]);

  useEffect(() => {
    const fetchCountries = async () => {
      const [response, error] = await countriesApi.getCountry(id);
      setLoading(false);

      if (error) {
        setError(error);
        return;
      }

      setCountries(response);
    };

    if (id) {
      fetchCountries();
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

      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
        <div className="w-full max-w-[400px]">
          <Image
            src={"/flag-placehold.svg"}
            alt={`Flag of ${name}`}
            width={600}
            height={400}
            className="w-full h-full"
            priority
          />
        </div>

        <div className="p-6 text-sm text-gray-600">
          <h2 className="text-xl font-semibold mb-4">Brazil ({id})</h2>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <span>Capital:</span>
              <span>Brasília</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Region:</span>
              <span>South America</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Population:</span>
              <span>215000000</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Languages:</span>
              <span>Portuguese</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Currencies:</span>
              <span>BRL</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Top Level Domain:</span>
              <span>.br</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Border:</span>
              <span>ARG, BOL, URY, VEN</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
