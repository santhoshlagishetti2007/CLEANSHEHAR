
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Camera, RefreshCcw, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { useLanguage } from '@/hooks/use-language';

interface CameraViewProps {
  onPhotoTaken: (dataUri: string) => void;
  isVisible: boolean;
}

export function CameraView({ onPhotoTaken, isVisible }: CameraViewProps) {
  const { toast } = useToast();
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  }, []);

  const startCamera = useCallback(async () => {
    if (streamRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasCameraPermission(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      toast({
        variant: 'destructive',
        title: t('camera_access_denied_toast'),
        description: t('camera_access_denied'),
      });
    }
  }, [toast, t]);

  useEffect(() => {
    if (isVisible) {
      startCamera();
    } else {
      stopCamera();
    }
    
    // Cleanup on unmount
    return () => {
      stopCamera();
    };
  }, [isVisible, startCamera, stopCamera]);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUri = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUri);
        stopCamera();
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const confirmPhoto = () => {
    if (capturedImage) {
      onPhotoTaken(capturedImage);
    }
  };

  if (hasCameraPermission === false) {
    return (
      <Alert variant="destructive">
        <AlertTitle>{t('camera_access_required')}</AlertTitle>
        <AlertDescription>
          {t('camera_access_prompt')}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="relative w-full aspect-video rounded-md overflow-hidden bg-muted border">
        {capturedImage ? (
          <Image src={capturedImage} alt="Captured photo" fill objectFit="contain" />
        ) : (
          <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
        )}
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>

      <div className="flex justify-center gap-4">
        {capturedImage ? (
          <>
            <Button onClick={retakePhoto} variant="outline" size="lg">
              <RefreshCcw className="mr-2 h-5 w-5" />
              {t('retake_photo')}
            </Button>
            <Button onClick={confirmPhoto} size="lg">
              <Check className="mr-2 h-5 w-5" />
              {t('confirm_photo')}
            </Button>
          </>
        ) : (
          <Button onClick={takePhoto} size="lg" className="rounded-full w-16 h-16" disabled={hasCameraPermission === null}>
            <Camera className="h-7 w-7" />
          </Button>
        )}
      </div>
    </div>
  );
}
