import React, { useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { ProfileData } from "../../types";
import { DefaultAvatar } from "../DefaultAvatar";
import { storageService } from "../../services/storageService";
import {
  Upload,
  Trash2,
  CheckCircle2,
  Loader2,
  X,
  Crop as CropIcon,
} from "lucide-react";

interface Props {
  profile: ProfileData;
  onSave: (updatedProfile: ProfileData) => void;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const createCroppedImage = (
  imageSrc: string,
  pixelCrop: CropArea,
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not create image editor."));
        return;
      }

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to crop image."));
            return;
          }

          resolve(
            new File([blob], `profile-${Date.now()}.jpg`, {
              type: "image/jpeg",
            }),
          );
        },
        "image/jpeg",
        0.92,
      );
    };

    image.onerror = () => {
      reject(new Error("Failed to load selected image."));
    };

    image.src = imageSrc;
  });
};

export const ProfileImageEditor: React.FC<Props> = ({ profile, onSave }) => {
  const [currentImage, setCurrentImage] = useState<string | null>(
    profile.customProfileImage || null,
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(
    null,
  );

  const [isUploading, setIsUploading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please select a valid image file.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg("Image size must be under 8MB.");
      return;
    }

    setErrorMsg(null);

    const imageUrl = URL.createObjectURL(file);

    setSelectedImage(imageUrl);
    setCrop({ x: 0, y: 0 });
    setZoom(1);

    if (e.target) {
      e.target.value = "";
    }
  };

  const onCropComplete = (_: unknown, croppedPixels: CropArea) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleCropAndUpload = async () => {
    if (!selectedImage || !croppedAreaPixels) return;

    setIsUploading(true);
    setErrorMsg(null);

    try {
      const croppedFile = await createCroppedImage(
        selectedImage,
        croppedAreaPixels,
      );

      const storageRes = await storageService.uploadFile(
        croppedFile,
        "profile-images",
      );

      if (!storageRes.url) {
        throw new Error(storageRes.error || "Failed to upload profile image.");
      }

      const finalUrl = storageRes.url;

      setCurrentImage(finalUrl);

      onSave({
        ...profile,
        customProfileImage: finalUrl,
      });

      URL.revokeObjectURL(selectedImage);

      setSelectedImage(null);
      setSavedSuccess(true);

      setTimeout(() => {
        setSavedSuccess(false);
      }, 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to crop and upload profile image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelCrop = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }

    setSelectedImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleRemoveImage = () => {
    setCurrentImage(null);

    onSave({
      ...profile,
      customProfileImage: null,
    });

    setSavedSuccess(true);

    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold text-white font-mono">
          Profile Image Management
        </h2>

        <p className="text-xs text-slate-400 mt-0.5">
          Choose an image, adjust its position and zoom, then crop it before
          uploading.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-semibold">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />

          <span>Profile image cropped and saved successfully!</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-2xl bg-[#121212] border border-white/10">
        <div className="relative flex-shrink-0">
          <div className="w-44 h-44 rounded-full p-1 bg-gradient-to-tr from-blue-600 via-blue-400 to-indigo-600">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0A0A0A] border-2 border-[#0A0A0A] flex items-center justify-center">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <DefaultAvatar className="w-full h-full" />
              )}
            </div>
          </div>

          <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase">
            Preview
          </span>
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <h3 className="text-base font-bold text-white font-mono">
              {currentImage
                ? "Custom Portrait Active"
                : "Default Avatar Displayed"}
            </h3>

            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Choose your image, move it inside the crop area, and use the zoom
              slider to select exactly how much of the picture you want to
              display.
            </p>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
          />

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              type="button"
              onClick={handleChooseImage}
              disabled={isUploading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />

              <span>
                {currentImage
                  ? "Replace Profile Image"
                  : "Choose Profile Image"}
              </span>
            </button>

            {currentImage && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs border border-red-500/20"
              >
                <Trash2 className="w-4 h-4" />

                <span>Remove Image</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-[#121212] border border-white/10 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <CropIcon className="w-5 h-5 text-blue-400" />

                <h3 className="text-white font-bold">Crop Profile Image</h3>
              </div>

              <button
                type="button"
                onClick={handleCancelCrop}
                disabled={isUploading}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-[400px] bg-black">
              <Cropper
                image={selectedImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="p-5 space-y-5">
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Zoom</span>

                  <span>{Math.round(zoom * 100)}%</span>
                </div>

                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancelCrop}
                  disabled={isUploading}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleCropAndUpload}
                  disabled={isUploading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />

                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <CropIcon className="w-4 h-4" />

                      <span>Crop & Upload</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
