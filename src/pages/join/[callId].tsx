import { useRouter } from 'next/dist/client/router';
import dynamic from 'next/dynamic';

const JoinCall = dynamic(import('components/JoinCall'));

const JoinCallPage = () => {
  const router = useRouter();
  const { callId } = router.query;
  return callId ? <JoinCall callId={callId as any} /> : null;
};

export default JoinCallPage;
