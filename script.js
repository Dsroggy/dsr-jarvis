const chat   = document.getElementById("chat");
const status = document.getElementById("status");
const hud    = document.getElementById("hud");
const input  = document.getElementById("input");

// 🔴 APNA WORKER URL YAHA DAALO
const WORKER_URL = "https://dsrjarvis.sksoyel970.workers.dev/";

// chat me message add
function add(text, cls) {
  const div = document.createElement("div");
  div.className = "msg " + cls;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// text bhejna (typing ya mic dono ke liye)
async function send(textFromVoice) {
  const text = textFromVoice || input.value.trim();
  if (!text) return;

  add("YOU: " + text, "user");
  input.value = "";
  status.innerText = "THINKING...";

  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    add("DSR: " + data.reply, "ai");
    status.innerText = "IDLE";

    speak(data.reply); // 🔊 voice reply
  } catch (e) {
    status.innerText = "ERROR";
    add("DSR: Connection error", "ai");
  }
}

// 🎤 MIC SE SUNNA (NO wake word, direct)
function voice() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition not supported");
    return;
  }

  const rec = new SpeechRecognition();
  rec.lang = "en-IN";
  rec.interimResults = false;

  status.innerText = "LISTENING...";
  hud.classList.add("listening");
  rec.start();

  rec.onresult = (e) => {
    const speech = e.results[0][0].transcript;
    add("YOU: " + speech, "user");
    send(speech);
  };

  rec.onerror = () => {
    status.innerText = "MIC ERROR";
  };

  rec.onend = () => {
    hud.classList.remove("listening");
    status.innerText = "IDLE";
  };
}

// 🔊 AI VOICE BOLEGA
function speak(text) {
  speechSynthesis.cancel();

  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-IN";
  u.rate = 0.95;

  const voices = speechSynthesis.getVoices();
  if (voices.length > 0) {
    u.voice = voices.find(v => v.lang === "en-IN") || voices[0];
  }

  setTimeout(() => speechSynthesis.speak(u), 200);
}
