"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  headline,
  interviews,
  type ArticlePreview,
} from "@/lib/editorial-data";

export default function EditorialMockup() {
  const [selected, setSelected] = useState<ArticlePreview | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [notice, setNotice] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected && dialog.current && !dialog.current.open)
      dialog.current.showModal();
  }, [selected]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(timer);
  }, [notice]);
  function openArticle(item: ArticlePreview) {
    setSelected(item);
  }
  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setNotice("Enlace copiado");
    } catch {
      setNotice("Puedes copiar el enlace desde la barra del navegador.");
    }
  }
  return (
    <>
      <header className="masthead">
        <a className="brand" href="#inicio" aria-label="Inicio">
          <strong>
            VOL. INCAE
            <br />
            48
          </strong>
          <span>
            EDICIÓN ESPECIAL · ESTRATEGIA
            <br />
            EMPRESARIAL
          </span>
        </a>
        <p>
          Nearshoring, Competitividad Operativa y Cadenas Regionales de Valor
        </p>
        <span className="edition">Octubre 2026 · Edición digital</span>
        <a className="header-link" href="#entrevistas">
          ALUMNI
          <br />
          CONECTA <span>↗</span>
        </a>
      </header>
      <main id="inicio" className="layout">
        <article className="main-article">
          <div className="article-top">
            <span className="eyebrow">
              ANÁLISIS CENTRAL · GESTIÓN & OPERACIONES
            </span>
            <span className="reading">◷ 8 min de lectura</span>
          </div>
          <h1>{headline}</h1>
          <p className="intro">
            A medida que las corporaciones reconfiguran sus plantas y
            operaciones frente a las disrupciones globales, los expertos
            analizan la eficiencia latinoamericana y el desafío imperativo de
            modernizar su matriz logística, digitalizar procesos y capitalizar
            las oportunidades del nearshoring transformador.
          </p>
          <figure className="hero">
            <Image
              width={888}
              height={432}
              priority
              src="/port-reference.png"
              alt="Buque en un puerto frente a montañas, bajo un cielo nublado"
            />
            <figcaption>
              <span>
                Buques frente a corredores logísticos: pilares esenciales de la
                resiliencia regional y de la eficiencia de las multilatinas.
              </span>
              <span>
                Cortesía
                <br />
                Comunidad INCAE
              </span>
            </figcaption>
          </figure>
          <div className="author">
            <div className="avatar">MV</div>
            <div>
              <strong>
                Dr. Mateo Villalobos{" "}
                <span className="badge navy">ALUMNI MBA</span>
              </strong>
              <span className="eyebrow">
                MBA INCAE · GESTIÓN DE CADENAS DE VALOR
              </span>
              <small>Especialista en Operaciones y Estrategia Regional</small>
            </div>
            <Link
              className="primary"
              href="/articulos/escalamiento-corporativo"
            >
              LEER ENSAYO RELACIONADO →<br />
              <small>ESCALAMIENTO CORPORATIVO</small>
            </Link>
          </div>
          <p className="body-copy">
            La relocalización productiva ha dejado de ser una simple ventaja por
            proximidad arancelaria para convertirse en una competencia por
            excelencia operativa, gobernanza corporativa e integración de
            plataformas digitales. Los comités de dirección que no alinean hoy
            su capital humano e infraestructura tecnológica con los estándares
            globales verán mermadas sus cuotas de mercado frente a competidores
            asiáticos y norteamericanos.
          </p>
          <blockquote>
            <span className="eyebrow">PERSPECTIVA DEL AUTOR</span>
            <p>
              “El nearshoring no garantiza prosperidad automática por ubicación
              geográfica: exige que las empresas multilatinas profesionalicen su
              arquitectura directiva, optimicen sus costos marginales y
              conviertan la sostenibilidad operativa en un factor de
              rentabilidad medible.”
            </p>
          </blockquote>
          <footer className="article-footer">
            <div className="tags">
              {[
                "SUPPLY CHAIN",
                "NEARSHORING",
                "GOBIERNO CORPORATIVO",
                "PRIVATE EQUITY",
              ].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <button className="text-button" onClick={share}>
              ↗ Compartir
            </button>
            <button className="text-button" onClick={() => window.print()}>
              ▤ Imprimir
            </button>
          </footer>
        </article>
        <aside id="entrevistas" className="sidebar">
          <section className="featured-essay">
            <span className="eyebrow">NUEVO ENSAYO · MOCKUP</span>
            <h2>
              <Link href="/articulos/escalamiento-corporativo">
                Estrategias de Escalamiento Corporativo y Gobierno en Empresas
                Multilatinas
              </Link>
            </h2>
            <p>MSc. Alejandro Morales Argüello · 24 min de lectura</p>
            <Link
              className="primary"
              href="/articulos/escalamiento-corporativo"
            >
              LEER ARTÍCULO COMPLETO →
            </Link>
          </section>
          <section className="interviews">
            <span className="eyebrow">ENTREVISTAS & LIDERAZGO</span>
            <div className="sidebar-title">
              <h2>Perspectiva Alumni INCAE & Líderes Invitados</h2>
              <span aria-hidden="true">▤</span>
            </div>
            <p className="sidebar-intro">
              Conversaciones estratégicas y análisis de quienes construyen la
              competitividad empresarial y el futuro de América Latina.
            </p>
            <div className="interview-list">
              {interviews
                .slice(0, expanded ? interviews.length : 3)
                .map((item) => (
                  <article className="interview-card" key={item.name}>
                    <div className="person">
                      <div className="avatar small">{item.initials}</div>
                      <h3>{item.name}</h3>
                      <span className={`badge ${item.color}`}>
                        {item.tag}
                        <br />
                        INCAE
                      </span>
                    </div>
                    <span className="eyebrow person-role">{item.role}</span>
                    <div className="rule" />
                    <span className="tiny-label">
                      INSIGHTS · PERSPECTIVAS EJECUTIVAS
                    </span>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <button
                      className="read-more"
                      onClick={() => openArticle(item)}
                    >
                      LEER ENTREVISTA →
                    </button>
                  </article>
                ))}
            </div>
            <button
              className="primary all-button"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded
                ? "VER MENOS ENTREVISTAS ↑"
                : "VER DIRECTORIO DE ARTÍCULOS & COLUMNISTAS →"}
            </button>
          </section>
          <section className="callout">
            <span className="eyebrow">CONVOCATORIA EMPRESARIAL Nº 48</span>
            <h2>Presentación de Casos de Estudio & Negocios</h2>
            <p>
              El Comité Editorial invita a líderes empresariales y alumni a
              compartir casos de transformación y excelencia operativa con la
              comunidad INCAE.
            </p>
            <div>
              <span>Cierre: 30 de octubre</span>
              <button
                onClick={() =>
                  openArticle({
                    title: "Presentación de Casos de Estudio & Negocios",
                    name: "Convocatoria editorial",
                    description:
                      "Demo: aquí puedes integrar un formulario de postulación con nombre, empresa, correo y resumen del caso. No se envían datos en este prototipo.",
                  })
                }
              >
                Postular publicación →
              </button>
            </div>
          </section>
        </aside>
      </main>
      <footer className="site-footer">
        <span>INCAE · Perspectivas empresariales</span>
        <span>Prototipo editorial · Contenido de demostración</span>
      </footer>
      <div className="toast" role="status" aria-live="polite">
        {notice && <span>{notice}</span>}
      </div>
      <dialog
        aria-labelledby="preview-title"
        ref={dialog}
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="modal-heading">
          <span className="eyebrow">VISTA DE DEMOSTRACIÓN</span>
          <button aria-label="Cerrar" onClick={() => dialog.current?.close()}>
            ×
          </button>
        </div>
        <h2 id="preview-title">{selected?.title}</h2>
        <p className="modal-author">{selected?.name}</p>
        <p>{selected?.description}</p>
        <p className="demo-note">
          Contenido local de ejemplo. Puedes reemplazarlo por artículos,
          entrevistas o documentos reales.
        </p>
        <button className="primary" onClick={() => dialog.current?.close()}>
          VOLVER AL ARTÍCULO
        </button>
      </dialog>
    </>
  );
}
