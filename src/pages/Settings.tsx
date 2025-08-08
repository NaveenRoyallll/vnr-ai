import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

export default function Settings() {
  const [name, setName] = useState("Alex Doe");
  const [email, setEmail] = useState("alex@example.com");
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();

  return (
    <div className="space-y-4 animate-fade-in">
      <SEO title="Settings" description="Manage profile, preferences, and notifications." canonical={window.location.href} />
      <Card className="glass">
        <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
        <CardContent className="grid sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              {avatarUrl ? <img src={avatarUrl} alt="User avatar" /> : <AvatarFallback>AD</AvatarFallback>}
            </Avatar>
            <label className="text-sm underline cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={(e)=>{
                const f = e.target.files?.[0];
                if (f) setAvatarUrl(URL.createObjectURL(f));
              }} />
              Upload Avatar
            </label>
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e)=>setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
