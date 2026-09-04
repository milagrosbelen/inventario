(function () {
  const KEY = "inventario-oficio-v1";
  const tabs = document.querySelectorAll("[data-view]");
  const views = {
    soft: document.getElementById("view-soft"),
    skills: document.getElementById("view-skills"),
    now: document.getElementById("view-now"),
  };

  function show(name) {
    Object.entries(views).forEach(([id, el]) => {
      const on = id === name;
      el.classList.toggle("on", on);
      el.hidden = !on;
    });
    tabs.forEach((t) => {
      t.setAttribute("aria-selected", String(t.dataset.view === name));
    });
    localStorage.setItem(KEY + "-view", name);
  }

  tabs.forEach((t) => {
    t.addEventListener("click", () => show(t.dataset.view));
  });

  const savedView = localStorage.getItem(KEY + "-view");
  if (savedView && views[savedView]) show(savedView);

  document.querySelectorAll(".acc-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.classList.toggle("open");
    });
  });

  const filters = document.querySelectorAll("[data-filter]");
  filters.forEach((f) => {
    f.addEventListener("click", () => {
      filters.forEach((x) => x.classList.remove("on"));
      f.classList.add("on");
      const mode = f.dataset.filter;
      document.querySelectorAll("#view-skills .acc").forEach((acc) => {
        const origen = acc.getAttribute("data-origen");
        acc.hidden = mode !== "all" && origen !== mode;
      });
    });
  });

  document.querySelectorAll("input[data-k]").forEach((input) => {
    const k = KEY + "-chk-" + input.getAttribute("data-k");
    input.checked = localStorage.getItem(k) === "1";
    input.addEventListener("change", () => {
      localStorage.setItem(k, input.checked ? "1" : "0");
    });
  });
})();
