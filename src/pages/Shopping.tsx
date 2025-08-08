import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";

const DATA = [
  { name: 'Wireless Headphones', amazon: 129.99, ebay: 119.5, bestbuy: 124.0 },
  { name: '4K Monitor 27"', amazon: 329.0, ebay: 315.0, bestbuy: 349.99 },
  { name: 'Mechanical Keyboard', amazon: 89.0, ebay: 84.99, bestbuy: 92.0 },
];

export default function Shopping() {
  const [q, setQ] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const list = useMemo(() => DATA.filter(d => d.name.toLowerCase().includes(q.toLowerCase())), [q]);

  return (
    <div className="space-y-4 animate-fade-in">
      <SEO title="Shopping Assistant" description="Compare prices, manage wishlist, and find deals with AI recommendations." canonical={window.location.href} />
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Shopping</h1>
        <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search products" className="max-w-xs" />
      </div>
      <Card className="glass">
        <CardHeader><CardTitle>Price Comparison</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Amazon</TableHead>
                <TableHead>eBay</TableHead>
                <TableHead>BestBuy</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map(row => {
                const best = Math.min(row.amazon, row.ebay, row.bestbuy);
                return (
                  <TableRow key={row.name} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>{row.amazon.toFixed(2)}</TableCell>
                    <TableCell>{row.ebay.toFixed(2)}</TableCell>
                    <TableCell>{row.bestbuy.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">Best: ${best.toFixed(2)}</Badge>
                      <Button size="sm" variant={wishlist.includes(row.name) ? 'secondary' : 'outline'} className="ml-2" onClick={()=>setWishlist(w => w.includes(row.name) ? w.filter(x=>x!==row.name) : [...w, row.name])}>
                        {wishlist.includes(row.name) ? 'Wishlisted' : 'Wishlist'}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
