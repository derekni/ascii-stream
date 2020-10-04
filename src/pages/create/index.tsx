import dynamic from 'next/dynamic';

const CreateCall = dynamic(import('components/CreateCall'), { ssr: false });

const CreateCallPage = () => {
  return <CreateCall />;
};

export default CreateCallPage;
