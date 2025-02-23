interface SelectProps {
  options: string[];
  selected: string;
  setSelected: (selected: string) => void;
}

export default function Select({
  options,
  selected,
  setSelected,
}: SelectProps) {
  const selectOptions = ["All regions", ...options];

  return (
    <>
      <div className="relative mb-2">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none pr-11"
        >
          {selectOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </>
  );
}
