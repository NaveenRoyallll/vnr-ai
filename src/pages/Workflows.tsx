import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useState } from "react";

interface Node { id: string; x: number; y: number; label: string }

export default function Workflows() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'n1', x: 40, y: 40, label: 'Trigger: Time' },
    { id: 'n2', x: 260, y: 180, label: 'Action: Send Email' },
  ]);

  const onDrag = (id: string, e: React.DragEvent<HTMLDivElement>) => {
    const rect = (e.target as HTMLDivElement).parentElement!.getBoundingClientRect();
    setNodes(ns => ns.map(n => n.id === id ? { ...n, x: e.clientX - rect.left - 60, y: e.clientY - rect.top - 20 } : n));
  };

  const addNode = () => setNodes(ns => [...ns, { id: crypto.randomUUID(), x: 120, y: 120, label: 'Action: Slack' }]);

  return (
    <div className="space-y-4 animate-fade-in">
      <SEO title="Workflow Builder" description="Visual drag-and-drop automation builder with templates." canonical={window.location.href} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Workflows</h1>
        <Button onClick={addNode}><Plus className="h-4 w-4 mr-2"/>Add Node</Button>
      </div>
      <Card className="glass">
        <CardHeader><CardTitle>Canvas</CardTitle></CardHeader>
        <CardContent>
          <div className="relative h-[420px] rounded-lg border bg-muted overflow-hidden">
            {nodes.map(n => (
              <div
                key={n.id}
                className="absolute select-none p-2 rounded-md border bg-background shadow hover-scale cursor-move"
                style={{ left: n.x, top: n.y }}
                draggable
                onDragEnd={(e)=>onDrag(n.id, e)}
              >
                <Badge variant="secondary" className="mb-1">Node</Badge>
                <div className="text-sm">{n.label}</div>
              </div>
            ))}
            {/* simple connector */}
            <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
              <line x1={80} y1={60} x2={280} y2={200} stroke="hsl(var(--ring))" strokeDasharray="6 4" />
            </svg>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
