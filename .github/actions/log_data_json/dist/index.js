/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 564:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(564)

try {
    const pack = core.getInput('package');
    const version = core.getInput('version');
    const os = core.getInput('os');
    const matrix = core.getInput('matrix');
    const work_dir = core.getInput('work_dir');
    const selenium = core.getInput('selenium');
    const title = core.getInput('title');
    const chrome_version = core.getInput('chrome_version');
    const chromedriver_version = core.getInput('chromedriver_version');
    const appium_client_lib_version = core.getInput('Appium_client')
    const orientation = process.env.MATRIX_DEVICE_ORIENTATION
    const data = {
        package: pack,
        version,
        os,
        selenium,
        title,
        chrome_version,
        chromedriver_version,
        appium_client_lib_version,
        matrix,
        work_dir,
        orientation
    }
    console.log(`####[Start_json_data]${JSON.stringify(data)}[End_json_data]####`)
} catch (error) {
    core.setFailed(error.message);
}





})();

module.exports = __webpack_exports__;
/******/ })()
;