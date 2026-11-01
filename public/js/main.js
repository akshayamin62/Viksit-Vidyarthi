(function () {
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const modal = document.querySelector("[data-modal]");
  const form = document.querySelector("[data-enquiry-form]");
  const status = document.querySelector("[data-form-status]");
  const video = document.querySelector("[data-hero-video]");
  const frame = document.querySelector("[data-video-frame]");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
    });
  }

  function openModal() {
    if (!modal) return;
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
    const first = modal.querySelector("#name");
    if (first) first.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
  }

  document.querySelectorAll("[data-open-modal]").forEach(function (el) {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      openModal();
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeModal();
  });

  if (video && frame && video.getAttribute("src")) {
    frame.classList.add("has-video");
  }

  document.querySelectorAll("[data-tabs]").forEach(function (box) {
    const buttons = box.querySelectorAll("[data-tab]");
    const panels = document.querySelectorAll(box.getAttribute("data-tabs"));
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const id = button.getAttribute("data-tab");
        buttons.forEach(function (b) {
          b.classList.toggle("is-active", b === button);
          b.setAttribute("aria-selected", b === button ? "true" : "false");
        });
        panels.forEach(function (panel) {
          panel.classList.toggle("is-active", panel.id === id);
        });
      });
    });
  });

  document.querySelectorAll("[data-filter]").forEach(function (box) {
    const buttons = box.querySelectorAll("[data-filter-value]");
    const cards = document.querySelectorAll(box.getAttribute("data-filter"));
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const value = button.getAttribute("data-filter-value");
        buttons.forEach(function (b) {
          b.classList.toggle("is-active", b === button);
          b.setAttribute("aria-pressed", b === button ? "true" : "false");
        });
        cards.forEach(function (card) {
          const show = value === "all" || card.getAttribute("data-audience") === value;
          card.hidden = !show;
        });
      });
    });
  });

  const coeDetail = document.querySelector("[data-coe-detail]");
  document.querySelectorAll("[data-coe-item]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!coeDetail) return;
      coeDetail.hidden = false;
      coeDetail.innerHTML =
        "<h3>" +
        button.getAttribute("data-coe-item") +
        "</h3><p>" +
        button.getAttribute("data-coe-copy") +
        "</p>";
      document.querySelectorAll("[data-coe-item]").forEach(function (b) {
        b.classList.toggle("is-active", b === button);
      });
    });
  });

  const stageButtons = document.querySelectorAll("[data-stage]");
  const stagePanel = document.querySelector("[data-stage-panel]");
  const stages = [
    [
      "Awareness",
      "Conduct student seminars, teacher workshops and parent orientation programmes to create awareness and identify developmental priorities.",
    ],
    [
      "Institutional needs assessment",
      "Understand the institution’s student profile, existing support systems, developmental concerns and where additional interventions would help.",
    ],
    [
      "Development programme design",
      "Create a customised institutional activity calendar based on age groups, educational levels and identified needs.",
    ],
    [
      "Structured intervention",
      "Deliver targeted developmental activities, teacher training, parenting programmes and individual student support where appropriate.",
    ],
    [
      "Centre of Excellence",
      "Where mutually agreed, establish a dedicated framework for long-term education planning, career guidance, profile development and student-readiness services.",
    ],
    [
      "Review and continuous improvement",
      "Periodically assess participation, programme effectiveness, developmental progress and stakeholder feedback.",
    ],
  ];

  function showStage(index) {
    if (!stagePanel) return;
    const stage = stages[index];
    stageButtons.forEach(function (b, i) {
      b.classList.toggle("is-active", i === index);
    });
    stagePanel.innerHTML =
      "<p class='kicker'>Stage " +
      (index + 1) +
      " of 6</p><h3>" +
      stage[0] +
      "</h3><p>" +
      stage[1] +
      "</p><div class='hero-actions'>" +
      (index < 5
        ? "<button class='btn btn-navy' type='button' data-next-stage>Next stage</button>"
        : "<button class='btn btn-saffron' type='button' data-open-modal>Discuss your institution</button>") +
      "</div>";
    const next = stagePanel.querySelector("[data-next-stage]");
    if (next) {
      next.addEventListener("click", function () {
        showStage(index + 1);
      });
    }
    const discuss = stagePanel.querySelector("[data-open-modal]");
    if (discuss) discuss.addEventListener("click", openModal);
  }

  stageButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      showStage(index);
    });
  });
  if (stageButtons.length) showStage(0);

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      if (!status) return;
      status.textContent = "Sending enquiry…";
      status.className = "form-status";
      const data = {
        name: form.name.value.trim(),
        institution: form.institution.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        institution_type: form.institution_type.value,
        start_with: form.start_with.value,
        website: form.website.value,
      };
      try {
        const response = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const body = await response.json().catch(function () {
          return {};
        });
        if (!response.ok) {
          var detail = body.detail;
          if (Array.isArray(detail) && detail[0]) detail = detail[0].msg || detail[0];
          throw new Error(detail || "Could not send enquiry.");
        }
        form.reset();
        status.textContent = "Enquiry sent. We will get in touch.";
        status.className = "form-status is-ok";
      } catch (error) {
        status.textContent = error.message || "Could not send enquiry.";
        status.className = "form-status is-err";
      }
    });
  }
})();
