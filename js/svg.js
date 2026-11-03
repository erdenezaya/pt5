// Inline SVG illustrations and chart drawing (no external images needed).
window.SVG = (function () {
  const C = { sky: '#dbeafe', ground: '#e7d7b9', steel: '#64748b', orange: '#f97316', yellow: '#facc15', blue: '#2563eb', green: '#16a34a', red: '#dc2626', ink: '#1e293b', skin: '#e0a878', white: '#ffffff', teal: '#0d9488', purple: '#7c3aed' };

  function person(x, y, shirt, hat) {
    return `<g transform="translate(${x},${y})">
      <circle cx="0" cy="-38" r="11" fill="${C.skin}"/>
      ${hat ? `<path d="M-13,-42 Q0,-60 13,-42 Z" fill="${hat}"/><rect x="-15" y="-44" width="30" height="4" rx="2" fill="${hat}"/>` : `<path d="M-11,-42 Q0,-54 11,-42 Z" fill="${C.ink}"/>`}
      <rect x="-13" y="-26" width="26" height="30" rx="7" fill="${shirt}"/>
      ${hat ? `<rect x="-13" y="-14" width="26" height="4" fill="${C.yellow}" opacity=".9"/>` : ''}
      <rect x="-11" y="4" width="9" height="24" rx="3" fill="${C.ink}"/><rect x="2" y="4" width="9" height="24" rx="3" fill="${C.ink}"/>
    </g>`;
  }
  function bubble(x, y, w, text) {
    return `<g><rect x="${x}" y="${y}" width="${w}" height="26" rx="13" fill="${C.white}" stroke="${C.ink}" stroke-width="1.5"/>
      <text x="${x + w / 2}" y="${y + 17}" font-size="12" text-anchor="middle" fill="${C.ink}" font-family="system-ui,sans-serif">${text}</text></g>`;
  }
  const wrap = (inner) => `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" role="img" class="scene">${inner}</svg>`;

  const scenes = {
    site: () => wrap(`<rect width="320" height="180" fill="${C.sky}"/><circle cx="270" cy="35" r="18" fill="${C.yellow}"/>
      <rect x="40" y="10" width="6" height="120" fill="${C.orange}"/><rect x="40" y="10" width="150" height="6" fill="${C.orange}"/>
      <line x1="150" y1="16" x2="150" y2="55" stroke="${C.ink}" stroke-width="1.5"/><rect x="130" y="55" width="40" height="8" fill="${C.steel}"/>
      <rect y="130" width="320" height="50" fill="${C.ground}"/>
      ${[0,1,2,3,4,5,6,7].map(i => `<line x1="${170 + i * 16}" y1="125" x2="${150 + i * 16}" y2="150" stroke="${C.steel}" stroke-width="3"/>`).join('')}
      ${[0,1,2].map(i => `<line x1="160" y1="${130 + i * 8}" x2="290" y2="${130 + i * 8}" stroke="${C.steel}" stroke-width="3"/>`).join('')}
      ${person(90, 128, C.orange, C.white)}${bubble(100, 52, 110, 'Pass me the wire!')}`),
    talk: () => wrap(`<rect width="320" height="180" fill="#fef3c7"/><rect y="140" width="320" height="40" fill="#d6c7a1"/>
      ${person(110, 140, C.blue)}${person(210, 140, C.green)}
      ${bubble(40, 50, 120, "How's it going?")}${bubble(170, 72, 130, 'Not bad, thanks!')}`),
    phone: () => wrap(`<rect width="320" height="180" fill="#ede9fe"/>
      <rect x="120" y="25" width="80" height="140" rx="12" fill="${C.ink}"/><rect x="127" y="38" width="66" height="110" rx="4" fill="${C.white}"/>
      <circle cx="160" cy="80" r="16" fill="${C.green}"/><path d="M152,74 q2,-4 5,0 l-2,4 q3,6 8,8 l3,-2 q4,2 0,5 q-10,2 -14,-15z" fill="${C.white}"/>
      <text x="160" y="118" font-size="10" text-anchor="middle" fill="${C.ink}" font-family="system-ui">Calling...</text>
      ${bubble(10, 30, 100, "I'd like to book")}${bubble(214, 120, 96, 'Speak slowly?')}`),
    shop: () => wrap(`<rect width="320" height="180" fill="#dcfce7"/><rect x="30" y="40" width="260" height="20" fill="${C.red}"/>
      ${[0,1,2,3,4,5].map(i => `<rect x="${30 + i * 44}" y="40" width="22" height="20" fill="${C.white}"/>`).join('')}
      <rect x="40" y="110" width="240" height="40" fill="#a16207"/><rect x="210" y="85" width="50" height="25" rx="3" fill="${C.ink}"/>
      <text x="235" y="102" font-size="11" text-anchor="middle" fill="${C.yellow}" font-family="monospace">$12.50</text>
      <rect x="90" y="88" width="18" height="22" rx="3" fill="${C.white}"/><path d="M108,94 q8,0 8,7 q0,6 -8,6" fill="none" stroke="${C.white}" stroke-width="3"/>
      ${bubble(20, 70, 120, 'Pay by card?')}`),
    health: () => wrap(`<rect width="320" height="180" fill="#e0f2fe"/>
      <rect x="135" y="20" width="50" height="50" rx="6" fill="${C.white}"/><rect x="153" y="28" width="14" height="34" fill="${C.red}"/><rect x="143" y="38" width="34" height="14" fill="${C.red}"/>
      ${person(100, 150, C.white)}${person(220, 150, C.blue)}
      ${bubble(20, 80, 110, 'It hurts here.')}${bubble(180, 80, 130, 'Since when?')}`),
    travel: () => wrap(`<rect width="320" height="180" fill="#cffafe"/><rect y="130" width="320" height="50" fill="#475569"/>
      ${[0,1,2,3,4].map(i => `<rect x="${10 + i * 70}" y="153" width="40" height="5" fill="${C.white}"/>`).join('')}
      <rect x="60" y="70" width="190" height="65" rx="10" fill="${C.yellow}"/>
      ${[0,1,2,3].map(i => `<rect x="${72 + i * 42}" y="80" width="34" height="24" rx="3" fill="${C.sky}"/>`).join('')}
      <circle cx="100" cy="138" r="12" fill="${C.ink}"/><circle cx="210" cy="138" r="12" fill="${C.ink}"/>
      <text x="155" y="125" font-size="12" text-anchor="middle" fill="${C.ink}" font-family="system-ui" font-weight="700">CITY</text>
      ${bubble(10, 20, 170, 'Does this bus go to the city?')}`),
    pte: () => wrap(`<rect width="320" height="180" fill="#fef9c3"/>
      <rect x="40" y="25" width="240" height="135" rx="8" fill="${C.white}" stroke="${C.ink}" stroke-width="2"/>
      ${[40, 70, 55, 95, 80].map((h, i) => `<rect x="${70 + i * 40}" y="${140 - h}" width="24" height="${h}" fill="${[C.blue, C.teal, C.orange, C.green, C.purple][i]}"/>`).join('')}
      <line x1="60" y1="140" x2="260" y2="140" stroke="${C.ink}" stroke-width="2"/>
      <text x="160" y="45" font-size="13" text-anchor="middle" fill="${C.ink}" font-family="system-ui" font-weight="700">The chart shows...</text>`),
  };

  // ---- Charts for Describe Image ----
  const palette = [C.blue, C.orange, C.teal, C.purple, C.green, C.red, C.yellow];
  function chart(img) {
    const W = 520, H = 320;
    const head = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="chart" role="img" aria-label="${img.title}" font-family="system-ui,sans-serif">
      <rect width="${W}" height="${H}" fill="#fff"/><text x="${W / 2}" y="26" text-anchor="middle" font-size="16" font-weight="700" fill="#111">${img.title}</text>`;
    if (img.type === 'process') {
      const n = img.steps.length, bw = 88, gap = (W - 20 - n * bw) / (n - 1);
      return head + img.steps.map((s, i) => {
        const x = 10 + i * (bw + gap), y = 120;
        const words = s.split(' '); const l1 = words.slice(0, Math.ceil(words.length / 2)).join(' '), l2 = words.slice(Math.ceil(words.length / 2)).join(' ');
        return `<rect x="${x}" y="${y}" width="${bw}" height="80" rx="10" fill="${palette[i]}" opacity=".9"/>
          <circle cx="${x + bw / 2}" cy="${y - 22}" r="16" fill="#111"/><text x="${x + bw / 2}" y="${y - 17}" fill="#fff" text-anchor="middle" font-size="14" font-weight="700">${i + 1}</text>
          <text x="${x + bw / 2}" y="${y + 36}" fill="#fff" text-anchor="middle" font-size="12" font-weight="600">${l1}</text>
          <text x="${x + bw / 2}" y="${y + 52}" fill="#fff" text-anchor="middle" font-size="12" font-weight="600">${l2}</text>
          ${i < n - 1 ? `<path d="M${x + bw + 3},${y + 40} l${gap - 8},0 m-7,-6 l7,6 l-7,6" stroke="#111" stroke-width="2.5" fill="none"/>` : ''}`;
      }).join('') + '</svg>';
    }
    if (img.type === 'pie') {
      const total = img.values.reduce((a, b) => a + b, 0); let a0 = -Math.PI / 2; const cx = 170, cy = 175, r = 115;
      let out = '';
      img.values.forEach((v, i) => {
        const a1 = a0 + (v / total) * Math.PI * 2, large = a1 - a0 > Math.PI ? 1 : 0;
        out += `<path d="M${cx},${cy} L${cx + r * Math.cos(a0)},${cy + r * Math.sin(a0)} A${r},${r} 0 ${large} 1 ${cx + r * Math.cos(a1)},${cy + r * Math.sin(a1)} Z" fill="${palette[i]}" stroke="#fff" stroke-width="2"/>`;
        const am = (a0 + a1) / 2; const pct = Math.round((v / total) * 100);
        if (pct >= 6) out += `<text x="${cx + r * 0.65 * Math.cos(am)}" y="${cy + r * 0.65 * Math.sin(am) + 5}" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">${pct}%</text>`;
        out += `<rect x="330" y="${80 + i * 34}" width="18" height="18" rx="3" fill="${palette[i]}"/><text x="356" y="${94 + i * 34}" font-size="14" fill="#111">${img.labels[i]} (${img.unit === 'per cent' ? v + '%' : v})</text>`;
        a0 = a1;
      });
      return head + out + '</svg>';
    }
    const L = 60, R = W - 20, T = 50, B = H - 45; const raw = Math.max(...img.values) * 1.1 / 4, mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const tick = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].map((m) => m * mag).find((t) => t >= raw); const max = tick * 4;
    const y = (v) => B - (v / max) * (B - T); const n = img.values.length; const step = (R - L) / n;
    let out = '';
    for (let k = 0; k <= 4; k++) { const v = Math.round(max * k / 4); out += `<line x1="${L}" x2="${R}" y1="${y(v)}" y2="${y(v)}" stroke="#e5e7eb"/><text x="${L - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="#555">${v}</text>`; }
    img.labels.forEach((lb, i) => { out += `<text x="${L + step * (i + .5)}" y="${B + 20}" text-anchor="middle" font-size="12" fill="#333">${lb}</text>`; });
    if (img.type === 'bar') {
      img.values.forEach((v, i) => { const bw = step * .6; out += `<rect x="${L + step * i + (step - bw) / 2}" y="${y(v)}" width="${bw}" height="${B - y(v)}" fill="${palette[i % palette.length]}" rx="3"/><text x="${L + step * (i + .5)}" y="${y(v) - 6}" text-anchor="middle" font-size="12" font-weight="700" fill="#111">${v}</text>`; });
    } else {
      const pts = img.values.map((v, i) => `${L + step * (i + .5)},${y(v)}`).join(' ');
      out += `<polyline points="${pts}" fill="none" stroke="${C.blue}" stroke-width="3"/>`;
      img.values.forEach((v, i) => { out += `<circle cx="${L + step * (i + .5)}" cy="${y(v)}" r="5" fill="${C.orange}"/><text x="${L + step * (i + .5)}" y="${y(v) - 10}" text-anchor="middle" font-size="12" font-weight="700" fill="#111">${v}</text>`; });
    }
    out += `<line x1="${L}" x2="${R}" y1="${B}" y2="${B}" stroke="#111"/><line x1="${L}" x2="${L}" y1="${T}" y2="${B}" stroke="#111"/>`;
    return head + out + '</svg>';
  }

  return { scene: (k) => (scenes[k] || scenes.talk)(), chart };
})();
