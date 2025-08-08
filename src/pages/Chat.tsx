import { useEffect, useMemo, useRef, useState } from "react";
import SEO from "@/components/SEO";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Paperclip, Send, Mic, StopCircle, Download, Volume2, VolumeX, Search } from "lucide-react";
import jsPDF from "jspdf";

interface Message { id: string; role: "user" | "assistant"; text: string; files?: File[]; audioUrl?: string }

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "m1", role: "assistant", text: "Hi! I'm your AI assistant. How can I help today?" },
  ]);
  const [input, setInput] = useState("");
  const [personality, setPersonality] = useState("professional");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voice, setVoice] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const voices = useMemo(() => window.speechSynthesis?.getVoices?.() ?? [], []);

  useEffect(() => {
    // ensure voices are loaded
    const onVoices = () => setVoice((v) => v || window.speechSynthesis.getVoices()[0]?.name || "");
    window.speechSynthesis?.addEventListener("voiceschanged", onVoices);
    onVoices();
    return () => window.speechSynthesis?.removeEventListener("voiceschanged", onVoices);
  }, []);

  const filtered = messages.filter(m => m.text.toLowerCase().includes(searchTerm.toLowerCase()));

  const speak = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    const v = window.speechSynthesis.getVoices().find(v => v.name === voice);
    if (v) utter.voice = v;
    setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = { id: crypto.randomUUID(), role: "user", text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    // Simulate AI typing & response
    setTimeout(() => {
      const style = personality === "professional" ? "Certainly." : personality === "casual" ? "Sure thing!" : "Here's a creative spin:";
      const reply: Message = { id: crypto.randomUUID(), role: "assistant", text: `${style} ${generateResponse(newMsg.text)}` };
      setMessages((prev) => [...prev, reply]);
      speak(reply.text);
    }, 800);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fs = Array.from(files);
    const text = `Uploaded ${fs.length} file(s): ${fs.map(f => f.name).join(", ")}`;
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", text, files: fs }]);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const rec = new MediaRecorder(stream);
    mediaRecorderRef.current = rec;
    chunksRef.current = [];
    rec.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    rec.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", text: "Voice message", audioUrl: url }]);
    };
    rec.start();
    setListening(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setListening(false);
  };

  const exportText = () => {
    const content = messages.map(m => `${m.role.toUpperCase()}: ${m.text}`).join("\n\n");
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'conversation.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const exportPDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const margin = 40; let y = margin; const lineHeight = 16; const maxWidth = 515;
    doc.setFontSize(12);
    messages.forEach((m) => {
      const lines = doc.splitTextToSize(`${m.role.toUpperCase()}: ${m.text}`, maxWidth);
      lines.forEach((line: string) => {
        if (y > 800 - margin) { doc.addPage(); y = margin; }
        doc.text(line, margin, y);
        y += lineHeight;
      });
      y += 8;
    });
    doc.save('conversation.pdf');
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <SEO title="AI Chat" description="Real-time AI chat with voice, files, and export." canonical={window.location.href} />
      <Card className="glass">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-full ai-ring ${listening ? 'animate-pulse' : ''}`}></div>
            <CardTitle>Chat</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-2 py-1.5 rounded-md border">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search messages" className="border-0 focus-visible:ring-0" />
            </div>
            <Select value={personality} onValueChange={setPersonality}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Personality"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
              </SelectContent>
            </Select>
            <Select value={voice} onValueChange={setVoice}>
              <SelectTrigger className="w-[200px]"><SelectValue placeholder="TTS voice"/></SelectTrigger>
              <SelectContent>
                {voices.map(v => <SelectItem key={v.name} value={v.name}>{v.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={exportText}><Download className="h-4 w-4 mr-2"/>Text</Button>
            <Button size="sm" onClick={exportPDF}><Download className="h-4 w-4 mr-2"/>PDF</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 max-h-[60vh] overflow-auto pr-2">
          {filtered.map((m)=> (
            <div key={m.id} className={`flex ${m.role==='user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-xl border ${m.role==='user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <div className="whitespace-pre-wrap">{m.text}</div>
                {m.files?.length ? (
                  <div className="mt-2 text-xs opacity-80">{m.files.map(f=>f.name).join(', ')}</div>
                ) : null}
                {m.audioUrl && (
                  <audio className="mt-2 w-full" src={m.audioUrl} controls />
                )}
              </div>
            </div>
          ))}
          {/* Typing indicator */}
          <div className="text-xs text-muted-foreground">{speaking ? 'Speaking...' : listening ? 'Listening...' : ''}</div>
        </CardContent>
        <CardFooter className="gap-2 flex-col md:flex-row">
          <div className="flex items-center gap-2 w-full">
            <Button variant="outline" size="icon" asChild>
              <label>
                <input className="hidden" multiple type="file" onChange={(e)=>handleFiles(e.target.files)} />
                <Paperclip className="h-4 w-4" />
              </label>
            </Button>
            <Textarea value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Type a message" className="min-h-[44px] max-h-28" />
            <Button onClick={handleSend}><Send className="h-4 w-4 mr-2"/>Send</Button>
          </div>
          <div className="flex items-center gap-2 self-end md:self-auto">
            {!listening ? (
              <Button variant="secondary" onClick={startRecording}><Mic className="h-4 w-4 mr-2"/>Voice</Button>
            ) : (
              <Button variant="destructive" onClick={stopRecording}><StopCircle className="h-4 w-4 mr-2"/>Stop</Button>
            )}
            {speaking ? (
              <Badge variant="secondary" className="inline-flex items-center gap-1"><Volume2 className="h-3 w-3"/>Speaking</Badge>
            ) : (
              <Badge className="inline-flex items-center gap-1" variant="outline"><VolumeX className="h-3 w-3"/>Muted</Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

function generateResponse(input: string) {
  return `You said: "${input}". Here's a helpful follow-up and next steps.`;
}
