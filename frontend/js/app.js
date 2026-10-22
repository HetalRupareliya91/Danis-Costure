// Dani's Costure storefront - loads modules from the API and renders each section
(function () {
  'use strict';

  var registry = {};
  var DC = window.DC = {};
  var sections = document.getElementById('sections');
  var nav = document.getElementById('nav');

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  DC.esc = esc;
  DC.register = function (def) { registry[def.slug] = def; };

  DC.api = function (path, options) {
    options = options || {};
    var init = { method: options.method || 'GET', headers: { 'Content-Type': 'application/json' } };
    if (options.body) init.body = JSON.stringify(options.body);
    return fetch('/api' + path, init).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok) throw new Error(data.error || ('Request failed (' + res.status + ')'));
        return data;
      });
    });
  };

  DC.toast = function (message, bad) {
    var t = document.getElementById('toast');
    t.textContent = message;
    t.className = 'toast show' + (bad ? ' bad' : '');
    clearTimeout(DC.toast.timer);
    DC.toast.timer = setTimeout(function () { t.className = 'toast'; }, 3000);
  };

  function label(def, key) {
    return (def.labels && def.labels[key]) || key;
  }

  function inputFor(def, key) {
    var type = (def.types && def.types[key]) || 'text';
    var required = key === def.primary ? ' required' : '';
    if (type === 'textarea') return '<label class="wide">' + esc(label(def, key)) + '<textarea name="' + key + '" rows="3"' + required + '></textarea></label>';
    return '<label>' + esc(label(def, key)) + '<input name="' + key + '" type="' + type + '"' + (type === 'number' ? ' step="any" min="0"' : '') + required + '></label>';
  }

  var renderers = {
    catalog: function (meta, def, body) {
      DC.api('/' + meta.slug).then(function (rows) {
        if (!rows.length) { body.innerHTML = '<p class="empty">' + esc(def.emptyText) + '</p>'; return; }
        body.innerHTML = '<div class="grid">' + rows.slice(0, 12).map(function (row) {
          var details = meta.fields.filter(function (f) { return f !== def.primary && row[f] !== undefined && row[f] !== ''; })
            .slice(0, 3)
            .map(function (f) { return '<li><span>' + esc(label(def, f)) + '</span><b>' + esc(row[f]) + '</b></li>'; })
            .join('');
          return '<article class="card"><h3>' + esc(row[def.primary] || ('#' + row.id)) + '</h3><ul class="meta">' + details + '</ul>' +
            (row.status ? '<span class="badge">' + esc(row.status) + '</span>' : '') + '</article>';
        }).join('') + '</div>';
      }).catch(function (err) { body.innerHTML = '<p class="empty">' + esc(err.message) + '</p>'; });
    },

    form: function (meta, def, body) {
      var form = document.createElement('form');
      form.className = 'dc-form';
      form.innerHTML = meta.fields.map(function (f) { return inputFor(def, f); }).join('') +
        '<div class="actions"><button type="submit">Submit</button></div>';
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var data = {};
        new FormData(form).forEach(function (value, key) { if (value !== '') data[key] = value; });
        DC.api('/' + meta.slug, { method: 'POST', body: data }).then(function (row) {
          form.reset();
          DC.toast('Thank you! Your reference number is #' + row.id);
        }).catch(function (err) { DC.toast(err.message, true); });
      });
      body.appendChild(form);
    },

    track: function (meta, def, body) {
      var box = document.createElement('div');
      box.innerHTML = '<form class="track"><input type="number" min="1" placeholder="Enter your reference number" required><button type="submit">Track</button></form><div class="track-result"></div>';
      var result = box.querySelector('.track-result');
      box.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        var id = box.querySelector('input').value;
        DC.api('/' + meta.slug + '/' + encodeURIComponent(id)).then(function (row) {
          var current = meta.statuses.indexOf(row.status);
          result.innerHTML = '<div class="card"><h3>#' + esc(row.id) + ' - ' + esc(row[def.primary]) + '</h3><ul class="timeline">' +
            meta.statuses.map(function (s, i) { return '<li class="' + (i <= current ? 'done' : '') + '">' + esc(s) + '</li>'; }).join('') +
            '</ul></div>';
        }).catch(function () { result.innerHTML = '<p class="empty">No record found for #' + esc(id) + '</p>'; });
      });
      body.appendChild(box);
      if (meta.publicCreate) {
        var extra = document.createElement('div');
        extra.className = 'sub-block';
        extra.innerHTML = '<h3>Place a new request</h3>';
        body.appendChild(extra);
        renderers.form(meta, def, extra);
      }
    },

    stats: function (meta, def, body) {
      DC.api('/' + meta.slug + '/stats').then(function (s) {
        var max = Math.max.apply(null, [1].concat(Object.keys(s.byStatus).map(function (k) { return s.byStatus[k]; })));
        body.innerHTML = '<div class="stats"><div class="total"><b>' + s.total + '</b>in the workshop right now</div>' +
          Object.keys(s.byStatus).map(function (k) {
            var n = s.byStatus[k];
            return '<div class="bar"><em>' + esc(k) + '</em><div><span style="width:' + Math.round((n / max) * 100) + '%"></span></div><b>' + n + '</b></div>';
          }).join('') + '</div>';
      }).catch(function (err) { body.innerHTML = '<p class="empty">' + esc(err.message) + '</p>'; });
    }
  };

  function renderModule(meta) {
    var def = registry[meta.slug] || { slug: meta.slug, title: meta.name, kind: 'stats', primary: meta.fields[0], emptyText: 'Coming soon.' };
    var section = document.createElement('section');
    section.className = 'module module-' + meta.slug;
    section.id = meta.slug;
    section.innerHTML = '<div class="module-head"><span class="icon">' + esc(def.icon || meta.name.charAt(0)) + '</span><div><h2>' +
      esc(def.title || meta.name) + '</h2><p>' + esc(def.blurb || meta.description || '') + '</p></div></div><div class="module-body"></div>';
    sections.appendChild(section);
    var link = document.createElement('a');
    link.href = '#' + meta.slug;
    link.textContent = def.title || meta.name;
    nav.appendChild(link);
    (renderers[def.kind] || renderers.stats)(meta, def, section.querySelector('.module-body'));
  }

  function loadScript(src) {
    return new Promise(function (resolve) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = resolve;
      document.body.appendChild(s);
    });
  }

  function loadCss(href) {
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
  }

  var ORDER = ['catalog', 'form', 'track', 'stats'];
  function rank(meta) { return ORDER.indexOf((registry[meta.slug] || {}).kind || 'stats'); }

  DC.api('/modules').then(function (mods) {
    return Promise.all(mods.map(function (m) {
      loadCss('css/modules/' + m.slug + '.css');
      return loadScript('js/modules/' + m.slug + '.js');
    })).then(function () {
      mods.slice().sort(function (a, b) { return rank(a) - rank(b); }).forEach(renderModule);
    });
  }).catch(function () {
    sections.innerHTML = '<p class="empty">The boutique server is not reachable. Start it with: cd backend &amp;&amp; npm start</p>';
  });

  document.getElementById('menuToggle').addEventListener('click', function () {
    document.body.classList.toggle('nav-open');
  });
  nav.addEventListener('click', function () { document.body.classList.remove('nav-open'); });
})();
