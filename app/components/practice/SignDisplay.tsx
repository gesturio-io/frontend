import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface SignDisplayProps {
  sign: {
    name: string;
    description: string;
    difficulty: string;
    image: string;
  };
}

export function SignDisplay({ sign }: SignDisplayProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Watch and Learn</h3>
      <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
        <img
          src={sign.image}
          alt={sign.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}