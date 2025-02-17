import Image from "next/image";
import Link from "next/link";

interface CountryProps {
  params: Promise<{ id: string }>;
}

export default async function Country({ params }: CountryProps) {
  const { id } = await params;
  const name = "Brazil";

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
          />
        </div>

        <div className="p-6 text-sm text-gray-600">
          <h2 className="text-xl font-semibold mb-4">Brazil {id}</h2>

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
