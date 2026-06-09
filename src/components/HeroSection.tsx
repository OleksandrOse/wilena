import React from "react";
import "./HeroSection.scss";

type HeroSectionProps = {
  title: string;
  subtitle?: string;
  ctaPrimary: {
    label: string;
    href: string;
  };
  ctaSecondary?: {
    label: string;
    href: string;
  };
  backgroundImageUrl?: string;
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  backgroundImageUrl,
}) => {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: backgroundImageUrl
          ? `url(${backgroundImageUrl})`
          : undefined,
      }}
    >
      <div className="hero__overlay">
        <div className="hero__content">
          <h1 className="hero__title">{title}</h1>
          {subtitle && <p className="hero__subtitle">{subtitle}</p>}

          <div className="hero__buttons">
            <a className="hero__btn hero__btn--primary" href={ctaPrimary.href}>
              {ctaPrimary.label}
            </a>

            {ctaSecondary && (
              <a
                className="hero__btn hero__btn--secondary"
                href={ctaSecondary.href}
              >
                {ctaSecondary.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
