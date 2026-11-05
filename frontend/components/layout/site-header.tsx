type MenuPage = {
  id: number;
  title: string;
  slug: string;
  showInMenu: boolean;
};

export async function SiteHeader() {
  const apiUrl = process.env.STRAPI_INTERNAL_URL;

  if (!apiUrl) {
    throw new Error("STRAPI_INTERNAL_URL no está configurado.");
  }

  const query =
    `filters[showInMenu][$eq]=true` +
    `&sort=createdAt:asc`;

  const response = await fetch(
    `${apiUrl}/api/pages?${query}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.error(
      "SiteHeader status:",
      response.status
    );

    return (
      <header className="site-header">
        <div className="site-header__inner">
          <a href="/" className="site-header__brand">
            <img
              src="/abr-logo.png"
              alt="America's Business Review"
              className="site-header__logo"
            />
          </a>
        </div>
      </header>
    );
  }

  const result = await response.json();

  const pages: MenuPage[] =
    result.data ?? [];

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a
          href="/"
          className="site-header__brand"
          aria-label="America's Business Review"
        >
          <img
            src="/abr-logo.png"
            alt="America's Business Review"
            className="site-header__logo"
          />
        </a>

        <nav
          className="site-header__nav"
          aria-label="Navegación principal"
        >
          {pages.map((page) => (
            <a
              key={page.id}
              href={`/${page.slug}`}
              className="site-header__nav-link"
            >
              {page.title}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}