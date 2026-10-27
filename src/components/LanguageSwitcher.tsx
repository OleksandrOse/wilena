import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../i118';
import './LanguageSwitcher.scss';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'de';

  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={`lang-switch__btn${current === code ? ' is-active' : ''}`}
          aria-pressed={current === code}
          onClick={() => i18n.changeLanguage(code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
