const wordSearchForm = document.getElementById("word-search-form");
const copyBtn = document.getElementById("copy-btn");
const wordAddBody = document.querySelector(".word-app-body");
const wordlistContainer = document.getElementById("word-list");
const loadingSpinner = document.getElementById("spinner");
let wordFound = true;
const getInputWord = () => {
  wordSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let searchWord = wordSearchForm.search_word.value;
    fetchSymWords(searchWord);
  });
};
getInputWord();
const fetchSymWords = async (searchWord) => {
  let url = `https://api.datamuse.com/words?rel_syn=${searchWord}`;
  try {
    loadingSpinner.style.display = "flex";
    let response = await fetch(url);
    let fetchedData = await response.json();
    loadingSpinner.style.display = "none";
    renderwords(fetchedData);
  } catch (error) {
    console.log(error);
  }
};
const renderwords = (wordsArr) => {
  let htmlcode;
  if (wordsArr.length > 0) {
    wordFound = false;
    htmlcode = wordsArr.map((word) => {
      return `<span class="word-item">${word.word}</span>
`;
    });
    wordlistContainer.innerHTML = htmlcode.join("");
  } else {
    htmlcode = "No search results found!";
    wordlistContainer.innerHTML = htmlcode;
  }
  wordAddBody.style.display = "block";
};
const copyWordList = () => {
  if (!wordFound) {
    let words = wordlistContainer.textContent.split(" ");
    let filteredWords = words.filter((word) => word.length != 0);
    let wordCopy = filteredWords.join(" , ");
    navigator.clipboard
      .writeText(wordCopy)
      .then(() => {
        console.log("Copied to clipboard");
      })
      .catch((error) => {
        console.log("Copy failed", error);
      });
  } else {
    console.log("Nothing To Copy");
  }
};
copyBtn.addEventListener("click", copyWordList);
