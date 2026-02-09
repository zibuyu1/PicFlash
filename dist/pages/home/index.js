"use strict";
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/home/index"],{

/***/ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/index!./src/pages/home/index.tsx":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/index!./src/pages/home/index.tsx ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_CustomHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/CustomHeader */ "./src/components/CustomHeader.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");





const Home = () => {
  const mainFeatures = [{
    id: 'compress',
    title: '图片压缩',
    icon: '📸',
    className: 'main-feature-card secondary-feature primary-feature hover-lift'
  }, {
    id: 'dpi',
    title: '图片修改DPI',
    icon: '📊',
    className: 'main-feature-card secondary-feature dpi-feature hover-lift'
  }, {
    id: 'convert',
    title: '图片改格式',
    icon: '🔄',
    className: 'main-feature-card secondary-feature convert-feature hover-lift'
  }];
  const moreFeatures = [{
    id: 'text',
    title: '图片加文字',
    icon: '📝',
    status: ''
  }, {
    id: 'extract',
    title: '抠图',
    icon: '🖼️',
    status: ''
  }, {
    id: 'format',
    title: '图片格式',
    icon: '🔄',
    status: ''
  }, {
    id: 'video-hd',
    title: '视频变清晰',
    icon: '📹',
    status: '开发中'
  }, {
    id: 'photo-hd',
    title: '照片变清晰',
    icon: '✨',
    status: ''
  }, {
    id: 'colorize',
    title: '照片上色',
    icon: '🎨',
    status: ''
  }, {
    id: 'beautify',
    title: '人像美颜',
    icon: '💄',
    status: ''
  }, {
    id: 'collage',
    title: '九宫格拼图',
    icon: '🔲',
    status: ''
  }, {
    id: 'qrcode',
    title: '二维码生成',
    icon: '📱',
    status: ''
  }, {
    id: 'gif',
    title: 'GIF图制作',
    icon: '🎞️',
    status: '开发中'
  }, {
    id: 'avatar',
    title: '头像制作',
    icon: '👤',
    status: '开发中'
  }, {
    id: 'video-compress',
    title: '视频压缩',
    icon: '📦',
    status: '开发中'
  }, {
    id: 'long-image',
    title: '长图拼接',
    icon: '📜',
    status: '开发中'
  }, {
    id: 'video-convert',
    title: '视频转换格式',
    icon: '🔄',
    status: '开发中'
  }, {
    id: 'sticker',
    title: '表情包',
    icon: '😄',
    status: '开发中'
  }, {
    id: 'image-compress',
    title: '图片压缩',
    icon: '📸',
    status: '开发中'
  }];
  const handleFeatureClick = featureId => {
    // 处理已实现的功能
    const implementedFeatures = ['compress', 'convert'];
    if (implementedFeatures.includes(featureId)) {
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().navigateTo({
        url: `/pages/editor/index?type=${featureId}`
      });
    } else {
      // 未实现的功能显示提示
      _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default().showToast({
        title: '该功能正在开发中',
        icon: 'none'
      });
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__.View, {
    className: "home scanline-effect",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_CustomHeader__WEBPACK_IMPORTED_MODULE_2__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__.View, {
      className: "home-content",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__.View, {
        className: "main-features-section",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__.View, {
          className: "main-features-grid",
          children: mainFeatures.map((feature, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__.View, {
            className: feature.className,
            onClick: () => handleFeatureClick(feature.id),
            style: {
              animationDelay: `${index * 0.1}s`
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__.View, {
              className: "main-feature-icon-wrap",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__.Text, {
                className: "main-feature-icon",
                children: feature.icon
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__.Text, {
              className: "main-feature-title",
              children: feature.title
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__.Text, {
              className: "main-feature-btn",
              children: "\u7ACB\u5373\u4F53\u9A8C"
            })]
          }, feature.id))
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__.View, {
        className: "more-features-section",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__.Text, {
          className: "more-features-title",
          children: "\u66F4\u591A\u529F\u80FD"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__.View, {
          className: "more-features-grid",
          children: moreFeatures.map((feature, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__.View, {
            className: "more-feature-card hover-lift",
            onClick: () => handleFeatureClick(feature.id),
            style: {
              animationDelay: `${index * 0.05}s`
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__.View, {
              className: "more-feature-icon-wrap",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__.Text, {
                className: "more-feature-icon",
                children: feature.icon
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__.Text, {
              className: "more-feature-title",
              children: feature.title
            }), feature.status && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__.View, {
              className: "feature-status",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_0__.Text, {
                className: "status-text",
                children: feature.status
              })
            })]
          }, feature.id))
        })]
      })]
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ }),

/***/ "./src/components/CustomHeader.tsx":
/*!*****************************************!*\
  !*** ./src/components/CustomHeader.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/cjs/react-jsx-runtime.production.min.js");





const CustomHeader = ({
  title = '图片处理工具',
  showMenu = true,
  showSettings = true
}) => {
  const [statusBarHeight, setStatusBarHeight] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('0px');
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // 获取系统信息，计算状态栏高度
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().getSystemInfo({
      success: res => {
        setStatusBarHeight(`${res.statusBarHeight || 0}px`);
      }
    });
  }, []);
  const handleMenuClick = () => {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().showActionSheet({
      itemList: ['关于我们', '使用帮助', '意见反馈'],
      success: function (res) {
        console.log('点击了', res.tapIndex);
      }
    });
  };
  const handleSettingsClick = () => {
    _tarojs_taro__WEBPACK_IMPORTED_MODULE_2___default().navigateTo({
      url: '/pages/profile/index'
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
    className: "custom-header",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
      className: "status-bar",
      style: {
        height: statusBarHeight
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.View, {
      className: "custom-header-content",
      style: {
        height: '44px'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tarojs_components__WEBPACK_IMPORTED_MODULE_1__.Text, {
        className: "custom-header-title",
        style: {
          fontSize: '16px'
        },
        children: title
      })
    })]
  });
};
/* harmony default export */ __webpack_exports__["default"] = (CustomHeader);

/***/ }),

/***/ "./src/pages/home/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/home/index.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/runtime/dist/dsl/common.js");
/* harmony import */ var _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/index!./index.tsx */ "./node_modules/@tarojs/taro-loader/lib/entry-cache.js?name=pages/home/index!./src/pages/home/index.tsx");


var config = {"navigationBarTitleText":"图片处理工具"};



var taroOption = (0,_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__.createPageConfig)(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"], 'pages/home/index', {root:{cn:[]}}, config || {})
if (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"] && _node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors) {
  taroOption.behaviors = (taroOption.behaviors || []).concat(_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"].behaviors)
}
var inst = Page(taroOption)



/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_tarojs_taro_loader_lib_entry_cache_js_name_pages_home_index_index_tsx__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["taro","vendors"], function() { return __webpack_exec__("./src/pages/home/index.tsx"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map