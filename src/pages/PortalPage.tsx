import { useEffect, useLayoutEffect, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Briefcase, CheckCircle, LockKeyhole, LogOut, ShieldCheck, UserPlus } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { portalApi, PortalApiError, type PortalIdentity, type PortalMember } from '../services/portalApi';
import './PortalPage.css';

const copy = {
  EN: {
    home: 'Back to website', portal: 'Employee Portal', employee: 'Employee sign-in', owner: 'Owner sign-in',
    signInText: 'Enter the email address registered with Nova Sitara. You’ll receive a one-time sign-in link if your access is active.',
    ownerSignInText: 'Use your authorized owner email address to manage employee accounts.',
    email: 'Email address', send: 'Send sign-in link', sending: 'Sending…',
    inbox: 'If this email has active portal access, a sign-in link will arrive shortly. Check your spam folder if you don’t see it.',
    privateAccess: 'No shared passwords. Use only the link sent to your own email address.',
    loading: 'Checking your session…', retry: 'Try again',
    unavailable: 'The portal is unavailable right now. Please try again later or contact Nova Sitara.',
    settingUp: 'Nova Sitara sign-in is being set up. Individual accounts are not active yet.',
    throttled: 'Too many requests. Please wait a few minutes before trying again.',
    invalidInput: 'Please check the information you entered and try again.',
    invalidLink: 'This link is missing, expired or already used. Request a new sign-in link below.',
    activate: 'Complete your sign-in', activateText: 'Continue only if you requested this sign-in link from Nova Sitara.',
    continue: 'Continue to portal', opening: 'Signing in…', backToLogin: 'Return to sign-in',
    expired: 'Your session ended. Please sign in again.',
    welcome: 'Welcome,', employeeArea: 'Employee account', employeeActive: 'Your individual Nova Sitara account is active.',
    permission: 'This account does not have owner access.', goEmployee: 'Go to employee account',
    goOwner: 'Owner workspace', signOut: 'Sign out', signingOut: 'Signing out…', signedInAs: 'Signed in as',
    allMembers: 'Employee access', membersText: 'Register the employee’s verified email address. They can then request their own sign-in link from this website.',
    name: 'Full name', add: 'Register employee', adding: 'Registering…',
    registered: 'Account saved. The employee can now request a sign-in link at Employee Login if their access is active. No email was sent.',
    none: 'No accounts to display.', listLoading: 'Loading accounts…', registeredAccounts: 'Registered accounts',
    active: 'Active', inactive: 'Inactive', ownerRole: 'Owner', employeeRole: 'Employee',
    disable: 'Revoke access', enable: 'Restore access', updating: 'Saving…',
    confirmDisable: 'Revoke portal access for this employee? They will be signed out.',
    accessRestored: 'Employee access restored.', accessRevoked: 'Employee access revoked.',
  },
  DE: {
    home: 'Zurück zur Website', portal: 'Mitarbeiterportal', employee: 'Mitarbeiter-Anmeldung', owner: 'Inhaber-Anmeldung',
    signInText: 'Geben Sie Ihre bei Nova Sitara registrierte E-Mail-Adresse ein. Wenn Ihr Zugang aktiv ist, erhalten Sie einen einmalig nutzbaren Anmeldelink.',
    ownerSignInText: 'Verwenden Sie Ihre freigeschaltete Inhaber-E-Mail-Adresse, um Mitarbeiterkonten zu verwalten.',
    email: 'E-Mail-Adresse', send: 'Anmeldelink anfordern', sending: 'Wird gesendet…',
    inbox: 'Wenn diese E-Mail-Adresse für das Portal freigeschaltet ist, erhalten Sie in Kürze einen Anmeldelink. Prüfen Sie auch Ihren Spam-Ordner.',
    privateAccess: 'Keine gemeinsamen Passwörter. Verwenden Sie nur den Link, der an Ihre eigene E-Mail-Adresse gesendet wurde.',
    loading: 'Ihre Sitzung wird geprüft…', retry: 'Erneut versuchen',
    unavailable: 'Das Portal ist derzeit nicht verfügbar. Versuchen Sie es später erneut oder wenden Sie sich an Nova Sitara.',
    settingUp: 'Die Anmeldung bei Nova Sitara wird eingerichtet. Persönliche Konten sind noch nicht aktiv.',
    throttled: 'Zu viele Anfragen. Bitte warten Sie einige Minuten und versuchen Sie es erneut.',
    invalidInput: 'Bitte prüfen Sie Ihre Eingaben und versuchen Sie es erneut.',
    invalidLink: 'Dieser Link fehlt, ist abgelaufen oder wurde bereits verwendet. Fordern Sie einen neuen Anmeldelink an.',
    activate: 'Anmeldung abschließen', activateText: 'Fahren Sie nur fort, wenn Sie diesen Anmeldelink bei Nova Sitara angefordert haben.',
    continue: 'Weiter zum Portal', opening: 'Anmeldung läuft…', backToLogin: 'Zurück zur Anmeldung',
    expired: 'Ihre Sitzung wurde beendet. Melden Sie sich bitte erneut an.',
    welcome: 'Willkommen,', employeeArea: 'Mitarbeiterkonto', employeeActive: 'Ihr persönliches Nova Sitara-Konto ist aktiv.',
    permission: 'Dieses Konto verfügt über keinen Inhaberzugang.', goEmployee: 'Zum Mitarbeiterkonto',
    goOwner: 'Inhaberbereich', signOut: 'Abmelden', signingOut: 'Abmeldung läuft…', signedInAs: 'Angemeldet als',
    allMembers: 'Mitarbeiterzugänge', membersText: 'Registrieren Sie die bestätigte E-Mail-Adresse des Mitarbeiters. Danach kann die Person auf dieser Website einen eigenen Anmeldelink anfordern.',
    name: 'Vollständiger Name', add: 'Mitarbeiter registrieren', adding: 'Wird registriert…',
    registered: 'Das Konto wurde gespeichert. Wenn der Zugang aktiv ist, kann die Person einen Anmeldelink anfordern. Es wurde keine E-Mail verschickt.',
    none: 'Keine Konten vorhanden.', listLoading: 'Konten werden geladen…', registeredAccounts: 'Registrierte Konten',
    active: 'Aktiv', inactive: 'Inaktiv', ownerRole: 'Inhaber', employeeRole: 'Mitarbeiter',
    disable: 'Zugang entziehen', enable: 'Zugang reaktivieren', updating: 'Wird gespeichert…',
    confirmDisable: 'Zugang für diese Person entziehen? Sie wird dadurch abgemeldet.',
    accessRestored: 'Mitarbeiterzugang reaktiviert.', accessRevoked: 'Mitarbeiterzugang entzogen.',
  },
};

type Copy = (typeof copy)[keyof typeof copy];
type Mode = 'employee' | 'owner' | 'activate';
type Session = PortalIdentity | 'loading' | 'unavailable' | null;
type ErrorKey = 'unavailable' | 'throttled' | 'invalidInput' | 'expired' | 'invalidLink';

function errorKey(error: unknown, invalid: ErrorKey = 'invalidInput'): ErrorKey {
  if (error instanceof PortalApiError) {
    if (error.status === 429) return 'throttled';
    if ([400, 401, 403, 409, 422].includes(error.status)) return invalid;
  }
  return 'unavailable';
}

function Feedback({ children, error = false }: { children: ReactNode; error?: boolean }) {
  return <p className={`ns-portal-feedback${error ? ' ns-portal-feedback--error' : ''}`} role={error ? 'alert' : 'status'}>{children}</p>;
}

function Card({ title, intro, children, owner = false }: { title: string; intro?: string; children: ReactNode; owner?: boolean }) {
  return <section className="ns-portal-card" aria-labelledby="ns-portal-title">
    <span className="ns-portal-icon" aria-hidden="true">{owner ? <ShieldCheck size={24} /> : <LockKeyhole size={24} />}</span>
    <h1 id="ns-portal-title">{title}</h1>
    {intro && <p className="ns-portal-intro">{intro}</p>}
    {children}
  </section>;
}

function LoginForm({ owner, labels, expired }: { owner: boolean; labels: Copy; expired: boolean }) {
  const [email, setEmail] = useState('');
  const [pending, setPending] = useState(false);
  const [requested, setRequested] = useState(false);
  const [error, setError] = useState<ErrorKey | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setRequested(false);
    setError(null);
    try {
      await portalApi.requestLink(email.trim());
      setRequested(true);
    } catch (e) {
      setError(errorKey(e));
    } finally {
      setPending(false);
    }
  }
  return <Card owner={owner} title={owner ? labels.owner : labels.employee} intro={owner ? labels.ownerSignInText : labels.signInText}>
    {expired && !requested && !error && <Feedback error>{labels.expired}</Feedback>}
    <form className="ns-portal-form" onSubmit={submit} aria-busy={pending}>
      <label htmlFor="ns-portal-email">{labels.email}</label>
      <input id="ns-portal-email" name="email" type="email" autoComplete="email" autoCapitalize="none" maxLength={200}
        required value={email} onChange={(event) => { setEmail(event.target.value); setRequested(false); setError(null); }} />
      <button type="submit" className="ns-portal-primary" disabled={pending}>
        {pending ? labels.sending : labels.send}<ArrowRight size={17} aria-hidden="true" />
      </button>
    </form>
    {error && <Feedback error>{labels[error]}</Feedback>}
    {requested && <Feedback>{labels.inbox}</Feedback>}
    <p className="ns-portal-note">{labels.privateAccess}</p>
  </Card>;
}

function Activate({ labels }: { labels: Copy }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(() => {
    const value = new URLSearchParams(location.hash.slice(1)).get('token');
    return value && /^[A-Za-z0-9_-]{43}$/.test(value) ? value : null;
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<ErrorKey | null>(null);

  useLayoutEffect(() => {
    // Retain the one-time token only in this component's memory. Never send the fragment to a server GET.
    if (window.location.hash || window.location.search) window.history.replaceState(window.history.state, '', location.pathname);
  }, [location.pathname]);

  async function redeem() {
    if (!token || pending) return;
    setPending(true);
    setError(null);
    try {
      const identity = await portalApi.redeem(token);
      setToken(null);
      navigate(identity.role === 'owner' ? '/portal/owner' : '/portal', { replace: true });
    } catch (e) {
      const key = errorKey(e, 'invalidLink');
      if (key === 'invalidLink') setToken(null);
      setError(key);
    } finally {
      setPending(false);
    }
  }

  return <Card title={labels.activate} intro={token ? labels.activateText : undefined}>
    {token && <button type="button" className="ns-portal-primary" onClick={() => void redeem()} disabled={pending}>
      {pending ? labels.opening : labels.continue}<ArrowRight size={17} aria-hidden="true" />
    </button>}
    {(error || !token) && <Feedback error>{labels[error ?? 'invalidLink']}</Feedback>}
    <Link className="ns-portal-text-link" to="/portal" replace>{labels.backToLogin}</Link>
  </Card>;
}

function OwnerPanel({ labels, onSessionEnded }: { labels: Copy; onSessionEnded: () => void }) {
  const [members, setMembers] = useState<PortalMember[] | null>(null);
  const [error, setError] = useState<ErrorKey | null>(null);
  const [notice, setNotice] = useState<'registered' | 'accessRestored' | 'accessRevoked' | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [listFailed, setListFailed] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const abort = new AbortController();
    portalApi.members(abort.signal).then((list) => {
      if (!abort.signal.aborted) setMembers(list);
    }).catch((e) => {
      if (abort.signal.aborted) return;
      if (e instanceof PortalApiError && (e.status === 401 || e.status === 403)) onSessionEnded();
      else { setError(errorKey(e)); setListFailed(true); }
    });
    return () => abort.abort();
  }, [attempt, onSessionEnded]);

  async function mutate(id: string, operation: () => Promise<PortalMember>, success: NonNullable<typeof notice>) {
    if (busy) return;
    setBusy(id);
    setError(null);
    setNotice(null);
    try {
      const member = await operation();
      setMembers((list) => [member, ...(list ?? []).filter((entry) => entry.id !== member.id)]);
      setNotice(success);
      if (id === 'new') { setName(''); setEmail(''); }
    } catch (e) {
      if (e instanceof PortalApiError && (e.status === 401 || e.status === 403)) onSessionEnded();
      else setError(errorKey(e));
    } finally {
      setBusy(null);
    }
  }

  function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) { setError('invalidInput'); return; }
    void mutate('new', () => portalApi.addMember(email.trim(), name.trim()), 'registered');
  }

  function toggle(member: PortalMember) {
    if (member.active && !window.confirm(labels.confirmDisable)) return;
    void mutate(member.id, () => portalApi.setMemberActive(member.id, !member.active), member.active ? 'accessRevoked' : 'accessRestored');
  }

  return <div className="ns-portal-owner-grid">
    <section className="ns-portal-owner-card" aria-labelledby="ns-portal-add">
      <h2 id="ns-portal-add"><UserPlus size={22} aria-hidden="true" />{labels.add}</h2>
      <p>{labels.membersText}</p>
      <form className="ns-portal-form" onSubmit={register} aria-busy={busy === 'new'}>
        <label htmlFor="ns-portal-name">{labels.name}</label>
        <input id="ns-portal-name" name="name" autoComplete="off" type="text" maxLength={120} required value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="ns-portal-member-email">{labels.email}</label>
        <input id="ns-portal-member-email" name="email" autoComplete="off" autoCapitalize="none" type="email" maxLength={200} required value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="ns-portal-primary" disabled={busy !== null || !members} type="submit">{busy === 'new' ? labels.adding : labels.add}</button>
      </form>
      {error && !listFailed && <Feedback error>{labels[error]}</Feedback>}
      {notice && <Feedback>{labels[notice]}</Feedback>}
    </section>
    <section className="ns-portal-owner-card" aria-labelledby="ns-portal-members">
      <h2 id="ns-portal-members">{labels.registeredAccounts}</h2>
      {listFailed ? <>
        <Feedback error>{labels[error ?? 'unavailable']}</Feedback>
        <button className="ns-portal-secondary" type="button" onClick={() => { setListFailed(false); setError(null); setAttempt((value) => value + 1); }}>{labels.retry}</button>
      </> : !members ? <p role="status">{labels.listLoading}</p> : !members.length ? <p>{labels.none}</p> : (
        <ul className="ns-portal-members">
          {members.map((member) => <li key={member.id}>
            <div className="ns-portal-member-info">
              <strong>{member.name}</strong><span>{member.email}</span>
              <span className="ns-portal-member-meta">
                {member.role === 'owner' ? labels.ownerRole : labels.employeeRole} <span aria-hidden="true">·</span> {member.active ? labels.active : labels.inactive}
              </span>
            </div>
            {member.role === 'employee' && <button className="ns-portal-secondary" type="button" disabled={busy !== null}
              onClick={() => toggle(member)} aria-label={`${member.active ? labels.disable : labels.enable}: ${member.name}`}>
              {busy === member.id ? labels.updating : member.active ? labels.disable : labels.enable}
            </button>}
          </li>)}
        </ul>
      )}
    </section>
  </div>;
}

function SignIn({ labels, owner }: { labels: Copy; owner: boolean }) {
  const [session, setSession] = useState<Session>('loading');
  const [attempt, setAttempt] = useState(0);
  const [expired, setExpired] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [signoutFailed, setSignoutFailed] = useState(false);
  const [sessionEnded] = useState(() => () => { setSession(null); setExpired(true); });

  useEffect(() => {
    const abort = new AbortController();
    portalApi.me(abort.signal).then((identity) => {
      if (!abort.signal.aborted) setSession(identity);
    }).catch((e) => {
      if (!abort.signal.aborted) setSession(e instanceof PortalApiError && e.status === 401 ? null : 'unavailable');
    });
    return () => abort.abort();
  }, [attempt]);

  async function signOut() {
    if (signingOut) return;
    setSigningOut(true);
    setSignoutFailed(false);
    try {
      await portalApi.logout();
      setSession(null);
      setExpired(false);
    } catch {
      setSignoutFailed(true);
    } finally {
      setSigningOut(false);
    }
  }

  if (session === 'loading') return <Card title={owner ? labels.owner : labels.employee} owner={owner}><p role="status">{labels.loading}</p></Card>;
  if (session === 'unavailable') return <Card title={owner ? labels.owner : labels.employee} owner={owner}>
    <Feedback>{labels.settingUp}</Feedback>
    <button type="button" className="ns-portal-secondary" onClick={() => { setSession('loading'); setAttempt((value) => value + 1); }}>{labels.retry}</button>
  </Card>;
  if (!session) return <LoginForm labels={labels} owner={owner} expired={expired} />;

  const signout = <>
    <button type="button" className="ns-portal-secondary" onClick={() => void signOut()} disabled={signingOut}>
      <LogOut size={17} aria-hidden="true" />{signingOut ? labels.signingOut : labels.signOut}
    </button>
    {signoutFailed && <Feedback error>{labels.unavailable}</Feedback>}
  </>;

  if (owner && session.role === 'owner') return <>
    <header className="ns-portal-owner-heading">
      <div><p className="ns-portal-eyebrow">{labels.goOwner}</p><h1>{labels.allMembers}</h1><p>{labels.signedInAs} {session.email}</p></div>
      <div>{signout}</div>
    </header>
    <OwnerPanel labels={labels} onSessionEnded={sessionEnded} />
  </>;

  if (owner) return <Card title={labels.owner} intro={labels.permission} owner>
    <Link className="ns-portal-text-link" to="/portal">{labels.goEmployee}</Link>
    {signout}
  </Card>;

  return <Card title={`${labels.welcome} ${session.name}`} intro={labels.employeeActive}>
    <span className="ns-portal-account"><CheckCircle size={17} aria-hidden="true" />{labels.signedInAs}: {session.email}</span>
    {session.role === 'owner' && <Link className="ns-portal-text-link" to="/portal/owner">{labels.goOwner}</Link>}
    {signout}
  </Card>;
}

export function PortalPage({ mode }: { mode: Mode }) {
  const { language, setLanguage } = useLanguage();
  const labels = copy[language];

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${labels.portal} | Nova Sitara`;
    return () => { document.title = previousTitle; };
  }, [labels.portal]);

  return <div className="ns-portal">
    <header className="ns-portal-topbar">
      <Link to="/" className="ns-portal-brand"><span aria-hidden="true">NS</span>Nova Sitara</Link>
      <nav aria-label={language === 'DE' ? 'Sprache' : 'Language'} className="ns-portal-languages">
        <button type="button" aria-label="English" lang="en" aria-pressed={language === 'EN'} onClick={() => setLanguage('EN')}>EN</button>
        <button type="button" aria-label="Deutsch" lang="de" aria-pressed={language === 'DE'} onClick={() => setLanguage('DE')}>DE</button>
      </nav>
    </header>
    <main className={`ns-portal-content${mode === 'owner' ? ' ns-portal-content--wide' : ''}`}>
      <div className="ns-portal-toprow">
        <Link to="/" className="ns-portal-text-link"><ArrowLeft size={16} aria-hidden="true" />{labels.home}</Link>
        <span><Briefcase size={16} aria-hidden="true" />{labels.portal}</span>
      </div>
      {mode === 'activate' ? <Activate labels={labels} /> : <SignIn key={mode} owner={mode === 'owner'} labels={labels} />}
    </main>
  </div>;
}
