import SEO from "@/components/SEO";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function WebsiteBuilder() {
  const [html, setHtml] = useState(`<section class="p-10 text-center">
  <h1 class="text-4xl font-bold">Hello World</h1>
  <p class="text-muted-foreground mt-2">Edit the code to update this preview.</p>
</section>`);

  return (
    <div className="space-y-4 animate-fade-in">
      <SEO title="Website Builder" description="Visual website builder with templates, code editor and live preview." canonical={window.location.href} />
      <Tabs defaultValue="canvas">
        <TabsList>
          <TabsTrigger value="canvas">Canvas</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="canvas">
          <Card className="glass">
            <CardHeader><CardTitle>Drag Components</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-3 gap-3">
              {['Hero', 'Features', 'CTA'].map((b)=> (
                <div key={b} className="p-3 rounded-md border bg-muted hover-scale text-center">{b}</div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="code">
          <Card className="glass">
            <CardHeader><CardTitle>Code Editor</CardTitle></CardHeader>
            <CardContent>
              <textarea value={html} onChange={(e)=>setHtml(e.target.value)} className="w-full h-64 rounded-md border p-3 font-mono text-sm" />
            </CardContent>
            <CardFooter className="justify-end"><Button>Export</Button></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="preview">
          <Card className="glass">
            <CardHeader><CardTitle>Live Preview</CardTitle></CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden" dangerouslySetInnerHTML={{ __html: html }} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
