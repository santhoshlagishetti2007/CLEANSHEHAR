
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Camera, RefreshCcw, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';

interface CameraViewProps {
  onPhotoTaken: (dataUri: string) => void;
  isVisible: boolean;
}

export function CameraView({ onPhotoTaken, isVisible }: CameraViewProps) {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!isVisible || hasCameraPermission) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(stream);
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings.',
        });
      }
    };

    if (isVisible) {
      getCameraPermission();
    } else {
      stopCamera();
    }
    
    // Cleanup on unmount or visibility change
    return () => {
      stopCamera();
    };
  }, [isVisible, hasCameraPermission, toast, stopCamera]);

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
    setHasCameraPermission(null); // Force permission re-check
  };

  const confirmPhoto = () => {
    if (capturedImage) {
      onPhotoTaken(capturedImage);
    }
  };

  if (hasCameraPermission === false) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Camera Access Required</AlertTitle>
        <AlertDescription>
          Please allow camera access in your browser settings to use this feature.
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
              Retake
            </Button>
            <Button onClick={confirmPhoto} size="lg">
              <Check className="mr-2 h-5 w-5" />
              Confirm
            </Button>
          </>
        ) : (
          <Button onClick={takePhoto} size="lg" className="rounded-full w-16 h-16" disabled={!hasCameraPermission}>
            <Camera className="h-7 w-7" />
          </Button>
        )}
      </div>
    </div>
  );
}
