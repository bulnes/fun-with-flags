import { generateRandomId } from "@/utils/generators";

interface SelectProps {
  options: string[];
  selected: string;
  setSelected: (selected: string) => void;
  label: string;
}

export default function Select({
  options,
  selected,
  setSelected,
  label,
}: SelectProps) {
  const selectId = generateRandomId("select-");

  return (
    <>
      <div className="relative mb-2">
        <label htmlFor={selectId} className="sr-only">
          {label}
        </label>

        <select
          id={selectId}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none pr-11"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </>
  );
}
