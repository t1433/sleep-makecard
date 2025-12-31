// ===== DOM =====
const pokemonSelect = document.getElementById("pokemonName");
const ingredientPattern = document.getElementById("ingredientPattern");
const mainSkillName = document.getElementById("mainSkillName");
const maxCarry = document.getElementById("maxCarry");

const sleepHour = document.getElementById("sleepHour");
const sleepMin = document.getElementById("sleepMin");

const helpHour = document.getElementById("helpHour");
const helpMin = document.getElementById("helpMin");
const helpSec = document.getElementById("helpSec");

const foundField = document.getElementById("foundField");
const otherFieldWrapper = document.getElementById("otherFieldWrapper");

const generateBtn = document.getElementById("generateBtn");
const output = document.getElementById("output");

// ===== レベル入力 & バー同期 =====
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

// ===== おてつだい時間整形 =====
function formatHelpTime() {
  const h = helpHour.value ? `${helpHour.value}時間` : "";
  const m = helpMin.value ? `${helpMin.value}分` : "";
  const s = helpSec.value ? `${helpSec.value}秒` : "";
  return [h, m, s].filter(Boolean).join("");
}

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

// ===== 食材パターン =====
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

// ===== 性格 =====
const natures = [
  { name: "がんばりや(無補正)", detail: "" },
  { name: "さみしがり(おてスピ↑げんき↓)", detail: "おてつだいスピード↑↑\nげんき回復量↓↓" },
  { name: "いじっぱり(おてスピ↑食材↓)", detail: "おてつだいスピード↑↑\n食材おてつだい確率↓↓" },
  { name: "やんちゃ(おてスピ↑スキル↓)", detail: "おてつだいスピード↑↑\nメインスキル発生率↓↓" },
  { name: "ゆうかん(おてスピ↑EXP↓)", detail: "おてつだいスピード↑↑\nEXP獲得量↓↓" },
  { name: "ずぶとい(げんき↑おてスピ↓)", detail: "げんき回復量↑↑\nおてつだいスピード↓↓" },
  { name: "わんぱく(げんき↑食材↓)", detail: "げんき回復量↑↑\n食材おてつだい確率↓↓" },
  { name: "のうてんき(げんき↑スキル↓)", detail: "げんき回復量↑↑\nメインスキル発生率↓↓" },
  { name: "のんき(げんき↑EXP↓)", detail: "げんき回復量↑↑\nEXP獲得量↓↓" },
  { name: "ひかえめ(食材↑おてスピ↓)", detail: "食材おてつだい確率↑↑\nおてつだいスピード↓↓" },
  { name: "おっとり(食材↑げんき↓)", detail: "食材おてつだい確率↑↑\nげんき回復量↓↓" },
  { name: "うっかりや(食材↑スキル↓)", detail: "食材おてつだい確率↑↑\nメインスキル発生率↓↓" },
  { name: "れいせい(食材↑EXP↓)", detail: "食材おてつだい確率↑↑\nEXP獲得量↓↓" },
  { name: "おだやか(スキル↑おてスピ↓)", detail: "メインスキル発生率↑↑\nおてつだいスピード↓↓" },
  { name: "おとなしい(スキル↑げんき↓)", detail: "メインスキル発生率↑↑\nげんき回復量↓↓" },
  { name: "しんちょう(スキル↑食材↓)", detail: "メインスキル発生率↑↑\n食材おてつだい確率↓↓" },
  { name: "なまいき(スキル↑EXP↓)", detail: "メインスキル発生率↑↑\nEXP獲得量↓↓" },
  { name: "おくびょう(EXP↑おてスピ↓)", detail: "EXP獲得量↑↑\nおてつだいスピード↓↓" },
  { name: "せっかち(EXP↑げんき↓)", detail: "EXP獲得量↑↑\nげんき回復量↓↓" },
  { name: "ようき(EXP↑食材↓)", detail: "EXP獲得量↑↑\n食材おてつだい確率↓↓" },
  { name: "むじゃき(EXP↑スキル↓)", detail: "EXP獲得量↑↑\nメインスキル発生率↓↓" }
];

const natureSelect = document.getElementById("nature");
const natureDetail = document.getElementById("natureDetail");
const mintCheck = document.getElementById("mint");

natures.forEach((n, i) => {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = n.name;
  natureSelect.appendChild(option);
});

function updateNatureDetail() {
  if (mintCheck.checked) {
    natureDetail.textContent = "";
    return;
  }
  natureDetail.textContent = natures[natureSelect.value]?.detail ?? "";
}

natureSelect.addEventListener("change", updateNatureDetail);
mintCheck.addEventListener("change", updateNatureDetail);

// ===== サブスキル =====
const subSkills = [
  { name: "きのみの数S", rarity: "gold" },
  { name: "おてつだいボーナス", rarity: "gold" },
  { name: "睡眠EXPボーナス", rarity: "gold" },
  { name: "ゆめのかけらボーナス", rarity: "gold" },
  { name: "リサーチEXPボーナス", rarity: "gold" },
  { name: "げんき回復ボーナス", rarity: "gold" },
  { name: "スキルレベルアップM", rarity: "gold" },
  { name: "スキルレベルアップS", rarity: "blue" },
  
  { name: "おてつだいスピードM", rarity: "blue" },
  { name: "おてつだいスピードS", rarity: "white" },
  { name: "食材確率アップM", rarity: "blue" },
  { name: "食材確率アップS", rarity: "white" },
  { name: "スキル確率アップM", rarity: "blue" },
  { name: "スキル確率アップS", rarity: "white" },
  { name: "最大所持数アップL", rarity: "blue" },
  { name: "最大所持数アップM", rarity: "blue" },
  { name: "最大所持数アップS", rarity: "white" }
];


const subSkillSelects = document.querySelectorAll(".subSkill");

function createSubSkillOptions(select) {
  const empty = document.createElement("option");
  empty.value = "";
  empty.textContent = "なし";
  select.appendChild(empty);

  subSkills.forEach((skill, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = skill.name;
    select.appendChild(option);
  });
}

subSkillSelects.forEach(createSubSkillOptions);

function updateSubSkillOptions() {
  const selected = Array.from(subSkillSelects)
    .map(sel => sel.value)
    .filter(v => v !== "");

  subSkillSelects.forEach(select => {
    Array.from(select.options).forEach(option => {
      if (option.value === "") return;

      option.disabled =
        selected.includes(option.value) &&
        select.value !== option.value;
    });
  });
}
function updateSubSkillColor(select) {
  select.classList.remove("white", "blue", "gold");

  const skill = subSkills[select.value];
  if (skill) {
    select.classList.add(skill.rarity);
  }
}
subSkillSelects.forEach(select => {
  select.addEventListener("change", () => {
    updateSubSkillOptions();    // 重複不可
    updateSubSkillColor(select); // 背景色保持
    updateMaxCarry();           // 最大所持数再計算
  });
});


// ===== 最大所持数 =====
function calcSleepBonus(hours) {
  if (hours >= 2000) return 8;
  if (hours >= 1000) return 6;
  if (hours >= 500) return 3;
  if (hours >= 200) return 1;
  return 0;
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

  maxCarry.textContent =
    base + calcSleepBonus(h + m / 60) + calcSubSkillBonus();
}

// ===== ポケモン変更時 =====
pokemonSelect.addEventListener("change", () => {
  const name = pokemonSelect.value;
  if (!pokemonDB[name]) return;

  mainSkillName.textContent = pokemonDB[name].mainSkill;
  updateIngredientSelect(name);
  updateMaxCarry();
});

sleepHour.addEventListener("input", updateMaxCarry);
sleepMin.addEventListener("input", updateMaxCarry);

// ===== フィールド =====
foundField.addEventListener("change", () => {
  otherFieldWrapper.style.display =
    foundField.value === "other" ? "block" : "none";
});

// ===== 出力 =====
generateBtn.addEventListener("click", () => {
  output.textContent = JSON.stringify({
    pokemon: pokemonSelect.value,
    level: levelInput.value,
    nature: natures[natureSelect.value]?.name,
    helpTime: formatHelpTime()
  }, null, 2);
});
