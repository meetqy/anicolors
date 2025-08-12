import { TwitterIcon } from "lucide-react";
import { Generator } from "./generator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-12 space-y-6">
        <div className="space-y-3">
          <h1 className="h1 text-left">
            Generate Color-to-White Gradient Cards
          </h1>
          <p className="p text-muted-foreground">
            Enter a color to instantly generate cards of various sizes with a
            smooth gradient transition from the chosen color to white.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {`color to white, gradient card, gradient generator, fade to white, color gradient`
            .split(", ")
            .map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="hover:bg-secondary/80 cursor-pointer"
              >
                <Link href={`#${item}`} className="capitalize">
                  {item}
                </Link>
              </Badge>
            ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button size="sm" className="gap-2">
            <TwitterIcon className="h-4 w-4" />
            Share on Twitter
          </Button>
        </div>
      </div>

      <div className="bg-card text-card-foreground rounded-lg border">
        <Generator />
      </div>
    </div>
  );
}
