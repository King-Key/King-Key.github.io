"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// search script, optimized
// 防抖函数：避免频繁触发函数执行，提高性能
function debounce(func, wait) {
  var timeout;
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return func.apply(_this, args);
    }, wait);
  };
} // 生成搜索结果摘要，高亮显示搜索词


function makeTeaser(body, terms) {
  var TERM_WEIGHT = 40,
      NORMAL_WORD_WEIGHT = 2,
      FIRST_WORD_WEIGHT = 8,
      TEASER_MAX_WORDS = 30;
  var stemmedTerms = terms.map(function (w) {
    return elasticlunr.stemmer(w.toLowerCase());
  });
  var termFound = false,
      index = 0,
      weighted = [],
      sentences = body.toLowerCase().split(". ");
  sentences.forEach(function (sentence, i) {
    var words = sentence.split(" ");
    var value = FIRST_WORD_WEIGHT;
    words.forEach(function (word) {
      if (word.length > 0) {
        if (stemmedTerms.some(function (term) {
          return elasticlunr.stemmer(word).startsWith(term);
        })) {
          value = TERM_WEIGHT;
          termFound = true;
        }

        weighted.push([word, value, index]);
        value = NORMAL_WORD_WEIGHT;
      }

      index += word.length + 1; // include space or punctuation
    });
    index += 1; // sentence boundary
  });
  if (!weighted.length) return body; // 滑动窗口计算最高权重的片段

  var windowSize = Math.min(weighted.length, TEASER_MAX_WORDS);
  var curSum = weighted.slice(0, windowSize).reduce(function (sum, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        _ = _ref2[0],
        weight = _ref2[1];

    return sum + weight;
  }, 0);
  var windowWeights = [curSum];

  for (var i = 0; i < weighted.length - windowSize; i++) {
    curSum = curSum - weighted[i][1] + weighted[i + windowSize][1];
    windowWeights.push(curSum);
  }

  var maxSumIndex = termFound ? windowWeights.lastIndexOf(Math.max.apply(Math, windowWeights)) : 0;
  var teaser = [],
      startIndex = weighted[maxSumIndex][2];

  for (var _i2 = maxSumIndex; _i2 < maxSumIndex + windowSize; _i2++) {
    var _weighted$_i = _slicedToArray(weighted[_i2], 3),
        word = _weighted$_i[0],
        weight = _weighted$_i[1],
        wordIndex = _weighted$_i[2];

    if (startIndex < wordIndex) teaser.push(body.substring(startIndex, wordIndex));
    teaser.push(weight === TERM_WEIGHT ? "<b>".concat(word, "</b>") : word);
    startIndex = wordIndex + word.length;
  }

  teaser.push("…");
  return teaser.join("");
} // 格式化搜索结果


function formatSearchResultItem(item, terms) {
  var li = document.createElement("li");
  li.classList.add("search-results__item");
  var link = document.createElement("a");
  link.href = item.ref;
  link.classList.add("search-results__title"); // 添加类名以便于样式调整

  link.innerText = item.doc.title;
  var teaser = document.createElement("div");
  teaser.classList.add("search-results__teaser");
  teaser.innerHTML = makeTeaser(item.doc.body, terms);
  li.appendChild(link);
  li.appendChild(teaser);
  return li;
} // 切换搜索框和毛玻璃效果


function toggleSearchMode() {
  var searchOverlay = document.querySelector(".search-overlay");
  var searchIcon = document.querySelector("#search-ico");
  var closeSearch = document.querySelector("#close-search"); // 显示搜索页面

  searchIcon.addEventListener("click", function () {
    searchOverlay.style.display = "flex"; // 显示搜索页面

    document.getElementById("search").focus(); // 让输入框获得焦点
  }); // 关闭搜索页面

  closeSearch.addEventListener("click", function () {
    searchOverlay.style.display = "none"; // 隐藏搜索页面

    document.getElementById("search").value = ""; // 清空输入框

    document.querySelector(".search-results__items").innerHTML = ""; // 清空搜索结果
  });
} // 初始化搜索


function initSearch() {
  var searchInput = document.getElementById("search");
  var searchResults = document.querySelector(".search-results");
  var searchResultsItems = document.querySelector(".search-results__items");
  var searchResultsHeader = document.querySelector(".search-results__header");
  var MAX_ITEMS = 100;
  var options = {
    bool: "AND",
    fields: {
      title: {
        boost: 2
      },
      body: {
        boost: 1
      }
    }
  };
  var currentTerm = "";
  var index = elasticlunr.Index.load(window.searchIndex);
  searchInput.addEventListener("keyup", debounce(function () {
    var term = searchInput.value.trim();

    if (term === currentTerm || !index) {
      return;
    }

    searchResultsItems.innerHTML = "";

    if (term === "") {
      searchResults.style.display = "none";
      return;
    }

    var results = index.search(term, options).filter(function (r) {
      return r.doc.body !== "";
    });

    if (results.length === 0) {
      searchResultsHeader.innerText = "Nothing like \xAB".concat(term, "\xBB");
      return;
    }

    currentTerm = term;
    searchResultsHeader.innerText = "".concat(results.length, " found for \xAB").concat(term, "\xBB:");
    results.slice(0, MAX_ITEMS).forEach(function (result) {
      if (result.doc.body) {
        searchResultsItems.appendChild(formatSearchResultItem(result, term.split(" ")));
      }
    });
  }, 150));
} // 调用搜索模式切换


toggleSearchMode();
initSearch(); // 初始化搜索功能在页面加载后触发

if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
  initSearch();
} else {
  document.addEventListener("DOMContentLoaded", initSearch);
} // 移动端导航菜单切换


function burger() {
  var trees = document.querySelector("#trees");
  var mobileIcon = document.querySelector("#mobile");
  var isVisible = trees.style.display === "block";
  trees.style.display = isVisible ? "none" : "block";
  mobileIcon.className = isVisible ? "ms-Icon--GlobalNavButton" : "ms-Icon--ChromeClose";
}