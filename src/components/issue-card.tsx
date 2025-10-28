
import Image from "next/image";
import { MessageSquare, ThumbsUp, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Issue } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { TranslatedText } from "./translated-text";

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const { t } = useLanguage();

  const statusVariant = {
    Reported: "secondary",
    "In Progress": "default",
    Resolved: "outline",
  } as const;

  const statusText = {
    Reported: t('reported'),
    "In Progress": t('in_progress'),
    Resolved: t('resolved'),
  }

  return (
    <Card className="flex h-full transform-gpu flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={issue.imageUrl}
            alt={issue.title}
            fill
            className="object-cover"
            data-ai-hint={issue.imageHint}
          />
          <Badge
            variant={statusVariant[issue.status]}
            className="absolute right-3 top-3"
          >
            {statusText[issue.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="mb-2 font-headline text-lg leading-tight">
          <TranslatedText text={issue.title} />
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0" />
          <span><TranslatedText text={issue.location.address} /></span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <ThumbsUp className="h-4 w-4" />
          <span>{issue.upvotes} {t('upvotes')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MessageSquare className="h-4 w-4" />
          <span>{issue.comments.length} {t('comments')}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
