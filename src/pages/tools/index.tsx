import { useEffect, useMemo, useRef, useState } from 'react'
import { View, Text, Canvas, Button, Slider, Picker, Textarea, Input, Image } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import ImageUploader from '../../components/ImageUploader'
import { createImageProcessor, type ImageProcessor } from '../../features/image/processor'
import './index.css'
import CustomHeader from '../../components/CustomHeader'

const TOOL_META: Record<string, { title: string; desc: string }> = {
  compress: { title: '图片压缩', desc: '降低体积，尽量保持清晰' },
  convert: { title: '图片格式转换', desc: 'JPG/PNG 互转' },
  text: { title: '图片加文字', desc: '添加水印或说明文字' },
  format: { title: '图片格式', desc: '查看图片基本信息' },
  collage: { title: '九宫格拼图', desc: '选择 9 张图，生成 3x3 拼图' },
  qrcode: { title: '二维码生成', desc: '输入文本或链接，生成二维码图片' },
  gif: { title: 'GIF 图制作', desc: '多图合成动图' },
  avatar: { title: '头像制作', desc: '裁剪头像并加边框' },
  'long-image': { title: '长图拼接', desc: '多图纵向合成' },
  sticker: { title: '表情包', desc: '加字生成表情包' }
}

type SelectedImage = {
  path: string
  size: number
  img: any
  width: number
  height: number
  type: string
}

const ToolsPage = () => {
  const router = useRouter()
  const tool = (router.params?.tool || 'compress') as string
  const meta = TOOL_META[tool]
  const processorRef = useRef<ImageProcessor | null>(null)

  const [isReady, setIsReady] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [source, setSource] = useState<SelectedImage[]>([])
  const [resultPath, setResultPath] = useState<string>('')
  const [resultSize, setResultSize] = useState<number>(0)

  const [compressQuality, setCompressQuality] = useState<number>(80)
  const [compressResizeType, setCompressResizeType] = useState<'none' | 'width' | 'height'>('none')
  const [compressResizeValue, setCompressResizeValue] = useState<number>(0)
  const [convertType, setConvertType] = useState<'jpg' | 'png'>('jpg')

  const [textValue, setTextValue] = useState<string>('')
  const [textFontSize, setTextFontSize] = useState<number>(36)
  const [textOpacity, setTextOpacity] = useState<number>(90)
  const [textPadding, setTextPadding] = useState<number>(24)
  const [textColor, setTextColor] = useState<string>('#ffffff')
  const [textPosition, setTextPosition] = useState<
    'tl' | 'tc' | 'tr' | 'cl' | 'cc' | 'cr' | 'bl' | 'bc' | 'br'
  >('br')

  const [collageMargin, setCollageMargin] = useState<number>(4)
  const [collageBgColor, setCollageBgColor] = useState<string>('#ffffff')

  const [qrText, setQrText] = useState<string>('')
  const [qrSize, setQrSize] = useState<number>(200)
  const [qrColor, setQrColor] = useState<string>('#111827')
  const [qrBgColor, setQrBgColor] = useState<string>('#ffffff')

  const [gifDelay, setGifDelay] = useState<number>(200)
  const [gifQuality, setGifQuality] = useState<number>(10)

  const [avatarSize, setAvatarSize] = useState<number>(200)
  const [avatarShape, setAvatarShape] = useState<'square' | 'circle'>('circle')
  const [avatarBorderWidth, setAvatarBorderWidth] = useState<number>(4)
  const [avatarBorderColor, setAvatarBorderColor] = useState<string>('#ffffff')

  const [stitchSpacing, setStitchSpacing] = useState<number>(0)

  const [stickerText, setStickerText] = useState<string>('')

  const title = meta?.title || '功能页'
  const desc = meta?.desc || '请从首页进入'
  const showToolNotFound = useMemo(() => !TOOL_META[tool], [tool])

  useEffect(() => {
    if (showToolNotFound) Taro.showToast({ title: '未找到功能', icon: 'none' })
  }, [showToolNotFound])

  useEffect(() => {
    Taro.setNavigationBarTitle({ title })
  }, [title])

  useEffect(() => {
    let mounted = true
    const init = async () => {
      try {
        processorRef.current = createImageProcessor('toolsCanvas')
        await processorRef.current.init()
        if (mounted) setIsReady(true)
      } catch (e) {
        if (mounted) setIsReady(false)
        Taro.showToast({ title: '初始化失败', icon: 'none' })
      }
    }
    init()
    return () => {
      mounted = false
    }
  }, [])

  const resetResult = () => {
    setResultPath('')
    setResultSize(0)
  }

  const chooseImage = async () => {
    try {
      const res = await Taro.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera']
      })
      if (!processorRef.current) throw new Error('processor missing')

      const newSources = await Promise.all(
        res.tempFilePaths.map(async (path) => {
          const img = await processorRef.current!.loadImage(path)
          // TODO: Fix type assertion when Taro types are updated
          const fileInfo = (await Taro.getFileInfo({ filePath: path })) as Taro.getFileInfo.SuccessCallbackResult
          const type = path.split('.').pop() || 'unknown'
          return { path, size: fileInfo.size, img, width: img.width, height: img.height, type }
        })
      )

      setSource(newSources)
      resetResult()
    } catch (e: any) {
      if (String(e?.errMsg || '').includes('cancel')) return
      Taro.showToast({ title: '选择失败', icon: 'none' })
    }
  }

  const saveResult = async () => {
    if (!resultPath) return
    try {
      await Taro.saveImageToPhotosAlbum({ filePath: resultPath })
      Taro.showToast({ title: '已保存到相册', icon: 'success' })
    } catch (e: any) {
      if (String(e?.errMsg || '').includes('cancel')) return
      Taro.showToast({ title: '保存失败', icon: 'none' })
    }
  }

  const runCompress = async () => {
    if (source.length === 0 || !processorRef.current) return
    if (!isReady) {
      Taro.showToast({ title: '初始化中', icon: 'none' })
      return
    }
    setIsProcessing(true)
    try {
      const maxWidth = compressResizeType === 'width' ? compressResizeValue : undefined
      const maxHeight = compressResizeType === 'height' ? compressResizeValue : undefined

      // TODO: Handle multiple results
      const firstResult = await processorRef.current.compress(
        source[0].img,
        compressQuality / 100,
        maxWidth,
        maxHeight
      )
      const info = (await Taro.getFileInfo({ filePath: firstResult })) as Taro.getFileInfo.SuccessCallbackResult
      setResultPath(firstResult)
      setResultSize(info.size)

      Taro.showToast({ title: `处理完成 ${source.length} 张图片`, icon: 'success' })
    } catch (e) {
      Taro.showToast({ title: '处理失败', icon: 'none' })
    } finally {
      setIsProcessing(false)
    }
  }

  const runConvert = async () => {
    if (source.length === 0 || !processorRef.current) return
    if (!isReady) {
      Taro.showToast({ title: '初始化中', icon: 'none' })
      return
    }
    setIsProcessing(true)
    try {
      const results = await Promise.all(
        source.map(async (s) => {
          const path = await processorRef.current!.convert(s.img, convertType)
          const info = (await Taro.getFileInfo({ filePath: path })) as Taro.getFileInfo.SuccessCallbackResult
          return { path, size: info.size }
        })
      )
      const firstResult = results[0]
      setResultPath(firstResult.path)
      setResultSize(firstResult.size)

      Taro.showToast({ title: `处理完成 ${source.length} 张图片`, icon: 'success' })
    } catch (e) {
      Taro.showToast({ title: '处理失败', icon: 'none' })
    } finally {
      setIsProcessing(false)
    }
  }

  const runCollage = async () => {
    if (source.length !== 9) {
      Taro.showToast({ title: '请选择 9 张图片', icon: 'none' })
      return
    }
    if (!processorRef.current) return

    setIsProcessing(true)
    try {
      const path = await processorRef.current.collage(
        source.map((s) => s.img),
        {
          margin: collageMargin,
          bgColor: collageBgColor,
          fileType: 'jpg'
        }
      )
      const info = (await Taro.getFileInfo({ filePath: path })) as Taro.getFileInfo.SuccessCallbackResult
      setResultPath(path)
      setResultSize(info.size)
      Taro.showToast({ title: '拼图完成', icon: 'success' })
    } catch (e: any) {
      console.error('Collage error:', e)
      Taro.showToast({ title: `失败: ${e?.message || '未知错误'}`, icon: 'none' })
    } finally {
      setIsProcessing(false)
    }
  }

  const runQrCode = async () => {
    if (!qrText.trim()) {
      Taro.showToast({ title: '请输入文本', icon: 'none' })
      return
    }
    if (!processorRef.current) return

    setIsProcessing(true)
    try {
      const path = await processorRef.current.generateQrCode({
        text: qrText,
        size: qrSize,
        color: qrColor,
        bgColor: qrBgColor,
        fileType: 'png',
        logo: source.length > 0 ? source[0].img : undefined
      })
      const info = (await Taro.getFileInfo({ filePath: path })) as Taro.getFileInfo.SuccessCallbackResult
      setResultPath(path)
      setResultSize(info.size)
      Taro.showToast({ title: '处理完成', icon: 'success' })
    } catch (e: any) {
      console.error('QR Code error:', e)
      Taro.showToast({ title: `失败: ${e?.message || '未知错误'}`, icon: 'none' })
    } finally {
      setIsProcessing(false)
    }
  }

  const runGif = async () => {
    if (source.length < 2) {
      Taro.showToast({ title: '请选择至少 2 张图片', icon: 'none' })
      return
    }
    if (!processorRef.current) return

    setIsProcessing(true)
    try {
      const path = await processorRef.current.createGif(
        source.map((s) => s.img),
        {
          width: source[0].width,
          height: source[0].height,
          delay: gifDelay,
          quality: gifQuality
        }
      )
      const info = (await Taro.getFileInfo({ filePath: path })) as Taro.getFileInfo.SuccessCallbackResult
      setResultPath(path)
      setResultSize(info.size)
      Taro.showToast({ title: '处理完成', icon: 'success' })
    } catch (e: any) {
      console.error('GIF error:', e)
      Taro.showToast({ title: `失败: ${e?.message || '未知错误'}`, icon: 'none' })
    } finally {
      setIsProcessing(false)
    }
  }

  const runAvatar = async () => {
    if (source.length === 0) {
      Taro.showToast({ title: '请选择一张图片', icon: 'none' })
      return
    }
    if (!processorRef.current) return

    setIsProcessing(true)
    try {
      const path = await processorRef.current.createAvatar(source[0].img, {
        size: avatarSize,
        shape: avatarShape,
        borderWidth: avatarBorderWidth,
        borderColor: avatarBorderColor,
        fileType: 'png'
      })
      const info = (await Taro.getFileInfo({ filePath: path })) as Taro.getFileInfo.SuccessCallbackResult
      setResultPath(path)
      setResultSize(info.size)
      Taro.showToast({ title: '处理完成', icon: 'success' })
    } catch (e) {
      Taro.showToast({ title: '处理失败', icon: 'none' })
    } finally {
      setIsProcessing(false)
    }
  }

  const runStitch = async () => {
    if (source.length < 2) {
      Taro.showToast({ title: '请选择至少 2 张图片', icon: 'none' })
      return
    }
    if (!processorRef.current) return

    setIsProcessing(true)
    try {
      const path = await processorRef.current.stitchImages(
        source.map((s) => s.img),
        {
          spacing: stitchSpacing,
          fileType: 'jpg'
        }
      )
      const info = (await Taro.getFileInfo({ filePath: path })) as Taro.getFileInfo.SuccessCallbackResult
      setResultPath(path)
      setResultSize(info.size)
      Taro.showToast({ title: '处理完成', icon: 'success' })
    } catch (e) {
      Taro.showToast({ title: '处理失败', icon: 'none' })
    } finally {
      setIsProcessing(false)
    }
  }

  const runSticker = async () => {
    if (source.length === 0) {
      Taro.showToast({ title: '请选择一张图片', icon: 'none' })
      return
    }
    if (!processorRef.current) return

    setIsProcessing(true)
    try {
      const path = await processorRef.current.createSticker(source[0].img, {
        text: stickerText,
        fileType: 'png'
      })
      const info = (await Taro.getFileInfo({ filePath: path })) as Taro.getFileInfo.SuccessCallbackResult
      setResultPath(path)
      setResultSize(info.size)
      Taro.showToast({ title: '处理完成', icon: 'success' })
    } catch (e) {
      Taro.showToast({ title: '处理失败', icon: 'none' })
    } finally {
      setIsProcessing(false)
    }
  }

  const runText = async () => {
    if (source.length === 0 || !processorRef.current) return
    if (!isReady) {
      Taro.showToast({ title: '初始化中', icon: 'none' })
      return
    }
    if (!String(textValue || '').trim()) {
      Taro.showToast({ title: '请输入文字', icon: 'none' })
      return
    }
    setIsProcessing(true)
    try {
      const textOpts = {
        text: textValue,
        fontSize: textFontSize,
        color: textColor,
        opacity: textOpacity / 100,
        position: textPosition,
        padding: textPadding,
        fileType: 'png' as 'png' | 'jpg'
      }

      const results = await Promise.all(
        source.map(async (s) => {
          const path = await processorRef.current!.addText(s.img, textOpts)
          const info = (await Taro.getFileInfo({ filePath: path })) as Taro.getFileInfo.SuccessCallbackResult
          return { path, size: info.size }
        })
      )

      const firstResult = results[0]
      setResultPath(firstResult.path)
      setResultSize(firstResult.size)

      Taro.showToast({ title: `处理完成 ${source.length} 张图片`, icon: 'success' })
    } catch (e) {
      Taro.showToast({ title: '处理失败', icon: 'none' })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <View className="tools-page">
      <CustomHeader title={title} showBack={true} />
      <Canvas
        id="toolsCanvas"
        canvasId="toolsCanvas"
        type="2d"
        style={{ width: '0px', height: '0px', position: 'fixed', left: '-9999px' }}
      />
      <View className="tools-content">
        <View className="tools-header">
          <Text className="tools-title">{title}</Text>
          <Text className="tools-desc">{desc}</Text>
        </View>

        <View className="tools-card">
          <ImageUploader
            images={source.map(s => ({ path: s.path, size: s.size }))}
            onImagesChange={(images) => {
              if (!processorRef.current) return
              Promise.all(
                images.map(async (img) => {
                  const loaded = await processorRef.current!.loadImage(img.path)
                  const type = img.path.split('.').pop() || 'unknown'
                  return { ...img, img: loaded, width: loaded.width, height: loaded.height, type }
                })
              ).then(newSources => {
                setSource(newSources)
                resetResult()
              })
            }}
            maxCount={tool === 'collage' ? 9 : tool === 'gif' || tool === 'long-image' ? 20 : 1}
            disabled={isProcessing}
          />
        </View>

        {resultPath && (
          <View className="tools-card tools-result-card">
            <Text className="tools-label">处理结果</Text>
            <View className="tools-result-preview">
              <Image className="tools-result-image" src={resultPath} mode="aspectFit" />
              <Text className="tools-meta">{(resultSize / 1024).toFixed(1)} KB</Text>
            </View>
          </View>
        )}

        {tool === 'compress' && (
          <View className="tools-card">
            <Text className="tools-label">质量: {compressQuality}%</Text>
            <Slider
              value={compressQuality}
              min={10}
              max={100}
              step={1}
              blockSize={18}
              onChanging={(e) => setCompressQuality(e.detail.value as number)}
              disabled={isProcessing}
            />
            <View className="tools-row">
              <Text className="tools-label">调整尺寸</Text>
              <View className="tools-btn-row">
                {[
                  { k: 'none', t: '不调整' },
                  { k: 'width', t: '按宽度' },
                  { k: 'height', t: '按高度' }
                ].map((item) => (
                  <View
                    key={item.k}
                    className={`tools-option-btn ${compressResizeType === item.k ? 'active' : ''}`}
                    onClick={() => setCompressResizeType(item.k as any)}
                  >
                    <Text className="tools-option-text">{item.t}</Text>
                  </View>
                ))}
              </View>
            </View>

            {compressResizeType !== 'none' && (
              <View className="tools-row">
                <Text className="tools-label">
                  {compressResizeType === 'width' ? '宽度 (px)' : '高度 (px)'}
                </Text>
                <Input
                  className="tools-input"
                  type="number"
                  value={String(compressResizeValue || '')}
                  placeholder="输入像素值"
                  onInput={(e) => setCompressResizeValue(Number(e.detail.value))}
                  disabled={isProcessing}
                />
              </View>
            )}
          </View>
        )}

        {tool === 'convert' && (
          <View className="tools-card">
            <Text className="tools-label">目标格式</Text>
            <View className="tools-btn-row">
              {[
                { k: 'jpg', t: 'JPG' },
                { k: 'png', t: 'PNG' }
              ].map((item) => (
                <View
                  key={item.k}
                  className={`tools-option-btn ${convertType === item.k ? 'active' : ''}`}
                  onClick={() => setConvertType(item.k as any)}
                >
                  <Text className="tools-option-text">{item.t}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {tool === 'text' && (
          <View className="tools-card">
            <Text className="tools-label">文字内容</Text>
            <Textarea
              className="tools-textarea"
              value={textValue}
              placeholder="输入你要添加的文字（支持换行）"
              maxlength={200}
              onInput={(e) => setTextValue(e.detail.value)}
              disabled={isProcessing}
              autoHeight
            />
            <View>
              <View className="tools-row">
                <Text className="tools-label">大小: {textFontSize}px</Text>
                <Slider
                  value={textFontSize}
                  min={12}
                  max={96}
                  step={1}
                  blockSize={18}
                  onChanging={(e) => setTextFontSize(e.detail.value as number)}
                  disabled={isProcessing}
                />
              </View>
              <View className="tools-row">
                <Text className="tools-label">透明度: {textOpacity}%</Text>
                <Slider
                  value={textOpacity}
                  min={10}
                  max={100}
                  step={1}
                  blockSize={18}
                  onChanging={(e) => setTextOpacity(e.detail.value as number)}
                  disabled={isProcessing}
                />
              </View>
              <View className="tools-row">
                <Text className="tools-label">边距: {textPadding}px</Text>
                <Slider
                  value={textPadding}
                  min={0}
                  max={80}
                  step={1}
                  blockSize={18}
                  onChanging={(e) => setTextPadding(e.detail.value as number)}
                  disabled={isProcessing}
                />
              </View>

              <View className="tools-row">
                <Text className="tools-label">颜色</Text>
                <View className="tools-color-row">
                  {[
                    { label: '白', value: '#ffffff' },
                    { label: '黑', value: '#111827' },
                    { label: '红', value: '#ef4444' },
                    { label: '橙', value: '#f97316' },
                    { label: '黄', value: '#f59e0b' },
                    { label: '绿', value: '#22c55e' },
                    { label: '青', value: '#06b6d4' },
                    { label: '蓝', value: '#3b82f6' },
                    { label: '紫', value: '#8b5cf6' },
                    { label: '粉', value: '#ec4899' }
                  ].map((c) => (
                    <View
                      key={c.value}
                      className={`tools-color-swatch ${textColor === c.value ? 'active' : ''}`}
                      style={{ background: c.value }}
                      onClick={() => setTextColor(c.value)}
                    >
                    </View>
                  ))}
                </View>
              </View>

              <View className="tools-row">
                <Text className="tools-label">位置</Text>
                <View className="tools-pos-grid">
                  {[
                    { k: 'tl', t: '左上' },
                    { k: 'tc', t: '中上' },
                    { k: 'tr', t: '右上' },
                    { k: 'cl', t: '左中' },
                    { k: 'cc', t: '正中' },
                    { k: 'cr', t: '右中' },
                    { k: 'bl', t: '左下' },
                    { k: 'bc', t: '中下' },
                    { k: 'br', t: '右下' }
                  ].map((p) => (
                    <View
                      key={p.k}
                      className={`tools-pos ${textPosition === (p.k as any) ? 'active' : ''}`}
                      onClick={() => setTextPosition(p.k as any)}
                    >
                      <Text className="tools-pos-text">{p.t}</Text>
                    </View>
                  ))}
                </View>
              </View>

            </View>
          </View>
        )}

        {tool === 'format' && source.length > 0 && (
          <View className="tools-card">
            <Text className="tools-label">图片信息 (第 1 张)</Text>
            <View className="tools-info-grid">
              <Text className="tools-info-key">格式</Text>
              <Text className="tools-info-value">{source[0].type.toUpperCase()}</Text>
              <Text className="tools-info-key">尺寸</Text>
              <Text className="tools-info-value">{source[0].width} x {source[0].height}</Text>
              <Text className="tools-info-key">大小</Text>
              <Text className="tools-info-value">{(source[0].size / 1024).toFixed(1)} KB</Text>
            </View>
          </View>
        )}

        {tool === 'collage' && (
          <View className="tools-card">
            <View className="tools-row">
              <Text className="tools-label">边距: {collageMargin}px</Text>
              <Slider
                value={collageMargin}
                min={0}
                max={40}
                step={1}
                blockSize={18}
                onChanging={(e) => setCollageMargin(e.detail.value as number)}
                disabled={isProcessing}
              />
            </View>
            <View className="tools-row">
              <Text className="tools-label">背景色</Text>
              <View className="tools-color-row">
                {[
                  { label: '白', value: '#ffffff' },
                  { label: '黑', value: '#111827' },
                  { label: '红', value: '#ef4444' },
                  { label: '橙', value: '#f97316' },
                  { label: '黄', value: '#f59e0b' },
                  { label: '绿', value: '#22c55e' },
                  { label: '青', value: '#06b6d4' },
                  { label: '蓝', value: '#3b82f6' },
                  { label: '紫', value: '#8b5cf6' },
                  { label: '粉', value: '#ec4899' }
                ].map((c) => (
                  <View
                    key={c.value}
                    className={`tools-color-swatch ${collageBgColor === c.value ? 'active' : ''}`}
                    style={{ background: c.value }}
                    onClick={() => setCollageBgColor(c.value)}
                  />
                ))}
              </View>
            </View>
          </View>
        )}

        {tool !== 'compress' &&
          tool !== 'convert' &&
          tool !== 'text' &&
          tool !== 'format' &&
          tool !== 'collage' &&
          tool !== 'qrcode' &&
          tool !== 'gif' &&
          tool !== 'avatar' &&
          tool !== 'long-image' &&
          tool !== 'sticker' && (
            <View className="tools-card">
              <Text className="tools-tip">该功能待实现，先完成主功能闭环。</Text>
            </View>
          )}

        {tool === 'sticker' && (
          <View className="tools-card">
            <Textarea
              className="tools-textarea"
              value={stickerText}
              placeholder="输入表情包文字"
              maxlength={100}
              onInput={(e) => setStickerText(e.detail.value)}
              disabled={isProcessing}
              autoHeight
            />
          </View>
        )}

        {tool === 'long-image' && (
          <View className="tools-card">
            <View className="tools-row">
              <Text className="tools-label">间距: {stitchSpacing}px</Text>
              <Slider
                value={stitchSpacing}
                min={0}
                max={40}
                step={1}
                blockSize={18}
                onChanging={(e) => setStitchSpacing(e.detail.value as number)}
                disabled={isProcessing}
              />
            </View>
          </View>
        )}

        {tool === 'avatar' && (
          <View className="tools-card">
            <View className="tools-row">
              <Text className="tools-label">形状</Text>
              <View className="tools-btn-row">
                {[
                  { k: 'circle', t: '圆形' },
                  { k: 'square', t: '方形' }
                ].map((item) => (
                  <View
                    key={item.k}
                    className={`tools-option-btn ${avatarShape === item.k ? 'active' : ''}`}
                    onClick={() => setAvatarShape(item.k as any)}
                  >
                    <Text className="tools-option-text">{item.t}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View className="tools-row">
              <Text className="tools-label">尺寸: {avatarSize}px</Text>
              <Slider
                value={avatarSize}
                min={100}
                max={800}
                step={10}
                blockSize={18}
                onChanging={(e) => setAvatarSize(e.detail.value as number)}
                disabled={isProcessing}
              />
            </View>
            <View className="tools-row">
              <Text className="tools-label">边框: {avatarBorderWidth}px</Text>
              <Slider
                value={avatarBorderWidth}
                min={0}
                max={40}
                step={1}
                blockSize={18}
                onChanging={(e) => setAvatarBorderWidth(e.detail.value as number)}
                disabled={isProcessing}
              />
            </View>
            <View className="tools-row">
              <Text className="tools-label">边框颜色</Text>
              <View className="tools-color-row">
                {[
                  { label: '白', value: '#ffffff' },
                  { label: '黑', value: '#111827' },
                  { label: '红', value: '#ef4444' },
                  { label: '橙', value: '#f97316' },
                  { label: '黄', value: '#f59e0b' },
                  { label: '绿', value: '#22c55e' },
                  { label: '青', value: '#06b6d4' },
                  { label: '蓝', value: '#3b82f6' },
                  { label: '紫', value: '#8b5cf6' },
                  { label: '粉', value: '#ec4899' }
                ].map((c) => (
                  <View
                    key={c.value}
                    className={`tools-color-swatch ${avatarBorderColor === c.value ? 'active' : ''}`}
                    style={{ background: c.value }}
                    onClick={() => setAvatarBorderColor(c.value)}
                  />
                ))}
              </View>
            </View>
          </View>
        )}

        {tool === 'gif' && (
          <View className="tools-card">
            <View className="tools-row">
              <Text className="tools-label">延迟: {gifDelay}ms</Text>
              <Slider
                value={gifDelay}
                min={50}
                max={1000}
                step={10}
                blockSize={18}
                onChanging={(e) => setGifDelay(e.detail.value as number)}
                disabled={isProcessing}
              />
            </View>
            <View className="tools-row">
              <Text className="tools-label">质量: {gifQuality}</Text>
              <Slider
                value={gifQuality}
                min={1}
                max={20}
                step={1}
                blockSize={18}
                onChanging={(e) => setGifQuality(e.detail.value as number)}
                disabled={isProcessing}
              />
            </View>
          </View>
        )}

        {tool === 'qrcode' && (
          <View className="tools-card">
            <Textarea
              className="tools-textarea"
              value={qrText}
              placeholder="输入文本或链接"
              maxlength={500}
              onInput={(e) => setQrText(e.detail.value)}
              disabled={isProcessing}
              autoHeight
            />
            <View className="tools-row">
              <Text className="tools-label">尺寸: {qrSize}px</Text>
              <Slider
                value={qrSize}
                min={100}
                max={800}
                step={10}
                blockSize={18}
                onChanging={(e) => setQrSize(e.detail.value as number)}
                disabled={isProcessing}
              />
            </View>
            <View className="tools-row">
              <Text className="tools-label">前景色</Text>
              <View className="tools-color-row">
                {[
                  { label: '黑', value: '#111827' },
                  { label: '白', value: '#ffffff' },
                  { label: '红', value: '#ef4444' },
                  { label: '橙', value: '#f97316' },
                  { label: '黄', value: '#f59e0b' },
                  { label: '绿', value: '#22c55e' },
                  { label: '青', value: '#06b6d4' },
                  { label: '蓝', value: '#3b82f6' },
                  { label: '紫', value: '#8b5cf6' },
                  { label: '粉', value: '#ec4899' }
                ].map((c) => (
                  <View
                    key={c.value}
                    className={`tools-color-swatch ${qrColor === c.value ? 'active' : ''}`}
                    style={{ background: c.value }}
                    onClick={() => setQrColor(c.value)}
                  />
                ))}
              </View>
            </View>
            <View className="tools-row">
              <Text className="tools-label">背景色</Text>
              <View className="tools-color-row">
                {[
                  { label: '白', value: '#ffffff' },
                  { label: '黑', value: '#111827' },
                  { label: '红', value: '#ef4444' },
                  { label: '橙', value: '#f97316' },
                  { label: '黄', value: '#f59e0b' },
                  { label: '绿', value: '#22c55e' },
                  { label: '青', value: '#06b6d4' },
                  { label: '蓝', value: '#3b82f6' },
                  { label: '紫', value: '#8b5cf6' },
                  { label: '粉', value: '#ec4899' }
                ].map((c) => (
                  <View
                    key={c.value}
                    className={`tools-color-swatch ${qrBgColor === c.value ? 'active' : ''}`}
                    style={{ background: c.value }}
                    onClick={() => setQrBgColor(c.value)}
                  />
                ))}
              </View>
            </View>
          </View>
        )}

        {!isReady && <Text className="tools-tip">初始化中…</Text>}
        {isProcessing && <Text className="tools-tip">处理中…</Text>}
      </View>

      {/* 底部固定操作栏 */}
      <View className="tools-footer">
        <Button
          className="tools-footer-btn primary"
          onClick={() => {
            if (tool === 'compress') runCompress()
            else if (tool === 'convert') runConvert()
            else if (tool === 'text') runText()
            else if (tool === 'collage') runCollage()
            else if (tool === 'qrcode') runQrCode()
            else if (tool === 'gif') runGif()
            else if (tool === 'avatar') runAvatar()
            else if (tool === 'long-image') runStitch()
            else if (tool === 'sticker') runSticker()
          }}
          disabled={isProcessing || (tool === 'qrcode' ? false : source.length === 0)}
        >
          {isProcessing ? '处理中...' : tool === 'compress' ? '开始压缩' : tool === 'convert' ? '开始转换' : tool === 'text' ? '生成图片' : tool === 'collage' ? '开始拼图' : tool === 'qrcode' ? '生成二维码' : tool === 'gif' ? '生成 GIF' : tool === 'avatar' ? '生成头像' : tool === 'long-image' ? '开始拼接' : tool === 'sticker' ? '生成表情包' : '生成'}
        </Button>
        {resultPath && (
          <Button
            className="tools-footer-btn secondary"
            onClick={saveResult}
            disabled={isProcessing}
          >
            下载图片
          </Button>
        )}
      </View>
    </View>
  )
}

export default ToolsPage
