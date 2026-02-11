import { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './ImageUploader.css'

interface ImageItem {
  path: string
  size: number
  width?: number
  height?: number
}

interface ImageUploaderProps {
  images: ImageItem[]
  onImagesChange: (images: ImageItem[]) => void
  maxCount?: number
  disabled?: boolean
}

const ImageUploader = ({
  images,
  onImagesChange,
  maxCount = 9,
  disabled = false
}: ImageUploaderProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const selectImages = () => {
    if (disabled || isLoading) return

    const count = Math.max(1, maxCount - images.length)

    Taro.chooseImage({
      count,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: async (res) => {
        setIsLoading(true)
        try {
          const newImages = await Promise.all(
            res.tempFilePaths.map(async (path) => {
              const info = (await Taro.getFileInfo({ filePath: path })) as Taro.getFileInfo.SuccessCallbackResult
              return { path, size: info.size }
            })
          )
          onImagesChange([...images, ...newImages])
        } catch {
          Taro.showToast({ title: '获取图片信息失败', icon: 'none' })
        } finally {
          setIsLoading(false)
        }
      },
      fail: (err) => {
        if (!err.errMsg?.includes('cancel')) {
          Taro.showToast({ title: '选择失败', icon: 'none' })
        }
      }
    })
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    onImagesChange(newImages)
  }

  return (
    <View className="uploader-container">
      {/* 图片网格 */}
      <View className="uploader-grid">
        {images.map((img, index) => (
          <View key={img.path} className="uploader-image-wrap">
            <Image className="uploader-image" src={img.path} mode="aspectFill" />
            <View className="uploader-image-meta">
              <Text className="uploader-size">{(img.size / 1024).toFixed(1)} KB</Text>
            </View>
            {!disabled && (
              <View className="uploader-remove" onClick={() => removeImage(index)}>
                <Text className="uploader-remove-icon">×</Text>
              </View>
            )}
          </View>
        ))}

        {/* 添加按钮 */}
        {images.length < maxCount && !disabled && (
          <View className="uploader-add" onClick={selectImages}>
            <Text className="uploader-add-icon">+</Text>
            <Text className="uploader-add-text">
              上传
            </Text>
            {isLoading && <Text className="uploader-loading">加载中...</Text>}
          </View>
        )}
      </View>

      {/* 提示信息 */}
      {images.length === 0 && !disabled && (
        <Text className="uploader-hint">支持从相册或相机选择</Text>
      )}
      {images.length > 0 && (
        <Text className="uploader-count">已选择 {images.length} 张图片</Text>
      )}
    </View>
  )
}

export default ImageUploader
