export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <span className="site-footer__eyebrow">
            America&apos;s Business Review
          </span>

          <p className="site-footer__description">
            Perspectivas sobre estrategia, liderazgo, competitividad y
            transformación empresarial en América Latina.
          </p>
        </div>

        <div className="site-footer__meta">
          <span>
            © {new Date().getFullYear()} America&apos;s Business Review
          </span>

          <span>
            Una iniciativa editorial vinculada a INCAE Business School.
          </span>
        </div>
      </div>
    </footer>
  );
}