import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Sparkles, Upload, ArrowLeft, Camera, FileUp } from "lucide-react";
import Image from "next/image";

import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/hooks/use-language";
import { departments } from "@/lib/data";
import type { Issue } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { aiCategorizeIssue } from "@/ai/flows/ai-categorize-issue";
import { Progress } from "./ui/progress";
import { CameraView } from "./camera-view";
import { LocationPicker } from "./location-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";


interface ReportIssueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIssueReported: (issue: Issue) => void;
  children?: React.ReactNode;
}

const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters."),
  department: z.string().min(1, "Please select a department."),
  mediaDataUri: z.string().min(1, "Please provide an image or video."),
  latitude: z.number(),
  longitude: z.number(),
});

type FormData = z.infer<typeof formSchema>;

export function ReportIssueDialog({
  open,
  onOpenChange,
  onIssueReported,
  children,
}: ReportIssueDialogProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState("upload");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      department: "",
      mediaDataUri: "",
    },
  });
  
  useEffect(() => {
    // Reset state when the dialog is closed
    if (!open) {
      form.reset();
      setCurrentStep(1);
      setIsAnalyzing(false);
      setActiveTab("upload");
    }
  }, [open, form]);

  const handleMediaProvided = async (dataUri: string) => {
    form.setValue("mediaDataUri", dataUri);
    setIsAnalyzing(true);
    setCurrentStep(2);

    toast({
      title: t('analyzing_media'),
      description: "Please wait a moment.",
    });

    try {
      const descriptionForAnalysis = form.getValues('description') || "No description yet.";
      const { suggestedDepartment } = await aiCategorizeIssue({
        mediaDataUri: dataUri,
        description: descriptionForAnalysis,
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

  function onSubmit(values: FormData) {
    if (!isAuthenticated || !user) {
      openAuthModal();
      return;
    }

    const newIssue: Issue = {
      id: `issue-${Date.now()}`,
      title: values.title,
      description: values.description,
      imageUrl: values.mediaDataUri,
      imageHint: "newly reported issue",
      department: values.department,
      status: "Reported",
      author: { id: user.uid, name: user.displayName || 'Anonymous', avatar: user.photoURL || '' },
      timestamp: new Date().toISOString(),
      location: {
        address: "User-pinned location",
        mapCoordinates: { y: values.latitude, x: values.longitude },
      },
      comments: [],
      upvotes: 1,
    };

    onIssueReported(newIssue);
    toast({
      title: "Issue Reported!",
      description: "Thank you for helping improve your community.",
    });
    onOpenChange(false);
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const mediaPreview = form.watch("mediaDataUri");
  const progress = (currentStep / 5) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-4">
             {currentStep > 1 ? (
              <Button variant="ghost" size="icon" onClick={goBack}>
                <ArrowLeft />
              </Button>
            ) : <div className="w-10 h-10"></div>}
            <div className="flex-1">
              <DialogTitle className="font-headline text-2xl">{t('report_issue_title')}</DialogTitle>
              <DialogDescription>{t('report_issue_subtitle')}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Progress value={progress} className="my-4" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Step 1: Media Source Selection */}
            {currentStep === 1 && (
              <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload"><FileUp className="mr-2 h-4 w-4"/> Upload File</TabsTrigger>
                  <TabsTrigger value="camera"><Camera className="mr-2 h-4 w-4"/> Use Camera</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="pt-4">
                  <FileUpload onMediaProvided={handleMediaProvided} />
                </TabsContent>
                <TabsContent value="camera" className="pt-4">
                  <CameraView onPhotoTaken={handleMediaProvided} isVisible={activeTab === 'camera'} />
                </TabsContent>
              </Tabs>
            )}


            {/* Step 2: Department Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                 <div className="relative flex h-full min-h-[250px] w-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 transition-colors">
                    {mediaPreview && <Image src={mediaPreview} alt="Media preview" layout="fill" className="rounded-lg object-contain p-2" />}
                </div>
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-base">
                        {t('department_label')}
                        {isAnalyzing && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                        {!isAnalyzing && form.getValues('department') && <Sparkles className="ml-2 h-4 w-4 text-primary" />}
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={isAnalyzing}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={isAnalyzing ? "Analyzing..." : t('department_placeholder')} />
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
            )}
            
            {/* Step 3: Location */}
            {currentStep === 3 && (
                 <LocationPicker
                    onLocationSet={(lat, lng) => {
                      form.setValue('latitude', lat);
                      form.setValue('longitude', lng);
                    }}
                  />
            )}


            {/* Step 4: Title and Description */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">{t('issue_title_label')}</FormLabel>
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
                      <FormLabel className="text-base">{t('description_label')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('description_placeholder')}
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 5: Review and Submit */}
            {currentStep === 5 && (
              <div className="space-y-4">
                 <div className="relative flex h-full min-h-[250px] w-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 transition-colors">
                    {mediaPreview && <Image src={mediaPreview} alt="Media preview" layout="fill" className="rounded-lg object-contain p-2" />}
                </div>
                <h3 className="font-bold text-lg">{form.getValues('title')}</h3>
                <p className="text-sm text-muted-foreground">{form.getValues('description')}</p>
                <p className="text-sm"><strong>Department:</strong> {form.getValues('department')}</p>
                <p className="text-sm"><strong>Location:</strong> Lat: {form.getValues('latitude').toFixed(4)}, Lng: {form.getValues('longitude').toFixed(4)}</p>
              </div>
            )}

            <DialogFooter>
                {currentStep > 1 && currentStep < 5 && (
                    <Button type="button" onClick={() => setCurrentStep(prev => prev + 1)} className="w-full" size="lg" disabled={isAnalyzing}>
                      Next
                    </Button>
                )}
                {currentStep === 5 && (
                    <Button type="submit" className="w-full" size="lg" disabled={isAnalyzing}>
                      {t('submit_issue')}
                    </Button>
                )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


// New component for the file upload step
function FileUpload({ onMediaProvided }: { onMediaProvided: (dataUri: string) => void }) {
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        onMediaProvided(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative flex h-full min-h-[300px] w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 transition-colors hover:bg-muted">
      <Input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="absolute inset-0 z-10 h-full w-full opacity-0"
        disabled={isProcessing}
      />
      {isProcessing ? (
         <div className="flex flex-col items-center gap-2 text-center text-muted-foreground">
            <Loader2 className="h-10 w-10 animate-spin" />
            <span className="font-medium">Processing...</span>
          </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-center text-muted-foreground">
          <Upload className="h-10 w-10" />
          <span className="font-medium">{t('upload_media_button')}</span>
          <span className="text-xs">PNG, JPG up to 10MB</span>
        </div>
      )}
    </div>
  );
}
