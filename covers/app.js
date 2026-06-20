(function () {
  "use strict";

  var order = "newest";   // "newest" or "oldest"
  var data = [];

  var coversEl = document.getElementById("covers");
  var navEl = document.getElementById("year-nav");
  var subEl = document.getElementById("subtitle");
  var toggle = document.getElementById("order-toggle");

  fetch("covers.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(function (json) { data = json; render(); })
    .catch(function (e) {
      subEl.textContent = "Couldn't load covers.json — run build_covers.py and commit it.";
      console.error(e);
    });

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch];
    });
  }

  function render() {
    if (!data.length) { subEl.textContent = "No covers yet."; return; }

    var k = order === "newest" ? -1 : 1;
    var list = data.slice().sort(function (a, b) {
      if (a.year !== b.year) return k * (a.year - b.year);
      return k * (a.month - b.month);
    });

    var years = [], byYear = {};
    list.forEach(function (c) {
      if (!byYear[c.year]) { byYear[c.year] = []; years.push(c.year); }
      byYear[c.year].push(c);
    });

    var allYears = data.map(function (c) { return c.year; });
    subEl.textContent = data.length + " issues \u00b7 " +
      Math.min.apply(null, allYears) + "\u2013" + Math.max.apply(null, allYears);

    navEl.innerHTML = years.map(function (y) {
      return '<a href="#y' + y + '">' + y + "</a>";
    }).join("");

    var html = "";
    years.forEach(function (y) {
      var items = byYear[y];
      html += '<section class="pvw-year-sec" id="y' + y + '">';
      html += '<div class="pvw-year-head"><span class="pvw-year">' + y + "</span>" +
              '<span class="pvw-rule"></span><span class="pvw-count">' +
              items.length + " issue" + (items.length === 1 ? "" : "s") + "</span></div>";
      html += '<div class="pvw-grid">';
      items.forEach(function (c) {
        html += '<button class="pvw-cover" type="button" data-full="' + esc(c.full) +
                '" data-cap="' + esc(c.label) + '">' +
                '<img src="' + esc(c.thumb) + '" loading="lazy" decoding="async" alt="Performance VW \u2014 ' +
                esc(c.label) + '"></button>';
      });
      html += "</div></section>";
    });
    coversEl.innerHTML = html;
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      order = order === "newest" ? "oldest" : "newest";
      toggle.textContent = order === "newest" ? "Oldest first" : "Newest first";
      render();
      window.scrollTo({ top: 0 });
    });
  }

  /* ---- lightbox ---- */
  var lb = document.querySelector(".pvw-lb");
  var img = lb.querySelector(".pvw-lb-img");
  var cap = lb.querySelector(".pvw-lb-cap");
  var covers = [], idx = 0;

  function collect() { covers = Array.prototype.slice.call(document.querySelectorAll(".pvw-cover")); }
  function preload(i) { var c = covers[i]; if (c) { var p = new Image(); p.src = c.getAttribute("data-full"); } }

  function show(i) {
    collect();
    if (!covers.length) return;
    idx = (i + covers.length) % covers.length;
    var c = covers[idx];
    img.src = c.getAttribute("data-full");
    img.alt = c.getAttribute("data-cap") || "";
    cap.textContent = c.getAttribute("data-cap") || "";
    lb.hidden = false;
    requestAnimationFrame(function () { lb.classList.add("is-open"); });
    preload(idx + 1); preload(idx - 1);
  }
  function close() {
    lb.classList.remove("is-open");
    setTimeout(function () { lb.hidden = true; img.src = ""; }, 200);
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".pvw-cover");
    if (btn) { e.preventDefault(); collect(); show(covers.indexOf(btn)); }
  });
  lb.querySelector(".pvw-lb-close").addEventListener("click", close);
  lb.querySelector(".pvw-lb-next").addEventListener("click", function () { show(idx + 1); });
  lb.querySelector(".pvw-lb-prev").addEventListener("click", function () { show(idx - 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });

  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") show(idx + 1);
    else if (e.key === "ArrowLeft") show(idx - 1);
  });

  var x0 = null;
  lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) show(idx + (dx < 0 ? 1 : -1));
    x0 = null;
  }, { passive: true });
})();
