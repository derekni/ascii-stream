import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { ReactElement } from 'react';

const IndexPage = (): ReactElement => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Index</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="mb-12 text-6xl">Ascii Stream</div>
        <button
          className="bg-white block h-12 mb-4 rounded text-black text-lg w-64 hover:bg-gray-200"
          onClick={() => {
            router.push('create');
          }}
        >
          Create
        </button>
        <button
          className="bg-white block h-12 rounded text-black text-lg w-64 hover:bg-gray-200"
          onClick={() => {
            router.push('join');
          }}
        >
          Join
        </button>
      </div>
    </>
  );
};

export default IndexPage;
