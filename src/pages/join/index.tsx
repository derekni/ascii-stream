import { useRouter } from 'next/dist/client/router';
import { ReactElement, useState } from 'react';

const JoinPage = (): ReactElement => {
  const router = useRouter();
  const [callId, setCallId] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <input
        className="h-12 text-black text-lg mb-12 px-4 rounded w-64"
        placeholder="Call ID"
        value={callId}
        onChange={(e) => {
          setCallId(e.target.value);
        }}
      />
      <button
        className="bg-white block h-12 mb-4 rounded text-black text-lg w-64 hover:bg-gray-200"
        onClick={() => {
          router.push(`join/${callId}`);
        }}
      >
        Join
      </button>
      <button
        className="bg-white block h-12 rounded text-black text-lg w-64 hover:bg-gray-200"
        onClick={() => {
          router.push('/');
        }}
      >
        Back
      </button>
    </div>
  );
};

export default JoinPage;
