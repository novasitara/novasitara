import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, X, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  allowedTypes?: string[];
  maxSizeMB?: number;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  selectedFile,
  allowedTypes = ['.pdf', '.doc', '.docx'],
  maxSizeMB = 5,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    setLocalError(null);
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    // Validate type
    if (!allowedTypes.includes(extension)) {
      setLocalError(`Invalid file format. Please upload a ${allowedTypes.join(', ')} file.`);
      return false;
    }

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setLocalError(`File size exceeds the ${maxSizeMB}MB limit.`);
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      onFileSelect(file);
    } else {
      onFileSelect(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    onFileSelect(null);
    setLocalError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + ' KB';
    }
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const displayError = error || localError;

  return (
    <div style={{ width: '100%' }}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        accept={allowedTypes.join(',')}
        style={{ display: 'none' }}
        id="resume-file-upload"
      />

      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${isDragging ? 'var(--color-primary)' : displayError ? 'var(--color-error)' : 'var(--color-border)'}`,
            borderRadius: 'var(--radius-lg)',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            backgroundColor: isDragging ? 'var(--color-primary-light)' : 'var(--color-bg-subtle)',
            cursor: 'pointer',
            transition: 'all 200ms ease',
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          aria-label="Upload Resume or CV"
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
            }}
          >
            <UploadCloud size={24} />
          </div>

          <p style={{ fontWeight: 600, color: 'var(--color-text-heading)', marginBottom: '0.35rem' }}>
            Click to upload or drag & drop resume
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Accepted formats: {allowedTypes.join(', ')} (Max {maxSizeMB}MB)
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--color-primary-light)',
            border: '1px solid rgba(134, 78, 168, 0.3)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileText size={20} />
            </div>

            <div>
              <p style={{ fontWeight: 600, color: 'var(--color-text-heading)', fontSize: '0.925rem' }}>
                {selectedFile.name}
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                {formatFileSize(selectedFile.size)} • Ready to submit
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            style={{
              padding: '0.4rem',
              borderRadius: 'var(--radius-full)',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 150ms ease',
            }}
            aria-label="Remove uploaded file"
            title="Remove file"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {displayError && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '0.5rem',
            color: 'var(--color-error)',
            fontSize: '0.85rem',
          }}
        >
          <AlertCircle size={16} />
          <span>{displayError}</span>
        </div>
      )}
    </div>
  );
};
