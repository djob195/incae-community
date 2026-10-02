"use client";

import { useEffect, useState } from "react";

export default function ArticleTools() {
  const [notice, setNotice] = useState("");
  const [saved, setSaved] = useState(false);
  const [listening, setListening] = useState(false);

  useEffect(
    () => () => {
      document.documentElement.style.removeProperty("--essay-size");
      window.speechSynthesis?.cancel();
    },
    [],
  );

  function resize(delta: number) {
    const current =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--essay-size",
        ),
      ) || 16;
    document.documentElement.style.setProperty(
      "--essay-size",
      `${Math.max(14, Math.min(22, current + delta))}px`,
    );
  }
  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setNotice("Enlace del artículo copiado.");
    } catch {
      setNotice("Copia el enlace desde la barra de tu navegador.");
    }
  }
  function listen() {
    if (!("speechSynthesis" in window)) {
      setNotice("La lectura en voz alta no está disponible en este navegador.");
      return;
    }
    window.speechSynthesis.cancel();
    if (listening) {
      setListening(false);
      return;
    }
    const text = document.querySelector(".essay-copy")?.textContent || "";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.onend = () => setListening(false);
    utterance.onerror = () => setListening(false);
    window.speechSynthesis.speak(utterance);
    setListening(true);
  }
  return (
    <div className="essay-tools">
      <div className="essay-tools-top">
        <button className="primary" onClick={listen}>
          {listening ? "■ DETENER LECTURA" : "▶ ESCUCHAR ARTÍCULO"}
        </button>
        <span>
          LECTURA EJECUTIVA
          <br />
          <small>Voz del navegador · Prototipo</small>
        </span>
        <span className="essay-reading">
          ◷ 24 MIN DE LECTURA · CON ARBITRAJE ACADÉMICO*
        </span>
      </div>
      <div className="essay-tool-buttons">
        <button onClick={() => resize(-1)} aria-label="Reducir tamaño de texto">
          A−
        </button>
        <button onClick={() => resize(1)} aria-label="Aumentar tamaño de texto">
          A+
        </button>
        <button
          aria-pressed={saved}
          onClick={() => {
            setSaved(!saved);
            setNotice(
              saved
                ? "Artículo retirado del dossier de esta sesión."
                : "Artículo guardado en el dossier de esta sesión.",
            );
          }}
        >
          {saved ? "✓ GUARDADO EN DOSSIER" : "☆ GUARDAR EN DOSSIER"}
        </button>
        <button onClick={share} aria-label="Compartir artículo">
          ↗ Compartir
        </button>
        <button onClick={() => window.print()}>Imprimir</button>
      </div>
      <span className="essay-status" role="status">
        {notice}
      </span>
    </div>
  );
}
