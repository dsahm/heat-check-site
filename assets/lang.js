(function () {
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("lang"); } catch (e) {}
  var lang = stored || ((navigator.language || "en").toLowerCase().indexOf("de") === 0 ? "de" : "en");

  function apply(value) {
    lang = value;
    root.setAttribute("data-lang", value);
    root.setAttribute("lang", value);
    var buttons = document.querySelectorAll(".lang-switch button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", String(buttons[i].getAttribute("data-set-lang") === value));
    }
    var title = root.getAttribute("data-title-" + value);
    if (title) document.title = title;
  }

  apply(lang);
  document.addEventListener("DOMContentLoaded", function () {
    apply(lang);
    document.addEventListener("click", function (event) {
      var button = event.target.closest("[data-set-lang]");
      if (!button) return;
      var value = button.getAttribute("data-set-lang");
      try { localStorage.setItem("lang", value); } catch (e) {}
      apply(value);
    });
  });
})();
