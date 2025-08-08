import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', steps: 8200 },
  { day: 'Tue', steps: 10250 },
  { day: 'Wed', steps: 9500 },
  { day: 'Thu', steps: 12010 },
  { day: 'Fri', steps: 8700 },
  { day: 'Sat', steps: 14020 },
  { day: 'Sun', steps: 12600 },
];

export default function Health() {
  return (
    <div className="space-y-4 animate-fade-in">
      <SEO title="Health & Wellness" description="Track fitness, medications, mood, and appointments with AI insights." canonical={window.location.href} />
      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="reminders">Medication</TabsTrigger>
          <TabsTrigger value="mood">Mood</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Card className="glass">
            <CardHeader><CardTitle>Weekly Steps</CardTitle></CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <RTooltip />
                  <Area type="monotone" dataKey="steps" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSteps)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders">
          <Card className="glass">
            <CardHeader><CardTitle>Medication Reminder</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="med">Medication</Label>
                <Input id="med" placeholder="e.g., Ibuprofen" />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
              <Button className="sm:col-span-2">Add Reminder</Button>
              <p className="text-xs text-muted-foreground sm:col-span-2">Disclaimer: This tool is not a substitute for professional medical advice.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mood">
          <Card className="glass">
            <CardHeader><CardTitle>Mood Tracker</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="mood">Mood (1-10)</Label>
                <Input id="mood" type="number" min={1} max={10} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="note">Notes</Label>
                <Input id="note" placeholder="How are you feeling?" />
              </div>
              <Button className="sm:col-span-3">Save</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
