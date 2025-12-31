/***********************
 * マスターデータ
 ***********************/

// ポケモン（例・あとで増やす）
const pokemonMaster = {
  "ピカチュウ": {
    mainSkill: "エナジーチャージS",
    baseCarry: 10,
    ingredients: [
      ["とくせんリンゴ", "とくせんリンゴ", "とくせんリンゴ"],
      ["とくせんリンゴ", "とくせんリンゴ", "モーモーミルク"],
      ["とくせんリンゴ", "モーモーミルク", "モーモーミルク"]
    ]
  }
};

// サブスキル
const subSkills = [
  { name: "最大所持数アップS", rarity: "white", carry: 6 },
  { name: "最大所持数アップM", rarity: "blue", carry: 12 },
  { name: "最大所持数アップL", rarity: "blue", carry: 18 },
  { name: "おてつだいスピードS", rarity: "white" },
  { name: "きのみの数S", rarity: "gold" }
];

// 性格
const natures = [
  {
    name: "がんばりや(無補正)",
    detail: ""
  },
  {
    name: "いじっぱり(おてスピ↑食材↓)",
    detail: "おてつだいスピード↑↑\n食材おてつだい確率↓↓"
  },
  {
    name: "ひかえめ(食材↑おてスピ↓)",
    detail: "食材おてつだい確率↑↑\nおてつだいスピード↓↓"
  }
];

// 出会ったフィールド
const fields = [
  "ワカクサ本島",
  "シアンの砂浜",
  "トープ洞窟",
  "ウノハナ雪原",
  "ラピスラズリ湖畔",
  "ゴールド旧発電所",
  "アンバー渓谷",
  "ワカクサ本島EX"
];

/***********************
 * DOM取得
 ***********************/
const pokemonNameInput = document.getElementById("pokemonName");
const ingredientSelect = document.getElementById("ingredientPattern");
const mainSkillInput = document.querySelector("section:nth-of-type(2) input");
const levelInput = document.getElementById("level");
const levelValue = document.getElementById("levelValue");
const maxCarryBox = document.getElementById("maxCarry");
const natureSelect = document.getElementById("nature");

/***********************
 * 初期化
 ***********************/
function init() {
  initNatureSelect();
  initSubSkillSelects();
  initFieldSelect();
}

init();

/***********************
 * レベル表示
 ***********************/
levelInput.addEventListener("input", () => {
  levelValue.textContent = levelInput.value;
});

/***********************
 * ポケモン選択時
 ***********************/
pokemonNameInput.addEventListener("change", () => {
  const name = pokemonNameInput.value;
  const data = pokemonMaster[name];
  if (!data) return;

  // メインスキル
  mainSkillInput.value = data.mainSkill;

  // 食材プルダウン
  ingredientSelect.innerHTML = "";
  data.ingredients.forEach(pattern => {
    const option = document.createElement("option");
    option.textContent = pattern.join(" ー ");
    ingredientSelect.appendChild(option);
  });

  updateMaxCarry();
});

/***********************
 * 最大所持数計算
 ***********************/
function updateMaxCarry() {
  const name = pokemonNameInput.value;
  const data = pokemonMaster[name];
  if (!data) {
    maxCarryBox.textContent = "-- 個";
    return;
  }

  let carry = data.baseCarry;

  // サブスキル分（所持数アップのみ）
  document.querySelectorAll("section:nth-of-type(2) select").forEach(select => {
    const skill = subSkills.find(s => s.name === select.value);
    if (skill && skill.carry) carry += skill.carry;
  });

  maxCarryBox.textContent = carry + " 個";
}

/***********************
 * サブスキル初期化
 ***********************/
function initSubSkillSelects() {
  const selects = document.querySelectorAll("section:nth-of-type(2) select");
  selects.forEach(select => {
    subSkills
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(skill => {
        const option = document.createElement("option");
        option.textContent = skill.name;
        select.appendChild(option);
      });

    select.addEventListener("change", updateMaxCarry);
  });
}

/***********************
 * 性格
 ***********************/
function initNatureSelect() {
  natures.forEach(nature => {
    const option = document.createElement("option");
    option.textContent = nature.name;
    natureSelect.appendChild(option);
  });
}

/***********************
 * フィールド
 ***********************/
function initFieldSelect() {
  const fieldSelect = document.querySelector("section:nth-of-type(3) select");
  fields.forEach(field => {
    const option = document.createElement("option");
    option.textContent = field;
    fieldSelect.appendChild(option);
  });
}
