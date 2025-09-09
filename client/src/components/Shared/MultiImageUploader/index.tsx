import { useState, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import api from "@/lib/api";
import { IResponse } from "@/types";
import "@/styles/uploader.scss";

export interface ImageData {
  preview: string;
  image: string;
}

interface MultiImageUploaderProps {
  images: ImageData[];
  setImages: (images: ImageData[]) => void;
  pathType?: "path" | "url";
  lg?: string;
  xl?: string;
  xxl?: string;
  smallImageCheck?: boolean;
  maxFiles?: number;
}

const MultiImageUploader = ({
  images,
  setImages,
  lg = "6",
  xl = "4",
  xxl = "4",
  maxFiles = 10,
}: MultiImageUploaderProps) => {
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);

    if (images.length + e.target.files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files`);
      setLoading(false);
      return;
    }

    const newImages: ImageData[] = [];
    const filesArray = Array.from(e.target.files);

    for (const file of filesArray) {
      try {
        const formData = new FormData();
        formData.append("image", file);

        const { data } = await api.post<IResponse<string>>(
          "/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (!data.success) {
          throw new Error(data.message);
        }

        await new Promise((resolve) => setTimeout(resolve, 500));

        const imageUrl = data.data;

        if (!imageUrl) {
          throw new Error("Image URL not found");
        }

        newImages.push({
          preview: URL.createObjectURL(file),
          image: imageUrl,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    setImages([...images, ...newImages]);
    setLoading(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (imageToRemove: ImageData) => {
    const newImages = images.filter((img) => img.image !== imageToRemove.image);
    setImages(newImages);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fakeEvent = ({
        target: {
          files: e.dataTransfer.files,
        },
      } as unknown) as React.ChangeEvent<HTMLInputElement>;

      onImageChange(fakeEvent);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const ImageComp = ({
    imageSrc,
    index,
  }: {
    imageSrc: ImageData;
    index: number;
  }) => {
    return (
      <Col
        xxl={Number(xxl)}
        xl={Number(xl)}
        lg={Number(lg)}
        md="6"
        sm="6"
        xs="12"
        className="image-col form-group"
      >
        <div className="thumb">
          <button
            type="button"
            className="btn-remove"
            onClick={() => removeImage(imageSrc)}
            aria-label="Remove image"
          >
            <span className="remove-icon">×</span>
          </button>
          <img
            src={imageSrc.image}
            alt={`Uploaded ${index + 1}`}
            className="img-thumbnail"
          />
        </div>
      </Col>
    );
  };

  return (
    <div className={`images-uploader`}>
      <div
        className={`upload-area ${dragOver ? "drag-over" : ""} ${
          images.length > 0 ? "has-images" : ""
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <label className="upload-label">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={onImageChange}
            id="file-upload"
            name="images"
            disabled={loading}
          />
          <span className="upload-text">
            <span className="upload-icon">📁</span>
            Add new Property images
            <span className="upload-subtext">(Click or drag & drop)</span>
          </span>
        </label>

        {images.length > 0 ? (
          <div className="thumbs-container">
            <Row className="images-row">
              {images.map((imageSrc, index) => (
                <ImageComp key={index} index={index} imageSrc={imageSrc} />
              ))}
            </Row>
            {loading && (
              <div className="upload-loader">
                <div className="spinner"></div>
                <span>Uploading images...</span>
              </div>
            )}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon">🖼️</span>
            No images for this Property, you can add new ones!
          </div>
        )}
      </div>

      <div className="upload-info">
        <p>
          Maximum {maxFiles} images allowed. Supported formats: JPG, PNG, WebP
        </p>
      </div>
    </div>
  );
};

export default MultiImageUploader;
