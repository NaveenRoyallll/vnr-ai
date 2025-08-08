import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Calendar, Mail, Zap, ShoppingCart, Bot } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <SEO title="Jarvis Dashboard" description="AI assistant dashboard with chat, automations, health, shopping and more." canonical={window.location.href} />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Quick Actions</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button asChild size="sm"><Link to="/chat"><Bot className="h-4 w-4 mr-2"/>Ask AI</Link></Button>
            <Button asChild variant="secondary" size="sm"><Link to="/workflows"><Zap className="h-4 w-4 mr-2"/>Automate</Link></Button>
            <Button asChild variant="outline" size="sm"><Link to="/calls"><Mail className="h-4 w-4 mr-2"/>Start Call</Link></Button>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Health Progress</CardTitle></CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground mb-1">Weekly activity</div>
            <Progress value={68} className="h-2" />
            <div className="text-xs mt-2">Goal: 10k steps/day</div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Upcoming</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between text-sm"><div className="flex items-center gap-2"><Calendar className="h-4 w-4"/>Team standup</div><Badge>9:30</Badge></div>
            <div className="flex items-center justify-between text-sm"><div className="flex items-center gap-2"><Mail className="h-4 w-4"/>Reply to clients</div><Badge variant="secondary">Today</Badge></div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Shopping Deals</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm"><ShoppingCart className="h-4 w-4"/> 3 new price drops</div>
            <Button asChild className="mt-3" size="sm"><Link to="/shopping">View</Link></Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="glass lg:col-span-2">
          <CardHeader><CardTitle>Recent Conversations</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {["Project plan", "Travel itinerary", "Summarize report"].map((t, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-green-500"/><span>{t}</span></div>
                <Button asChild variant="outline" size="sm"><Link to="/chat">Open</Link></Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader><CardTitle>Automation Summary</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><Zap className="h-4 w-4"/> 4 active workflows</div>
            <div className="flex items-center gap-2"><Activity className="h-4 w-4"/> 23 tasks ran today</div>
            <Button asChild className="mt-2" size="sm"><Link to="/workflows">Manage</Link></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
