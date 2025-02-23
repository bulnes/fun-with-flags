import { HeartIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <footer className="py-6 mt-8">
      <p className="flex items-center justify-center gap-1">
        Made with <HeartIcon className="size-4" title="Love" /> by Bruno Bulnes
      </p>
    </footer>
  );
}
