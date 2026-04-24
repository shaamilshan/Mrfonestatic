import { useState, useEffect, useRef, ReactNode } from "react";
import "../styles/fonts.css";
import "../styles/mrfone.css";
import LogoImg from "../assets/Logo.png";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const PHONE_RAW = "+919562452000";
const PHONE_DISPLAY = "+91 95624 52000";
const WA_LINK = `https://wa.me/919562452000?text=Hi%20MrFone!%20I'd%20like%20to%20know%20more.`;

// ─────────────────────────────────────────────────────────────────────────────
// Images
// ─────────────────────────────────────────────────────────────────────────────
const IMG = {
  hero: "https://images.unsplash.com/photo-1661934289064-37b6fc541a1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
  store1: "https://images.unsplash.com/photo-1623375505612-7f85294c9e29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  store2: "https://images.unsplash.com/photo-1758467700917-3517eb11ec8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  store3: "https://images.unsplash.com/photo-1695048132783-4b9f77bde5be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  store4: "https://images.unsplash.com/photo-1773291933661-ea3a4a611fab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  c1: "https://images.unsplash.com/photo-1753161022023-aa1731af1bd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  c2: "https://images.unsplash.com/photo-1726690394405-1a65bf4ba50a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  c3: "https://images.unsplash.com/photo-1713256595315-07d280819a8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  c4: "https://images.unsplash.com/photo-1571239982287-9a7a17c1b9c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  c5: "https://images.unsplash.com/photo-1566728595333-75a1d7cae961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  c6: "https://images.unsplash.com/photo-1715635845617-76d6d68c44f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
};

// ─────────────────────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          ob.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [threshold]);
  return { ref, active };
}

// ─────────────────────────────────────────────────────────────────────────────
// Animation Components
// ─────────────────────────────────────────────────────────────────────────────
function RevealUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, active } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal-up${active ? " active" : ""} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function RevealImg({
  src,
  alt,
  className = "",
  imgClassName = "",
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
}) {
  const { ref, active } = useReveal();
  return (
    <div
      ref={ref}
      className={`img-wrapper img-zoom${active ? " active" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img src={src} alt={alt} className={`w-full h-full object-cover ${imgClassName}`} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────────────────────────────────────
function Header({ onNav }: { onNav: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Store", id: "store" },
    { label: "Customers", id: "customers" },
    { label: "Services", id: "services" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled ? "header-scrolled" : "bg-transparent"
        }`}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 32px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => onNav("hero")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                borderRadius: 9,
                padding: 4,
              }}
            >
              <img
                src={LogoImg}
                alt="MrFone logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  background: "transparent",
                  filter: "none",
                }}
              />
            </div>
          </button>

          {/* Desktop Nav */}
          <nav
            style={{ display: "flex", gap: 36, alignItems: "center" }}
            className="hidden md:flex"
          >
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => onNav(l.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "'Inter', sans-serif",
                  color: scrolled ? "#3f3f46" : "rgba(255,255,255,0.75)",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = scrolled ? "#0a0a0a" : "#ffffff")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = scrolled
                    ? "#3f3f46"
                    : "rgba(255,255,255,0.75)")
                }
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div style={{ display: "flex", gap: 12, alignItems: "center" }} className="hidden md:flex">
            <a
              href={`tel:${PHONE_RAW}`}
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.05em",
                fontFamily: "'Inter', sans-serif",
                color: scrolled ? "#3f3f46" : "rgba(255,255,255,0.7)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              {PHONE_DISPLAY}
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: scrolled ? "#0a0a0a" : "#ffffff",
                color: scrolled ? "#ffffff" : "#0a0a0a",
                padding: "8px 18px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: scrolled ? "#0a0a0a" : "#ffffff",
              padding: 4,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 22, height: 22 }}>
              <path strokeLinecap="square" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="mobile-nav">
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              position: "absolute",
              top: 20,
              right: 28,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#ffffff",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
              <path strokeLinecap="square" d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
          {links.map((l, i) => (
            <button
              key={l.id}
              onClick={() => { onNav(l.id); setMobileOpen(false); }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 32,
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              {l.label}
            </button>
          ))}
          <div style={{ marginTop: 16 }}>
            <a
              href={`tel:${PHONE_RAW}`}
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 14,
                fontFamily: "'Inter', sans-serif",
                textDecoration: "none",
              }}
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────────────────────────────────────
function Hero({ onNav }: { onNav: (id: string) => void }) {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#0a0a0a",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src={IMG.hero}
          alt="MrFone Store"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
        />
      </div>

      {/* Gradient overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 60%)",
        }}
      />

      {/* Top-right label */}
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 32,
          textAlign: "right",
        }}
        className="hidden md:block"
      >
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            marginBottom: 4,
          }}
        >
          Koduvally, Kerala
        </p>
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
          }}
        >
          Est. 2021
        </p>
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px 80px",
          width: "100%",
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 32, height: 1, background: "rgba(255,255,255,0.4)" }} />
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
            }}
          >
            Ground Floor, OK Tower · Near Federal Bank
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(36px, 6vw, 76px)",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.035em",
            lineHeight: 1.02,
            maxWidth: 800,
            marginBottom: 24,
          }}
        >
          Koduvally's Trusted
          <br />
          <span style={{ color: "rgba(255,255,255,0.55)" }}>Smartphone Store.</span>
        </h1>

        {/* Sub */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(14px, 1.5vw, 17px)",
            color: "rgba(255,255,255,0.6)",
            maxWidth: 480,
            lineHeight: 1.65,
            marginBottom: 44,
            fontWeight: 400,
          }}
        >
          Premium & budget smartphones with complete transparency.
          Every device verified. Every deal trusted.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={() => onNav("contact")} className="btn-primary" style={{ background: "#ffffff", color: "#0a0a0a", borderColor: "#ffffff" }}>
            <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 14, height: 14 }}>
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Visit Store
          </button>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 64,
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            flexWrap: "wrap",
          }}
        >
          {[
            { n: "500+", l: "Devices Sold" },
            { n: "100%", l: "Genuine" },
            { n: "3+", l: "Years Trusted" },
            { n: "4.9★", l: "Customer Rating" },
          ].map((s) => (
            <div key={s.l}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  marginBottom: 2,
                }}
              >
                {s.n}
              </p>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                }}
              >
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          right: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: 0.4,
        }}
        className="hidden md:flex"
      >
        <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.4)" }} />
        <span
          style={{
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#ffffff",
            fontFamily: "'Inter', sans-serif",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Store Experience Grid
// ─────────────────────────────────────────────────────────────────────────────
function StoreGrid() {
  return (
    <section id="store" style={{ background: "#ffffff", padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* Section header */}
        <RevealUp>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#71717a",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  02 — The Experience
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 800,
                  color: "#0a0a0a",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                Experience MrFone
              </h2>
            </div>
            <p
              className="hidden md:block"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "#71717a",
                maxWidth: 260,
                lineHeight: 1.65,
                textAlign: "right",
              }}
            >
              A curated showroom where every device
              is displayed with care and precision.
            </p>
          </div>
        </RevealUp>

        {/* Image grid — boxy, tight */}
        <div className="store-grid">
          <RevealImg src={IMG.store1} alt="Store interior" className="sg-main" delay={0} />
          <RevealImg src={IMG.store3} alt="Phone display" className="sg-tr" delay={80} />
          <RevealImg src={IMG.store2} alt="Store counter" className="sg-bl" delay={140} />
          <RevealImg src={IMG.store4} alt="Store interior shelves" className="sg-br" delay={200} />
        </div>

        {/* Caption */}
        <RevealUp delay={100}>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #e4e4e7",
              paddingTop: 16,
            }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#a1a1aa",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              Ground Floor, OK Tower — Koduvally
            </span>
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#a1a1aa",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              Open Mon–Sat 9AM–8PM
            </span>
          </div>
        </RevealUp>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Customers Gallery
// ─────────────────────────────────────────────────────────────────────────────
function CustomersGallery() {
  const customers = [
    { img: IMG.c1, name: "Arjun M.", city: "Kozhikode" },
    { img: IMG.c2, name: "Rahul K.", city: "Feroke" },
    { img: IMG.c3, name: "Sneha N.", city: "Koduvally" },
    { img: IMG.c4, name: "Arun P.", city: "Tirur" },
    { img: IMG.c5, name: "Priya & Family", city: "Malappuram" },
    { img: IMG.c6, name: "Asif R.", city: "Wandoor" },
  ];

  return (
    <section
      id="customers"
      style={{ background: "#0a0a0a", padding: "96px 0" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <RevealUp>
          <div style={{ marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#52525b",
                  fontFamily: "'Inter', sans-serif",
                  display: "block",
                  marginBottom: 14,
                }}
              >
                03 — Happy Customers
              </span>
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                Real Customers.
                <br />
                <span style={{ color: "#52525b" }}>Real Trust.</span>
              </h2>
            </div>
          </div>
        </RevealUp>

        {/* Grid */}
        <div className="customers-grid">
          {customers.map((c, i) => (
            <RevealImg
              key={c.name}
              src={c.img}
              alt={c.name}
              imgClassName="aspect-[3/4]"
              delay={i * 60}
            />
          ))}
        </div>

        {/* Bottom label */}
        <RevealUp delay={100}>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #27272a",
              paddingTop: 16,
            }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#52525b",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              500+ Happy Customers and Growing
            </span>
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#52525b",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              Koduvally & Beyond
            </span>
          </div>
        </RevealUp>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Testimonials
// ─────────────────────────────────────────────────────────────────────────────
function Testimonials() {
  const reviews = [
    {
      name: "Arjun Menon",
      loc: "Kozhikode",
      rating: 5,
      text: "Bought an iPhone 15 and the experience was flawless. Completely transparent, no hidden charges. The device was exactly as described.",
      device: "iPhone 15",
    },
    {
      name: "Sneha Nair",
      loc: "Koduvally",
      rating: 5,
      text: "Got the best exchange value for my old phone. The team was honest and patient. Genuinely the most trustworthy phone shop I've visited.",
      device: "Samsung S24",
    },
    {
      name: "Rahul Krishnan",
      loc: "Feroke",
      rating: 5,
      text: "They helped me pick the right phone within my budget without overselling. That kind of service is rare. I'll always come back here.",
      device: "Redmi Note 13 Pro",
    },
    {
      name: "Priya Thomas",
      loc: "Tirur",
      rating: 5,
      text: "The Samsung S24 Ultra came in original packaging with all accessories. Best price in town, zero compromise on quality.",
      device: "Samsung S24 Ultra",
    },
  ];

  return (
    <section style={{ background: "#fafafa", padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <RevealUp>
          <div style={{ marginBottom: 52 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#71717a",
                fontFamily: "'Inter', sans-serif",
                display: "block",
                marginBottom: 14,
              }}
            >
              04 — What They Say
            </span>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 800,
                color: "#0a0a0a",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Customer Voices
            </h2>
          </div>
        </RevealUp>

        <div className="testi-grid">
          {reviews.map((r, i) => (
            <RevealUp key={r.name} delay={i * 80}>
              <div
                className="testi-card"
                style={{
                  background: "#ffffff",
                  height: "100%",
                }}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} viewBox="0 0 16 16" fill={j < r.rating ? "#0a0a0a" : "#e4e4e7"} style={{ width: 14, height: 14 }}>
                      <path d="M8 1.5l1.66 3.36 3.71.54-2.68 2.61.63 3.7L8 9.77l-3.32 1.74.63-3.7-2.68-2.61 3.71-.54L8 1.5z" />
                    </svg>
                  ))}
                </div>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15,
                    color: "#1a1a1a",
                    lineHeight: 1.75,
                    marginBottom: 28,
                    fontWeight: 400,
                  }}
                >
                  "{r.text}"
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#0a0a0a",
                        marginBottom: 2,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {r.name}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: "#a1a1aa",
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {r.loc}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#a1a1aa",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      border: "1px solid #e4e4e7",
                      padding: "4px 10px",
                    }}
                  >
                    {r.device}
                  </span>
                </div>
              </div>
            </RevealUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Why MrFone — Trust Blocks
// ─────────────────────────────────────────────────────────────────────────────
function WhyMrFone() {
  const blocks = [
    {
      n: "01",
      title: "100% Genuine Devices",
      desc: "Every iPhone, Samsung, and budget device is sourced authentically. No grey imports. No refurbished-sold-as-new.",
    },
    {
      n: "02",
      title: "Multi-Point Quality Check",
      desc: "Each pre-owned device passes our internal inspection covering screen, battery, camera, and connectivity.",
    },
    {
      n: "03",
      title: "Best Market Pricing",
      desc: "We benchmarked against every competitor in Koduvally. You'll find the best value for money here, guaranteed.",
    },
    {
      n: "04",
      title: "Exchange Available",
      desc: "Trade in your current phone at a fair price. Transparent valuation, no lowballing.",
    },
    {
      n: "05",
      title: "Transparent Deals",
      desc: "What you see is what you pay. No hidden fees, activation charges, or last-minute surprises.",
    },
    {
      n: "06",
      title: "After-Sale Support",
      desc: "We don't disappear after you pay. Reach us on WhatsApp or visit the store for any post-sale concerns.",
    },
  ];

  return (
    <section id="why" style={{ background: "#ffffff", padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <RevealUp>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 52,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#71717a",
                  fontFamily: "'Inter', sans-serif",
                  display: "block",
                  marginBottom: 14,
                }}
              >
                05 — Our Promise
              </span>
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 800,
                  color: "#0a0a0a",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                Why MrFone
              </h2>
            </div>
          </div>
        </RevealUp>

        <div className="trust-grid">
          {blocks.map((b, i) => (
            <RevealUp key={b.n} delay={i * 60}>
              <div className="trust-block" style={{ background: "#ffffff", height: "100%" }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: "#d4d4d8",
                    fontFamily: "'Inter', sans-serif",
                    display: "block",
                    marginBottom: 20,
                  }}
                >
                  {b.n}
                </span>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#0a0a0a",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.3,
                    marginBottom: 12,
                  }}
                >
                  {b.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#71717a",
                    lineHeight: 1.7,
                  }}
                >
                  {b.desc}
                </p>
              </div>
            </RevealUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Services
// ─────────────────────────────────────────────────────────────────────────────
function Services() {
  const items = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" style={{ width: 28, height: 28 }}>
          <path strokeLinecap="square" strokeLinejoin="miter" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      ),
      title: "Phone Exchange",
      desc: "Bring your old device and trade up. We offer the highest exchange value in Koduvally.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" style={{ width: 28, height: 28 }}>
          <path strokeLinecap="square" strokeLinejoin="miter" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      ),
      title: "Buy & Sell",
      desc: "Purchase or sell any smartphone model. Fair prices on both sides of the transaction.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" style={{ width: 28, height: 28 }}>
          <path strokeLinecap="square" strokeLinejoin="miter" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
        </svg>
      ),
      title: "Accessories",
      desc: "Premium earbuds, chargers, power banks, and more — curated for quality.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" style={{ width: 28, height: 28 }}>
          <path strokeLinecap="square" strokeLinejoin="miter" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: "Cases & Protection",
      desc: "Screen guards, rugged cases, and protective gear for every device we stock.",
    },
  ];

  return (
    <section id="services" style={{ background: "#0a0a0a", padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <RevealUp>
          <div style={{ marginBottom: 52 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#52525b",
                fontFamily: "'Inter', sans-serif",
                display: "block",
                marginBottom: 14,
              }}
            >
              06 — What We Offer
            </span>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Our Services
            </h2>
          </div>
        </RevealUp>

        <div className="services-grid">
          {items.map((s, i) => (
            <RevealUp key={s.title} delay={i * 70}>
              <div
                className="service-block"
                style={{ background: "#111111", height: "100%" }}
              >
                <div
                  className="service-icon"
                  style={{ color: "#71717a", marginBottom: 24 }}
                >
                  {s.icon}
                </div>
                <h3
                  className="service-title"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                    marginBottom: 10,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="service-desc"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#71717a",
                    lineHeight: 1.7,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </RevealUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// About
// ─────────────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ background: "#ffffff", padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div className="about-split">
          {/* Left — image */}
          <RevealImg
            src={IMG.store1}
            alt="MrFone Store"
            className="min-h-[400px] md:min-h-[600px]"
          />

          {/* Right — text */}
          <RevealUp delay={100}>
            <div
              style={{
                background: "#0a0a0a",
                padding: "clamp(40px, 5vw, 72px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minHeight: 400,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#52525b",
                  fontFamily: "'Inter', sans-serif",
                  display: "block",
                  marginBottom: 24,
                }}
              >
                07 — About MrFone
              </span>
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(24px, 3.5vw, 40px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                  marginBottom: 24,
                }}
              >
                Built on Trust.
                <br />
                Driven by
                <br />
                <span style={{ color: "#52525b" }}>Transparency.</span>
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "#71717a",
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                MrFone is Koduvally's most trusted smartphone destination. We opened our doors with one mission: make premium smartphones accessible to every budget, without compromising on honesty or quality.
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "#71717a",
                  lineHeight: 1.8,
                  marginBottom: 40,
                }}
              >
                Whether you're a first-time smartphone buyer or upgrading to the latest flagship, our team provides expert guidance, transparent pricing, and genuine devices — every time.
              </p>

              <div className="about-stats">
                {[
                  { n: "500+", l: "Devices Sold" },
                  { n: "3+", l: "Years Running" },
                  { n: "100%", l: "Genuine Stock" },
                  { n: "4.9★", l: "Avg. Rating" },
                ].map((s) => (
                  <div
                    key={s.l}
                    style={{
                      padding: "24px 20px",
                      background: "#0d0d0d",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 24,
                        fontWeight: 800,
                        color: "#ffffff",
                        letterSpacing: "-0.03em",
                        marginBottom: 4,
                      }}
                    >
                      {s.n}
                    </p>
                    <p
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#52525b",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>

              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ alignSelf: "flex-start" }}>
                Connect With Us
              </a>
            </div>
          </RevealUp>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact
// ─────────────────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={{ background: "#0a0a0a", padding: "96px 0 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <RevealUp>
          <div style={{ marginBottom: 56 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#52525b",
                fontFamily: "'Inter', sans-serif",
                display: "block",
                marginBottom: 14,
              }}
            >
              08 — Find Us
            </span>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Visit Our Store
            </h2>
          </div>
        </RevealUp>

        <div className="contact-split">
          {/* Left — Info */}
          <RevealUp>
            <div
              style={{
                background: "#111111",
                border: "1px solid #1a1a1a",
                padding: "48px",
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {[
                {
                  label: "Address",
                  value: "Ground Floor, OK Tower\nNear Federal Bank, Koduvally\nKerala, India",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" style={{ width: 18, height: 18 }}>
                      <path strokeLinecap="square" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="square" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  ),
                },
                {
                  label: "Phone",
                  value: PHONE_DISPLAY,
                  href: `tel:${PHONE_RAW}`,
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" style={{ width: 18, height: 18 }}>
                      <path strokeLinecap="square" d="M2.25 6.338c0 5.5 3.14 10.284 7.71 12.663a1.5 1.5 0 001.552-.065l1.45-.919a1.5 1.5 0 00.537-1.9l-1.02-2.04a1.5 1.5 0 00-1.836-.72l-.548.183a12.001 12.001 0 01-4.46-4.46l.183-.548a1.5 1.5 0 00-.72-1.836l-2.04-1.02a1.5 1.5 0 00-1.9.537l-.919 1.45a1.5 1.5 0 00-.065 1.552c.09.182.186.36.287.535" />
                    </svg>
                  ),
                },
                {
                  label: "WhatsApp",
                  value: PHONE_DISPLAY,
                  href: WA_LINK,
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  ),
                },
                {
                  label: "Hours",
                  value: "Monday – Saturday\n9:00 AM – 8:00 PM",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" style={{ width: 18, height: 18 }}>
                      <path strokeLinecap="square" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    gap: 20,
                    padding: "24px 0",
                    borderBottom: i < 3 ? "1px solid #1a1a1a" : "none",
                  }}
                >
                  <div style={{ color: "#52525b", marginTop: 2, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <p
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#52525b",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        marginBottom: 6,
                      }}
                    >
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("https") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 14,
                          color: "#e4e4e7",
                          fontWeight: 500,
                          textDecoration: "none",
                          whiteSpace: "pre-line",
                          lineHeight: 1.6,
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 14,
                          color: "#e4e4e7",
                          fontWeight: 500,
                          whiteSpace: "pre-line",
                          lineHeight: 1.6,
                        }}
                      >
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: "#ffffff", color: "#0a0a0a", borderColor: "#ffffff" }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14, color: "#16a34a" }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
                <a href={`tel:${PHONE_RAW}`} className="btn-outline">
                  <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 14, height: 14 }}>
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call Now
                </a>
              </div>
            </div>
          </RevealUp>

          {/* Right — Map */}
          <RevealUp delay={120}>
            <div
              style={{
                position: "relative",
                background: "#111111",
                border: "1px solid #1a1a1a",
                minHeight: 500,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Decorative map */}
              <div
                style={{
                  flex: 1,
                  position: "relative",
                  background: "#0d0d0d",
                  overflow: "hidden",
                }}
              >
                {/* Grid lines simulating map */}
                <svg
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08 }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
                {/* Simulated roads */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="45%" x2="100%" y2="45%" stroke="#2a2a2a" strokeWidth="10" />
                  <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#222" strokeWidth="4" />
                  <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#222" strokeWidth="4" />
                  <line x1="65%" y1="0" x2="65%" y2="100%" stroke="#2a2a2a" strokeWidth="8" />
                  <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#1a1a1a" strokeWidth="3" />
                  {/* Road labels */}
                  <text x="2%" y="43%" fill="#3a3a3a" fontSize="9" fontFamily="Inter, sans-serif" letterSpacing="1">KODUVALLY MAIN ROAD</text>
                  <text x="67%" y="30%" fill="#3a3a3a" fontSize="9" fontFamily="Inter, sans-serif" letterSpacing="1" writingMode="vertical-rl">FEDERAL BANK ROAD</text>
                </svg>
                {/* Pin */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "55%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      background: "#ffffff",
                      padding: "10px 16px",
                      marginBottom: 6,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#0a0a0a",
                        letterSpacing: "-0.02em",
                        marginBottom: 2,
                      }}
                    >
                      MrFone
                    </p>
                    <p
                      style={{
                        fontSize: 9,
                        color: "#71717a",
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "0.05em",
                      }}
                    >
                      OK Tower, Koduvally
                    </p>
                  </div>
                  <div
                    style={{
                      width: 2,
                      height: 24,
                      background: "#ffffff",
                    }}
                  />
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      background: "#ffffff",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>

              {/* Bottom CTA */}
              <div style={{ padding: "24px 32px", background: "#111111", borderTop: "1px solid #1a1a1a" }}>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#71717a",
                    marginBottom: 14,
                  }}
                >
                  Ground Floor, OK Tower · Near Federal Bank · Koduvally
                </p>
                <a
                  href="https://maps.google.com/?q=OK+Tower+Koduvally+Kerala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ fontSize: 11 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 14, height: 14 }}>
                    <path strokeLinecap="square" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="square" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  Open in Google Maps
                </a>
              </div>
            </div>
          </RevealUp>
        </div>
      </div>

      {/* Footer strip */}
      <div
        style={{
          marginTop: 64,
          borderTop: "1px solid #1a1a1a",
          padding: "28px 32px",
          maxWidth: 1280,
          margin: "64px auto 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 26,
              height: 26,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                fontFamily: "'Inter', sans-serif",
                color: "#0a0a0a",
              }}
            >
              MF
            </span>
          </div>
          <div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                color: "#ffffff",
                letterSpacing: "-0.01em",
              }}
            >
              MrFone
            </span>
            <span
              style={{
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#52525b",
                fontFamily: "'Inter', sans-serif",
                marginLeft: 8,
              }}
            >
              Think Digital
            </span>
          </div>
        </div>
        <p
          style={{
            fontSize: 11,
            color: "#3f3f46",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          © {new Date().getFullYear()} MrFone · Koduvally, Kerala
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Store", "Services", "About", "Contact"].map((l) => (
            <button
              key={l}
              style={{
                background: "none",
                border: "none",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#52525b",
                fontFamily: "'Inter', sans-serif",
                cursor: "pointer",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onClick={() => {
                document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ffffff")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#52525b")}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Floating WhatsApp
// ─────────────────────────────────────────────────────────────────────────────
function FloatingWA() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#0a0a0a",
        color: "#ffffff",
        padding: hovered ? "12px 20px 12px 16px" : "12px 16px",
        border: "1px solid #27272a",
        textDecoration: "none",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.6)" : "0 4px 16px rgba(0,0,0,0.4)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        overflow: "hidden",
      }}
    >
      <svg viewBox="0 0 24 24" fill="#25D366" style={{ width: 20, height: 20, flexShrink: 0 }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontFamily: "'Inter', sans-serif",
          maxWidth: hovered ? 100 : 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
          transition: "max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          opacity: hovered ? 1 : 0,
        }}
      >
        Chat Now
      </span>
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root App
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#ffffff", overflowX: "hidden" }}>
      <Header onNav={scrollTo} />
      <Hero onNav={scrollTo} />
      <StoreGrid />
      <CustomersGallery />
      <Testimonials />
      <WhyMrFone />
      <Services />
      <About />
      <Contact />
      <FloatingWA />
    </div>
  );
}
