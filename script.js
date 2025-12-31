// ===== DOM =====
const pokemonSelect = document.getElementById("pokemonName");
const ingredientPattern = document.getElementById("ingredientPattern");
const mainSkillName = document.getElementById("mainSkillName");
const maxCarry = document.getElementById("maxCarry");

const sleepHour = document.getElementById("sleepHour");
const sleepMin = document.getElementById("sleepMin");

const foundField = document.getElementById("foundField");
const otherFieldWrapper = document.getElementById("otherFieldWrapper");

const generateBtn = document.getElementById("generateBtn");
const output = document.getElementById("output");

// ===== レベル同期 =====
const levelInput = document.getElementById("levelInput");
const levelRange = document.getElementById("levelRange");
const levelValue = document.getElementById("levelValue");

function syncLevel(value) {
  levelInput.value = value;
  levelRange.value = value;
  levelValue.textContent = value;
}
levelInput.addEventListener("input", () => syncLevel(levelInput.value));
levelRange.addEventListener("input", () => syncLevel(levelRange.value));
syncLevel(1);

// ===== ポケモン選択初期化 =====
function initPokemonSelect() {
  Object.keys(pokemonDB).forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    pokemonSelect.appendChild(option);
  });
}
initPokemonSelect();

// ===== 食材パターン生成 =====
function generateIngredientPatterns(name) {
  const data = pokemonDB[name];
  if (!data) return [];

  const { A, B, C } = data.ingredients;

  const patterns = [
    { label: "AAA", text: `${A} ー ${A} ー ${A}` },
    { label: "AAB", text: `${A} ー ${A} ー ${B}` },
    { label: "ABB", text: `${A} ー ${B} ー ${B}` },
    { label: "BBB", text: `${B} ー ${B} ー ${B}` }
  ];

  if (C) {
    patterns.push(
      { label: "AAC", text: `${A} ー ${A} ー ${C}` },
      { label: "ACC", text: `${A} ー ${C} ー ${C}` }
    );
  }

  return patterns;
}

function updateIngredientSelect(name) {
  ingredientPattern.innerHTML = "";

  generateIngredientPatterns(name).forEach(p => {
    const option = document.createElement("option");
    option.value = p.label;
    option.textContent = `${p.text}（${p.label}）`;
    ingredientPattern.appendChild(option);
  });
}

// ===== 最大所持数 =====
function calcSleepBonus(hours) {
  let bonus = 0;
  if (hours >= 200) bonus += 1;
  if (hours >= 500) bonus += 2;
  if (hours >= 1000) bonus += 3;
  if (hours >= 2000) bonus += 2;
  return bonus;
}

function calcSubSkillBonus() {
  let bonus = 0;
  subSkillSelects.forEach(sel => {
    const name = subSkills[sel.value]?.name;
    if (name === "最大所持数アップS") bonus += 6;
    if (name === "最大所持数アップM") bonus += 12;
    if (name === "最大所持数アップL") bonus += 18;
  });
  return bonus;
}

function updateMaxCarry() {
  const name = pokemonSelect.value;
  if (!pokemonDB[name]) {
    maxCarry.textContent = "---";
    return;
  }

  const base = pokemonDB[name].baseCarry;
  const h = Number(sleepHour.value || 0);
  const m = Number(sleepMin.value || 0);

  const total =
    base +
    calcSleepBonus(h + m / 60) +
    calcSubSkillBonus();

  maxCarry.textContent = total;
}

// ===== ポケモン選択時まとめ処理 =====
pokemonSelect.addEventListener("change", () => {
  const name = pokemonSelect.value;
  if (!name) return;

  mainSkillName.textContent = pokemonDB[name].mainSkill;
  updateIngredientSelect(name);
  updateMaxCarry();
});

sleepHour.addEventListener("input", updateMaxCarry);
sleepMin.addEventListener("input", updateMaxCarry);

// ===== フィールド その他 =====
foundField.addEventListener("change", () => {
  otherFieldWrapper.style.display =
    foundField.value === "other" ? "block" : "none";
});

// ===== 出力テスト =====
generateBtn.addEventListener("click", () => {
  const result = {
    pokemon: pokemonSelect.value,
    level: levelInput.value
  };
  output.textContent = JSON.stringify(result, null, 2);
});
