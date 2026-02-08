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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");





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
  const resize = (img, width, height, maintainAspectRatio) => {
    if (!canvas || !ctx) throw new Error('Canvas not initialized');
    let finalWidth = width;
    let finalHeight = height;
    if (maintainAspectRatio) {
      const aspectRatio = img.width / img.height;
      if (width / height > aspectRatio) {
        finalWidth = height * aspectRatio;
      } else {
        finalHeight = width / aspectRatio;
      }
    }
    canvas.width = finalWidth;
    canvas.height = finalHeight;
    ctx.drawImage(img, 0, 0, finalWidth, finalHeight);
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
    return new Promise(resolve => {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().canvasToTempFilePath({
        canvas: canvas,
        fileType: format,
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
const formatOptions = [{
  name: 'PNG',
  value: 'png'
}, {
  name: 'JPEG',
  value: 'jpg'
}, {
  name: 'JPG',
  value: 'jpg'
}, {
  name: 'WebP',
  value: 'webp'
}, {
  name: 'TIFF',
  value: 'tiff'
}, {
  name: 'AVIF',
  value: 'avif'
}, {
  name: 'BMP',
  value: 'bmp'
}, {
  name: 'GIF',
  value: 'gif'
}, {
  name: 'ICO',
  value: 'ico'
}];
const Editor = () => {
  const [image, setImage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [processedImage, setProcessedImage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [processedImageInfo, setProcessedImageInfo] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [processedImageSize, setProcessedImageSize] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [isProcessing, setIsProcessing] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [customQuality, setCustomQuality] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('80');
  const [customWidth, setCustomWidth] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('800');
  const [customHeight, setCustomHeight] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('600');
  const [maintainAspectRatio, setMaintainAspectRatio] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [featureType, setFeatureType] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('compress');
  const processorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    console.log('Editor page loaded.');
    processorRef.current = createImageProcessor('imageCanvas');
    processorRef.current.init();

    // 获取传递的功能类型参数
    const pages = _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().getCurrentPages();
    const currentPage = pages[pages.length - 1];
    if (currentPage.options && currentPage.options.type) {
      setFeatureType(currentPage.options.type);
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
  const handleReupload = () => {
    selectImage();
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
  const handleResize = async (width, height, maintainAspectRatio) => {
    if (!image || !processorRef.current) return;
    setIsProcessing(true);
    try {
      const url = await processorRef.current.resize(image.img, width, height, maintainAspectRatio);
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
  const handleCustomCompress = async () => {
    if (!image || !processorRef.current) return;
    let quality = parseInt(customQuality);

    // 限制输入范围
    if (isNaN(quality)) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().showToast({
        title: '请输入有效数字',
        icon: 'none'
      });
      return;
    }

    // 限制在10-100之间
    quality = Math.max(10, Math.min(100, quality));
    setCustomQuality(quality.toString());

    // 转换为0-1之间的值
    const qualityValue = quality / 100;
    await handleCompress(qualityValue);
  };
  const handleCustomResize = async () => {
    if (!image || !processorRef.current) return;
    let width = parseInt(customWidth);
    let height = parseInt(customHeight);

    // 限制输入范围
    if (isNaN(width) || isNaN(height)) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().showToast({
        title: '请输入有效数字',
        icon: 'none'
      });
      return;
    }

    // 限制最小值
    width = Math.max(1, width);
    height = Math.max(1, height);
    setCustomWidth(width.toString());
    setCustomHeight(height.toString());
    await handleResize(width, height, maintainAspectRatio);
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
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
          className: "options-section",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
            className: "options-title",
            children: "\u538B\u7F29\u9009\u9879"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            style: {
              marginBottom: '20px'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
              style: {
                fontSize: '16px',
                color: '#666',
                marginBottom: '10px',
                display: 'block'
              },
              children: "\u8D28\u91CF: 0.8"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              className: "action-btn",
              onClick: () => {
                setCustomQuality('80');
                handleCompress(0.8);
              },
              style: {
                marginBottom: '10px'
              },
              children: "\u538B\u7F29 (80%)"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            style: {
              marginBottom: '20px'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
              style: {
                fontSize: '16px',
                color: '#666',
                marginBottom: '10px',
                display: 'block'
              },
              children: "\u8D28\u91CF: 0.6"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              className: "action-btn",
              onClick: () => {
                setCustomQuality('60');
                handleCompress(0.6);
              },
              style: {
                marginBottom: '10px'
              },
              children: "\u538B\u7F29 (60%)"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            style: {
              marginBottom: '20px'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
              style: {
                fontSize: '16px',
                color: '#666',
                marginBottom: '10px',
                display: 'block'
              },
              children: "\u8D28\u91CF: 0.4"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              className: "action-btn",
              onClick: () => {
                setCustomQuality('40');
                handleCompress(0.4);
              },
              style: {
                marginBottom: '10px'
              },
              children: "\u538B\u7F29 (40%)"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
              style: {
                fontSize: '16px',
                color: '#666',
                marginBottom: '10px',
                display: 'block'
              },
              children: ["\u81EA\u5B9A\u4E49\u8D28\u91CF: ", customQuality, "%"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
              style: {
                marginBottom: '20px'
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Slider, {
                value: parseInt(customQuality),
                min: 10,
                max: 100,
                step: 1,
                onChange: e => setCustomQuality(e.detail.value.toString()),
                style: {
                  width: '100%'
                }
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              className: "action-btn",
              onClick: handleCustomCompress,
              children: "\u81EA\u5B9A\u4E49\u538B\u7F29"
            })]
          })]
        });
      case 'resize':
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
          className: "options-section",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
            className: "options-title",
            children: "\u5C3A\u5BF8\u9009\u9879"
          }), sizeOptions.map((option, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            className: "size-option",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
              className: "size-option-label",
              children: [option.name, " (", option.width, "x", option.height, ")"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              className: "size-option-btn",
              onClick: () => {
                setCustomWidth(option.width.toString());
                setCustomHeight(option.height.toString());
                handleResize(option.width, option.height, true);
              },
              children: "\u8C03\u6574\u5C3A\u5BF8"
            })]
          }, index)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
              style: {
                fontSize: '16px',
                color: '#666',
                marginBottom: '10px',
                display: 'block'
              },
              children: "\u81EA\u5B9A\u4E49\u5C3A\u5BF8"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
              style: {
                marginBottom: '15px'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
                style: {
                  display: 'flex',
                  gap: '10px',
                  marginBottom: '10px'
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
                  style: {
                    flex: 1
                  },
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
                    style: {
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '5px',
                      display: 'block'
                    },
                    children: "\u5BBD\u5EA6"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
                    type: "number",
                    value: customWidth,
                    onChange: e => setCustomWidth(e.target.value),
                    style: {
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
                  style: {
                    flex: 1
                  },
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
                    style: {
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '5px',
                      display: 'block'
                    },
                    children: "\u9AD8\u5EA6"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
                    type: "number",
                    value: customHeight,
                    onChange: e => setCustomHeight(e.target.value),
                    style: {
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }
                  })]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
                style: {
                  marginBottom: '10px'
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("label", {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  },
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
                    type: "checkbox",
                    checked: maintainAspectRatio,
                    onChange: e => setMaintainAspectRatio(e.target.checked)
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
                    style: {
                      fontSize: '14px',
                      color: '#666'
                    },
                    children: "\u4FDD\u6301\u6BD4\u4F8B"
                  })]
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              className: "action-btn",
              onClick: handleCustomResize,
              children: "\u81EA\u5B9A\u4E49\u8C03\u6574"
            })]
          })]
        });
      case 'convert':
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
          className: "options-section",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
            className: "options-title",
            children: "\u683C\u5F0F\u8F6C\u6362"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            className: "format-grid",
            children: formatOptions.map((format, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              className: "format-btn",
              onClick: () => handleConvert(format.value),
              children: format.name
            }, index))
          })]
        });
      case 'edit':
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
          className: "options-section",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
            className: "options-title",
            children: "\u7F16\u8F91\u9009\u9879"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            style: {
              marginBottom: '20px'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
              style: {
                fontSize: '16px',
                color: '#666',
                marginBottom: '10px',
                display: 'block'
              },
              children: "\u65CB\u8F6C"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
              className: "edit-buttons",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                className: "action-btn",
                onClick: () => handleRotate(-90),
                children: "\u5DE6\u8F6C90\xB0"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                className: "action-btn",
                onClick: () => handleRotate(90),
                children: "\u53F3\u8F6C90\xB0"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                className: "action-btn",
                onClick: () => handleRotate(180),
                children: "180\xB0"
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
              style: {
                fontSize: '16px',
                color: '#666',
                marginBottom: '10px',
                display: 'block'
              },
              children: "\u7FFB\u8F6C"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
              className: "edit-buttons",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                className: "action-btn",
                onClick: () => handleFlip('horizontal'),
                children: "\u6C34\u5E73\u7FFB\u8F6C"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                className: "action-btn",
                onClick: () => handleFlip('vertical'),
                children: "\u5782\u76F4\u7FFB\u8F6C"
              })]
            })]
          })]
        });
      case 'filter':
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
          className: "options-section",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
            className: "options-title",
            children: "\u6EE4\u955C\u6548\u679C"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            style: {
              marginBottom: '20px'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
              style: {
                fontSize: '16px',
                color: '#666',
                marginBottom: '10px',
                display: 'block'
              },
              children: "\u9ED1\u767D"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
              className: "filter-buttons",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                className: "action-btn",
                onClick: () => handleFilter('grayscale', 50),
                children: "50%"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                className: "action-btn",
                onClick: () => handleFilter('grayscale', 100),
                children: "100%"
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            style: {
              marginBottom: '20px'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
              style: {
                fontSize: '16px',
                color: '#666',
                marginBottom: '10px',
                display: 'block'
              },
              children: "\u590D\u53E4"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
              className: "filter-buttons",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                className: "action-btn",
                onClick: () => handleFilter('sepia', 50),
                children: "50%"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                className: "action-btn",
                onClick: () => handleFilter('sepia', 100),
                children: "100%"
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
              style: {
                fontSize: '16px',
                color: '#666',
                marginBottom: '10px',
                display: 'block'
              },
              children: "\u4EAE\u5EA6"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
              className: "filter-buttons",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                className: "action-btn",
                onClick: () => handleFilter('brightness', 120),
                children: "\u589E\u4EAE"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                className: "action-btn",
                onClick: () => handleFilter('brightness', 80),
                children: "\u53D8\u6697"
              })]
            })]
          })]
        });
      default:
        return null;
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
    className: "editor",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Canvas, {
      id: "imageCanvas",
      canvasId: "imageCanvas",
      type: "2d",
      style: {
        width: '0px',
        height: '0px',
        position: 'fixed',
        left: '-9999px'
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
      className: "customer-service-btn",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
        className: "service-icon",
        children: "\uD83D\uDCAC"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
        className: "service-text",
        children: "\u5BA2\u670D"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
      className: "editor-content",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
        className: "scrollable-content",
        children: !image ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
          className: "upload-placeholder",
          onClick: selectImage,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
            className: "upload-icon",
            children: "\uD83D\uDDBC\uFE0F"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
            className: "upload-text",
            children: ["\u70B9\u51FB\u9009\u62E9\u56FE\u7247", featureType === 'compress' ? '压缩' : '']
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
            className: "action-btn",
            onClick: e => {
              e.stopPropagation(); // 阻止事件冒泡
              selectImage();
            },
            style: {
              marginTop: '20px',
              width: '80%'
            },
            children: "\u9009\u62E9\u56FE\u7247"
          })]
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
            className: "image-preview-section",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Image, {
              src: image.src,
              className: "preview-image",
              mode: "aspectFit"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
              className: "image-info-bar",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
                className: "image-size-text",
                children: ["\u56FE\u7247", featureType === 'compress' ? '压缩' : '', "\u524D: ", (image.file.size / 1024).toFixed(2), " KB"]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
                className: "info-separator",
                children: "|"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
                className: "image-size-text",
                children: ["\u56FE\u7247", featureType === 'compress' ? '压缩' : '', "\u540E: ", processedImageInfo ? (processedImageInfo.size / 1024).toFixed(2) : '0', " KB"]
              })]
            })]
          }), renderFeatureOptions()]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
        className: "bottom-buttons",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          className: "bottom-btn select-btn",
          onClick: selectImage,
          children: "\u9009\u62E9\u56FE\u7247"
        }), processedImage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          className: "bottom-btn save-btn",
          onClick: handleDownload,
          children: "\u4FDD\u5B58\u56FE\u7247"
        })]
      }), isProcessing && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
        className: "loading-overlay",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
          className: "loading-text",
          children: "\u5904\u7406\u4E2D..."
        })
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (Editor);

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