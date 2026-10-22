// Dani's Costure admin panel - generic CRUD screens built from /api/modules
(function () {
  'use strict';

  var TOKEN_KEY = 'dc_admin_token';
  var memoryToken = null;
  var state = { modules: [], current: null, rows: [], editingId: null };
  var DCAdmin = window.DCAdmin = { config: {} };
  DCAdmin.register = function (slug, cfg) { DCAdmin.config[slug] = cfg; };

  function el(id) { return document.getElementById(id); }
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function getToken() { try { return localStorage.getItem(TOKEN_KEY) || memoryToken; } catch (e) { return memoryToken; } }
  function setToken(t) {
    memoryToken = t;
    try { if (t) localStorage.setItem(TOKEN_KEY, t); else localStorage.removeItem(TOKEN_KEY); } catch (e) { /* storage blocked */ }
  }
  function toast(message, bad) {
    var t = el('toast');
    t.textContent = message;
    t.className = 'toast show' + (bad ? ' bad' : '');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(function () { t.className = 'toast'; }, 2800);
  }
  function debounce(fn, ms) {
    var timer;
    return function () { clearTimeout(timer); timer = setTimeout(fn, ms); };
  }

  function api(path, options) {
    options = options || {};
    var headers = { 'Content-Type': 'application/json' };
    var token = getToken();
    if (token) headers.Authorization = 'Bearer ' + token;
    return fetch('/api' + path, {
      method: options.method || 'GET',
      headers: headers,
      body: options.body ? JSON.stringify(options.body) : undefined
    }).then(function (res) {
      if (res.status === 401 && path !== '/auth/login') { logout(); throw new Error('Session expired, please log in again'); }
      if (res.status === 204) return {};
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok) throw new Error(data.error || 'Request failed');
        return data;
      });
    });
  }

  function lookup(slug) {
    var meta = state.modules.filter(function (m) { return m.slug === slug; })[0];
    return { meta: meta, cfg: DCAdmin.config[slug] || {} };
  }
  function labelOf(cfg, key) { return (cfg.labels && cfg.labels[key]) || key; }
  function loadScript(src) {
    return new Promise(function (resolve) {
      var s = document.createElement('script');
      s.src = src; s.onload = resolve; s.onerror = resolve;
      document.body.appendChild(s);
    });
  }
  function loadCss(href) {
    var l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = href;
    document.head.appendChild(l);
  }

  function showLogin() { el('loginView').hidden = false; el('appView').hidden = true; }
  function logout() { setToken(null); showLogin(); }

  function boot() {
    el('loginView').hidden = true;
    el('appView').hidden = false;
    api('/modules').then(function (mods) {
      state.modules = mods;
      return Promise.all(mods.map(function (m) {
        loadCss('css/modules/' + m.slug + '.css');
        return loadScript('js/modules/' + m.slug + '.js');
      }));
    }).then(function () {
      buildNav();
      showDashboard();
    }).catch(function (err) { toast(err.message, true); });
  }

  function buildNav() {
    el('moduleNav').innerHTML = '<a href="#" data-slug="" class="active"><i style="background:#c9a227"></i>Dashboard</a>' +
      state.modules.map(function (m) {
        var cfg = DCAdmin.config[m.slug] || {};
        return '<a href="#" data-slug="' + esc(m.slug) + '"><i style="background:' + esc(cfg.color || '#8e2b5f') + '"></i>' + esc(cfg.title || m.name) + '</a>';
      }).join('');
  }

  function setActive(slug) {
    Array.prototype.forEach.call(el('moduleNav').querySelectorAll('a'), function (a) {
      a.classList.toggle('active', a.getAttribute('data-slug') === slug);
    });
    document.body.classList.remove('sidebar-open');
  }

  function showDashboard() {
    state.current = null;
    setActive('');
    el('pageTitle').textContent = 'Dashboard';
    var content = el('content');
    content.removeAttribute('data-module');
    content.innerHTML = '<div class="stats-grid">' + state.modules.map(function (m) {
      var cfg = DCAdmin.config[m.slug] || {};
      return '<div class="stat-card" data-open="' + esc(m.slug) + '" style="border-left-color:' + esc(cfg.color || '#8e2b5f') + '"><span>' + esc(cfg.title || m.name) +
        '</span><strong id="stat-' + m.slug + '">-</strong><small id="statsub-' + m.slug + '"></small></div>';
    }).join('') + '</div>';
    state.modules.forEach(function (m) {
      api('/' + m.slug + '/stats').then(function (s) {
        el('stat-' + m.slug).textContent = s.total;
        el('statsub-' + m.slug).textContent = Object.keys(s.byStatus).filter(function (k) { return s.byStatus[k]; })
          .map(function (k) { return k + ': ' + s.byStatus[k]; }).join(' | ');
      }).catch(function () { /* ignore */ });
    });
  }

  function columns(x) { return x.cfg.columns || x.meta.fields.slice(0, 4).concat(['status']); }

  function openModule(slug) {
    var x = lookup(slug);
    if (!x.meta) return;
    state.current = slug;
    setActive(slug);
    el('pageTitle').textContent = x.cfg.title || x.meta.name;
    var content = el('content');
    content.setAttribute('data-module', slug);
    content.innerHTML = '<div class="toolbar"><input id="search" type="search" placeholder="' + esc(x.cfg.searchPlaceholder || 'Search...') + '">' +
      '<select id="statusFilter"><option value="">All statuses</option>' +
      x.meta.statuses.map(function (s) { return '<option value="' + esc(s) + '">' + esc(s) + '</option>'; }).join('') +
      '</select><button class="btn" id="addBtn">+ Add</button></div>' +
      '<div class="table-wrap"><table class="data"><thead></thead><tbody></tbody></table></div>';
    el('search').addEventListener('input', debounce(loadRows, 250));
    el('statusFilter').addEventListener('change', loadRows);
    el('addBtn').addEventListener('click', function () { openForm(null); });
    loadRows();
  }

  function loadRows() {
    var slug = state.current;
    var x = lookup(slug);
    var q = encodeURIComponent(el('search').value || '');
    var status = encodeURIComponent(el('statusFilter').value || '');
    api('/' + slug + '?q=' + q + '&status=' + status).then(function (rows) {
      if (state.current !== slug) return;
      state.rows = rows;
      var cols = columns(x);
      document.querySelector('table.data thead').innerHTML = '<tr><th>#</th>' +
        cols.map(function (c) { return '<th>' + esc(labelOf(x.cfg, c)) + '</th>'; }).join('') + '<th></th></tr>';
      var body = document.querySelector('table.data tbody');
      if (!rows.length) {
        body.innerHTML = '<tr><td colspan="' + (cols.length + 2) + '" class="empty">No records yet. Click + Add to create one.</td></tr>';
        return;
      }
      body.innerHTML = rows.map(function (row) {
        return '<tr><td data-label="#">' + row.id + '</td>' + cols.map(function (c) {
          var v = row[c];
          var cell = c === 'status' ? '<span class="status status-' + esc(v) + '">' + esc(v) + '</span>' : esc(v);
          return '<td data-label="' + esc(labelOf(x.cfg, c)) + '">' + cell + '</td>';
        }).join('') + '<td class="actions"><button data-edit="' + row.id + '">Edit</button><button class="danger" data-del="' + row.id + '">Delete</button></td></tr>';
      }).join('');
    }).catch(function (err) { toast(err.message, true); });
  }

  function openForm(row) {
    var x = lookup(state.current);
    state.editingId = row ? row.id : null;
    el('modalTitle').textContent = (row ? 'Edit ' : 'New ') + (x.cfg.title || x.meta.name);
    el('modalFields').innerHTML = x.meta.fields.concat(['status']).map(function (f) {
      var value = row && row[f] != null ? row[f] : '';
      var type = (x.cfg.types && x.cfg.types[f]) || 'text';
      var input;
      if (f === 'status') {
        input = '<select name="status">' + x.meta.statuses.map(function (s) {
          return '<option' + (s === value ? ' selected' : '') + '>' + esc(s) + '</option>';
        }).join('') + '</select>';
      } else if (type === 'textarea') {
        input = '<textarea name="' + f + '" rows="3">' + esc(value) + '</textarea>';
      } else {
        input = '<input name="' + f + '" type="' + type + '" value="' + esc(value) + '"' + (type === 'number' ? ' step="any"' : '') + '>';
      }
      return '<label>' + esc(labelOf(x.cfg, f)) + input + '</label>';
    }).join('');
    el('modal').hidden = false;
  }

  function closeForm() { el('modal').hidden = true; state.editingId = null; }

  function init() {
    el('loginForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var f = e.target;
      api('/auth/login', { method: 'POST', body: { username: f.username.value, password: f.password.value } })
        .then(function (res) { setToken(res.token); f.reset(); boot(); })
        .catch(function (err) { toast(err.message, true); });
    });

    el('logoutBtn').addEventListener('click', logout);
    el('sidebarToggle').addEventListener('click', function () { document.body.classList.toggle('sidebar-open'); });
    el('modalCancel').addEventListener('click', closeForm);

    el('moduleNav').addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a) return;
      e.preventDefault();
      var slug = a.getAttribute('data-slug');
      if (slug) openModule(slug); else showDashboard();
    });

    el('content').addEventListener('click', function (e) {
      var card = e.target.closest('[data-open]');
      if (card) { openModule(card.getAttribute('data-open')); return; }
      var edit = e.target.getAttribute('data-edit');
      var del = e.target.getAttribute('data-del');
      if (edit) {
        openForm(state.rows.filter(function (r) { return String(r.id) === edit; })[0]);
      } else if (del && window.confirm('Delete record #' + del + '?')) {
        api('/' + state.current + '/' + del, { method: 'DELETE' })
          .then(function () { toast('Deleted #' + del); loadRows(); })
          .catch(function (err) { toast(err.message, true); });
      }
    });

    el('modalForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {};
      new FormData(e.target).forEach(function (value, key) { data[key] = value; });
      var id = state.editingId;
      var req = id
        ? api('/' + state.current + '/' + id, { method: 'PUT', body: data })
        : api('/' + state.current, { method: 'POST', body: data });
      req.then(function (row) { closeForm(); toast((id ? 'Updated #' : 'Created #') + row.id); loadRows(); })
        .catch(function (err) { toast(err.message, true); });
    });

    if (getToken()) boot(); else showLogin();
  }

  init();
})();
