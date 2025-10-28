import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Sparkles, Upload } from "lucide-react";
import Image from "next/image";

import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/hooks/use-language";
import { departments, Issue } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AuthModal } from "./auth-modal";
import { aiCategorizeIssue } from "@/ai/flows/ai-categorize-issue";

interface ReportIssueDialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIssueReported: (issue: Issue) => void;
}

export function ReportIssueDialog({
  children,
  open,
  onOpenChange,
  onIssueReported,
}: ReportIssueDialogProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const formSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters."),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters."),
    department: z.string().min(1, "Please select a department."),
    media: z.any().refine(file => file, "Please upload an image or video."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      department: "",
      media: null,
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("media", file);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUri = reader.result as string;
        setMediaPreview(dataUri);
        
        setIsAnalyzing(true);
        toast({
            title: t('analyzing_media'),
            description: "Please wait a moment.",
        });

        try {
          const { suggestedDepartment } = await aiCategorizeIssue({
            mediaDataUri: dataUri,
            description: form.getValues('description'),
          });
          form.setValue("department", suggestedDepartment);
          toast({
            title: "AI Suggestion Complete",
            description: `We've suggested the ${suggestedDepartment}.`,
          });
        } catch (error) {
          console.error("AI categorization failed:", error);
          toast({
            variant: "destructive",
            title: "AI Analysis Failed",
            description: "Could not analyze the media. Please select a department manually.",
          });
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isAuthenticated || !user) {
      setAuthModalOpen(true);
      return;
    }

    const newIssue: Issue = {
      id: `issue-${Date.now()}`,
      title: values.title,
      description: values.description,
      imageUrl: mediaPreview || "",
      imageHint: "newly reported issue",
      department: values.department,
      status: "Reported",
      author: { id: user.uid, name: user.displayName || 'Anonymous', avatar: user.photoURL || '' },
      timestamp: new Date().toISOString(),
      location: {
        address: "Near your current location",
        mapCoordinates: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 },
      },
      comments: [],
      upvotes: 1,
    };

    onIssueReported(newIssue);
    toast({
      title: "Issue Reported!",
      description: "Thank you for helping improve your community.",
    });
    form.reset();
    setMediaPreview(null);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">{t('report_issue_title')}</DialogTitle>
          <DialogDescription>{t('report_issue_subtitle')}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('issue_title_label')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('issue_title_placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('description_label')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('description_placeholder')}
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">{t('department_label')}
                       {isAnalyzing && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                       {form.getValues('department') && !isAnalyzing && <Sparkles className="ml-2 h-4 w-4 text-primary" />}
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('department_placeholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="media"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('upload_media_label')}</FormLabel>
                      <FormControl>
                        <div className="relative flex h-full min-h-[200px] w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 transition-colors hover:bg-muted">
                           <Input
                              type="file"
                              accept="image/*,video/*"
                              onChange={handleFileChange}
                              className="absolute inset-0 z-10 h-full w-full opacity-0"
                            />
                          {mediaPreview ? (
                            <Image src={mediaPreview} alt="Media preview" fill className="rounded-lg object-contain p-2" />
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-center text-muted-foreground">
                              <Upload className="h-10 w-10" />
                              <span className="font-medium">{t('upload_media_button')}</span>
                              <span className="text-xs">PNG, JPG, MP4 up to 10MB</span>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={isAnalyzing}>
              {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('submit_issue')}
            </Button>
          </form>
        </Form>
        <AuthModal open={isAuthModalOpen} onOpenChange={setAuthModalOpen} />
      </DialogContent>
    </Dialog>
  );
}
