import React, { useRef } from 'react'
import '../styles/ImageUploader.css'

interface ImageUploaderProps {
  onFileSelect: (file: File) => void
  multiple?: boolean
  accept?: string
  buttonText?: string
  className?: string
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onFileSelect,
  multiple = false,
  accept = 'image/*',
  buttonText = '选择图片',
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`image-uploader ${className}`}>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <button onClick={handleClick} className="upload-button">
        {buttonText}
      </button>
    </div>
  )
}
