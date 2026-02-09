"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/editor/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/editor/index!./src/pages/editor/index.tsx":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/editor/index!./src/pages/editor/index.tsx ***!
  \******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _features_CompressFeature__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../features/CompressFeature */ "./src/features/CompressFeature/index.tsx");
/* harmony import */ var _features_ResizeFeature__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../features/ResizeFeature */ "./src/features/ResizeFeature/index.tsx");
/* harmony import */ var _features_ConvertFeature__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../features/ConvertFeature */ "./src/features/ConvertFeature/index.tsx");
/* harmony import */ var _features_EditFeature__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../features/EditFeature */ "./src/features/EditFeature/index.tsx");
/* harmony import */ var _features_FilterFeature__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../features/FilterFeature */ "./src/features/FilterFeature/index.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");










const createImageProcessor = canvasId => {
  let canvas = null;
  let ctx = null;
  const init = () => {
    const query = _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().createSelectorQuery();
    query.select(`#${canvasId}`).fields({
      node: true,
      size: true
    }).exec(res => {
      if (res[0]) {
        canvas = res[0].node;
        ctx = canvas.getContext('2d');
      }
    });
  };
  const loadImage = src => {
    return new Promise((resolve, reject) => {
      const img = canvas.createImage();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };
  const compress = (img, quality, maxWidth, maxHeight) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized');
    let width = img.width;
    let height = img.height;
    if (maxWidth && width > maxWidth) {
      height = maxWidth / width * height;
      width = maxWidth;
    }
    if (maxHeight && height > maxHeight) {
      width = maxHeight / height * width;
      height = maxHeight;
    }
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    return new Promise(resolve => {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().canvasToTempFilePath({
        canvas: canvas,
        fileType: 'jpg',
        quality: quality,
        success: res => {
          resolve(res.tempFilePath);
        }
      });
    });
  };
  const resize = (img, width, height, scaleMode = 'cover') => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized');
    const imgAspectRatio = img.width / img.height;
    const targetAspectRatio = width / height;
    let finalWidth, finalHeight, offsetX, offsetY;
    switch (scaleMode) {
      case 'cover':
        // 填满画面（裁边）
        if (imgAspectRatio > targetAspectRatio) {
          finalHeight = height;
          finalWidth = height * imgAspectRatio;
          offsetX = (width - finalWidth) / 2;
          offsetY = 0;
        } else {
          finalWidth = width;
          finalHeight = width / imgAspectRatio;
          offsetX = 0;
          offsetY = (height - finalHeight) / 2;
        }
        break;
      case 'contain':
        // 完整显示（留空白）
        if (imgAspectRatio > targetAspectRatio) {
          finalWidth = width;
          finalHeight = width / imgAspectRatio;
          offsetX = 0;
          offsetY = (height - finalHeight) / 2;
        } else {
          finalHeight = height;
          finalWidth = height * imgAspectRatio;
          offsetX = (width - finalWidth) / 2;
          offsetY = 0;
        }
        break;
      case 'stretch':
        // 拉伸填满（变形）
        finalWidth = width;
        finalHeight = height;
        offsetX = 0;
        offsetY = 0;
        break;
      case 'keep':
        // 保留完整（可能小）
        if (img.width <= width && img.height <= height) {
          // 图片尺寸小于目标尺寸，保持原图大小
          finalWidth = img.width;
          finalHeight = img.height;
        } else if (imgAspectRatio > targetAspectRatio) {
          finalWidth = width;
          finalHeight = width / imgAspectRatio;
        } else {
          finalHeight = height;
          finalWidth = height * imgAspectRatio;
        }
        offsetX = (width - finalWidth) / 2;
        offsetY = (height - finalHeight) / 2;
        break;
      case 'cover_min':
        // 至少覆盖（可能超出）
        if (imgAspectRatio > targetAspectRatio) {
          finalWidth = width;
          finalHeight = width / imgAspectRatio;
          if (finalHeight < height) {
            finalHeight = height;
            finalWidth = height * imgAspectRatio;
          }
        } else {
          finalHeight = height;
          finalWidth = height * imgAspectRatio;
          if (finalWidth < width) {
            finalWidth = width;
            finalHeight = width / imgAspectRatio;
          }
        }
        offsetX = (width - finalWidth) / 2;
        offsetY = (height - finalHeight) / 2;
        break;
      default:
        // 默认使用cover模式
        if (imgAspectRatio > targetAspectRatio) {
          finalHeight = height;
          finalWidth = height * imgAspectRatio;
          offsetX = (width - finalWidth) / 2;
          offsetY = 0;
        } else {
          finalWidth = width;
          finalHeight = width / imgAspectRatio;
          offsetX = 0;
          offsetY = (height - finalHeight) / 2;
        }
    }
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, offsetX, offsetY, finalWidth, finalHeight);
    return new Promise(resolve => {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().canvasToTempFilePath({
        canvas: canvas,
        success: res => {
          resolve(res.tempFilePath);
        }
      });
    });
  };
  const convert = (img, format) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Taro.canvasToTempFilePath only supports 'jpg' and 'png'
    let supportedFormat = format;
    if (format === 'jpeg') {
      supportedFormat = 'jpg';
    } else if (!['jpg', 'png'].includes(format)) {
      // For unsupported formats, use 'png' as fallback
      supportedFormat = 'png';
    }
    return new Promise(resolve => {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().canvasToTempFilePath({
        canvas: canvas,
        fileType: supportedFormat,
        success: res => {
          resolve(res.tempFilePath);
        }
      });
    });
  };
  const rotate = (img, degrees) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized');
    const radians = degrees * Math.PI / 180;
    const sin = Math.abs(Math.sin(radians));
    const cos = Math.abs(Math.cos(radians));
    const newWidth = img.width * cos + img.height * sin;
    const newHeight = img.width * sin + img.height * cos;
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.translate(newWidth / 2, newHeight / 2);
    ctx.rotate(radians);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    return new Promise(resolve => {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().canvasToTempFilePath({
        canvas: canvas,
        success: res => {
          resolve(res.tempFilePath);
        }
      });
    });
  };
  const flip = (img, direction) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized');
    canvas.width = img.width;
    canvas.height = img.height;
    if (direction === 'horizontal') {
      ctx.translate(img.width, 0);
      ctx.scale(-1, 1);
    } else {
      ctx.translate(0, img.height);
      ctx.scale(1, -1);
    }
    ctx.drawImage(img, 0, 0);
    return new Promise(resolve => {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().canvasToTempFilePath({
        canvas: canvas,
        success: res => {
          resolve(res.tempFilePath);
        }
      });
    });
  };
  const applyFilter = (img, filterType, value) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized');
    canvas.width = img.width;
    canvas.height = img.height;
    let filter = '';
    switch (filterType) {
      case 'grayscale':
        filter = `grayscale(${value}%)`;
        break;
      case 'sepia':
        filter = `sepia(${value}%)`;
        break;
      case 'brightness':
        filter = `brightness(${value}%)`;
        break;
      case 'contrast':
        filter = `contrast(${value}%)`;
        break;
      case 'blur':
        filter = `blur(${value}px)`;
        break;
    }
    ctx.filter = filter;
    ctx.drawImage(img, 0, 0);
    return new Promise(resolve => {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().canvasToTempFilePath({
        canvas: canvas,
        success: res => {
          resolve(res.tempFilePath);
        }
      });
    });
  };
  return {
    init,
    loadImage,
    compress,
    resize,
    convert,
    rotate,
    flip,
    applyFilter
  };
};
const Editor = () => {
  const [image, setImage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [processedImage, setProcessedImage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [processedImageInfo, setProcessedImageInfo] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [processedImageSize, setProcessedImageSize] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [isProcessing, setIsProcessing] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [quality, setQuality] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0.8);
  const [customQuality, setCustomQuality] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('80');
  const [featureType, setFeatureType] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('compress');
  const [scaleMode, setScaleMode] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('cover');
  const [comparisonPosition, setComparisonPosition] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(50);
  const [showOriginal, setShowOriginal] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const processorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    console.log('Editor page loaded.');
    processorRef.current = createImageProcessor('imageCanvas');
    processorRef.current.init();

    // 获取传递的功能类型参数
    try {
      const pages = _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (currentPage && currentPage.options && currentPage.options.type) {
        setFeatureType(currentPage.options.type);
      }
    } catch (error) {
      console.error('Error getting feature type:', error);
    }
  }, []);
  const handleImageSelect = async tempFilePath => {
    try {
      if (!processorRef.current) {
        processorRef.current = createImageProcessor('imageCanvas');
        processorRef.current.init();
      }
      const img = await processorRef.current.loadImage(tempFilePath);
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().getFileInfo({
        filePath: tempFilePath,
        success: fileInfo => {
          setImage({
            src: tempFilePath,
            file: {
              size: fileInfo.size
            },
            img
          });
          setProcessedImage(null);
          setProcessedImageInfo(null);
          setProcessedImageSize(null);
        }
      });
    } catch (error) {
      console.error('Failed to load image:', error);
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().showToast({
        title: '图片加载失败',
        icon: 'none'
      });
    }
  };
  const selectImage = () => {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        handleImageSelect(res.tempFilePaths[0]);
      },
      fail: err => {
        // 忽略用户取消选择的错误
        if (err.errMsg !== 'chooseImage:fail cancel') {
          console.error('选择图片失败:', err);
        }
      }
    });
  };
  const handleCompress = async (quality, maxWidth, maxHeight) => {
    if (!image || !processorRef.current) return;
    setIsProcessing(true);
    try {
      const url = await processorRef.current.compress(image.img, quality, maxWidth, maxHeight);
      setProcessedImage(url);

      // 获取处理后图片的文件信息
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().getFileInfo({
        filePath: url,
        success: fileInfo => {
          setProcessedImageInfo({
            size: fileInfo.size
          });
        }
      });
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().showToast({
        title: '压缩完成',
        icon: 'success'
      });
    } catch (error) {
      console.error('Compression failed:', error);
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().showToast({
        title: '压缩失败',
        icon: 'none'
      });
    } finally {
      setIsProcessing(false);
    }
  };
  const handleResize = async (width, height, scaleMode) => {
    if (!image || !processorRef.current) return;
    setIsProcessing(true);
    try {
      const url = await processorRef.current.resize(image.img, width, height, scaleMode);
      setProcessedImage(url);
      setProcessedImageSize({
        width,
        height
      });

      // 获取处理后图片的文件信息
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().getFileInfo({
        filePath: url,
        success: fileInfo => {
          setProcessedImageInfo({
            size: fileInfo.size
          });
        }
      });
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().showToast({
        title: '调整尺寸完成',
        icon: 'success'
      });
    } catch (error) {
      console.error('Resize failed:', error);
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().showToast({
        title: '调整尺寸失败',
        icon: 'none'
      });
    } finally {
      setIsProcessing(false);
    }
  };
  const handleConvert = async format => {
    if (!image || !processorRef.current) return;
    setIsProcessing(true);
    try {
      const url = await processorRef.current.convert(image.img, format);
      setProcessedImage(url);

      // 获取处理后图片的文件信息
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().getFileInfo({
        filePath: url,
        success: fileInfo => {
          setProcessedImageInfo({
            size: fileInfo.size
          });
        }
      });
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().showToast({
        title: '格式转换完成',
        icon: 'success'
      });
    } catch (error) {
      console.error('Conversion failed:', error);
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().showToast({
        title: '格式转换失败',
        icon: 'none'
      });
    } finally {
      setIsProcessing(false);
    }
  };
  const handleRotate = async degrees => {
    if (!image || !processorRef.current) return;
    setIsProcessing(true);
    try {
      const url = await processorRef.current.rotate(image.img, degrees);
      setProcessedImage(url);

      // 获取处理后图片的文件信息
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().getFileInfo({
        filePath: url,
        success: fileInfo => {
          setProcessedImageInfo({
            size: fileInfo.size
          });
        }
      });
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().showToast({
        title: '旋转完成',
        icon: 'success'
      });
    } catch (error) {
      console.error('Rotation failed:', error);
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().showToast({
        title: '旋转失败',
        icon: 'none'
      });
    } finally {
      setIsProcessing(false);
    }
  };
  const handleFlip = async direction => {
    if (!image || !processorRef.current) return;
    setIsProcessing(true);
    try {
      const url = await processorRef.current.flip(image.img, direction);
      setProcessedImage(url);

      // 获取处理后图片的文件信息
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().getFileInfo({
        filePath: url,
        success: fileInfo => {
          setProcessedImageInfo({
            size: fileInfo.size
          });
        }
      });
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().showToast({
        title: '翻转完成',
        icon: 'success'
      });
    } catch (error) {
      console.error('Flip failed:', error);
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().showToast({
        title: '翻转失败',
        icon: 'none'
      });
    } finally {
      setIsProcessing(false);
    }
  };
  const handleFilter = async (filterType, value) => {
    if (!image || !processorRef.current) return;
    setIsProcessing(true);
    try {
      const url = await processorRef.current.applyFilter(image.img, filterType, value);
      setProcessedImage(url);

      // 获取处理后图片的文件信息
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().getFileInfo({
        filePath: url,
        success: fileInfo => {
          setProcessedImageInfo({
            size: fileInfo.size
          });
        }
      });
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().showToast({
        title: '滤镜应用完成',
        icon: 'success'
      });
    } catch (error) {
      console.error('Filter failed:', error);
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().showToast({
        title: '滤镜应用失败',
        icon: 'none'
      });
    } finally {
      setIsProcessing(false);
    }
  };
  const handleComparisonStart = e => {
    // 开始拖拽，不需要特殊处理
  };
  const handleComparisonMove = e => {
    try {
      // 简化处理：直接从事件对象中获取触摸点信息
      // 小程序中的触摸事件格式
      const touches = e.touches || e.detail && e.detail.touches;
      if (!touches || touches.length === 0) return;
      const touch = touches[0];
      const pageX = touch.pageX;
      if (!pageX) return;

      // 获取屏幕宽度
      const screenWidth = _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().getSystemInfoSync().windowWidth;
      if (!screenWidth) return;

      // 计算位置百分比（基于屏幕宽度）
      const position = pageX / screenWidth * 100;

      // 限制位置在0-100%之间
      const clampedPosition = Math.max(0, Math.min(100, position));
      setComparisonPosition(clampedPosition);
    } catch (error) {
      console.error('Error in handleComparisonMove:', error);
    }
  };
  const handleDownload = async () => {
    if (!processedImage) return;
    try {
      await _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().saveImageToPhotosAlbum({
        filePath: processedImage
      });
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().showToast({
        title: '已保存到相册',
        icon: 'success'
      });
    } catch (err) {
      // 忽略用户取消保存的错误
      if (err.errMsg !== 'saveImageToPhotosAlbum:fail cancel') {
        console.error('Save failed:', err);
        _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().showToast({
          title: '保存失败',
          icon: 'none'
        });
      }
    }
  };
  const renderFeatureOptions = () => {
    switch (featureType) {
      case 'compress':
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_features_CompressFeature__WEBPACK_IMPORTED_MODULE_3__["default"], {
          quality: quality,
          onQualityChange: newQuality => {
            setQuality(newQuality);
            setCustomQuality(Math.round(newQuality * 100).toString());
          },
          onCompress: handleCompress
        });
      case 'resize':
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_features_ResizeFeature__WEBPACK_IMPORTED_MODULE_4__["default"], {
          scaleMode: scaleMode,
          onScaleModeChange: setScaleMode,
          onResize: handleResize
        });
      case 'convert':
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_features_ConvertFeature__WEBPACK_IMPORTED_MODULE_5__["default"], {
          onConvert: handleConvert
        });
      case 'edit':
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_features_EditFeature__WEBPACK_IMPORTED_MODULE_6__["default"], {
          onRotate: handleRotate,
          onFlip: handleFlip
        });
      case 'filter':
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_features_FilterFeature__WEBPACK_IMPORTED_MODULE_7__["default"], {
          onFilter: handleFilter
        });
      default:
        return null;
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
    className: "editor",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Canvas, {
      id: "imageCanvas",
      canvasId: "imageCanvas",
      type: "2d",
      style: {
        width: '0px',
        height: '0px',
        position: 'fixed',
        left: '-9999px'
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
      className: "editor-content",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
        className: "upload-content",
        children: !image ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
          className: "upload-placeholder",
          onClick: selectImage,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
            className: "upload-icon",
            children: "\uD83D\uDDBC\uFE0F"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
            className: "upload-text",
            children: ["\u70B9\u51FB\u9009\u62E9\u56FE\u7247", featureType === 'compress' ? '压缩' : '']
          })]
        }) : processedImage ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
          className: "comparison-container",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            className: "comparison-wrapper",
            style: {
              position: 'relative'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Image, {
              src: showOriginal ? image.src : processedImage,
              style: {
                width: '100%',
                height: '400rpx',
                objectFit: 'contain'
              },
              mode: "aspectFit"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
              style: {
                position: 'absolute',
                top: '15rpx',
                right: '15rpx',
                display: 'flex',
                gap: '10rpx',
                zIndex: 10
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
                style: {
                  padding: '8rpx 16rpx',
                  borderRadius: '8rpx',
                  backgroundColor: showOriginal ? '#6366f1' : 'rgba(30, 27, 75, 0.8)',
                  border: '1rpx solid #6366f1',
                  display: 'flex',
                  alignItems: 'center'
                },
                onClick: () => setShowOriginal(true),
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
                  style: {
                    fontSize: '12rpx',
                    color: showOriginal ? 'white' : '#94a3b8',
                    fontWeight: showOriginal ? '600' : '400'
                  },
                  children: "\u539F\u56FE"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
                style: {
                  padding: '8rpx 16rpx',
                  borderRadius: '8rpx',
                  backgroundColor: !showOriginal ? '#6366f1' : 'rgba(30, 27, 75, 0.8)',
                  border: '1rpx solid #6366f1',
                  display: 'flex',
                  alignItems: 'center'
                },
                onClick: () => setShowOriginal(false),
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
                  style: {
                    fontSize: '12rpx',
                    color: !showOriginal ? 'white' : '#94a3b8',
                    fontWeight: !showOriginal ? '600' : '400'
                  },
                  children: "\u5904\u7406\u540E"
                })
              })]
            })]
          })
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            className: "image-preview-section",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Image, {
              src: image.src,
              className: "preview-image",
              mode: "aspectFit"
            })
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
        className: "scrollable-content",
        children: renderFeatureOptions()
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
        className: "bottom-buttons",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          className: "bottom-btn select-btn",
          onClick: selectImage,
          children: "\u9009\u62E9\u56FE\u7247"
        }), processedImage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          className: "bottom-btn save-btn",
          onClick: handleDownload,
          children: "\u4FDD\u5B58\u56FE\u7247"
        })]
      }), isProcessing && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
        className: "loading-overlay",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
          className: "loading-text",
          children: "\u5904\u7406\u4E2D..."
        })
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (Editor);

/***/ }),

/***/ "./src/components/CompressOptions.tsx":
/*!********************************************!*\
  !*** ./src/components/CompressOptions.tsx ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompressOptions: function() { return /* binding */ CompressOptions; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");




const qualityOptions = [{
  label: '低质量',
  value: 0.3,
  description: '30%'
}, {
  label: '中等质量',
  value: 0.5,
  description: '50%'
}, {
  label: '高质量',
  value: 0.7,
  description: '70%'
}, {
  label: '最佳质量',
  value: 0.9,
  description: '90%'
}];
const CompressOptions = ({
  quality,
  onQualityChange,
  onCompress,
  className = ''
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
    className: `compress-options ${className}`,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
      className: "option",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
        className: "size-option",
        children: qualityOptions.map((option, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          className: "size-option-btn",
          onClick: () => {
            onQualityChange(option.value);
            onCompress(option.value);
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
            className: "quality-label",
            children: option.label
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
            className: "quality-desc",
            children: ["(", option.description, ")"]
          })]
        }, index))
      })
    })
  });
};

/***/ }),

/***/ "./src/features/CompressFeature/index.tsx":
/*!************************************************!*\
  !*** ./src/features/CompressFeature/index.tsx ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _components_CompressOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/CompressOptions */ "./src/components/CompressOptions.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");




const CompressFeature = ({
  quality,
  onQualityChange,
  onCompress
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
    className: "options-section",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
      className: "options-title",
      children: "\u538B\u7F29\u9009\u9879"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_CompressOptions__WEBPACK_IMPORTED_MODULE_2__.CompressOptions, {
      quality: quality,
      onQualityChange: onQualityChange,
      onCompress: onCompress
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (CompressFeature);

/***/ }),

/***/ "./src/features/ConvertFeature/index.tsx":
/*!***********************************************!*\
  !*** ./src/features/ConvertFeature/index.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");



const formatOptions = [{
  name: 'PNG',
  value: 'png'
}, {
  name: 'JPG',
  value: 'jpg'
}, {
  name: 'JPEG',
  value: 'jpg'
}];
const ConvertFeature = ({
  onConvert
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
    className: "options-section",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
      className: "options-title",
      children: "\u683C\u5F0F\u8F6C\u6362"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
      className: "size-option",
      children: formatOptions.map((format, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        className: "size-option-btn",
        onClick: () => onConvert(format.value),
        children: format.name
      }, index))
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (ConvertFeature);

/***/ }),

/***/ "./src/features/EditFeature/index.tsx":
/*!********************************************!*\
  !*** ./src/features/EditFeature/index.tsx ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");



const EditFeature = ({
  onRotate,
  onFlip
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
    className: "options-section",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
      className: "options-title",
      children: "\u7F16\u8F91\u9009\u9879"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
      style: {
        marginBottom: '20px'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
        style: {
          fontSize: '16px',
          color: 'var(--text-secondary)',
          marginBottom: '10px',
          display: 'block'
        },
        children: "\u65CB\u8F6C"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
        className: "edit-buttons",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          className: "action-btn",
          onClick: () => onRotate(-90),
          children: "\u5DE6\u8F6C90\xB0"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          className: "action-btn",
          onClick: () => onRotate(90),
          children: "\u53F3\u8F6C90\xB0"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          className: "action-btn",
          onClick: () => onRotate(180),
          children: "180\xB0"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
        style: {
          fontSize: '16px',
          color: 'var(--text-secondary)',
          marginBottom: '10px',
          display: 'block'
        },
        children: "\u7FFB\u8F6C"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
        className: "edit-buttons",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          className: "action-btn",
          onClick: () => onFlip('horizontal'),
          children: "\u6C34\u5E73\u7FFB\u8F6C"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          className: "action-btn",
          onClick: () => onFlip('vertical'),
          children: "\u5782\u76F4\u7FFB\u8F6C"
        })]
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (EditFeature);

/***/ }),

/***/ "./src/features/FilterFeature/index.tsx":
/*!**********************************************!*\
  !*** ./src/features/FilterFeature/index.tsx ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");



const FilterFeature = ({
  onFilter
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
    className: "options-section",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
      className: "options-title",
      children: "\u6EE4\u955C\u6548\u679C"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
      style: {
        marginBottom: '20px'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
        style: {
          fontSize: '16px',
          color: 'var(--text-secondary)',
          marginBottom: '10px',
          display: 'block'
        },
        children: "\u9ED1\u767D"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
        className: "filter-buttons",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          className: "action-btn",
          onClick: () => onFilter('grayscale', 50),
          children: "50%"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          className: "action-btn",
          onClick: () => onFilter('grayscale', 100),
          children: "100%"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
      style: {
        marginBottom: '20px'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
        style: {
          fontSize: '16px',
          color: 'var(--text-secondary)',
          marginBottom: '10px',
          display: 'block'
        },
        children: "\u590D\u53E4"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
        className: "filter-buttons",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          className: "action-btn",
          onClick: () => onFilter('sepia', 50),
          children: "50%"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          className: "action-btn",
          onClick: () => onFilter('sepia', 100),
          children: "100%"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
        style: {
          fontSize: '16px',
          color: 'var(--text-secondary)',
          marginBottom: '10px',
          display: 'block'
        },
        children: "\u4EAE\u5EA6"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
        className: "filter-buttons",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          className: "action-btn",
          onClick: () => onFilter('brightness', 120),
          children: "\u589E\u4EAE"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          className: "action-btn",
          onClick: () => onFilter('brightness', 80),
          children: "\u53D8\u6697"
        })]
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (FilterFeature);

/***/ }),

/***/ "./src/features/ResizeFeature/index.tsx":
/*!**********************************************!*\
  !*** ./src/features/ResizeFeature/index.tsx ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");



const sizeOptions = [{
  name: '一寸',
  width: 295,
  height: 413
}, {
  name: '小二寸',
  width: 413,
  height: 531
}, {
  name: '二寸',
  width: 413,
  height: 626
}, {
  name: '社保/身份证',
  width: 358,
  height: 441
}, {
  name: '四六级/计算机',
  width: 144,
  height: 192
}, {
  name: '卫生机构',
  width: 160,
  height: 210
}, {
  name: '毕业证',
  width: 480,
  height: 640
}];
const scaleOptions = [{
  name: '填满画面（裁边）',
  value: 'cover'
}, {
  name: '完整显示（留空白）',
  value: 'contain'
}, {
  name: '拉伸填满（变形）',
  value: 'stretch'
}, {
  name: '保留完整（可能小）',
  value: 'keep'
}, {
  name: '至少覆盖（可能超出）',
  value: 'cover_min'
}];
const ResizeFeature = ({
  scaleMode,
  onScaleModeChange,
  onResize
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
    className: "options-section",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
        className: "options-title",
        children: "\u5C3A\u5BF8\u9009\u9879"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
        className: "size-option",
        children: sizeOptions.map((option, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          className: "size-option-btn",
          onClick: () => {
            onResize(option.width, option.height, scaleMode);
          },
          children: [option.name, " (", option.width, "x", option.height, ")"]
        }, index))
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
        className: "options-title",
        children: "\u7F29\u653E\u65B9\u5F0F"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
        className: "size-option",
        children: scaleOptions.map((option, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
          className: "size-option-btn",
          onClick: () => onScaleModeChange(option.value),
          children: option.name
        }, index))
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (ResizeFeature);

/***/ }),

/***/ "./src/pages/editor/index.tsx":
/*!************************************!*\
  !*** ./src/pages/editor/index.tsx ***!
  \************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_editor_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/editor/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/editor/index!./src/pages/editor/index.tsx");


var config = {"navigationBarTitleText":"图片编辑","navigationBarBackgroundColor":"#fff","navigationBarTextStyle":"black"};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_editor_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/editor/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_editor_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_editor_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_editor_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_editor_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors"], function() { return __webpack_exec__("./src/pages/editor/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map