// ****************** Declare Variables ******************

// Letters
const lettersEn = "abcdefghijklmnopqrstuvwxyz+#",
  lettersAr = "ابتثجحخدذرزسشصضطظعغفقكلمنهويأإئؤةء";
let lettersArray = [];

// Select Guess Span
let guessSpan = [];

// Wrong Attempts
let wrongAttempts = 0;
let countWrongAttempts = 8;

// Select Draw Elemnt
let theDraw = document.querySelector(".hangman-draw");

// Select Letters Countainer
let lettersContainer = document.querySelector(".letters");

// Select Row Countainer
let row = document.querySelector(".row");

// Select Main Container
let mainContainer = document.querySelector(".container");

// Blur screen
let blurScreen = document.createElement("div");
blurScreen.className = "blur";

// Langauge Flags For AR or EN Lang.
let langARFlag = false,
  langENFlag = false;

// Generate The Words

let myData = {};
function getDataFromAPI() {
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      myData = JSON.parse(this.responseText);
      console.log(myData);
      console.log(myData.wordsEN);
    }
  };

  myRequest.open("GET", "api/ammar.json", true);
  myRequest.send();
}
getDataFromAPI()

// 
// const wordsEN = {
//   programming: [
//     "pyathon",
//     "java",
//     "javascript",
//     "go",
//     "php",
//     "c",
//     "c++",
//     "c#",
//     "visual basic",
//     "kotlin",
//     "swift",
//     "dart",
//     "pascal",
//     "fortarn",
//   ],

//   "Arabin Countries": [
//     "Syria",
//     "Palestine",
//     "Yaman",
//     "Egypt",
//     "Qatar",
//     "Iraq",
//     "Lebanon",
//     "Kuwait",
//     "Algeria",
//     "Sudan",
//     "Tunisia",
//     "Saudi Arabia",
//     "Somalia",
//     "Morocco",
//     "Libya",
//     "Jordan",
//     "United Arab of Emirates",
//     "Mauritania",
//     "Oman",
//     "Qatar",
//     "Jubbuti",
//     "Baharain",
//     "Union of Comoros",
//   ],

//   "Mobile Phone": [
//     "samsung",
//     "apple",
//     "xiaomi",
//     "huawei",
//     "infinex",
//     "oppo",
//     "vivo",
//     "sony",
//   ],

//   "Syrian Cities": [
//     "Homs",
//     "Aleppo",
//     "Damascus",
//     "Hama",
//     "Latakia",
//     "Tartous",
//     "Daraa",
//     "Idlib",
//     "Suwayda",
//     "Quneitra",
//     "Deir Zor",
//     "Raqqah",
//     "Al Hasakah",
//   ],
// };

// const wordsAR = {
//   "لغات البرمجة": [
//     "بايثون",
//     "جافا",
//     "جافاسكربت",
//     "غو",
//     "بي اتش بي",
//     "سي",
//     "سي بلاص بلاص",
//     "سي شارب",
//     "فيجوال بيسك",
//     "كوتلن",
//     "سويفت",
//     "دارت",
//     "باسكال",
//     "فورتران",
//   ],
//   "البلدان العربية": [
//     "الاردن",
//     "الإمارات العربية المتحدة",
//     "البحرين",
//     "الجزائر",
//     "السودان",
//     "الصومال",
//     "العراق",
//     "المغرب",
//     "تونس",
//     "جيبوتي",
//     "سوريا",
//     "عمان",
//     "فلسطين",
//     "قطر",
//     "لبنان",
//     "ليبيا",
//     "موريتانيا",
//     "السعودية",
//     "الكويت",
//     "اليمن",
//     "جزر القمر",
//     "مصر",
//   ],

//   "شركات الموبايل": [
//     "سامسونغ",
//     "أبل",
//     "شاومي",
//     "هواوي",
//     "أنفينكس",
//     "أوبو",
//     "فيفو",
//     "سوني",
//   ],

//   "المدن السورية": [
//     "حمص",
//     "حلب",
//     "دمشق",
//     "حماة",
//     "اللاذقية",
//     "طرطوس",
//     "درعا",
//     "إدلب",
//     "سويداء",
//     "القنيطرة",
//     "دير الزور",
//     "الرقة",
//     "الحسكة",
//   ],
// };

let chossenWord = "";

// ****************** End Declare Variables ******************

// Genrate Letters Function
function generate(words) {
  // Get Random Property
  let allKeys = Object.keys(words);
  // Random Number Depend On Keys Length
  let randomPropNumber = Math.floor(Math.random() * allKeys.length);

  // Category
  let randomPropName = allKeys[randomPropNumber];

  // Category Words
  let randomPropValue = words[randomPropName];

  // Random Number Depend On Words
  let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

  // The Chossen Word
  chossenWord = randomPropValue[randomValueNumber];
  // Set Category Info
  document.querySelector(".game-info .category .word").innerHTML =
    randomPropName;

  // Select Letters Guess Element
  let lettersGuessContainer = document.querySelector(".letters-guess");

  // Convert Chosen Word To Array
  let letterFromRandomWords = Array.from(chossenWord);
  // Craet Spans Depened On Word
  letterFromRandomWords.forEach((letter) => {
    // Creat Empty Span
    let emptySpan = document.createElement("span");
    // If Letter Is Space
    if (letter === " ") {
      // Add Class To Span
      emptySpan.className = "with-space";
    }
    lettersGuessContainer.appendChild(emptySpan);
  });
  guessSpan = document.querySelectorAll(".letters-guess span");
  return chossenWord;
}

// ******************* Buttons & It's Events ****************

// Language Settings Buttons
let arabicButt = document.querySelector(".arabic");
let englishButt = document.querySelector(".english");

// Hint Button
let hintButt = document.querySelector(".hint");

// Disable It
hintButt.disabled = true;

// Events For Buttons

// Arabic Button Event
arabicButt.addEventListener("click", () => {
  langARFlag = true;
  LangSettings(lettersAr);
  // Remove Welcome text
  document.querySelector(".welcome").classList.add("hide-welcome");
  // Type Arabic in Game Info-Bar
  document.querySelector(".category").setAttribute("dir", "rtl");
  document.querySelector(".category .word-type").innerHTML = "نوع الكلمة :";
  // RTL Arabic Charcters
  lettersContainer.setAttribute("dir", "rtl");
  chossenWord = generate(wordsAR);
  document.querySelector(".letters-guess").setAttribute("dir", "rtl");
  hintButt.innerHTML = `تلميح`;
});

// English Button Event
englishButt.addEventListener("click", () => {
  langENFlag = true;
  LangSettings(lettersEn);
  // Remove Welcome text
  document.querySelector(".welcome").classList.add("hide-welcome");
  // LTR To Row Container
  chossenWord = generate(wordsEN);
});

// LangSettings Function

function LangSettings(lang) {
  // Play Sound Effect
  document.getElementById("hint").play();
  // First On Hint Button
  hintButt.disabled = false;
  // Get Arrays From letters
  lettersArray = Array.from(lang);
  // Generate Letters
  lettersArray.forEach((letter) => {
    // Create Span
    let span = document.createElement("span");
    // Create Letter Text node
    let theLetter = document.createTextNode(letter);
    // Append Text To Span
    span.appendChild(theLetter);
    // Add Class To Span
    span.classList.add("letter-box");
    // Append Span To The Letters Container
    lettersContainer.appendChild(span);
    englishButt.disabled = true;
    arabicButt.disabled = true;
  });
}

// Hint Button Event
hintButt.addEventListener("click", hint);
// Hint Function
function hint() {
  console.log(langARFlag);
  // Play Sound Effect
  document.getElementById("hint").play();
  let onceTime = true;
  guessSpan.forEach((e, i) => {
    if (onceTime) {
      if (e.innerHTML == undefined || e.innerHTML == "") {
        if (chossenWord[i] != " ") {
          guessSpan[i].innerHTML = chossenWord[i];
          hintButt.disabled = true;
          return (onceTime = false);
        }
      }
    }
  });
}

// Create Play Again & Exit Buttons
let playAgainButton = document.createElement("button");
playAgainButton.innerHTML = "Play Agin?";
playAgainButton.className = "again";
let exiteButton = document.createElement("button");
exiteButton.innerHTML = "Exit!";
exiteButton.className = "exit";

// Create Container For Play Again & Exit Button
let buttonsContainer = document.createElement("div");
buttonsContainer.className = "buttons-container";

// Add Them
buttonsContainer.appendChild(playAgainButton);
buttonsContainer.appendChild(exiteButton);

// Add Events To Play Agin & Exit Buttons
playAgainButton.addEventListener("click", () => {
  window.location.reload();
});

exiteButton.addEventListener("click", () => {
  window.close();
});

// ******************* End Buttons & It's Events ****************

// Handle Click On Letters Event

document.addEventListener("click", (e) => {
  // The Stauts
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chossen Word As An Array
    let theChossenWord = Array.from(chossenWord.toLowerCase());

    theChossenWord.forEach((wordLetter, wordIndex) => {
      // If The Clicked Letter Equal To One Of The Chossen Word Letter

      if (theClickedLetter == wordLetter) {
        // Set Satuts To Correct
        theStatus = true;

        // Loop On All Guess Spans
        guessSpan.forEach((span, spanIndex) => {
          if (wordIndex == spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    }); // Out Side The Loop
    // If The Letters Is Wrong
    if (theStatus !== true) {
      countWrongAttempts--;
      // Attempts Count
      let attempt = document.querySelector(".attempts");
      attempt.style.cssText = `  max-width: 168px;
      width: 168px;
      border: 2px solid #2196f3;
      color: #2196f3;
      border-radius: 10px;
      text-align: center;
      padding: 10px 0;
      font-size: 14px;`;
      if (langARFlag) {
        attempt.innerHTML = `لديك ${countWrongAttempts} محاولة`;
      } else {
        attempt.innerHTML = `You Have ${countWrongAttempts} Attempt`;
      }
      // Increase The Wrong Attempts
      wrongAttempts++;
      // Add Class Wrong To The Draw Elemnt
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      // Play Fail Sound
      document.getElementById("fail").play();
      if (wrongAttempts == 8) {
        setTimeout(endGameWhenLosing, 2500);
        lettersContainer.classList.add("finished");
      }
    } else {
      // Play Success Sound
      document.getElementById("success").play();
      if (checkIfCompletedWord()) {
        setTimeout(endGameWhenWin, 2000);
      }
    }
  }
});

// Span With Hyphen "-" Must Include Space
let hyphenSpan = document.querySelector(".letters-guess span.with-space");
guessSpan.forEach((e) => {
  if (e.className === "with-space") hyphenSpan.innerHTML = " ";
});

// Checking Correct Function

let strWord = [];
let timeOfCheck = setInterval(checkIfCompletedWord, 2000);
checkIfCompletedWord();

function checkIfCompletedWord() {
  let flag = false;
  guessSpan.forEach((e, i) => {
    if (e.innerHTML !== undefined && e.innerHTML !== "") {
      strWord[i] = e.innerHTML;
      if (
        strWord.join("").toLowerCase() ===
        chossenWord.split(" ").join("").toLowerCase()
      ) {
        return (flag = true);
      }
    }
  });
  return flag;
}

// End Game Function If Win
function endGameWhenWin() {
  document.getElementById("win").play();
  blurText((ifWin = true));
}

// End Game Function If Losing
function endGameWhenLosing() {
  document.getElementById("lose").play();
  blurText((ifWin = false));
}

function blurText(ifWin = false) {
  let endText = document.createElement("p");
  // If Win *************************
  if (ifWin) {
    if (langARFlag) {
      playAgainButton.innerHTML = "لعب مرة أخرى؟";
      exiteButton.innerHTML = "!خروج";
      endText.innerHTML = `!تهانينا لقد فزت </br> الكلمة هي: ${chossenWord[0].toUpperCase()}${chossenWord.slice(
        1,
        chossenWord.length
      )}`;
    } else {
      endText.innerHTML = `BRAVOOO! YOU WIN </br> THE WORD IS: ${chossenWord[0].toUpperCase()}${chossenWord.slice(
        1,
        chossenWord.length
      )}`;
    }
    endText.className = "win-text";
    document.body.appendChild(blurScreen);
    mainContainer.appendChild(endText);
    mainContainer.appendChild(buttonsContainer);
  }

  // If Lose *************************
  else {
    if (langARFlag) {
      playAgainButton.innerHTML = "لعب مرة أخرى؟";
      exiteButton.innerHTML = "!خروج";
      endText.innerHTML = `!للأسف لقد خسرت </br> الكلمة هي: ${chossenWord[0].toUpperCase()}${chossenWord.slice(
        1,
        chossenWord.length
      )}`;
    } else {
      endText.innerHTML = `OOPS! YOU ARE LOSE </br> THE WORD IS: ${chossenWord[0].toUpperCase()}${chossenWord.slice(
        1,
        chossenWord.length
      )}`;
    }
    endText.className = "lose-text";
    document.body.appendChild(blurScreen);
    mainContainer.appendChild(endText);
    mainContainer.appendChild(buttonsContainer);
  }
}
