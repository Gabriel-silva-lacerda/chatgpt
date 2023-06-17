const btnStart = document.querySelector(".btn-start");
const btnArrow = document.querySelector(".btn-arrow");

const sendBtn = document.querySelector(".send-button");
const input = document.querySelector("input");
const question = document.querySelector(".question");
const response = document.querySelector(".response");
const chat = document.querySelector(".chat");
const stats = document.querySelector(".stats");
const loading = document.querySelector(".loading");

const chatGPT = document.querySelector(".chatGPT");
const startContainer = document.querySelector(".start-container");

const apiKey = "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";

const fetchChatGpt = async () => {
  stats.style.display = "block";
  const dados = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
    },

    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: input.value,
      max_tokens: 2048,
      temperature: 0.5,
    }),
  });
  const dadosJSON = await dados.json();
  return dadosJSON;
};

const showValues = async () => {
  if (!input.value.trim().length) {
    input.style.border = "2px solid red";
    return;
  }

  try {
    const responseFetch = await fetchChatGpt();
    const responseGTP = responseFetch.choices[0].text;
    stats.style.display = "none";
    const div = document.createElement("div");
    div.innerHTML += ` 
       <div class=" question-container">
       
         <p class="question">${input.value}</p>
         <span class="material-symbols-outlined user">
          account_circle
          </span>
       </div>
  
       <div class="response-container">
        <img class="robot" src="img/profile.png" alt="">
        <p class="response">${responseGTP}</p> 
       </div>`;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    input.style.border = "1px solid white";
    input.value = "";
    input.focus();
  } catch (erro) {
    alert(erro);
  }
   
};

sendBtn.addEventListener("click", showValues);

btnStart.addEventListener("click", () => {
  startContainer.style.opacity = "0";
  chatGPT.style.opacity = "1";
  chatGPT.style.zIndex = "2";
});

btnArrow.addEventListener("click", () => {
  startContainer.style.opacity = "1";
  chatGPT.style.opacity = "0";
  chatGPT.style.zIndex = "0";
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    showValues();
  }
});
