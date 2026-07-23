"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from "react";

type Language = "tr" | "en";
type Pair = { tr: string; en: string };
type Character = Pair & { image: string; emoji: string };
type Round = { how: Pair; who: Character; action: Pair };

const howOptions: Pair[] = [
  { tr: "merakla", en: "curiously" },
  { tr: "cesurca", en: "bravely" },
  { tr: "sessizce", en: "quietly" },
  { tr: "neşeyle", en: "cheerfully" },
  { tr: "şaşkınlıkla", en: "in amazement" },
  { tr: "sabırla", en: "patiently" },
  { tr: "heyecanla", en: "excitedly" },
  { tr: "dikkatlice", en: "carefully" },
  { tr: "umutla", en: "hopefully" },
  { tr: "gizlice", en: "secretly" },
  { tr: "kararlılıkla", en: "with determination" },
  { tr: "kahkahalarla", en: "with laughter" },
  { tr: "aceleyle", en: "in a hurry" },
  { tr: "dostça", en: "kindly" },
  { tr: "hayretle", en: "with wonder" },
  { tr: "özenle", en: "with great care" },
];

const characters: Character[] = [
  { tr: "akıllı arı", en: "clever bee", image: "arı.jpg", emoji: "🐝" },
  { tr: "genç aslan", en: "young lion", image: "aslan.jpg", emoji: "🦁" },
  { tr: "adaletli avukat", en: "fair lawyer", image: "avukat.jpg", emoji: "⚖️" },
  { tr: "meraklı bebek", en: "curious toddler", image: "bebek.jpg", emoji: "👶" },
  { tr: "yaşlı bilge", en: "old sage", image: "bilge.jpg", emoji: "🧙" },
  { tr: "becerikli dede", en: "handy grandpa", image: "dede.jpg", emoji: "👴" },
  { tr: "süslü deve", en: "fancy camel", image: "deve.jpg", emoji: "🐪" },
  { tr: "yürüyen ev", en: "walking house", image: "ev.jpg", emoji: "🏠" },
  { tr: "zaman imparatoru", en: "emperor of time", image: "imparator.jpg", emoji: "⏳" },
  { tr: "gezgin kamyoncu", en: "travelling trucker", image: "kamyoncu.jpg", emoji: "🚚" },
  { tr: "orman kedisi", en: "forest cat", image: "kedi.jpg", emoji: "🐈" },
  { tr: "çiçekli kovboy", en: "flower cowboy", image: "kovboy.jpg", emoji: "🤠" },
  { tr: "kurbağa kralı", en: "frog king", image: "kral.jpg", emoji: "👑" },
  { tr: "çılgın mucit", en: "wild inventor", image: "mucit.jpg", emoji: "🔬" },
  { tr: "bulut prensesi", en: "cloud princess", image: "prenses.jpg", emoji: "👸" },
  { tr: "yardımsever robot", en: "helpful robot", image: "robot.jpg", emoji: "🤖" },
  { tr: "güler yüzlü yazar", en: "cheerful writer", image: "yazar.jpg", emoji: "✍️" },
];

const actionOptions: Pair[] = [
  { tr: "kayıp bir yıldızı arıyor", en: "searches for a lost star" },
  { tr: "orman hayvanlarına yardım ediyor", en: "helps the forest animals" },
  { tr: "uçan bir kütüphane kuruyor", en: "builds a flying library" },
  { tr: "zamanı durduran saati onarıyor", en: "repairs a clock that stops time" },
  { tr: "gizemli bir haritayı izliyor", en: "follows a mysterious map" },
  { tr: "bulutlardan bir köprü yapıyor", en: "builds a bridge from clouds" },
  { tr: "konuşan bir çiçeği koruyor", en: "protects a talking flower" },
  { tr: "Ay’a giden treni yakalıyor", en: "catches the train to the Moon" },
  { tr: "renklerini kaybeden şehri kurtarıyor", en: "saves a city that lost its colours" },
  { tr: "dünyanın en küçük kapısını açıyor", en: "opens the world’s smallest door" },
  { tr: "rüzgârın şarkısını kaydediyor", en: "records the song of the wind" },
  { tr: "denizin altındaki okula gidiyor", en: "visits a school under the sea" },
  { tr: "kırık gökkuşağını tamamlıyor", en: "repairs a broken rainbow" },
  { tr: "gelecekten gelen mektubu okuyor", en: "reads a letter from the future" },
  { tr: "kaybolan kahkahaları buluyor", en: "finds the missing laughter" },
  { tr: "uyumayan bir köyün sırrını çözüyor", en: "solves the mystery of a sleepless village" },
  { tr: "güneş enerjili bir araç tasarlıyor", en: "designs a solar-powered vehicle" },
  { tr: "çöpleri oyuncağa dönüştürüyor", en: "turns waste into toys" },
  { tr: "hayvanların dilini öğreniyor", en: "learns the language of animals" },
  { tr: "bir dileği sahibine ulaştırıyor", en: "delivers a wish to its owner" },
];

const text = {
  tr: {
    title: "Haydi Yazalım!",
    subtitle: "Üç kart, bir hayal, benzersiz bir hikâye.",
    newRound: "Yeni Cümle Üret",
    how: "Nasıl?",
    who: "Kim?",
    action: "Ne yapar?",
    prompt: "Hikâye cümlen",
    copy: "Cümleyi kopyala",
    copied: "Kopyalandı!",
    writingTitle: "Şimdi hikâyeyi sen tamamla",
    writingHint: "Bu cümleyle başla; kahramanın başına gelenleri kendi hayalinle yaz.",
    placeholder: "Hikâyeni buraya yaz…",
    words: "sözcük",
    timer: "Yazma süresi",
    start: "Başlat",
    pause: "Duraklat",
    reset: "Sıfırla",
    author: "Yazarın adı",
    authorPlaceholder: "Adını yaz",
    storyTitle: "Hikâyenin başlığı",
    titlePlaceholder: "Hikâyene bir ad ver",
    save: "Hikâyeyi PNG indir",
    certificate: "Sertifikayı PNG indir",
    certificateTitle: "Yaratıcı Yazar Sertifikası",
    certificateText: "özgün hayal gücü ve yaratıcı anlatımıyla hikâyesini başarıyla tamamlamıştır.",
    certificateFooter: "Haydi Yazalım! Yaratıcı Yazma Oyunu",
    untitled: "Adsız Hikâye",
    youngWriter: "Genç Yazar",
    clear: "Temizle",
    saved: "Otomatik kaydedildi",
    gallery: "Karakter galerisi",
    galleryHint: "Bir karakter seçebilir ya da sürpriz düğmesine basabilirsin.",
    random: "Sürpriz karakter",
    selected: "Seçildi",
    footer: "Fikir senin, kalem senin, hikâye senin.",
    confirmClear: "Yazdığın metin silinsin mi?",
    minute: "dakika",
  },
  en: {
    title: "Let’s Write!",
    subtitle: "Three cards, one spark, a story only you can tell.",
    newRound: "Create a New Prompt",
    how: "How?",
    who: "Who?",
    action: "What happens?",
    prompt: "Your story starter",
    copy: "Copy sentence",
    copied: "Copied!",
    writingTitle: "Now you finish the story",
    writingHint: "Begin with this sentence and imagine what happens next.",
    placeholder: "Write your story here…",
    words: "words",
    timer: "Writing time",
    start: "Start",
    pause: "Pause",
    reset: "Reset",
    author: "Author’s name",
    authorPlaceholder: "Write your name",
    storyTitle: "Story title",
    titlePlaceholder: "Give your story a title",
    save: "Download Story PNG",
    certificate: "Download Certificate PNG",
    certificateTitle: "Creative Writer Certificate",
    certificateText: "has successfully completed an original story with imagination and creative expression.",
    certificateFooter: "Let’s Write! Creative Writing Game",
    untitled: "Untitled Story",
    youngWriter: "Young Writer",
    clear: "Clear",
    saved: "Saved automatically",
    gallery: "Character gallery",
    galleryHint: "Choose a character or let the surprise button decide.",
    random: "Surprise character",
    selected: "Selected",
    footer: "Your idea, your words, your story.",
    confirmClear: "Delete the text you wrote?",
    minute: "minutes",
  },
} as const;

const randomItem = <T,>(items: T[], current?: T) => {
  const pool = items.length > 1 ? items.filter((item) => item !== current) : items;
  return pool[Math.floor(Math.random() * pool.length)] ?? items[0];
};

const makeRound = (current?: Round): Round => ({
  how: randomItem(howOptions, current?.how),
  who: randomItem(characters, current?.who),
  action: randomItem(actionOptions, current?.action),
});

const fileSafe = (value: string) =>
  value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-") || "hikayem";

const loadImage = (source: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });

const roundedRect = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
};

const wrapText = (
  context: CanvasRenderingContext2D,
  value: string,
  maxWidth: number,
) => {
  const lines: string[] = [];
  value.split(/\n/).forEach((paragraph, paragraphIndex) => {
    const words = paragraph.trim().split(/\s+/).filter(Boolean);
    let line = "";
    words.forEach((word) => {
      const test = line ? `${line} ${word}` : word;
      if (line && context.measureText(test).width > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    if (paragraphIndex < value.split(/\n/).length - 1) lines.push("");
  });
  return lines;
};

const downloadCanvas = (canvas: HTMLCanvasElement, filename: string) => {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }, "image/png");
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("tr");
  const [round, setRound] = useState<Round>(() => ({
    how: howOptions[0],
    who: characters[0],
    action: actionOptions[0],
  }));
  const [rolling, setRolling] = useState(false);
  const [story, setStory] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [seconds, setSeconds] = useState(9 * 60);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const t = text[language];

  useEffect(() => {
    const saved = localStorage.getItem("haydi-yazalim-story");
    const savedAuthor = localStorage.getItem("haydi-yazalim-author");
    const savedTitle = localStorage.getItem("haydi-yazalim-title");
    const savedLanguage = localStorage.getItem("haydi-yazalim-language");
    const restore = window.setTimeout(() => {
      if (saved) setStory(saved);
      if (savedAuthor) setAuthorName(savedAuthor);
      if (savedTitle) setStoryTitle(savedTitle);
      if (savedLanguage === "tr" || savedLanguage === "en") setLanguage(savedLanguage);
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  useEffect(() => {
    localStorage.setItem("haydi-yazalim-story", story);
  }, [story]);

  useEffect(() => {
    localStorage.setItem("haydi-yazalim-author", authorName);
    localStorage.setItem("haydi-yazalim-title", storyTitle);
  }, [authorName, storyTitle]);

  useEffect(() => {
    localStorage.setItem("haydi-yazalim-language", language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          setRunning(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  const sentence = useMemo(() => {
    const raw =
      language === "tr"
        ? `${round.how.tr} ${round.who.tr} ${round.action.tr}.`
        : `${round.who.en} ${round.action.en} ${round.how.en}.`;
    return raw.charAt(0).toLocaleUpperCase(language === "tr" ? "tr-TR" : "en-US") + raw.slice(1);
  }, [language, round]);

  const wordCount = useMemo(
    () => story.trim().split(/\s+/).filter(Boolean).length,
    [story],
  );

  const roll = useCallback(() => {
    if (rolling) return;
    setRolling(true);
    window.setTimeout(() => {
      setRound((current) => makeRound(current));
      setRolling(false);
      setCopied(false);
    }, 650);
  }, [rolling]);

  const chooseCharacter = (who: Character) => {
    setRound((current) => ({ ...current, who }));
    setGalleryOpen(false);
    setCopied(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copySentence = async () => {
    await navigator.clipboard.writeText(sentence);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const formatTime = (value: number) =>
    `${Math.floor(value / 60)
      .toString()
      .padStart(2, "0")}:${(value % 60).toString().padStart(2, "0")}`;

  const downloadStoryPng = async () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;
    const title = storyTitle.trim() || t.untitled;
    const author = authorName.trim() || t.youngWriter;
    const image = await loadImage(`/gallery/${round.who.image}`);

    context.font = "32px Georgia, serif";
    const lines = wrapText(context, story, 1020);
    canvas.width = 1200;
    canvas.height = Math.max(1600, 720 + lines.length * 48);

    const gradient = context.createLinearGradient(0, 0, 1200, canvas.height);
    gradient.addColorStop(0, "#f0ebff");
    gradient.addColorStop(0.36, "#fffaf0");
    gradient.addColorStop(1, "#fffefb");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = "#7456d8";
    context.lineWidth = 8;
    roundedRect(context, 30, 30, 1140, canvas.height - 60, 34);
    context.stroke();
    context.strokeStyle = "#f0b946";
    context.lineWidth = 2;
    roundedRect(context, 50, 50, 1100, canvas.height - 100, 27);
    context.stroke();

    context.save();
    roundedRect(context, 80, 95, 340, 390, 28);
    context.clip();
    const ratio = Math.max(340 / image.width, 390 / image.height);
    const drawWidth = image.width * ratio;
    const drawHeight = image.height * ratio;
    context.drawImage(image, 80 + (340 - drawWidth) / 2, 95 + (390 - drawHeight) / 2, drawWidth, drawHeight);
    context.restore();

    context.fillStyle = "#7456d8";
    context.font = "bold 24px Trebuchet MS, sans-serif";
    context.fillText(language === "tr" ? "HAYDİ YAZALIM!" : "LET’S WRITE!", 470, 120);
    context.fillStyle = "#292840";
    context.font = "bold 56px Georgia, serif";
    wrapText(context, title, 620).slice(0, 3).forEach((line, index) => {
      context.fillText(line, 470, 200 + index * 66);
    });
    context.fillStyle = "#69647b";
    context.font = "26px Trebuchet MS, sans-serif";
    context.fillText(`${language === "tr" ? "Yazan" : "Written by"}: ${author}`, 470, 430);

    context.fillStyle = "#f1edff";
    roundedRect(context, 80, 525, 1040, 105, 22);
    context.fill();
    context.fillStyle = "#5740b5";
    context.font = "italic 26px Georgia, serif";
    wrapText(context, sentence, 970).slice(0, 2).forEach((line, index) => {
      context.fillText(line, 115, 568 + index * 34);
    });

    context.fillStyle = "#353447";
    context.font = "32px Georgia, serif";
    lines.forEach((line, index) => context.fillText(line, 90, 700 + index * 48));
    context.fillStyle = "#7456d8";
    context.font = "bold 20px Trebuchet MS, sans-serif";
    context.textAlign = "center";
    context.fillText(t.footer, 600, canvas.height - 85);
    context.textAlign = "left";
    downloadCanvas(canvas, `${fileSafe(title)}.png`);
  };

  const downloadCertificate = async () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;
    const author = authorName.trim() || t.youngWriter;
    const image = await loadImage(`/gallery/${round.who.image}`);
    canvas.width = 1600;
    canvas.height = 1100;

    const gradient = context.createLinearGradient(0, 0, 1600, 1100);
    gradient.addColorStop(0, "#f0ebff");
    gradient.addColorStop(0.5, "#fffdf8");
    gradient.addColorStop(1, "#fff1d6");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 1600, 1100);
    context.strokeStyle = "#5740b5";
    context.lineWidth = 16;
    roundedRect(context, 38, 38, 1524, 1024, 36);
    context.stroke();
    context.strokeStyle = "#e5ad38";
    context.lineWidth = 4;
    roundedRect(context, 70, 70, 1460, 960, 28);
    context.stroke();

    [["✦", 115, 155], ["✦", 115, 940], ["✦", 1430, 155], ["✦", 1430, 940]].forEach(
      ([sparkle, x, y], index) => {
        context.fillStyle = index % 2 ? "#7456d8" : "#e5ad38";
        context.font = "48px Georgia, serif";
        context.fillText(String(sparkle), Number(x), Number(y));
      },
    );

    context.textAlign = "center";
    context.fillStyle = "#7456d8";
    context.font = "bold 30px Trebuchet MS, sans-serif";
    context.fillText(language === "tr" ? "HAYDİ YAZALIM!" : "LET’S WRITE!", 800, 165);
    context.fillStyle = "#2e2b4a";
    context.font = "bold 72px Georgia, serif";
    context.fillText(t.certificateTitle, 800, 275);
    context.fillStyle = "#777084";
    context.font = "28px Trebuchet MS, sans-serif";
    context.fillText(
      language === "tr" ? "Bu sertifika gururla sunulur" : "This certificate is proudly presented to",
      800,
      365,
    );
    context.fillStyle = "#5740b5";
    context.font = "bold 76px Georgia, serif";
    context.fillText(author, 800, 475);
    context.strokeStyle = "#e5ad38";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(360, 510);
    context.lineTo(1240, 510);
    context.stroke();
    context.fillStyle = "#4d4a5f";
    context.font = "30px Georgia, serif";
    wrapText(context, t.certificateText, 980).forEach((line, index) => {
      context.fillText(line, 800, 590 + index * 42);
    });

    context.save();
    context.beginPath();
    context.arc(800, 790, 96, 0, Math.PI * 2);
    context.clip();
    const ratio = Math.max(192 / image.width, 192 / image.height);
    context.drawImage(image, 704 + (192 - image.width * ratio) / 2, 694 + (192 - image.height * ratio) / 2, image.width * ratio, image.height * ratio);
    context.restore();
    context.strokeStyle = "#7456d8";
    context.lineWidth = 8;
    context.beginPath();
    context.arc(800, 790, 100, 0, Math.PI * 2);
    context.stroke();

    context.fillStyle = "#666078";
    context.font = "24px Trebuchet MS, sans-serif";
    const date = new Intl.DateTimeFormat(language === "tr" ? "tr-TR" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
    context.fillText(date, 430, 930);
    context.fillText(t.certificateFooter, 1170, 930);
    context.strokeStyle = "#a59bc8";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(250, 895);
    context.lineTo(610, 895);
    context.moveTo(990, 895);
    context.lineTo(1350, 895);
    context.stroke();

    downloadCanvas(canvas, `${fileSafe(author)}-${language === "tr" ? "sertifika" : "certificate"}.png`);
  };

  const clearStory = () => {
    if (story && !window.confirm(t.confirmClear)) return;
    setStory("");
  };

  return (
    <main className="app">
      <div className="sky" aria-hidden="true">
        <span className="cloud cloud-one" />
        <span className="cloud cloud-two" />
        <span className="star star-one">✦</span>
        <span className="star star-two">✦</span>
        <span className="star star-three">✦</span>
      </div>

      <header className="topbar">
        <a className="brand" href="#game" aria-label={t.title}>
          <span className="brand-pencil" aria-hidden="true">✎</span>
          <span>
            <strong>{t.title}</strong>
            <small>{language === "tr" ? "Yaratıcı yazma oyunu" : "Creative writing game"}</small>
          </span>
        </a>
        <div className="language-switch" aria-label="Language / Dil">
          <button className={language === "tr" ? "active" : ""} onClick={() => setLanguage("tr")}>
            TR
          </button>
          <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>
            EN
          </button>
        </div>
      </header>

      <section className="hero" id="game">
        <div className="hero-copy">
          <span className="eyebrow">{language === "tr" ? "HAYAL ET · YAZ · PAYLAŞ" : "IMAGINE · WRITE · SHARE"}</span>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>

        <div className="game-board">
          <div className="portrait-wrap">
            <div className={`portrait ${rolling ? "rolling" : ""}`}>
              <img
                key={round.who.image}
                src={`/gallery/${round.who.image}`}
                alt={round.who[language]}
              />
              <div className="portrait-shine" />
              <span className="portrait-emoji" aria-hidden="true">{round.who.emoji}</span>
            </div>
            <button className="gallery-link" onClick={() => setGalleryOpen((value) => !value)}>
              <span aria-hidden="true">▦</span> {t.gallery}
            </button>
          </div>

          <div className="prompt-side">
            <div className="cards" aria-live="polite">
              <article className={`word-card how ${rolling ? "rolling" : ""}`}>
                <span>{t.how}</span>
                <strong>{rolling ? "•••" : round.how[language]}</strong>
              </article>
              <article className={`word-card who ${rolling ? "rolling" : ""}`}>
                <span>{t.who}</span>
                <strong>{rolling ? "•••" : round.who[language]}</strong>
              </article>
              <article className={`word-card action ${rolling ? "rolling" : ""}`}>
                <span>{t.action}</span>
                <strong>{rolling ? "•••" : round.action[language]}</strong>
              </article>
            </div>

            <button className="roll-button" onClick={roll} disabled={rolling}>
              <span className="dice" aria-hidden="true">{rolling ? "✦" : "⚄"}</span>
              {rolling ? (language === "tr" ? "Hayal kuruluyor…" : "Creating…") : t.newRound}
            </button>

            <div className="sentence-box">
              <span>{t.prompt}</span>
              <p>{sentence}</p>
              <button onClick={copySentence}>
                {copied ? "✓ " + t.copied : "⧉ " + t.copy}
              </button>
            </div>
          </div>
        </div>
      </section>

      {galleryOpen && (
        <section className="gallery" aria-label={t.gallery}>
          <div className="section-heading">
            <div>
              <span className="eyebrow">{t.gallery}</span>
              <h2>{t.galleryHint}</h2>
            </div>
            <button className="close-gallery" onClick={() => setGalleryOpen(false)} aria-label="Close">×</button>
          </div>
          <div className="gallery-grid">
            {characters.map((character) => (
              <button
                key={character.image}
                className={character.image === round.who.image ? "selected" : ""}
                onClick={() => chooseCharacter(character)}
              >
                <img src={`/gallery/${character.image}`} alt="" />
                <span>
                  <strong>{character[language]}</strong>
                  <small>{character.image === round.who.image ? "✓ " + t.selected : character.emoji}</small>
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="writing">
        <div className="writing-head">
          <div>
            <span className="eyebrow">{language === "tr" ? "SIRA SENDE" : "YOUR TURN"}</span>
            <h2>{t.writingTitle}</h2>
            <p>{t.writingHint}</p>
          </div>
          <div className={`timer ${seconds === 0 ? "finished" : ""}`}>
            <span>{t.timer}</span>
            <strong>{formatTime(seconds)}</strong>
            <div>
              <button onClick={() => setRunning((value) => !value)} disabled={seconds === 0}>
                {running ? "Ⅱ " + t.pause : "▶ " + t.start}
              </button>
              <button onClick={() => { setRunning(false); setSeconds(9 * 60); }}>
                ↺ {t.reset}
              </button>
            </div>
          </div>
        </div>

        <div className="paper">
          <div className="story-details">
            <label>
              <span>{t.storyTitle}</span>
              <input
                value={storyTitle}
                onChange={(event) => setStoryTitle(event.target.value)}
                placeholder={t.titlePlaceholder}
                maxLength={80}
              />
            </label>
            <label>
              <span>{t.author}</span>
              <input
                value={authorName}
                onChange={(event) => setAuthorName(event.target.value)}
                placeholder={t.authorPlaceholder}
                maxLength={60}
              />
            </label>
          </div>
          <div className="starter">
            <span>{round.who.emoji}</span>
            <p>{sentence}</p>
          </div>
          <textarea
            value={story}
            onChange={(event) => setStory(event.target.value)}
            placeholder={t.placeholder}
            aria-label={t.placeholder}
          />
          <div className="paper-footer">
            <span>{wordCount} {t.words}</span>
            <span className="auto-save">● {t.saved}</span>
            <div className="export-actions">
              <button onClick={clearStory}>⌫ {t.clear}</button>
              <button className="download story-download" onClick={downloadStoryPng} disabled={!story.trim()}>
                ▣ {t.save}
              </button>
              <button className="download certificate-download" onClick={downloadCertificate} disabled={!story.trim()}>
                🏅 {t.certificate}
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span aria-hidden="true">✦</span>
        <strong>{t.footer}</strong>
        <span aria-hidden="true">✦</span>
      </footer>
    </main>
  );
}
