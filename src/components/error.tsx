import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface ErrorProps {
  text: string;
}

export default function Error({ text }: ErrorProps) {
  return (
    <div className="flex flex-col m-auto items-center">
      <ExclamationCircleIcon className="size-6 mb-2" />
      <span className="text-sm mb-1">Oops, something went wrong!</span>
      <span className="text-sm">{text}</span>
    </div>
  );
}
