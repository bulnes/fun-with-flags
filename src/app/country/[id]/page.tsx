interface CountryProps {
  params: Promise<{ id: string }>;
}

export default async function Country({ params }: CountryProps) {
  const { id } = await params;

  return <div>Country: {id}</div>;
}
