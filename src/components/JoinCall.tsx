import getAscii from 'lib/getAscii';
import { useEffect, useRef, useState } from 'react';

type Props = {
  callId: string;
};

const JoinCall = ({ callId }: Props) => {
  const [ascii, setAscii] = useState('');

  const videoRef = useRef<any>();
  const audioRef = useRef<any>();

  useEffect(() => {
    import('peerjs').then((module) => {
      const Peer = module.default;
      const peer = new Peer({
        host: 'polar-escarpment-94286.herokuapp.com',
        port: process.env.NODE_ENV === 'development' ? 80 : 443,
      });
      peer.on('open', (id) => {
        console.log('my peer id:', id);

        navigator.mediaDevices
          .getUserMedia({
            video: true,
          })
          .then((stream) => {
            videoRef.current.srcObject = stream;
          });
        navigator.mediaDevices
          .getUserMedia({
            audio: true,
          })
          .then((stream) => {
            console.log('calling', callId);
            peer.call(callId, stream);
          });

        console.log('connecting to', callId);
        const conn = peer.connect(callId);
        conn.on('open', () => {
          console.log('connection opened');
          conn.on('data', (data) => {
            setAscii(data);
          });
        });

        const canvas = document.createElement('canvas');
        canvas.width = 160;
        canvas.height = 90;
        const ctx = canvas.getContext('2d') as any;

        setInterval(() => {
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const ascii = getAscii(canvas);
          conn.send(ascii);
        }, 100);
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <pre className="overflow-hidden">{ascii}</pre>
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
  );
};

export default JoinCall;
