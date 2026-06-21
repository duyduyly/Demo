"use strict";

function createPlanCard(plan, index) {
  const days = isArray(plan.days) ? plan.days : [];
  const planId = encodeURIComponent(String(plan.id || ""));
  const safeName = escapeHtml(plan.name || "Untitled workout plan");
  const safeDescription = escapeHtml(plan.description || "No description provided.");

  return `
    <div class="col-12 col-md-6 col-xl-4">
      <article class="card plan-card">
        <div class="card-body">
          <span class="plan-number mb-3">Plan ${String(index + 1).padStart(2, "0")}</span>
          <h3 class="card-title">${safeName}</h3>
          <p class="card-text mb-4">${safeDescription}</p>
          <div class="day-count">
            <span>Training schedule</span>
            <span><strong>${days.length}</strong> ${days.length === 1 ? "day" : "days"}</span>
          </div>
          <a
            class="btn btn-dark w-100"
            href="./plan-detail.html?planId=${planId}"
            aria-label="Open details for ${safeName}"
          >
            Open detail
          </a>
        </div>
      </article>
    </div>
  `;
}

async function renderPlanList() {
  const planList = document.getElementById("plan-list");
  const statusPanel = document.getElementById("plan-status");

  if (!planList || !statusPanel) {
    return;
  }

  const plans = await loadWorkoutPlans();

  if (!plans.length) {
    statusPanel.innerHTML = `
      <div>
        <h3 class="h5 mb-2">No workout plans found</h3>
        <p class="mb-0">Check <code>data/workout-plans.json</code> and refresh the page.</p>
      </div>
    `;
    return;
  }

  planList.innerHTML = plans.map(createPlanCard).join("");
  statusPanel.hidden = true;
}
