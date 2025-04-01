import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { FiX } from "react-icons/fi";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import translate from "@/utils/translate";

type TProps = {
  name: string;
  label: string;
  setUploadedFile: React.Dispatch<React.SetStateAction<File | string | null>>;
  uploadedFile: File | string | null;
  defaultImage?: string;
};

const ImageUpload = ({
  name,
  label,
  setUploadedFile,
  uploadedFile,
  defaultImage,
}: TProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultImage || null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file && file.type.startsWith("image/")) {
      setUploadedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
  };

  useEffect(() => {
    if (uploadedFile && typeof uploadedFile === "string") {
      setPreviewUrl(uploadedFile);
    } else if (!uploadedFile) {
      setPreviewUrl(defaultImage || null);
    }
  }, [uploadedFile, defaultImage]);

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="block">
        {label}
      </Label>

      {/* File Upload Section */}
      {!previewUrl ? (
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-[300px] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <UploadCloud className="text-gray-400 w-12 h-12 mb-2" />
          <span className="text-sm text-gray-600">
            {translate.sallerDashboard.addProductPage.placeholder.image}
          </span>
          <span className="text-xs text-gray-500">JPG, JPEG, or PNG</span>
          <input
            name="image"
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="relative w-full border-2 border-dashed rounded-lg">
          <Image
            src={previewUrl}
            width={500}
            height={300}
            alt="Uploaded Preview"
            className="w-full h-[300px] object-cover rounded-lg p-2.5"
          />
          <button
            type="button"
            onClick={removeFile}
            className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white rounded-full p-1 hover:bg-opacity-90 transition"
          >
            <FiX size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
