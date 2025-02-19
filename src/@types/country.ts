export type Country = {
  cca3: string;
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
  capital: string[];
  region: string;
  population: number;
  tld?: string[];
  languages?: Record<string, string>;
  borders?: string[];
  currencies?: Record<string, string>;
};
