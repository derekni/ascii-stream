import JoinCall from 'components/JoinCall';
import { useRouter } from 'next/dist/client/router';

const JoinCallPage = () => {
  const router = useRouter();
  const { callId } = router.query;
  return callId ? <JoinCall callId={callId as any} /> : null;
};

export default JoinCallPage;
