import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Calendar, Mail, Slack, Twitter, Trello, Cloud, Play } from "lucide-react";

const INTEGRATIONS = [
  { name: 'Gmail', icon: Mail },
  { name: 'Google Calendar', icon: Calendar },
  { name: 'Slack', icon: Slack },
  { name: 'Twitter/X', icon: Twitter },
  { name: 'GitHub', icon: Github },
  { name: 'Vercel', icon: Cloud },
];

export default function Integrations() {
  return (
    <div className="space-y-4 animate-fade-in">
      <SEO title="Integrations" description="Connect your tools like Gmail, Slack, GitHub and more." canonical={window.location.href} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {INTEGRATIONS.map(({ name, icon: Icon }) => (
          <Card key={name} className="glass">
            <CardHeader><CardTitle className="flex items-center gap-2"><Icon className="h-4 w-4" /> {name}</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between">
              <Badge variant="secondary">Mock</Badge>
              <Button variant="outline">Connect</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
