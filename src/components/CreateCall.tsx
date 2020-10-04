import { message } from 'antd';
import getAscii from 'lib/getAscii';
import { useEffect, useRef, useState } from 'react';

const CreateCall = () => {
  const [peerId, setPeerId] = useState('');
  const [ascii, setAscii] = useState(null);

  const videoRef = useRef<any>();
  const audioRef = useRef<any>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      });

    import('peerjs').then((module) => {
      const Peer = module.default;
      const peer = new Peer();
      peer.on('open', (id) => {
        setPeerId(id);
        let conn: any = null;
        peer.on('connection', (_conn) => {
          console.log('connected');
          conn = _conn;
          conn.on('data', (data: any) => {
            console.log('received data');
            setAscii(data);
          });
        });

        navigator.mediaDevices
          .getUserMedia({
            audio: true,
          })
          .then((stream) => {
            peer.on('call', (call) => {
              console.log('received call');
              call.answer(stream);
              call.on('stream', (stream) => {
                console.log('received stream');
                audioRef.current.srcObject = stream;
              });
            });
          });

        const canvas = document.createElement('canvas');
        canvas.width = 160;
        canvas.height = 90;
        const ctx = canvas.getContext('2d') as any;

        setInterval(() => {
          if (conn) {
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const ascii = getAscii(canvas);
            conn.send(ascii);
          }
        }, 100);
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className={peerId ? '' : 'hidden'}>
        {ascii ? (
          <pre className="overflow-hidden">{ascii}</pre>
        ) : (
          <div className="text-3xl">
            Your call ID is:{' '}
            <span
              className="cursor-pointer font-semibold"
              onClick={() => {
                navigator.clipboard.writeText(peerId).then(() => {
                  message.open({
                    icon: <></>,
                    content: 'Copied!',
                    duration: 3,
                    type: 'info',
                    style: { fontSize: '1.5rem' },
                  });
                });
              }}
              title="Click to copy"
            >
              {peerId}
            </span>
          </div>
        )}
        <video
          autoPlay
          className="absolute rounded"
          ref={videoRef}
          style={{
            bottom: 16,
            right: 16,
            width: 320,
          }}
        ></video>
        <video autoPlay className="h-0" ref={audioRef}></video>
      </div>
      {!peerId && <div className="text-3xl">Loading...</div>}
    </div>
  );
};

export default CreateCall;
