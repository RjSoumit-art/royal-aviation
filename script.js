(function () {
  var btn = document.getElementById("hamburger");
  var menu = document.getElementById("mobile-nav");
  if (!btn || !menu) return;

  function isOpen() {
    return btn.getAttribute("aria-expanded") === "true";
  }

  function setOpen(open) {
    btn.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("hidden", !open);
  }

  btn.addEventListener("click", function () {
    setOpen(!isOpen());
  });

  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("click", function (e) {
    if (isOpen() && !menu.contains(e.target) && !btn.contains(e.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      btn.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024) setOpen(false);
  });
})();








(function () {
  document.querySelectorAll("[data-faq-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", String(!open));
      if (panel) panel.classList.toggle("grid-rows-[1fr]", !open);
    });
  });
})();

(function () {
  var searchButton = document.getElementById("search-button");
  var accountButton = document.getElementById("account-button");
  var searchDialog = document.getElementById("search-dialog");
  var accountDialog = document.getElementById("account-dialog");
  var searchInput = document.getElementById("site-search");
  var searchResults = document.getElementById("search-results");
  var accountForm = document.getElementById("account-form");
  var accountMessage = document.getElementById("account-message");
  var activeButton = null;

  function showDialog(dialog, button) {
    activeButton = button;
    dialog.classList.remove("hidden");
    dialog.classList.add("flex");
    button.setAttribute("aria-expanded", "true");
  }

  function hideDialog(dialog) {
    dialog.classList.add("hidden");
    dialog.classList.remove("flex");
    if (activeButton) {
      activeButton.setAttribute("aria-expanded", "false");
      activeButton.focus();
    }
    activeButton = null;
  }

  function updateSearchResults() {
    var term = searchInput.value.trim().toLowerCase();
    searchResults.replaceChildren();
    if (!term) {
      var hint = document.createElement("li");
      hint.className = "py-3 text-white/60";
      hint.textContent = "Type a keyword to find matching sections.";
      searchResults.appendChild(hint);
      return;
    }

    var sections = document.querySelectorAll("main section");
    var matches = 0;
    sections.forEach(function (section) {
      if (!section.textContent.toLowerCase().includes(term)) return;
      matches += 1;
      var heading = section.querySelector("h1, h2, h3");
      var title = heading
        ? heading.textContent.trim().replace(/\s+/g, " ")
        : "Page section";
      var item = document.createElement("li");
      var result = document.createElement("button");
      result.type = "button";
      result.className =
        "w-full rounded-lg border border-white/10 px-4 py-3 text-left text-white transition-colors hover:border-gold hover:text-gold";
      result.textContent = title;
      result.addEventListener("click", function () {
        hideDialog(searchDialog);
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      item.appendChild(result);
      searchResults.appendChild(item);
    });

    if (!matches) {
      var empty = document.createElement("li");
      empty.className = "py-3 text-white/60";
      empty.textContent = "No matching sections found.";
      searchResults.appendChild(empty);
    }
  }

  searchButton.addEventListener("click", function () {
    showDialog(searchDialog, searchButton);
    searchInput.value = "";
    updateSearchResults();
    searchInput.focus();
  });
  accountButton.addEventListener("click", function () {
    showDialog(accountDialog, accountButton);
    document.getElementById("account-email").focus();
  });
  searchInput.addEventListener("input", updateSearchResults);

  document.querySelectorAll("[data-close-dialog]").forEach(function (button) {
    button.addEventListener("click", function () {
      hideDialog(document.getElementById(button.dataset.closeDialog));
    });
  });
  [searchDialog, accountDialog].forEach(function (dialog) {
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) hideDialog(dialog);
    });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (!searchDialog.classList.contains("hidden")) hideDialog(searchDialog);
      if (!accountDialog.classList.contains("hidden"))
        hideDialog(accountDialog);
    }
  });
  accountForm.addEventListener("submit", function (event) {
    event.preventDefault();
    accountMessage.textContent =
      "The form is ready. Connect it to an authentication service to sign in.";
  });
})();

      tailwind.config = {
        theme: {
          extend: {
            colors: {
              ink: "#080806",
              snow: "#f2f2f2",
              gold: { DEFAULT: "#ddca67", dim: "rgba(219,199,97,0.79)" },
            },
            fontFamily: {
              display: ['"arlita"'],
              nav: ['"Clash Display"'],
              body: ['"Clash Grotesk"'],
            },
            letterSpacing: { body: "0.44px" },
            screens: { tablet: { max: "1024px" }, mobile: { max: "768px" } },
          },
        },
      };
