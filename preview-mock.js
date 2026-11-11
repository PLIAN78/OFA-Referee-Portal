/* LOCAL PREVIEW ONLY - never commit (listed in .git/info/exclude).
   Stands in for the supabase-js client so index.html can be exercised with fake data.
   Loaded by demo.html, which swaps the Supabase CDN <script> for this file.
   URL params:  ?as=referee|assignor|admin|inactive|unrated|signedout   &bar=0 hides the toolbar
   Console:     __mock.db (data), __mock.log (every query), __mock.failNext('msg') (next query errors), __mock.reset() */
(function () {
  const params = new URLSearchParams(location.search);
  const STORE = 'ofa-preview-mock-v1';
  const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); });

  const P = (id, name, role, gender, region, foil, epee, sabre, para, extra = {}) => ({
    id, name, email: name.toLowerCase().replace(/[^a-z]+/g, '.') + '@example.test', role, gender, region, phone: '(416) 555-' + String(1000 + id.length * 37 + name.length).slice(-4),
    foil, epee, sabre, para, active: true, meal_restrictions: '', roommate_prefs: [], ...extra });

  function seed() {
    const profiles = [
      P('u-ref', 'Jordan Lee', 'referee', 'Male', 'Central', 'P2', 'R', 'Rc', 'Unrated', { roommate_prefs: ['Sam Patel', 'Daniel Okafor'] }),
      P('u-asg', 'Priya Shah', 'assignor', 'Female', 'East', 'N3', 'P1', 'R', 'B', { meal_restrictions: 'Vegetarian', roommate_prefs: ['Aisha Rahman'] }),
      P('u-adm', 'Morgan Tremblay', 'admin', 'Female', 'Central', 'N1', 'N2', 'P1', 'B'),
      P('u-sam', 'Sam Patel', 'referee', 'Male', 'West', 'R', 'P2', 'R', 'Unrated', { roommate_prefs: ['Jordan Lee'] }),
      P('u-sio', "Siobhan O'Neil", 'referee', 'Female', "Prince Edward County", 'P1', 'R', 'Unrated', 'Unrated', { meal_restrictions: 'Gluten-free, nut allergy', roommate_prefs: ['Aisha Rahman', 'Priya Shah'] }),
      P('u-ais', 'Aisha Rahman', 'referee', 'Female', 'North', 'R', 'R', 'P2', 'B', { meal_restrictions: 'Halal', roommate_prefs: ["Siobhan O'Neil"] }),
      P('u-dan', 'Daniel Okafor', 'referee', 'Male', 'Central', 'Rc', 'Rc', 'Unrated', 'Unrated', { roommate_prefs: ['Jordan Lee'] }),
      P('u-wei', 'Wei Chen', 'referee', 'Male', 'East', 'N4', 'P1', 'P1', 'Unrated'),
      P('u-luc', 'Lucie Gagnon', 'referee', 'Female', 'East', 'Rc', 'Unrated', 'Rc', 'Unrated'),
      P('u-mat', 'Mateo Alvarez', 'referee', 'Male', 'West', 'P2', 'P2', 'R', 'Unrated'),
      P('u-new', 'Taylor Brooks', 'referee', '', '', 'Unrated', 'Unrated', 'Unrated', 'Unrated', { phone: '' }),
      P('u-ina', 'Chris Novak', 'referee', 'Male', 'North', 'R', 'R', 'R', 'Unrated', { active: false }),
      P('u-unr', 'Riley Fraser', 'referee', 'Female', 'Central', 'Unrated', 'Unrated', 'Unrated', 'Unrated'),
    ];
    const events = [
      { id: 'e-cup', name: 'Ontario Cup #2', date_range: 'Nov 28-29, 2026', location: 'Toronto Pan Am Sports Centre', days: ['Sat Nov 28', 'Sun Nov 29'], created_at: '2026-09-01T12:00:00Z' },
      { id: 'e-win', name: "Winter Open (Women's & Men's)", date_range: 'Jan 16-17', location: 'Ottawa, Carleton University', days: ["Sat Jan 16 - Women's events", "Sun Jan 17 - Men's events"], created_at: '2026-10-05T12:00:00Z' },
      { id: 'e-pro', name: 'Provincial Championships', date_range: 'Mar 1-3, 2028', location: 'Hamilton, McMaster', days: ['Wed Mar 1', 'Thu Mar 2', 'Fri Mar 3'], created_at: '2026-10-20T12:00:00Z' },
    ];
    const av = (u, e, day, status) => ({ id: uuid(), user_id: u, event_id: e, day, status });
    const availability = [
      av('u-ref', 'e-cup', 'Sat Nov 28', 'yes'), av('u-ref', 'e-cup', 'Sun Nov 29', 'am'),
      av('u-ref', 'e-cup', 'ACCOM:Night before (Nov 27)', 'yes'), av('u-ref', 'e-cup', 'ACCOM:Sat Nov 28', 'yes'),
      av('u-sam', 'e-cup', 'Sat Nov 28', 'yes'), av('u-sam', 'e-cup', 'Sun Nov 29', 'yes'),
      av('u-sam', 'e-cup', 'ACCOM:Night before (Nov 27)', 'yes'), av('u-sam', 'e-cup', 'ACCOM:Sat Nov 28', 'yes'),
      av('u-sio', 'e-cup', 'Sat Nov 28', 'yes'), av('u-sio', 'e-cup', 'Sun Nov 29', 'yes'), av('u-sio', 'e-cup', 'ACCOM:Sat Nov 28', 'yes'),
      av('u-ais', 'e-cup', 'Sat Nov 28', 'pm'), av('u-ais', 'e-cup', 'Sun Nov 29', 'yes'), av('u-ais', 'e-cup', 'ACCOM:Sat Nov 28', 'yes'),
      av('u-dan', 'e-cup', 'Sat Nov 28', 'yes'), av('u-dan', 'e-cup', 'Sun Nov 29', 'yes'), av('u-dan', 'e-cup', 'ACCOM:Night before (Nov 27)', 'yes'),
      av('u-wei', 'e-cup', 'Sat Nov 28', 'no'), av('u-wei', 'e-cup', 'Sun Nov 29', 'no'),
      av('u-mat', 'e-cup', 'Sat Nov 28', 'yes'), av('u-mat', 'e-cup', 'Sun Nov 29', 'no'),
      av('u-luc', 'e-cup', 'Sat Nov 28', 'yes'), av('u-luc', 'e-cup', 'Sun Nov 29', 'yes'),
      av('u-asg', 'e-cup', 'Sat Nov 28', 'yes'), av('u-asg', 'e-cup', 'Sun Nov 29', 'yes'), av('u-asg', 'e-cup', 'ACCOM:Sat Nov 28', 'yes'),
      av('u-sio', 'e-win', "Sat Jan 16 - Women's events", 'yes'), av('u-sio', 'e-win', "ACCOM:Sat Jan 16 - Women's events", 'yes'),
    ];
    const assignments = [
      { id: uuid(), event_id: 'e-cup', user_id: 'u-sam' }, { id: uuid(), event_id: 'e-cup', user_id: 'u-sio' },
      { id: uuid(), event_id: 'e-cup', user_id: 'u-ais' }, { id: uuid(), event_id: 'e-cup', user_id: 'u-dan' },
      { id: uuid(), event_id: 'e-cup', user_id: 'u-asg' },
    ];
    return { profiles, events, availability, assignments };
  }

  let db;
  try { db = JSON.parse(sessionStorage.getItem(STORE)); } catch (e) {}
  if (!db || params.has('reset')) db = seed();
  const save = () => { try { sessionStorage.setItem(STORE, JSON.stringify(db)); } catch (e) {} };
  save();

  const AS = { referee: 'u-ref', assignor: 'u-asg', admin: 'u-adm', inactive: 'u-ina', unrated: 'u-unr' };
  let sessionUid;
  try { sessionUid = sessionStorage.getItem(STORE + ':uid'); } catch (e) {}
  if (params.has('as')) sessionUid = AS[params.get('as')] || null;
  const setUid = uid => { sessionUid = uid; try { uid ? sessionStorage.setItem(STORE + ':uid', uid) : sessionStorage.removeItem(STORE + ':uid'); } catch (e) {} };
  setUid(sessionUid);

  const log = [];
  let failNext = null;
  const delay = () => new Promise(r => setTimeout(r, 60));
  const err = message => ({ data: null, error: { message } });

  class Query {
    constructor(table) { this.table = table; this.op = 'select'; this.filters = []; this.payload = undefined; this.opts = undefined; this.orderBy = undefined; }
    select() { return this; }
    order(col, o) { this.orderBy = [col, o]; return this; }
    insert(p) { this.op = 'insert'; this.payload = p; return this; }
    upsert(p, o) { this.op = 'upsert'; this.payload = p; this.opts = o; return this; }
    update(p) { this.op = 'update'; this.payload = p; return this; }
    delete() { this.op = 'delete'; return this; }
    eq(c, v) { this.filters.push(['eq', c, v]); return this; }
    match(o) { this.filters.push(['match', o]); return this; }
    in(c, a) { this.filters.push(['in', c, a]); return this; }
    like(c, p) { this.filters.push(['like', c, p]); return this; }
    test(row) {
      return this.filters.every(f => {
        if (f[0] === 'eq') return row[f[1]] === f[2];
        if (f[0] === 'match') return Object.entries(f[1]).every(([k, v]) => row[k] === v);
        if (f[0] === 'in') return f[2].includes(row[f[1]]);
        if (f[0] === 'like') return new RegExp('^' + f[2].replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*').replace(/_/g, '.') + '$').test(String(row[f[1]]));
        return false;
      });
    }
    then(res, rej) { return delay().then(() => this.run()).then(res, rej); }
    run() {
      const entry = { table: this.table, op: this.op, filters: this.filters, payload: this.payload, opts: this.opts, order: this.orderBy };
      log.push(JSON.parse(JSON.stringify(entry)));
      if (failNext) { const m = failNext; failNext = null; return err(m); }
      const rows = db[this.table === 'profiles' ? 'profiles' : this.table];
      if (!rows) return err(`relation "${this.table}" does not exist`);
      let result;
      if (this.op === 'select') {
        result = rows.filter(r => this.test(r)).map(r => JSON.parse(JSON.stringify(r)));
        if (this.orderBy) { const c = this.orderBy[0]; result.sort((a, b) => String(a[c] ?? '').localeCompare(String(b[c] ?? ''))); }
      } else if (this.op === 'insert') {
        const list = [].concat(this.payload);
        for (const p of list) {
          if (this.table === 'assignments' && rows.some(r => r.event_id === p.event_id && r.user_id === p.user_id)) return err('duplicate key value violates unique constraint');
          rows.push({ id: uuid(), created_at: new Date().toISOString(), ...p });
        }
        result = null;
      } else if (this.op === 'upsert') {
        const keys = (this.opts?.onConflict || 'id').split(',');
        for (const p of [].concat(this.payload)) {
          const ex = rows.find(r => keys.every(k => r[k] === p[k]));
          ex ? Object.assign(ex, p) : rows.push({ id: uuid(), ...p });
        }
        result = null;
      } else if (this.op === 'update') {
        rows.filter(r => this.test(r)).forEach(r => Object.assign(r, JSON.parse(JSON.stringify(this.payload))));
        result = null;
      } else if (this.op === 'delete') {
        if (!this.filters.length) return err('DELETE requires a WHERE clause');
        const gone = rows.filter(r => this.test(r));
        db[this.table] = rows.filter(r => !gone.includes(r));
        if (this.table === 'events') gone.forEach(e => { db.availability = db.availability.filter(a => a.event_id !== e.id); db.assignments = db.assignments.filter(a => a.event_id !== e.id); });
        result = null;
      }
      save();
      return { data: result, error: null };
    }
  }

  const listeners = [];
  const session = () => sessionUid ? { user: { id: sessionUid, email: db.profiles.find(p => p.id === sessionUid)?.email } } : null;
  const emit = ev => listeners.forEach(cb => cb(ev, session()));
  const authCall = (name, args) => log.push({ auth: name, args: JSON.parse(JSON.stringify(args ?? null)) });

  const auth = {
    onAuthStateChange(cb) { listeners.push(cb); setTimeout(() => cb('INITIAL_SESSION', session()), 0); return { data: { subscription: { unsubscribe() {} } } }; },
    async signInWithPassword({ email, password }) {
      authCall('signInWithPassword', { email, password: password ? '***' : '' }); await delay();
      if (failNext) { const m = failNext; failNext = null; return err(m); }
      const u = db.profiles.find(p => p.email.toLowerCase() === String(email).toLowerCase());
      if (!u) return err('Invalid login credentials');
      setUid(u.id); emit('SIGNED_IN'); return { data: { session: session() }, error: null };
    },
    async signUp({ email, password, options }) {
      authCall('signUp', { email, password: '***', options }); await delay();
      if (failNext) { const m = failNext; failNext = null; return err(m); }
      if (db.profiles.some(p => p.email === email)) return err('User already registered');
      const d = options?.data || {};
      db.profiles.push({ id: uuid(), email, name: d.name, gender: d.gender, phone: d.phone, region: d.region, role: 'referee', active: true, foil: 'Unrated', epee: 'Unrated', sabre: 'Unrated', para: 'Unrated', meal_restrictions: '', roommate_prefs: [] });
      save(); return { data: { session: null, user: { email } }, error: null };
    },
    async resetPasswordForEmail(email, opts) { authCall('resetPasswordForEmail', { email, opts }); await delay(); return { data: {}, error: null }; },
    async updateUser(p) { authCall('updateUser', { password: p.password ? '***' : undefined }); await delay(); return { data: {}, error: null }; },
    async signOut() { authCall('signOut'); await delay(); setUid(null); emit('SIGNED_OUT'); return { error: null }; },
  };

  window.supabase = { createClient: (url, key) => { log.push({ createClient: url }); return { from: t => new Query(t), auth }; } };
  window.__mock = { emit, get db() { return db; }, log, failNext: m => { failNext = m; }, reset: () => { db = seed(); save(); }, signInAs: k => { setUid(AS[k]); emit('SIGNED_IN'); } };

  if (params.get('bar') !== '0') {
    addEventListener('DOMContentLoaded', () => {
      const bar = document.createElement('div');
      bar.setAttribute('style', 'position:fixed;left:8px;bottom:8px;z-index:9999;background:#1A1A1A;color:#fff;font:12px system-ui;padding:8px 12px;border-radius:12px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;max-width:calc(100vw - 16px)');
      bar.innerHTML = '<b>Preview with fake data</b><span style="opacity:.85">nothing is saved anywhere · view as:</span>' + ['referee', 'assignor', 'admin', 'inactive', 'unrated', 'signedout'].map(r => `<a style="color:#fff;text-decoration:underline" href="?as=${r}">${r}</a>`).join('') + '<a style="color:#fff;text-decoration:underline" href="?as=referee&reset">reset</a>';
      document.body.appendChild(bar);
    });
  }
})();
