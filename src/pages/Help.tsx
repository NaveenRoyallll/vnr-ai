import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List } from "lucide-react";

export default function Help() {
  return (
    <div className="space-y-4 animate-fade-in">
      <SEO title="Help & Onboarding" description="Tutorials, tips, and keyboard shortcuts to master the platform." canonical={window.location.href} />
      <Card className="glass">
        <CardHeader><CardTitle className="flex items-center gap-2"><List className="h-4 w-4"/> Quick Start</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>1. Open Chat to talk with the AI.</p>
          <p>2. Connect Integrations to unlock automations.</p>
          <p>3. Build Workflows to automate tasks.</p>
          <p>4. Customize Settings and notifications.</p>
        </CardContent>
      </Card>
    </div>
  );
}
