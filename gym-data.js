// ABOUTME: Exercise data + video tutorials for the Push/Pull/Legs guide page (gym.html)
// ABOUTME: Renders each list into its exercise-grid; every video id was verified to exist via YouTube's oembed endpoint

(function () {
  "use strict";

  const PUSH = [
    { name: "Barbell Bench Press", sets: "4×6–8", channel: "ATHLEAN-X", video: "vthMCtgVtFw" },
    { name: "Incline Barbell Press", sets: "4×6–8", channel: "ScottHermanFitness", video: "SrqOu55lrYU" },
    { name: "Standing Overhead Press", sets: "3×8–10", channel: "Alan Thrall", video: "eNFXEEdfQp4" },
    { name: "Dumbbell Shoulder Press", sets: "3×8–10", channel: "ScottHermanFitness", video: "qEwKCR5JCog" },
    { name: "Incline Dumbbell Press", sets: "3×10", channel: "ScottHermanFitness", video: "hChjZQhX1Ls" },
    { name: "Arnold Press", sets: "3×10", channel: "ATHLEAN-X", video: "ris9tKqMwgU" },
    { name: "Cable Fly", sets: "3×12–15", channel: "ScottHermanFitness", video: "eQ_NBB6OBH4" },
    { name: "Dumbbell Lateral Raise", sets: "3×12–15", channel: "ScottHermanFitness", video: "3VcKaXpzqRo" },
    { name: "Cable Lateral Raise", sets: "3×15", channel: "Renaissance Periodization", video: "lq7eLC30b9w" },
    { name: "Triceps Rope Pushdown", sets: "3×12–15", channel: "ATHLEAN-X", video: "REWv05om0ho" },
    { name: "EZ-Bar Skull Crushers", sets: "3×12", channel: "ScottHermanFitness", video: "d_KZxkY_0cM" },
    { name: "Dips", sets: "3×AMRAP", channel: "ATHLEAN-X", video: "OiTCw7JAN1w" },
  ];

  const PULL = [
    { name: "Conventional Deadlift", sets: "3×5", channel: "Alan Thrall", video: "Y1IGeJEXpF4" },
    { name: "Pull-ups", sets: "4×8–10", channel: "ScottHermanFitness", video: "ylVmNQlKdAI" },
    { name: "Weighted Pull-ups", sets: "4×6–8", channel: "ScottHermanFitness", video: "HuuyDNGrCI8" },
    { name: "Lat Pulldown", sets: "4×8–10", channel: "ScottHermanFitness", video: "CAwf7n6Luuc" },
    { name: "Barbell Bent-Over Row", sets: "3×8–10", channel: "Alan Thrall", video: "G8l_8chR5BE" },
    { name: "T-Bar Row", sets: "3×10", channel: "ScottHermanFitness", video: "j3Igk5nyZE4" },
    { name: "Seated Cable Row", sets: "3×10", channel: "ScottHermanFitness", video: "7o2oolbmzeI" },
    { name: "Face Pulls", sets: "3×15", channel: "ScottHermanFitness", video: "rep-qVOkqgk" },
    { name: "Dumbbell Rear Delt Fly", sets: "3×15", channel: "ScottHermanFitness", video: "ttvfGg9d76c" },
    { name: "Barbell Shrugs", sets: "3×12", channel: "ScottHermanFitness", video: "jTVbilkxSAk" },
    { name: "Barbell Curl", sets: "3×10", channel: "ScottHermanFitness", video: "QZEqB6wUPxQ" },
    { name: "Hammer Curl", sets: "3×12", channel: "ScottHermanFitness", video: "zC3nLlEvin4" },
    { name: "Preacher Curl", sets: "3×10", channel: "ScottHermanFitness", video: "nbcgEmZ0Be4" },
  ];

  const LEGS = [
    { name: "Back Squat", sets: "4×6–8", channel: "Squat University", video: "7v_V6xiA_AA" },
    { name: "Front Squat", sets: "4×6–8", channel: "Squat University", video: "uQeCK1vfj4E" },
    { name: "Romanian Deadlift", sets: "3×8–10", channel: "Jeff Nippard", video: "_oyxCn2iSjU" },
    { name: "Walking Lunges", sets: "3×12/leg", channel: "ScottHermanFitness", video: "0_9sJd9P8M0" },
    { name: "Leg Press", sets: "3×10–12", channel: "ScottHermanFitness", video: "oujca3_Shgw" },
    { name: "Leg Extension", sets: "3×12–15", channel: "ScottHermanFitness", video: "YyvSfVjQeL0" },
    { name: "Leg Curl", sets: "3×12", channel: "ScottHermanFitness", video: "ELOCsoDSmrg" },
    { name: "Standing Calf Raise", sets: "4×15", channel: "ScottHermanFitness", video: "YMmgqO8Jo-k" },
    { name: "Plank", sets: "3×45s", channel: "ATHLEAN-X", video: "wrRIs2Dk_8U" },
    { name: "Hanging Leg Raise", sets: "3×15", channel: "ATHLEAN-X", video: "Pr1ieGZ5atk" },
  ];

  function renderGrid(gridId, exercises) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    exercises.forEach((ex) => {
      const card = document.createElement("a");
      card.className = "exercise-card reveal";
      card.href = "https://www.youtube.com/watch?v=" + ex.video;
      card.target = "_blank";
      card.rel = "noopener";
      card.innerHTML = `
        <div class="exercise-thumb" style="background-image:url('https://img.youtube.com/vi/${ex.video}/hqdefault.jpg')"></div>
        <div class="exercise-info">
          <div class="exercise-name">${ex.name}</div>
          <div class="exercise-meta">
            <span class="exercise-sets">${ex.sets}</span>
            <span class="exercise-channel">${ex.channel}</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  renderGrid("push-grid", PUSH);
  renderGrid("pull-grid", PULL);
  renderGrid("legs-grid", LEGS);
})();
