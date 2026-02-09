import { useState, useRef, useEffect } from 'react'
import { View, Text, Canvas, Image, Button, Slider, Input, Checkbox } from '@tarojs/components'
import Taro, { useShareAppMessage } from '@tarojs/taro'
import './index.css'

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
    maintainAspectRatio
  ) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized')

    let finalWidth = width
    let finalHeight = height

    if (maintainAspectRatio) {
      const aspectRatio = img.width / img.height
      if (width / height > aspectRatio) {
        finalWidth = height * aspectRatio
      } else {
        finalHeight = width / aspectRatio
      }
    }

    canvas.width = finalWidth
    canvas.height = finalHeight
    ctx.drawImage(img, 0, 0, finalWidth, finalHeight)

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

export default function Index() {
  const [image, setImage] = useState(null)
  const [processedImage, setProcessedImage] = useState('')
  const [processedImageInfo, setProcessedImageInfo] = useState(null)
  const [processedImageSize, setProcessedImageSize] = useState(null)
  const [activeTab, setActiveTab] = useState('compress')
  const [isProcessing, setIsProcessing] = useState(false)
  const [customQuality, setCustomQuality] = useState('80')
  const [customWidth, setCustomWidth] = useState('800')
  const [customHeight, setCustomHeight] = useState('600')
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const processorRef = useRef(null)

  const sizeOptions = [
    { name: '一寸', width: 295, height: 413 },
    { name: '小二寸', width: 413, height: 531 },
    { name: '二寸', width: 413, height: 626 },
    { name: '社保/身份证', width: 358, height: 441 },
    { name: '四六级/计算机', width: 144, height: 192 },
    { name: '卫生机构', width: 160, height: 210 },
    { name: '毕业证', width: 480, height: 640 }
  ]

  const formatOptions = [
    { name: 'PNG', value: 'png' },
    { name: 'JPEG', value: 'jpg' },
    { name: 'JPG', value: 'jpg' },
    { name: 'WebP', value: 'webp' },
    { name: 'TIFF', value: 'tiff' },
    { name: 'AVIF', value: 'avif' },
    { name: 'BMP', value: 'bmp' },
    { name: 'GIF', value: 'gif' },
    { name: 'ICO', value: 'ico' }
  ]

  useEffect(() => {
    console.log('Page loaded.')
    processorRef.current = createImageProcessor('imageCanvas')
    processorRef.current.init()
  }, [])

  useShareAppMessage((res) => {
    return {
      title: '图片处理工具',
      path: '/pages/index/index'
    }
  })

  const tabs = [
    { id: 'compress', label: '压缩' },
    { id: 'resize', label: '尺寸' },
    { id: 'convert', label: '格式' },
    { id: 'edit', label: '编辑' },
    { id: 'filter', label: '滤镜' }
  ]

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

  const handleResize = async (width, height, maintainAspectRatio) => {
    if (!image || !processorRef.current) return

    setIsProcessing(true)
    try {
      const url = await processorRef.current.resize(image.img, width, height, maintainAspectRatio)
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

  const handleCustomCompress = async () => {
    if (!image || !processorRef.current) return

    let quality = parseInt(customQuality)
    
    // 限制输入范围
    if (isNaN(quality)) {
      Taro.showToast({
        title: '请输入有效数字',
        icon: 'none'
      })
      return
    }
    
    // 限制在10-100之间
    quality = Math.max(10, Math.min(100, quality))
    setCustomQuality(quality.toString())
    
    // 转换为0-1之间的值
    const qualityValue = quality / 100
    
    await handleCompress(qualityValue)
  }

  const handleCustomResize = async () => {
    if (!image || !processorRef.current) return

    let width = parseInt(customWidth)
    let height = parseInt(customHeight)
    
    // 限制输入范围
    if (isNaN(width) || isNaN(height)) {
      Taro.showToast({
        title: '请输入有效数字',
        icon: 'none'
      })
      return
    }
    
    // 限制最小值
    width = Math.max(1, width)
    height = Math.max(1, height)
    setCustomWidth(width.toString())
    setCustomHeight(height.toString())
    
    await handleResize(width, height, maintainAspectRatio)
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



  return (
    <View className="index">
      <Canvas
        id="imageCanvas"
        canvasId="imageCanvas"
        type="2d"
        style={{ width: '0px', height: '0px', position: 'fixed', left: '-9999px' }}
      />

      <View className="header">
        <Text className="title">图片处理工具</Text>
      </View>

      <View className="content">
        {!image && (
          <View className="upload-section">
            <View className="upload-card">
              <Text className="upload-title">选择图片</Text>
              <View className="upload-buttons">
                  <Button
                    className="upload-btn"
                    onClick={() => {
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
                    }}
                  >
                    选择图片
                  </Button>
                </View>
            </View>
          </View>
        )}

        {image && (
          <View className="editor-section">
            <View className="tabs">
              {tabs.map(tab => (
                <View
                  key={tab.id}
                  className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Text className="tab-text">{tab.label}</Text>
                </View>
              ))}
            </View>

            <View className="preview-section">
              <View className="preview-card">
                <Text className="preview-title">原始图片</Text>
                <Image
                  src={image.src}
                  className="preview-image"
                  mode="aspectFit"
                />
                <Text className="image-info">
                  ({(image.file.size / 1024).toFixed(2)} KB)
                </Text>
              </View>

              {processedImage && (
                <View className="preview-card">
                  <Text className="preview-title">处理后图片</Text>
                  <Image
                    src={processedImage}
                    className="preview-image"
                    mode="aspectFit"
                  />
                  {processedImageInfo && (
                    <Text className="image-info">
                      {processedImageSize ? `${processedImageSize.width}x${processedImageSize.height} ` : ''}({(processedImageInfo.size / 1024).toFixed(2)} KB)
                    </Text>
                  )}
                </View>
              )}
            </View>

            <View className="options-section">
              {activeTab === 'compress' && (
                <View className="options-card">
                  <Text className="options-title">压缩选项</Text>
                  <View className="option-group">
                    <Text className="option-label">质量: 0.8</Text>
                    <Button
                      className="action-btn"
                      onClick={() => {
                        setCustomQuality('80')
                        handleCompress(0.8)
                      }}
                    >
                      压缩 (80%)
                    </Button>
                  </View>
                  <View className="option-group">
                    <Text className="option-label">质量: 0.6</Text>
                    <Button
                      className="action-btn"
                      onClick={() => {
                        setCustomQuality('60')
                        handleCompress(0.6)
                      }}
                    >
                      压缩 (60%)
                    </Button>
                  </View>
                  <View className="option-group">
                    <Text className="option-label">质量: 0.4</Text>
                    <Button
                      className="action-btn"
                      onClick={() => {
                        setCustomQuality('40')
                        handleCompress(0.4)
                      }}
                    >
                      压缩 (40%)
                    </Button>
                  </View>
                  <View className="option-group">
                    <Text className="option-label">自定义质量: {customQuality}%</Text>
                    <View style={{ marginBottom: '20px' }}>
                      <Slider
                        value={parseInt(customQuality)}
                        min="10"
                        max="100"
                        step="1"
                        onChanging={(e) => setCustomQuality(e.detail.value.toString())}
                        style={{ width: '100%' }}
                      />
                    </View>
                    <Button
                      className="action-btn"
                      onClick={handleCustomCompress}
                    >
                      自定义压缩
                    </Button>
                  </View>
                </View>
              )}

              {activeTab === 'resize' && (
                <View className="options-card">
                  <Text className="options-title">尺寸选项</Text>
                  {sizeOptions.map((option, index) => (
                    <View key={index} className="option-group">
                      <Text className="option-label">{option.name} ({option.width}x{option.height})</Text>
                      <Button
                        className="action-btn"
                        onClick={() => {
                          setCustomWidth(option.width.toString())
                          setCustomHeight(option.height.toString())
                          handleResize(option.width, option.height, true)
                        }}
                      >
                        调整尺寸
                      </Button>
                    </View>
                  ))}
                  <View className="option-group">
                    <Text className="option-label">自定义尺寸</Text>
                    <View style={{ marginBottom: '10px' }}>
                      <View style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <View style={{ flex: 1 }}>
                          <Text className="option-label">宽度</Text>
                          <Input
                            value={customWidth}
                            onInput={(e) => {
                              console.log('Width input change:', e.detail.value)
                              setCustomWidth(e.detail.value)
                            }}
                            placeholder="宽度"
                            style={{
                              width: '100%',
                              padding: '10px',
                              border: '1px solid var(--border)',
                              borderRadius: '8px',
                              fontSize: '16px',
                              backgroundColor: 'rgba(26, 26, 46, 0.8)',
                              color: 'var(--text)'
                            }}
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text className="option-label">高度</Text>
                          <Input
                            value={customHeight}
                            onInput={(e) => {
                              console.log('Height input change:', e.detail.value)
                              setCustomHeight(e.detail.value)
                            }}
                            placeholder="高度"
                            style={{
                              width: '100%',
                              padding: '10px',
                              border: '1px solid var(--border)',
                              borderRadius: '8px',
                              fontSize: '16px',
                              backgroundColor: 'rgba(26, 26, 46, 0.8)',
                              color: 'var(--text)'
                            }}
                          />
                        </View>
                      </View>
                      <View style={{ marginBottom: '10px' }}>
                        <View style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Text className="option-label">保持比例</Text>
                          <Checkbox
                            checked={maintainAspectRatio}
                            onChange={(e) => setMaintainAspectRatio(e.detail.value)}
                          />
                        </View>
                      </View>
                    </View>
                    <Button
                      className="action-btn"
                      onClick={handleCustomResize}
                    >
                      自定义调整
                    </Button>
                  </View>
                </View>
              )}

              {activeTab === 'convert' && (
                <View className="options-card">
                  <Text className="options-title">格式转换</Text>
                  <View className="format-grid">
                    {formatOptions.map((format, index) => (
                      <View key={index} className="format-item">
                        <Button
                          className="format-btn"
                          onClick={() => handleConvert(format.value)}
                        >
                          {format.name}
                        </Button>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {activeTab === 'edit' && (
                <View className="options-card">
                  <Text className="options-title">编辑选项</Text>
                  <View className="option-group">
                    <Text className="option-label">旋转</Text>
                    <View className="edit-buttons">
                      <Button
                        className="action-btn small"
                        onClick={() => handleRotate(-90)}
                      >
                        左转90°
                      </Button>
                      <Button
                        className="action-btn small"
                        onClick={() => handleRotate(90)}
                      >
                        右转90°
                      </Button>
                      <Button
                        className="action-btn small"
                        onClick={() => handleRotate(180)}
                      >
                        180°
                      </Button>
                    </View>
                  </View>
                  <View className="option-group">
                    <Text className="option-label">翻转</Text>
                    <View className="edit-buttons">
                      <Button
                        className="action-btn small"
                        onClick={() => handleFlip('horizontal')}
                      >
                        水平翻转
                      </Button>
                      <Button
                        className="action-btn small"
                        onClick={() => handleFlip('vertical')}
                      >
                        垂直翻转
                      </Button>
                    </View>
                  </View>
                </View>
              )}

              {activeTab === 'filter' && (
                <View className="options-card">
                  <Text className="options-title">滤镜效果</Text>
                  <View className="option-group">
                    <Text className="option-label">黑白</Text>
                    <View className="filter-buttons">
                      <Button
                        className="action-btn small"
                        onClick={() => handleFilter('grayscale', 50)}
                      >
                        50%
                      </Button>
                      <Button
                        className="action-btn small"
                        onClick={() => handleFilter('grayscale', 100)}
                      >
                        100%
                      </Button>
                    </View>
                  </View>
                  <View className="option-group">
                    <Text className="option-label">复古</Text>
                    <View className="filter-buttons">
                      <Button
                        className="action-btn small"
                        onClick={() => handleFilter('sepia', 50)}
                      >
                        50%
                      </Button>
                      <Button
                        className="action-btn small"
                        onClick={() => handleFilter('sepia', 100)}
                      >
                        100%
                      </Button>
                    </View>
                  </View>
                  <View className="option-group">
                    <Text className="option-label">亮度</Text>
                    <View className="filter-buttons">
                      <Button
                        className="action-btn small"
                        onClick={() => handleFilter('brightness', 120)}
                      >
                        增亮
                      </Button>
                      <Button
                        className="action-btn small"
                        onClick={() => handleFilter('brightness', 80)}
                      >
                        变暗
                      </Button>
                    </View>
                  </View>
                </View>
              )}
            </View>

            <View className="actions-section">
              <Button
                className="action-btn secondary"
                onClick={() => {
                  setImage(null)
                  setProcessedImage(null)
                }}
              >
                重新选择
              </Button>
              {processedImage && (
                <Button
                  className="action-btn primary"
                  onClick={handleDownload}
                >
                  保存到相册
                </Button>
              )}
            </View>
          </View>
        )}

        {isProcessing && (
          <View className="loading-overlay">
            <Text className="loading-text">处理中...</Text>
          </View>
        )}
      </View>
    </View>
  )
}