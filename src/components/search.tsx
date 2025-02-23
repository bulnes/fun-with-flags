import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchProps {
  count: number;
  search: string;
  setSearch: (search: string) => void;
}

export default function Search({ count, search, setSearch }: SearchProps) {
  return (
    <>
      <div className="relative mb-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by country name..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none pr-11"
        />
        <span className="absolute inset-y-4 right-4 flex items-center">
          <MagnifyingGlassIcon className="size-4" />
        </span>
      </div>

      <span className="text-gray-600 text-sm pl-4">
        Showing {count} {count === 1 ? "country" : "countries"}
      </span>
    </>
  );
}
