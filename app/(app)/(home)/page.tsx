import { getPayloadClient } from '@/lib/payload';

export default async function Home() {
  const payload = await getPayloadClient();

  const data = await payload.find({
    collection: 'users',
  });

  return (
    <h1>
      {JSON.stringify(data, null, 2)}
    </h1>
  );
}


