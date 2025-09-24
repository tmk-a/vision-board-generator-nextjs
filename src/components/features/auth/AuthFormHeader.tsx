import { Button } from "@/components/ui/button";
import {
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface AuthFormHeaderProps {
  title: string;
  description?: string;
  linkName: string;
  url: string;
}

export function AuthFormHeader({
  title,
  description,
  linkName,
  url,
}: AuthFormHeaderProps) {
  return (
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <CardAction>
        <Button asChild variant="link">
          <Link href={url}>{linkName}</Link>
        </Button>
      </CardAction>
    </CardHeader>
  );
}
