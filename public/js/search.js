// search script, optimized

// 防抖函数：避免频繁触发函数执行，提高性能
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// 生成搜索结果摘要，高亮显示搜索词
function makeTeaser(body, terms) {
  const TERM_WEIGHT = 40, NORMAL_WORD_WEIGHT = 2, FIRST_WORD_WEIGHT = 8, TEASER_MAX_WORDS = 30;
  const stemmedTerms = terms.map(w => elasticlunr.stemmer(w.toLowerCase()));
  let termFound = false, index = 0, weighted = [], sentences = body.toLowerCase().split(". ");

  sentences.forEach((sentence, i) => {
    let words = sentence.split(" ");
    let value = FIRST_WORD_WEIGHT;

    words.forEach(word => {
      if (word.length > 0) {
        if (stemmedTerms.some(term => elasticlunr.stemmer(word).startsWith(term))) {
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

  if (!weighted.length) return body;

  // 滑动窗口计算最高权重的片段
  let windowSize = Math.min(weighted.length, TEASER_MAX_WORDS);
  let curSum = weighted.slice(0, windowSize).reduce((sum, [_, weight]) => sum + weight, 0);
  let windowWeights = [curSum];
  for (let i = 0; i < weighted.length - windowSize; i++) {
    curSum = curSum - weighted[i][1] + weighted[i + windowSize][1];
    windowWeights.push(curSum);
  }

  let maxSumIndex = termFound ? windowWeights.lastIndexOf(Math.max(...windowWeights)) : 0;
  let teaser = [], startIndex = weighted[maxSumIndex][2];
  
  for (let i = maxSumIndex; i < maxSumIndex + windowSize; i++) {
    let [word, weight, wordIndex] = weighted[i];
    if (startIndex < wordIndex) teaser.push(body.substring(startIndex, wordIndex));
    teaser.push(weight === TERM_WEIGHT ? `<b>${word}</b>` : word);
    startIndex = wordIndex + word.length;
  }
  
  teaser.push("…");
  return teaser.join("");
}

// 格式化搜索结果
function formatSearchResultItem(item, terms) {
  const li = document.createElement("li");
  li.classList.add("search-results__item");

  const link = document.createElement("a");
  link.href = item.ref;
  link.classList.add("search-results__title"); // 添加类名以便于样式调整
  link.innerText = item.doc.title;

  const teaser = document.createElement("div");
  teaser.classList.add("search-results__teaser");
  teaser.innerHTML = makeTeaser(item.doc.body, terms);

  li.appendChild(link);
  li.appendChild(teaser);
  
  return li;
}

// 切换搜索框和毛玻璃效果
function toggleSearchMode() {
  const searchOverlay = document.querySelector(".search-overlay");
  const searchIcon = document.querySelector("#search-ico");
  const closeSearch = document.querySelector("#close-search");

  // 显示搜索页面
  searchIcon.addEventListener("click", () => {
    searchOverlay.style.display = "flex"; // 显示搜索页面
    document.getElementById("search").focus(); // 让输入框获得焦点
  });

  // 关闭搜索页面
  closeSearch.addEventListener("click", () => {
    searchOverlay.style.display = "none"; // 隐藏搜索页面
    document.getElementById("search").value = ""; // 清空输入框
    document.querySelector(".search-results__items").innerHTML = ""; // 清空搜索结果
  });
}

// 初始化搜索
function initSearch() {
  const searchInput = document.getElementById("search");
  const searchResults = document.querySelector(".search-results");
  const searchResultsItems = document.querySelector(".search-results__items");
  const searchResultsHeader = document.querySelector(".search-results__header");
  const MAX_ITEMS = 100;
  const options = {
    bool: "AND",
    fields: {
      title: {boost: 2},
      body: {boost: 1}
    }
  };
  let currentTerm = "";
  const index = elasticlunr.Index.load(window.searchIndex);

  searchInput.addEventListener("keyup", debounce(() => {
    const term = searchInput.value.trim();
    if (term === currentTerm || !index) {
      return;
    }
    searchResultsItems.innerHTML = "";
    if (term === "") {
      searchResults.style.display = "none";
      return;
    }

    const results = index.search(term, options).filter(r => r.doc.body !== "");
    if (results.length === 0) {
      searchResultsHeader.innerText = `Nothing like «${term}»`;
      return;
    }

    currentTerm = term;
    searchResultsHeader.innerText = `${results.length} found for «${term}»:`;
    results.slice(0, MAX_ITEMS).forEach(result => {
      if (result.doc.body) {
        searchResultsItems.appendChild(formatSearchResultItem(result, term.split(" ")));
      }
    });
  }, 150));
}

// 调用搜索模式切换
toggleSearchMode();
initSearch();

// 初始化搜索功能在页面加载后触发
if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
  initSearch();
} else {
  document.addEventListener("DOMContentLoaded", initSearch);
}

// 移动端导航菜单切换
function burger() {
  const trees = document.querySelector("#trees");
  const mobileIcon = document.querySelector("#mobile");
  const isVisible = trees.style.display === "block";
  trees.style.display = isVisible ? "none" : "block";
  mobileIcon.className = isVisible ? "ms-Icon--GlobalNavButton" : "ms-Icon--ChromeClose";
}
