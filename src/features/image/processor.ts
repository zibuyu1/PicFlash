import Taro from '@tarojs/taro'
import { createQrCodeImg } from 'taro-code/lib/common/qrcode'
import GIF from 'gif.js'

export type ImageProcessor = {
  init: () => Promise<void>
  loadImage: (src: string) => Promise<any>
  compress: (img: any, quality: number, maxWidth?: number, maxHeight?: number) => Promise<string>
  convert: (img: any, fileType: 'jpg' | 'png') => Promise<string>
  addText: (
    img: any,
    opts: {
      text: string
      fontSize: number
      color: string
      opacity: number
      position: 'tl' | 'tc' | 'tr' | 'cl' | 'cc' | 'cr' | 'bl' | 'bc' | 'br'
      padding: number
      fileType: 'jpg' | 'png'
      quality?: number
    }
  ) => Promise<string>
  collage: (
    imgs: any[],
    opts: {
      margin: number
      bgColor: string
      fileType: 'jpg' | 'png'
      quality?: number
    }
  ) => Promise<string>
  generateQrCode: (
    opts: {
      text: string
      size: number
      color: string
      bgColor: string
      fileType: 'jpg' | 'png'
      quality?: number
      logo?: any
    }
  ) => Promise<string>
  createGif: (
    imgs: any[],
    opts: {
      width: number
      height: number
      delay: number
      quality: number
    }
  ) => Promise<string>
  createAvatar: (
    img: any,
    opts: {
      size: number
      shape: 'square' | 'circle'
      borderWidth: number
      borderColor: string
      fileType: 'jpg' | 'png'
      quality?: number
    }
  ) => Promise<string>
  stitchImages: (
    imgs: any[],
    opts: {
      spacing: number
      fileType: 'jpg' | 'png'
      quality?: number
    }
  ) => Promise<string>
  createSticker: (
    img: any,
    opts: {
      text: string
      fileType: 'jpg' | 'png'
      quality?: number
    }
  ) => Promise<string>
}

export const createImageProcessor = (canvasId: string): ImageProcessor => {
  let canvas: any = null
  let ctx: any = null

  const init = () =>
    new Promise<void>((resolve, reject) => {
      const query = Taro.createSelectorQuery()
      query
        .select(`#${canvasId}`)
        .fields({ node: true, size: true })
        .exec((res) => {
          if (!res || !res[0] || !res[0].node) {
            reject(new Error('Canvas not found'))
            return
          }
          canvas = res[0].node
          ctx = canvas.getContext('2d')
          resolve()
        })
    })

  const loadImage = (src: string) =>
    new Promise<any>((resolve, reject) => {
      if (!canvas) {
        reject(new Error('Canvas not initialized'))
        return
      }
      const img = canvas.createImage()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })

  const compress = async (img: any, quality: number, maxWidth?: number, maxHeight?: number) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized')

    let width = img.width
    let height = img.height

    if (maxWidth && width > maxWidth) {
      height = Math.round((maxWidth / width) * height)
      width = maxWidth
    }
    if (maxHeight && height > maxHeight) {
      width = Math.round((maxHeight / height) * width)
      height = maxHeight
    }

    canvas.width = width
    canvas.height = height
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(img, 0, 0, width, height)

    return new Promise<string>((resolve, reject) => {
      Taro.canvasToTempFilePath({
        canvas,
        fileType: 'jpg',
        quality,
        success: (res) => resolve(res.tempFilePath),
        fail: reject
      })
    })
  }

  const convert = async (img: any, fileType: 'jpg' | 'png') => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized')

    canvas.width = img.width
    canvas.height = img.height
    ctx.clearRect(0, 0, img.width, img.height)
    ctx.drawImage(img, 0, 0)

    return new Promise<string>((resolve, reject) => {
      Taro.canvasToTempFilePath({
        canvas,
        fileType,
        success: (res) => resolve(res.tempFilePath),
        fail: reject
      })
    })
  }

  const wrapLines = (text: string, maxCharsPerLine: number) => {
    const rawLines = String(text || '').split('\n')
    const lines: string[] = []
    for (const raw of rawLines) {
      const s = raw || ''
      if (maxCharsPerLine <= 0 || s.length <= maxCharsPerLine) {
        lines.push(s)
        continue
      }
      for (let i = 0; i < s.length; i += maxCharsPerLine) {
        lines.push(s.slice(i, i + maxCharsPerLine))
      }
    }
    return lines
  }

  const breakByWidth = (text: string, maxWidth: number) => {
    const lines: string[] = []
    const rawLines = String(text || '').split('\n')
    for (const rawLine of rawLines) {
      const s = rawLine || ''
      let line = ''
      for (const ch of s) {
        const next = line + ch
        const w = ctx.measureText(next).width
        if (w > maxWidth && line) {
          lines.push(line)
          line = ch
        } else {
          line = next
        }
      }
      lines.push(line)
    }
    return lines
  }

  const addText = async (
    img: any,
    opts: {
      text: string
      fontSize: number
      color: string
      opacity: number
      position: 'tl' | 'tc' | 'tr' | 'cl' | 'cc' | 'cr' | 'bl' | 'bc' | 'br'
      padding: number
      fileType: 'jpg' | 'png'
      quality?: number
    }
  ) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized')

    const fontSize = Math.max(10, Math.min(128, Math.round(opts.fontSize || 24)))
    const opacity = Math.max(0.05, Math.min(1, Number(opts.opacity || 1)))
    const padding = Math.max(0, Math.min(200, Math.round(opts.padding || 24)))

    canvas.width = img.width
    canvas.height = img.height
    ctx.clearRect(0, 0, img.width, img.height)
    ctx.globalAlpha = 1
    ctx.drawImage(img, 0, 0)

    ctx.save()
    ctx.globalAlpha = opacity
    ctx.fillStyle = opts.color || '#ffffff'
    ctx.textBaseline = 'top'
    ctx.textAlign = 'left'
    ctx.font = `800 ${fontSize}px sans-serif`

    const maxWidth = Math.max(10, img.width - padding * 2)
    let lines = breakByWidth(opts.text || '', maxWidth)
    if (lines.length === 0) lines = wrapLines('', 1)

    const lineHeight = Math.round(fontSize * 1.25)
    const textHeight = lines.length * lineHeight
    const maxLineWidth = Math.max(...lines.map((l) => ctx.measureText(l).width))

    const anchors: Record<string, { x: number; y: number }> = {
      tl: { x: padding, y: padding },
      tc: { x: (img.width - maxLineWidth) / 2, y: padding },
      tr: { x: img.width - padding - maxLineWidth, y: padding },
      cl: { x: padding, y: (img.height - textHeight) / 2 },
      cc: { x: (img.width - maxLineWidth) / 2, y: (img.height - textHeight) / 2 },
      cr: { x: img.width - padding - maxLineWidth, y: (img.height - textHeight) / 2 },
      bl: { x: padding, y: img.height - padding - textHeight },
      bc: { x: (img.width - maxLineWidth) / 2, y: img.height - padding - textHeight },
      br: { x: img.width - padding - maxLineWidth, y: img.height - padding - textHeight }
    }

    const anchor = anchors[opts.position] || anchors.br
    const startX = Math.max(padding, Math.min(img.width - padding - maxLineWidth, anchor.x))
    const startY = Math.max(padding, Math.min(img.height - padding - textHeight, anchor.y))

    ctx.shadowColor = 'rgba(0,0,0,0.35)'
    ctx.shadowBlur = Math.max(2, Math.round(fontSize / 6))
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = Math.max(1, Math.round(fontSize / 10))

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      ctx.fillText(line, startX, startY + i * lineHeight)
    }
    ctx.restore()

    return new Promise<string>((resolve, reject) => {
      Taro.canvasToTempFilePath({
        canvas,
        fileType: opts.fileType,
        quality: opts.fileType === 'jpg' ? opts.quality ?? 0.92 : undefined,
        success: (res) => resolve(res.tempFilePath),
        fail: reject
      })
    })
  }

  const collage = async (
    imgs: any[],
    opts: {
      margin: number
      bgColor: string
      fileType: 'jpg' | 'png'
      quality?: number
    }
  ) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized')
    if (imgs.length !== 9) throw new Error('Collage requires 9 images')

    const margin = Math.max(0, opts.margin || 0)
    const maxImgSize = Math.max(100, ...imgs.map((i) => Math.max(i.width, i.height)))
    const itemSize = Math.min(maxImgSize, 400)
    const canvasSize = itemSize * 3 + margin * 4

    canvas.width = canvasSize
    canvas.height = canvasSize
    ctx.clearRect(0, 0, canvasSize, canvasSize)

    if (opts.bgColor) {
      ctx.fillStyle = opts.bgColor
      ctx.fillRect(0, 0, canvasSize, canvasSize)
    }

    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3)
      const col = i % 3
      const img = imgs[i]

      const x = col * (itemSize + margin) + margin
      const y = row * (itemSize + margin) + margin

      const ar = img.width / img.height
      let dw = itemSize
      let dh = itemSize
      if (ar > 1) {
        dh = itemSize / ar
      } else {
        dw = itemSize * ar
      }
      const dx = x + (itemSize - dw) / 2
      const dy = y + (itemSize - dh) / 2

      ctx.drawImage(img, dx, dy, dw, dh)
    }

    return new Promise<string>((resolve, reject) => {
      Taro.canvasToTempFilePath({
        canvas,
        fileType: opts.fileType,
        quality: opts.fileType === 'jpg' ? opts.quality ?? 0.92 : undefined,
        success: (res) => resolve(res.tempFilePath),
        fail: reject
      })
    })
  }

  const generateQrCode = async (opts: {
    text: string
    size: number
    color: string
    bgColor: string
    fileType: 'jpg' | 'png'
    quality?: number
    logo?: any
  }) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized')

    const size = Math.max(100, Math.min(1000, opts.size || 200))
    canvas.width = size
    canvas.height = size
    ctx.clearRect(0, 0, size, size)

    const base64 = createQrCodeImg(opts.text, {
      size,
      black: opts.color,
      white: opts.bgColor
    })
    const img = await loadImage(base64)
    ctx.drawImage(img, 0, 0, size, size)

    // 如果有 logo 图片，画在中心
    if (opts.logo) {
      const logoSize = size * 0.2 // logo 占二维码大小的 20%
      const logoX = (size - logoSize) / 2
      const logoY = (size - logoSize) / 2

      // 绘制白色背景圆角矩形作为 logo 背景
      ctx.fillStyle = opts.bgColor
      const cornerRadius = logoSize * 0.15
      ctx.beginPath()
      ctx.moveTo(logoX + cornerRadius, logoY)
      ctx.lineTo(logoX + logoSize - cornerRadius, logoY)
      ctx.quadraticCurveTo(logoX + logoSize, logoY, logoX + logoSize, logoY + cornerRadius)
      ctx.lineTo(logoX + logoSize, logoY + logoSize - cornerRadius)
      ctx.quadraticCurveTo(logoX + logoSize, logoY + logoSize, logoX + logoSize - cornerRadius, logoY + logoSize)
      ctx.lineTo(logoX + cornerRadius, logoY + logoSize)
      ctx.quadraticCurveTo(logoX, logoY + logoSize, logoX, logoY + logoSize - cornerRadius)
      ctx.lineTo(logoX, logoY + cornerRadius)
      ctx.quadraticCurveTo(logoX, logoY, logoX + cornerRadius, logoY)
      ctx.closePath()
      ctx.fill()

      // 绘制 logo 图片，保持比例
      const ar = opts.logo.width / opts.logo.height
      let dw = logoSize * 0.8
      let dh = logoSize * 0.8
      if (ar > 1) {
        dh = dw / ar
      } else {
        dw = dh * ar
      }
      const dx = logoX + (logoSize - dw) / 2
      const dy = logoY + (logoSize - dh) / 2
      ctx.drawImage(opts.logo, dx, dy, dw, dh)
    }

    return new Promise<string>((resolve, reject) => {
      Taro.canvasToTempFilePath({
        canvas,
        fileType: opts.fileType,
        quality: opts.fileType === 'jpg' ? opts.quality ?? 0.92 : undefined,
        success: (res) => resolve(res.tempFilePath),
        fail: reject
      })
    })
  }

  const createGif = async (imgs: any[], opts: { width: number; height: number; delay: number; quality: number }) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized')
    if (imgs.length < 2) throw new Error('至少需要2张图片')

    // 限制尺寸防止内存溢出
    const maxSize = 300
    let width = Math.min(opts.width, maxSize)
    let height = Math.min(opts.height, maxSize)
    
    // 保持比例缩放
    if (width > maxSize || height > maxSize) {
      const ratio = Math.min(maxSize / width, maxSize / height)
      width = Math.round(width * ratio)
      height = Math.round(height * ratio)
    }

    return new Promise<string>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('GIF 生成超时'))
      }, 60000)

      try {
        // 设置主 canvas 尺寸
        canvas.width = width
        canvas.height = height

        const gif = new GIF({
          workers: 0,
          quality: Math.max(1, Math.min(30, opts.quality)),
          width,
          height,
          background: '#ffffff'
        })

        gif.on('finished', async (blob: any) => {
          clearTimeout(timeout)
          try {
            const url = URL.createObjectURL(blob)
            const tempPath = `${Taro.env.USER_DATA_PATH}/${Date.now()}.gif`
            
            await new Promise<void>((res, rej) => {
              Taro.downloadFile({
                url,
                filePath: tempPath,
                success: () => res(),
                fail: rej
              })
            })
            
            resolve(tempPath)
          } catch (e: any) {
            console.error('Save GIF error:', e)
            reject(new Error('保存 GIF 失败: ' + e?.message))
          }
        })

        gif.on('error', (err: any) => {
          clearTimeout(timeout)
          console.error('GIF error:', err)
          reject(new Error('GIF 渲染失败: ' + (err?.message || '未知错误')))
        })

        // 逐帧绘制并转为 Image 对象
        let frameIndex = 0
        
        const addNextFrame = async () => {
          if (frameIndex >= imgs.length) {
            gif.render()
            return
          }
          
          const img = imgs[frameIndex]
          ctx.clearRect(0, 0, width, height)
          
          // 居中绘制，保持比例
          const ar = img.width / img.height
          let dw = width
          let dh = height
          if (ar > width / height) {
            dh = dw / ar
          } else {
            dw = dh * ar
          }
          const dx = (width - dw) / 2
          const dy = (height - dh) / 2
          ctx.drawImage(img, dx, dy, dw, dh)
          
          // 转为 data URL 并加载为 Image
          const dataUrl = canvas.toDataURL('image/png')
          const frameImg = canvas.createImage()
          frameImg.onload = () => {
            gif.addFrame(frameImg, { delay: opts.delay })
            frameIndex++
            setTimeout(addNextFrame, 0)
          }
          frameImg.onerror = () => {
            reject(new Error(`第 ${frameIndex + 1} 帧加载失败`))
          }
          frameImg.src = dataUrl
        }
        
        // 开始添加帧
        addNextFrame()
        
      } catch (e: any) {
        clearTimeout(timeout)
        console.error('GIF init error:', e)
        reject(new Error(`GIF 初始化失败: ${e?.message}`))
      }
    })
  }

  const createAvatar = async (
    img: any,
    opts: {
      size: number
      shape: 'square' | 'circle'
      borderWidth: number
      borderColor: string
      fileType: 'jpg' | 'png'
      quality?: number
    }
  ) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized')

    const size = Math.max(100, Math.min(1000, opts.size || 200))
    canvas.width = size
    canvas.height = size
    ctx.clearRect(0, 0, size, size)

    const cropSize = Math.min(img.width, img.height)
    const sx = (img.width - cropSize) / 2
    const sy = (img.height - cropSize) / 2

    ctx.save()
    if (opts.shape === 'circle') {
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
      ctx.clip()
    }

    ctx.drawImage(img, sx, sy, cropSize, cropSize, 0, 0, size, size)
    ctx.restore()

    if (opts.borderWidth > 0) {
      ctx.strokeStyle = opts.borderColor || '#ffffff'
      ctx.lineWidth = opts.borderWidth
      if (opts.shape === 'circle') {
        ctx.beginPath()
        ctx.arc(size / 2, size / 2, size / 2 - opts.borderWidth / 2, 0, Math.PI * 2)
        ctx.stroke()
      } else {
        ctx.strokeRect(0, 0, size, size)
      }
    }

    return new Promise<string>((resolve, reject) => {
      Taro.canvasToTempFilePath({
        canvas,
        fileType: opts.fileType,
        quality: opts.fileType === 'jpg' ? opts.quality ?? 0.92 : undefined,
        success: (res) => resolve(res.tempFilePath),
        fail: reject
      })
    })
  }

  const stitchImages = async (
    imgs: any[],
    opts: {
      spacing: number
      fileType: 'jpg' | 'png'
      quality?: number
    }
  ) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized')
    if (imgs.length < 2) throw new Error('Stitching requires at least 2 images')

    const spacing = Math.max(0, opts.spacing || 0)
    const maxWidth = Math.max(...imgs.map((i) => i.width))
    const totalHeight = imgs.reduce((sum, img) => sum + img.height, 0) + spacing * (imgs.length - 1)

    canvas.width = maxWidth
    canvas.height = totalHeight
    ctx.clearRect(0, 0, maxWidth, totalHeight)

    let y = 0
    for (const img of imgs) {
      const x = (maxWidth - img.width) / 2
      ctx.drawImage(img, x, y)
      y += img.height + spacing
    }

    return new Promise<string>((resolve, reject) => {
      Taro.canvasToTempFilePath({
        canvas,
        fileType: opts.fileType,
        quality: opts.fileType === 'jpg' ? opts.quality ?? 0.92 : undefined,
        success: (res) => resolve(res.tempFilePath),
        fail: reject
      })
    })
  }

  const createSticker = async (
    img: any,
    opts: {
      text: string
      fileType: 'jpg' | 'png'
      quality?: number
    }
  ) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized')

    const size = Math.max(200, Math.min(512, Math.max(img.width, img.height)))
    canvas.width = size
    canvas.height = size
    ctx.clearRect(0, 0, size, size)

    const ar = img.width / img.height
    let dw = size
    let dh = size
    if (ar > 1) {
      dh = size / ar
    } else {
      dw = size * ar
    }
    const dx = (size - dw) / 2
    const dy = (size - dh) / 2
    ctx.drawImage(img, dx, dy, dw, dh)

    if (opts.text) {
      const fontSize = Math.max(24, Math.round(size / 8))
      ctx.font = `900 ${fontSize}px sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#ffffff'
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = Math.max(2, Math.round(fontSize / 10))

      const lines = opts.text.split('\n')
      const y = size - lines.length * fontSize * 1.2
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const lineY = y + i * fontSize * 1.2
        ctx.strokeText(line, size / 2, lineY)
        ctx.fillText(line, size / 2, lineY)
      }
    }

    return new Promise<string>((resolve, reject) => {
      Taro.canvasToTempFilePath({
        canvas,
        fileType: opts.fileType,
        quality: opts.fileType === 'jpg' ? opts.quality ?? 0.92 : undefined,
        success: (res) => resolve(res.tempFilePath),
        fail: reject
      })
    })
  }

  return { init, loadImage, compress, convert, addText, collage, generateQrCode, createGif, createAvatar, stitchImages, createSticker }
}
