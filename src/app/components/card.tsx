/* eslint-disable @next/next/no-img-element */

interface CardProps {
  country: string;
  capital: string;
  region: string;
  population: number;
}

export default function Card({
  country,
  capital,
  region,
  population,
}: CardProps) {
  return (
    <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="aspect-video w-full">
        <img
          src="https://placehold.co/600x400"
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 text-sm text-gray-600">
        <h2 className="text-xl font-semibold mb-4">{country}</h2>

        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <span>Capital:</span>
            <span>{capital}</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Region:</span>
            <span>{region}</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Population:</span>
            <span>{population}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
