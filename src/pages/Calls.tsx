import SEO from "@/components/SEO";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Mic, MicOff, Volume2, VolumeX, PhoneOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Calls() {
  const [inCall, setInCall] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(true);
  const [noise, setNoise] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let t: number | undefined;
    if (inCall) {
      // simple noise pulse
      t = window.setInterval(() => setNoise(n => !n), 1200);
    }
    return () => { if (t) clearInterval(t); };
  }, [inCall]);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    streamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }
    setInCall(true);
  };
  const endCall = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    setInCall(false);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <SEO title="Voice/Video Calls" description="Talk to your AI with voice & video, with recording and noise detection UI." canonical={window.location.href} />
      <Card className="glass">
        <CardHeader><CardTitle>AI Call</CardTitle></CardHeader>
        <CardContent>
          <div className="aspect-video w-full rounded-xl overflow-hidden border bg-muted relative">
            {!inCall && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">Camera preview</div>
            )}
            <video ref={videoRef} className="w-full h-full object-cover" muted={muted} />
            <div className="absolute top-3 right-3 inline-flex items-center gap-2 text-xs px-2 py-1 rounded-md bg-background/70 border">
              <div className={`h-2 w-2 rounded-full ${noise ? 'bg-destructive' : 'bg-accent'}`} />
              Noise {noise ? 'high' : 'ok'}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center gap-2">
          {!inCall ? (
            <Button onClick={startCall}><Video className="h-4 w-4 mr-2"/>Start Call</Button>
          ) : (
            <>
              <Button variant={muted ? 'destructive' : 'secondary'} onClick={()=>setMuted(m=>!m)}>
                {muted ? <MicOff className="h-4 w-4 mr-2"/> : <Mic className="h-4 w-4 mr-2"/>}
                {muted ? 'Unmute' : 'Mute'}
              </Button>
              <Button variant={volume ? 'secondary' : 'outline'} onClick={()=>setVolume(v=>!v)}>
                {volume ? <Volume2 className="h-4 w-4 mr-2"/> : <VolumeX className="h-4 w-4 mr-2"/>}
                {volume ? 'Speaker On' : 'Speaker Off'}
              </Button>
              <Button variant="destructive" onClick={endCall}><PhoneOff className="h-4 w-4 mr-2"/>End</Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
