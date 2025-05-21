declare module "@capacitor-community/camera-preview" {
  export interface CameraPreviewOptions {
    parent?: string;
    className?: string;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    toBack?: boolean;
    paddingBottom?: number;
    rotateWhenOrientationChanged?: boolean;
    position?: "front" | "rear";
    storeToFile?: boolean;
    disableExifHeaderStripping?: boolean;
  }

  export interface CameraPreviewPictureOptions {
    quality?: number;
  }

  export interface CameraSampleOptions {
    quality?: number;
  }

  export const CameraPreview: {
    start(options: CameraPreviewOptions): Promise<void>;
    stop(): Promise<void>;
    capture(options: CameraPreviewPictureOptions): Promise<{ value: string }>;
    getSupportedFlashModes(): Promise<{ result: string[] }>;
    setFlashMode(options: { flashMode: string }): Promise<void>;
    flip(): Promise<void>;
  };
}
