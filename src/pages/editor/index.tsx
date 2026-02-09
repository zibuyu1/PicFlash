import React, { useState, useRef, useEffect } from 'react'
import { View, Text, Button, Image, Canvas } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'

import CompressFeature from '../../features/CompressFeature'
import ResizeFeature from '../../features/ResizeFeature'
import ConvertFeature from '../../features/ConvertFeature'
import EditFeature from '../../features/EditFeature'
import FilterFeature from '../../features/FilterFeature'

const createImageProcessor = (canvasId) => {
  let canvas = null
  let ctx = null

  const init = () => {
    const query = Taro.createSelectorQuery()
    query.select(`#${canvasId}`)
      .fields({ node: true, size: true })
      .exec((res) => {
        if (res[0]) {
          canvas = res[0].node
          ctx = canvas.getContext('2d')
        }
      })
  }

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = canvas.createImage()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  const compress = (
    img,
    quality,
    maxWidth,
    maxHeight
  ) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized')

    let width = img.width
    let height = img.height

    if (maxWidth && width > maxWidth) {
      height = (maxWidth / width) * height
      width = maxWidth
    }
    if (maxHeight && height > maxHeight) {
      width = (maxHeight / height) * width
      height = maxHeight
    }

    canvas.width = width
    canvas.height = height
    ctx.drawImage(img, 0, 0, width, height)

    return new Promise((resolve) => {
      Taro.canvasToTempFilePath({
        canvas: canvas,
        fileType: 'jpg',
        quality: quality,
        success: (res) => {
          resolve(res.tempFilePath)
        }
      })
    })
  }

  const resize = (
    img,
    width,
    height,
    scaleMode = 'cover'
  ) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized')

    const imgAspectRatio = img.width / img.height
    const targetAspectRatio = width / height

    let finalWidth, finalHeight, offsetX, offsetY

    switch (scaleMode) {
      case 'cover':
        // 填满画面（裁边）
        if (imgAspectRatio > targetAspectRatio) {
          finalHeight = height
          finalWidth = height * imgAspectRatio
          offsetX = (width - finalWidth) / 2
          offsetY = 0
        } else {
          finalWidth = width
          finalHeight = width / imgAspectRatio
          offsetX = 0
          offsetY = (height - finalHeight) / 2
        }
        break
      case 'contain':
        // 完整显示（留空白）
        if (imgAspectRatio > targetAspectRatio) {
          finalWidth = width
          finalHeight = width / imgAspectRatio
          offsetX = 0
          offsetY = (height - finalHeight) / 2
        } else {
          finalHeight = height
          finalWidth = height * imgAspectRatio
          offsetX = (width - finalWidth) / 2
          offsetY = 0
        }
        break
      case 'stretch':
        // 拉伸填满（变形）
        finalWidth = width
        finalHeight = height
        offsetX = 0
        offsetY = 0
        break
      case 'keep':
        // 保留完整（可能小）
        if (img.width <= width && img.height <= height) {
          // 图片尺寸小于目标尺寸，保持原图大小
          finalWidth = img.width
          finalHeight = img.height
        } else if (imgAspectRatio > targetAspectRatio) {
          finalWidth = width
          finalHeight = width / imgAspectRatio
        } else {
          finalHeight = height
          finalWidth = height * imgAspectRatio
        }
        offsetX = (width - finalWidth) / 2
        offsetY = (height - finalHeight) / 2
        break
      case 'cover_min':
        // 至少覆盖（可能超出）
        if (imgAspectRatio > targetAspectRatio) {
          finalWidth = width
          finalHeight = width / imgAspectRatio
          if (finalHeight < height) {
            finalHeight = height
            finalWidth = height * imgAspectRatio
          }
        } else {
          finalHeight = height
          finalWidth = height * imgAspectRatio
          if (finalWidth < width) {
            finalWidth = width
            finalHeight = width / imgAspectRatio
          }
        }
        offsetX = (width - finalWidth) / 2
        offsetY = (height - finalHeight) / 2
        break
      default:
        // 默认使用cover模式
        if (imgAspectRatio > targetAspectRatio) {
          finalHeight = height
          finalWidth = height * imgAspectRatio
          offsetX = (width - finalWidth) / 2
          offsetY = 0
        } else {
          finalWidth = width
          finalHeight = width / imgAspectRatio
          offsetX = 0
          offsetY = (height - finalHeight) / 2
        }
    }

    canvas.width = width
    canvas.height = height
    ctx.drawImage(img, offsetX, offsetY, finalWidth, finalHeight)

    return new Promise((resolve) => {
      Taro.canvasToTempFilePath({
        canvas: canvas,
        success: (res) => {
          resolve(res.tempFilePath)
        }
      })
    })
  }

  const convert = (img, format) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized')

    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)

    return new Promise((resolve) => {
      Taro.canvasToTempFilePath({
        canvas: canvas,
        fileType: format,
        success: (res) => {
          resolve(res.tempFilePath)
        }
      })
    })
  }

  const rotate = (img, degrees) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized')

    const radians = (degrees * Math.PI) / 180
    const sin = Math.abs(Math.sin(radians))
    const cos = Math.abs(Math.cos(radians))

    const newWidth = img.width * cos + img.height * sin
    const newHeight = img.width * sin + img.height * cos

    canvas.width = newWidth
    canvas.height = newHeight

    ctx.translate(newWidth / 2, newHeight / 2)
    ctx.rotate(radians)
    ctx.drawImage(img, -img.width / 2, -img.height / 2)

    return new Promise((resolve) => {
      Taro.canvasToTempFilePath({
        canvas: canvas,
        success: (res) => {
          resolve(res.tempFilePath)
        }
      })
    })
  }

  const flip = (img, direction) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized')

    canvas.width = img.width
    canvas.height = img.height

    if (direction === 'horizontal') {
      ctx.translate(img.width, 0)
      ctx.scale(-1, 1)
    } else {
      ctx.translate(0, img.height)
      ctx.scale(1, -1)
    }

    ctx.drawImage(img, 0, 0)

    return new Promise((resolve) => {
      Taro.canvasToTempFilePath({
        canvas: canvas,
        success: (res) => {
          resolve(res.tempFilePath)
        }
      })
    })
  }

  const applyFilter = (
    img,
    filterType,
    value
  ) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized')

    canvas.width = img.width
    canvas.height = img.height

    let filter = ''
    switch (filterType) {
      case 'grayscale':
        filter = `grayscale(${value}%)`
        break
      case 'sepia':
        filter = `sepia(${value}%)`
        break
      case 'brightness':
        filter = `brightness(${value}%)`
        break
      case 'contrast':
        filter = `contrast(${value}%)`
        break
      case 'blur':
        filter = `blur(${value}px)`
        break
    }

    ctx.filter = filter
    ctx.drawImage(img, 0, 0)

    return new Promise((resolve) => {
      Taro.canvasToTempFilePath({
        canvas: canvas,
        success: (res) => {
          resolve(res.tempFilePath)
        }
      })
    })
  }

  return {
    init,
    loadImage,
    compress,
    resize,
    convert,
    rotate,
    flip,
    applyFilter
  }
}

const Editor = () => {
  const [image, setImage] = useState(null)
  const [processedImage, setProcessedImage] = useState('')
  const [processedImageInfo, setProcessedImageInfo] = useState(null)
  const [processedImageSize, setProcessedImageSize] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [quality, setQuality] = useState(0.8)
  const [customQuality, setCustomQuality] = useState('80')
  const [featureType, setFeatureType] = useState('compress')
  const [scaleMode, setScaleMode] = useState('cover')
  const [comparisonPosition, setComparisonPosition] = useState(50)
  const [showOriginal, setShowOriginal] = useState(false)
  const processorRef = useRef(null)

  useEffect(() => {
    console.log('Editor page loaded.')
    processorRef.current = createImageProcessor('imageCanvas')
    processorRef.current.init()

    // 获取传递的功能类型参数
    try {
      const pages = Taro.getCurrentPages()
      const currentPage = pages[pages.length - 1]
      if (currentPage && currentPage.options && currentPage.options.type) {
        setFeatureType(currentPage.options.type)
      }
    } catch (error) {
      console.error('Error getting feature type:', error)
    }
  }, [])

  const handleImageSelect = async (tempFilePath) => {
    try {
      if (!processorRef.current) {
        processorRef.current = createImageProcessor('imageCanvas')
        processorRef.current.init()
      }

      const img = await processorRef.current.loadImage(tempFilePath)
      
      Taro.getFileInfo({
        filePath: tempFilePath,
        success: (fileInfo) => {
          setImage({
            src: tempFilePath,
            file: { size: fileInfo.size },
            img
          })
          setProcessedImage(null)
          setProcessedImageInfo(null)
          setProcessedImageSize(null)
        }
      })
    } catch (error) {
      console.error('Failed to load image:', error)
      Taro.showToast({
        title: '图片加载失败',
        icon: 'none'
      })
    }
  }

  const selectImage = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        handleImageSelect(res.tempFilePaths[0])
      },
      fail: (err) => {
        // 忽略用户取消选择的错误
        if (err.errMsg !== 'chooseImage:fail cancel') {
          console.error('选择图片失败:', err)
        }
      }
    })
  }

  const handleCompress = async (quality, maxWidth, maxHeight) => {
    if (!image || !processorRef.current) return

    setIsProcessing(true)
    try {
      const url = await processorRef.current.compress(image.img, quality, maxWidth, maxHeight)
      setProcessedImage(url)
      
      // 获取处理后图片的文件信息
      Taro.getFileInfo({
        filePath: url,
        success: (fileInfo) => {
          setProcessedImageInfo({ size: fileInfo.size })
        }
      })
      
      Taro.showToast({
        title: '压缩完成',
        icon: 'success'
      })
    } catch (error) {
      console.error('Compression failed:', error)
      Taro.showToast({
        title: '压缩失败',
        icon: 'none'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleResize = async (width, height, scaleMode) => {
    if (!image || !processorRef.current) return

    setIsProcessing(true)
    try {
      const url = await processorRef.current.resize(image.img, width, height, scaleMode)
      setProcessedImage(url)
      setProcessedImageSize({ width, height })
      
      // 获取处理后图片的文件信息
      Taro.getFileInfo({
        filePath: url,
        success: (fileInfo) => {
          setProcessedImageInfo({ size: fileInfo.size })
        }
      })
      
      Taro.showToast({
        title: '调整尺寸完成',
        icon: 'success'
      })
    } catch (error) {
      console.error('Resize failed:', error)
      Taro.showToast({
        title: '调整尺寸失败',
        icon: 'none'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleConvert = async (format) => {
    if (!image || !processorRef.current) return

    setIsProcessing(true)
    try {
      const url = await processorRef.current.convert(image.img, format)
      setProcessedImage(url)
      
      // 获取处理后图片的文件信息
      Taro.getFileInfo({
        filePath: url,
        success: (fileInfo) => {
          setProcessedImageInfo({ size: fileInfo.size })
        }
      })
      
      Taro.showToast({
        title: '格式转换完成',
        icon: 'success'
      })
    } catch (error) {
      console.error('Conversion failed:', error)
      Taro.showToast({
        title: '格式转换失败',
        icon: 'none'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRotate = async (degrees) => {
    if (!image || !processorRef.current) return

    setIsProcessing(true)
    try {
      const url = await processorRef.current.rotate(image.img, degrees)
      setProcessedImage(url)
      
      // 获取处理后图片的文件信息
      Taro.getFileInfo({
        filePath: url,
        success: (fileInfo) => {
          setProcessedImageInfo({ size: fileInfo.size })
        }
      })
      
      Taro.showToast({
        title: '旋转完成',
        icon: 'success'
      })
    } catch (error) {
      console.error('Rotation failed:', error)
      Taro.showToast({
        title: '旋转失败',
        icon: 'none'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleFlip = async (direction) => {
    if (!image || !processorRef.current) return

    setIsProcessing(true)
    try {
      const url = await processorRef.current.flip(image.img, direction)
      setProcessedImage(url)
      
      // 获取处理后图片的文件信息
      Taro.getFileInfo({
        filePath: url,
        success: (fileInfo) => {
          setProcessedImageInfo({ size: fileInfo.size })
        }
      })
      
      Taro.showToast({
        title: '翻转完成',
        icon: 'success'
      })
    } catch (error) {
      console.error('Flip failed:', error)
      Taro.showToast({
        title: '翻转失败',
        icon: 'none'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleFilter = async (filterType, value) => {
    if (!image || !processorRef.current) return

    setIsProcessing(true)
    try {
      const url = await processorRef.current.applyFilter(image.img, filterType, value)
      setProcessedImage(url)
      
      // 获取处理后图片的文件信息
      Taro.getFileInfo({
        filePath: url,
        success: (fileInfo) => {
          setProcessedImageInfo({ size: fileInfo.size })
        }
      })
      
      Taro.showToast({
        title: '滤镜应用完成',
        icon: 'success'
      })
    } catch (error) {
      console.error('Filter failed:', error)
      Taro.showToast({
        title: '滤镜应用失败',
        icon: 'none'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleComparisonStart = (e) => {
    // 开始拖拽，不需要特殊处理
  }

  const handleComparisonMove = (e) => {
    try {
      // 简化处理：直接从事件对象中获取触摸点信息
      // 小程序中的触摸事件格式
      const touches = e.touches || (e.detail && e.detail.touches)
      if (!touches || touches.length === 0) return
      
      const touch = touches[0]
      const pageX = touch.pageX
      if (!pageX) return

      // 获取屏幕宽度
      const screenWidth = Taro.getSystemInfoSync().windowWidth
      if (!screenWidth) return

      // 计算位置百分比（基于屏幕宽度）
      const position = (pageX / screenWidth) * 100
      
      // 限制位置在0-100%之间
      const clampedPosition = Math.max(0, Math.min(100, position))
      setComparisonPosition(clampedPosition)
    } catch (error) {
      console.error('Error in handleComparisonMove:', error)
    }
  }

  const handleDownload = async () => {
    if (!processedImage) return

    try {
      await Taro.saveImageToPhotosAlbum({
        filePath: processedImage
      })
      Taro.showToast({
        title: '已保存到相册',
        icon: 'success'
      })
    } catch (err) {
      // 忽略用户取消保存的错误
      if (err.errMsg !== 'saveImageToPhotosAlbum:fail cancel') {
        console.error('Save failed:', err)
        Taro.showToast({
          title: '保存失败',
          icon: 'none'
        })
      }
    }
  }

  const renderFeatureOptions = () => {
    switch (featureType) {
      case 'compress':
        return (
          <CompressFeature
            quality={quality}
            onQualityChange={(newQuality) => {
              setQuality(newQuality)
              setCustomQuality(Math.round(newQuality * 100).toString())
            }}
            onCompress={handleCompress}
          />
        )
      
      case 'resize':
        return (
          <ResizeFeature
            scaleMode={scaleMode}
            onScaleModeChange={setScaleMode}
            onResize={handleResize}
          />
        )
      
      case 'convert':
        return (
          <ConvertFeature onConvert={handleConvert} />
        )
      
      case 'edit':
        return (
          <EditFeature onRotate={handleRotate} onFlip={handleFlip} />
        )
      
      case 'filter':
        return (
          <FilterFeature onFilter={handleFilter} />
        )
      
      default:
        return null
    }
  }

  return (
    <View className="editor">
      <Canvas
        id="imageCanvas"
        canvasId="imageCanvas"
        type="2d"
        style={{ width: '0px', height: '0px', position: 'fixed', left: '-9999px' }}
      />

      <View className="editor-content">
        <View className="upload-content">
          {!image ? (
            <View className="upload-placeholder" onClick={selectImage}>
              <Text className="upload-icon">🖼️</Text>
              <Text className="upload-text">点击选择图片{featureType === 'compress' ? '压缩' : ''}</Text>
            </View>
          ) : processedImage ? (
            <View className="comparison-container">
              {/* 简化的对比视图，使用按钮切换 */}
              <View className="comparison-wrapper" style={{ position: 'relative' }}>
                {/* 显示图片 */}
                <Image
                  src={showOriginal ? image.src : processedImage}
                  style={{
                    width: '100%',
                    height: '400rpx',
                    objectFit: 'contain'
                  }}
                  mode="aspectFit"
                />
                
                {/* 切换按钮（放在图片上面） */}
                <View style={{ 
                  position: 'absolute', 
                  top: '15rpx', 
                  right: '15rpx', 
                  display: 'flex', 
                  gap: '10rpx',
                  zIndex: 10
                }}>
                  <View 
                    style={{
                      padding: '8rpx 16rpx',
                      borderRadius: '8rpx',
                      backgroundColor: showOriginal ? '#6366f1' : 'rgba(30, 27, 75, 0.8)',
                      border: '1rpx solid #6366f1',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    onClick={() => setShowOriginal(true)}
                  >
                    <Text style={{ 
                      fontSize: '12rpx', 
                      color: showOriginal ? 'white' : '#94a3b8',
                      fontWeight: showOriginal ? '600' : '400'
                    }}>
                      原图
                    </Text>
                  </View>
                  <View 
                    style={{
                      padding: '8rpx 16rpx',
                      borderRadius: '8rpx',
                      backgroundColor: !showOriginal ? '#6366f1' : 'rgba(30, 27, 75, 0.8)',
                      border: '1rpx solid #6366f1',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    onClick={() => setShowOriginal(false)}
                  >
                    <Text style={{ 
                      fontSize: '12rpx', 
                      color: !showOriginal ? 'white' : '#94a3b8',
                      fontWeight: !showOriginal ? '600' : '400'
                    }}>
                      处理后
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <>
              <View className="image-preview-section">
                <Image
                  src={image.src}
                  className="preview-image"
                  mode="aspectFit"
                />
              </View>
            </>
          )}
        </View>
        <View className="scrollable-content">
          {renderFeatureOptions()}
        </View>

        {/* 底部固定按钮区域 */}
        <View className="bottom-buttons">
          <Button
            className="bottom-btn select-btn"
            onClick={selectImage}
          >
            选择图片
          </Button>
          {processedImage && (
            <Button
              className="bottom-btn save-btn"
              onClick={handleDownload}
            >
              保存图片
            </Button>
          )}
        </View>

        {isProcessing && (
          <View className="loading-overlay">
            <Text className="loading-text">处理中...</Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default Editor