// ===== レベル入力＆バー同期 =====
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

// ===== サブスキルデータ =====
const subSkills = [
  // 金
  { name: "きのみの数S", rarity: "gold" },
  { name: "おてつだいボーナス", rarity: "gold" },
  { name: "睡眠EXPボーナス", rarity: "gold" },
  { name: "ゆめのかけらボーナス", rarity: "gold" },
  { name: "リサーチEXPボーナス", rarity: "gold" },
  { name: "げんき回復ボーナス", rarity: "gold" },
  { name: "スキルレベルアップM", rarity: "gold" },
  // 青
  { name: "おてつだいスピードM", rarity: "blue" },
  { name: "食材確率アップM", rarity: "blue" },
  { name: "スキル確率アップM", rarity: "blue" },
  { name: "スキルレベルアップS", rarity: "blue" },
  { name: "最大所持数アップM", rarity: "blue" },
  { name: "最大所持数アップL", rarity: "blue" },
  // 白
  { name: "おてつだいスピードS", rarity: "white" },
  { name: "食材確率アップS", rarity: "white" },
  { name: "スキル確率アップS", rarity: "white" },
  { name: "最大所持数アップS", rarity: "white" },
];

subSkillSelects.forEach(select => {
  updateSubSkillColor(select);
});

// ===== サブスキルプルダウン生成 =====
const subSkillSelects = document.querySelectorAll(".subSkill");

function createSubSkillOptions(select) {
  const empty = document.createElement("option");
  empty.value = "";
  empty.textContent = "なし";
  select.appendChild(empty);

  subSkills.forEach((skill, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = skill.name;
    option.dataset.rarity = skill.rarity;
    select.appendChild(option);
  });
}

subSkillSelects.forEach(select => createSubSkillOptions(select));
function updateSubSkillOptions() {
  const selectedIndexes = Array.from(subSkillSelects)
    .map(sel => sel.value)
    .filter(v => v !== "");

  subSkillSelects.forEach(select => {
    Array.from(select.options).forEach(option => {
      if (option.value === "") return;

      option.disabled =
        selectedIndexes.includes(option.value) &&
        select.value !== option.value;
    });
  });
}

subSkillSelects.forEach(select => {
  select.addEventListener("change", () => {
    updateSubSkillOptions();     
    updateSubSkillColor(select); 
    updateMaxCarry();            
  });
});

const selectedSubSkills = Array.from(subSkillSelects)
  .map((sel, i) => ({
    level: [10, 25, 50, 75, 100][i],
    skill: subSkills[sel.value]?.name || null,
    rarity: subSkills[sel.value]?.rarity || null
  }));

function updateSubSkillColor(select) {
  select.classList.remove("white", "blue", "gold");

  const skill = subSkills[select.value];
  if (!skill) return;

  select.classList.add(skill.rarity);
}


// ===== 性格データ =====
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
  const n = natures[natureSelect.value];
  natureDetail.textContent = n ? n.detail : "";
}

natureSelect.addEventListener("change", updateNatureDetail);
mintCheck.addEventListener("change", updateNatureDetail);

// ===== フィールド その他 =====
const foundField = document.getElementById("foundField");
const otherFieldWrapper = document.getElementById("otherFieldWrapper");

foundField.addEventListener("change", () => {
  otherFieldWrapper.style.display =
    foundField.value === "other" ? "block" : "none";
});

// ===== 出力テスト =====
document.getElementById("generateBtn").addEventListener("click", () => {
  const result = {
    pokemonName: pokemonName.value,
    nickname: nickname.value,
    level: levelInput.value,
    nature: natures[natureSelect.value]?.name,
    field:
      foundField.value === "other"
        ? otherField.value
        : foundField.value
  };

  document.getElementById("output").textContent =
    JSON.stringify(result, null, 2);
});
