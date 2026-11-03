const form = document.getElementById("plan-form");
const results = document.getElementById("results");
const planList = document.getElementById("plan-list");

const activityDetails = {
  general: { name: "general PE", skill: "A simple movement and coordination circuit", detail: "Try a comfortable mix of marching in place, balance practice and easy movement patterns." },
  running: { name: "running / walking", skill: "Walking and running technique", detail: "Practice relaxed walking, posture and comfortable pace changes on a clear, even surface." },
  basketball: { name: "basketball", skill: "Basketball handling practice", detail: "Practice stationary ball control, gentle passing and footwork in a safe space." },
  volleyball: { name: "volleyball", skill: "Volleyball coordination practice", detail: "Practice ready position, gentle forearm passing movements and partner coordination." },
  football: { name: "football", skill: "Football ball-control practice", detail: "Practice gentle ball touches, short passes and controlled changes of direction." }
};

const goalDetails = {
  general: { name: "general fitness", focus: "A balanced session with comfortable movement and coordination." },
  endurance: { name: "endurance", focus: "A steady, manageable activity block with breaks as needed." },
  strength: { name: "strength", focus: "Controlled bodyweight movements, focusing on technique rather than speed." },
  mobility: { name: "mobility and flexibility", focus: "Gentle range-of-motion movements without forcing a stretch." },
  skills: { name: "sports skills", focus: "Practice simple technique and coordination for your chosen activity." }
};

function makePlan(data) {
  const minutes = Number(data.duration);
  const warm = Math.max(3, Math.round(minutes * 0.2));
  const cool = Math.max(3, Math.round(minutes * 0.15));
  const main = Math.max(5, minutes - warm - cool);
  const activity = activityDetails[data.activity];
  const goal = goalDetails[data.goal];

  let mainTitle = goal.name[0].toUpperCase() + goal.name.slice(1) + " activity";
  let mainDescription = goal.focus;
  if (data.goal === "skills") {
    mainTitle = activity.skill;
    mainDescription = activity.detail;
  } else if (data.goal === "endurance") {
    mainTitle = "Comfortable pace intervals";
    mainDescription = "Alternate a few minutes of steady movement with easier recovery periods. Keep the effort comfortable and take breaks whenever needed.";
  } else if (data.goal === "strength") {
    mainTitle = "Gentle strength circuit";
    mainDescription = "Choose controlled, teacher-approved movements such as wall push-ups, chair squats or standing calf raises. Focus on steady technique.";
  } else if (data.goal === "mobility") {
    mainTitle = "Gentle mobility flow";
    mainDescription = "Move slowly through comfortable shoulder rolls, ankle circles and gentle hip and upper-body mobility. Never force a stretch.";
  }

  const equipmentText = {
    none: "No equipment needed.",
    ball: "Use a ball only if the space is clear and the activity is supervised.",
    band: "Use a resistance band only if you know how to use it safely and your teacher approves.",
    gym: "Use school equipment only with your PE teacher's guidance."
  }[data.equipment];

  const locationText = data.place === "indoors"
    ? "Choose a clear indoor space with enough room to move."
    : "Choose a safe, even outdoor area and consider the weather and surface.";

  const items = [
    { title: "Warm-up", description: "Start with easy walking or marching, then comfortable dynamic movements to prepare for activity.", time: warm + " min" },
    { title: mainTitle, description: mainDescription + " " + equipmentText + " " + locationText, time: main + " min" },
    { title: "Cool-down", description: "Slow down gradually with relaxed walking and gentle, comfortable stretches.", time: cool + " min" }
  ];

  const levelText = {
    beginner: "Keep the pace easy and take breaks whenever you need them.",
    intermediate: "Choose a steady pace that still lets you speak comfortably.",
    experienced: "You can add a little variety, but keep the movements controlled and appropriate for PE class."
  }[data.level];

  const note = data.notes.trim();
  return {
    title: "Your " + minutes + "-minute " + activity.name + " session",
    summary: "Goal: " + goal.name + " · Experience: " + data.level + " · Location: " + data.place + ".",
    tip: levelText + (note ? " Your note: " + note : "")
      + " Check the plan with your PE teacher before starting."
      + " Stop if you feel pain, dizziness or unwell.",
    items
  };
}

function renderPlan() {
  const data = {
    goal: document.getElementById("goal").value,
    activity: document.getElementById("activity").value,
    level: document.getElementById("level").value,
    duration: document.getElementById("duration").value,
    equipment: document.getElementById("equipment").value,
    place: document.getElementById("place").value,
    notes: document.getElementById("notes").value
  };

  const plan = makePlan(data);
  document.getElementById("plan-title").textContent = plan.title;
  document.getElementById("plan-summary").textContent = plan.summary;
  document.getElementById("duration-pill").textContent = data.duration + " min";
  document.getElementById("coach-tip").textContent = plan.tip;

  planList.replaceChildren();
  plan.items.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = "plan-item";

    const number = document.createElement("span");
    number.className = "plan-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const content = document.createElement("div");
    const title = document.createElement("h4");
    title.textContent = item.title;
    const description = document.createElement("p");
    description.textContent = item.description;
    content.append(title, description);

    const time = document.createElement("span");
    time.className = "plan-time";
    time.textContent = item.time;

    article.append(number, content, time);
    planList.append(article);
  });

  results.hidden = false;
  results.scrollIntoView({ behavior: "smooth", block: "start" });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPlan();
});

document.getElementById("regenerate").addEventListener("click", renderPlan);
document.getElementById("print-plan").addEventListener("click", () => window.print());
