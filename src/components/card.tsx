import Image from "next/image";

interface CardProps {
  index: number;
  flag: string;
  name: string;
  capital: string;
  region: string;
  population: number;
}

export default function Card({
  index,
  flag,
  name,
  capital,
  region,
  population,
}: CardProps) {
  return (
    <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="aspect-video w-full">
        <Image
          src={flag || "/flag-placehold.svg"}
          alt={`Flag of ${name}`}
          width={600}
          height={400}
          className="w-full h-full object-cover"
          priority={index < 4}
        />
      </div>
      <div className="p-6 text-sm text-gray-600">
        <h2 className="text-xl font-semibold mb-4">{name}</h2>

        <div className="space-y-2">
          <div>
            <span>Capital:</span> {capital}
          </div>

          <div>
            <span>Region:</span> {region}
          </div>

          <div>
            <span>Population:</span> {population}
          </div>
        </div>
      </div>
    </div>
  );
}
