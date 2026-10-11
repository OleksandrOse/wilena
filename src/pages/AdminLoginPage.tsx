import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { saveAdminSession } from "../utils/adminAuth";
import { login, changePassword } from "../services/loginService";
import "../styles/AdminPage.scss";
import { errorMessage } from "../utils/errorMessage";

type Mode = "login" | "changePassword";

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!loginValue || !password) {
      setError("Bitte Login und Passwort eingeben.");
      return;
    }

    setLoading(true);
    try {
      const data = await login({ login: loginValue, password });

      if (data.user.role !== "admin") {
        setError("Dieses Konto hat keine Administratorrechte.");
        return;
      }

      saveAdminSession(data.accessToken, data.user);

      navigate("/admin");
    } catch (e) {
      setError(errorMessage(e, "Login fehlgeschlagen."));
    } finally {
      setLoading(false);
    }
  };

  const [cpLogin, setCpLogin] = useState("");
  const [cpOldPassword, setCpOldPassword] = useState("");
  const [cpPassword, setCpPassword] = useState("");
  const [cpPasswordRepeat, setCpPasswordRepeat] = useState("");
  const [cpError, setCpError] = useState<string | null>(null);
  const [cpSuccess, setCpSuccess] = useState<string | null>(null);
  const [cpLoading, setCpLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setCpError(null);
    setCpSuccess(null);

    if (!cpLogin || !cpOldPassword || !cpPassword) {
      setCpError("Bitte alle Felder ausfüllen.");
      return;
    }
    if (cpPassword.length < 6) {
      setCpError("Das neue Passwort muss mindestens 6 Zeichen haben.");
      return;
    }
    if (cpPassword !== cpPasswordRepeat) {
      setCpError("Die neuen Passwörter stimmen nicht überein.");
      return;
    }
    if (cpOldPassword === cpPassword) {
      setCpError("Das neue Passwort muss sich vom aktuellen unterscheiden.");
      return;
    }

    setCpLoading(true);
    try {
      await changePassword({
        login: cpLogin,
        oldPassword: cpOldPassword,
        password: cpPassword,
      });

      setCpSuccess("Passwort wurde erfolgreich geändert. Sie können sich jetzt anmelden.");
      setCpOldPassword("");
      setCpPassword("");
      setCpPasswordRepeat("");
      setTimeout(() => {
        setMode("login");
        setLoginValue(cpLogin);
        setCpSuccess(null);
      }, 1500);
    } catch (e) {
      setCpError(errorMessage(e, "Passwort konnte nicht geändert werden."));
    } finally {
      setCpLoading(false);
    }
  };

  return createPortal(
    <div className="admin-page">
      <div className="admin-login">
        <div className="admin-login__brand">
          <span className="admin-login__brand-mark">W</span>
          <span className="admin-login__brand-name">Wilena Apartments</span>
          <span className="admin-login__brand-sub">Verwaltungsbereich</span>
        </div>

        <div className="admin-login__box">
          <div className="admin-login__tabs">
            <button
              type="button"
              className={`admin-login__tab ${mode === "login" ? "is-active" : ""}`}
              onClick={() => setMode("login")}
            >
              Anmelden
            </button>
            <button
              type="button"
              className={`admin-login__tab ${mode === "changePassword" ? "is-active" : ""}`}
              onClick={() => setMode("changePassword")}
            >
              Passwort ändern
            </button>
          </div>

          {mode === "login" ? (
            <form className="admin-form admin-login__form" onSubmit={handleLogin}>
              <h1 className="admin-form__title">Anmeldung</h1>

              <div className="admin-panel__field">
                <label className="admin-panel__label">Login</label>
                <div className="admin-login__input-group">
                  <span className="admin-login__input-icon">👤</span>
                  <input
                    className="admin-panel__input admin-login__input"
                    type="text"
                    placeholder="Ihr Login"
                    value={loginValue}
                    onChange={(e) => setLoginValue(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>

              <div className="admin-panel__field">
                <label className="admin-panel__label">Passwort</label>
                <div className="admin-login__input-group">
                  <span className="admin-login__input-icon">🔒</span>
                  <input
                    className="admin-panel__input admin-login__input"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && <p className="admin-panel__error">{error}</p>}

              <button className="admin-form__submit" type="submit" disabled={loading}>
                {loading ? "Anmelden…" : "Anmelden"}
              </button>
            </form>
          ) : (
            <form className="admin-form admin-login__form" onSubmit={handleChangePassword}>
              <h1 className="admin-form__title">Passwort ändern</h1>

              <div className="admin-panel__field">
                <label className="admin-panel__label">Login</label>
                <div className="admin-login__input-group">
                  <span className="admin-login__input-icon">👤</span>
                  <input
                    className="admin-panel__input admin-login__input"
                    type="text"
                    placeholder="Ihr Login"
                    value={cpLogin}
                    onChange={(e) => setCpLogin(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>

              <div className="admin-panel__field">
                <label className="admin-panel__label">Aktuelles Passwort</label>
                <div className="admin-login__input-group">
                  <span className="admin-login__input-icon">🔒</span>
                  <input
                    className="admin-panel__input admin-login__input"
                    type="password"
                    placeholder="••••••••"
                    value={cpOldPassword}
                    onChange={(e) => setCpOldPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-panel__field">
                <label className="admin-panel__label">Neues Passwort</label>
                <div className="admin-login__input-group">
                  <span className="admin-login__input-icon">🔑</span>
                  <input
                    className="admin-panel__input admin-login__input"
                    type="password"
                    placeholder="••••••••"
                    value={cpPassword}
                    onChange={(e) => setCpPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-panel__field">
                <label className="admin-panel__label">Neues Passwort wiederholen</label>
                <div className="admin-login__input-group">
                  <span className="admin-login__input-icon">🔑</span>
                  <input
                    className="admin-panel__input admin-login__input"
                    type="password"
                    placeholder="••••••••"
                    value={cpPasswordRepeat}
                    onChange={(e) => setCpPasswordRepeat(e.target.value)}
                  />
                </div>
              </div>

              {cpError && <p className="admin-panel__error">{cpError}</p>}
              {cpSuccess && <p className="admin-panel__success">{cpSuccess}</p>}

              <button className="admin-form__submit" type="submit" disabled={cpLoading}>
                {cpLoading ? "Speichert…" : "Passwort speichern"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AdminLoginPage;
