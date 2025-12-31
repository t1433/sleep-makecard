/* =====================
  食材データ
===================== */
const foodList = [
  "ふといながねぎ",
  "あじわいキノコ",
  "とくせんエッグ",
  "ほっこりポテト",
  "とくせんリンゴ",
  "げきからハーブ",
  "マメミート",
  "モーモーミルク",
  "あまいミツ",
  "ピュアなオイル",
  "あったかジンジャー",
  "あんみんトマト",
  "リラックスカカオ",
  "おいしいシッポ",
  "ワカクサ大豆",
  "ワカクサコーン",
  "めざましコーヒー",
  "ずっしりカボチャ",
  "つやつやアボカド"
];

/* =====================
  サブスキルデータ
===================== */
const subSkills = [
  // 白
  { name: "最大所持数アップS", rarity: "white" },
  { name: "おてつだいスピードS", rarity: "white" },
  { name: "食材確率アップS", rarity: "white" },
  { name: "スキル確率アップS", rarity: "white" },

  // 青
  { name: "最大所持数アップM", rarity: "blue" },
  { name: "最大所持数アップL", rarity: "blue" },
  { name: "おてつだいスピードM", rarity: "blue" },
  { name: "食材確率アップM", rarity: "blue" },
  { name: "スキル確率アップM", rarity: "blue" },
  { name: "スキルレベルアップS", rarity: "blue" },

  // 金
  { name: "きのみの数S", rarity: "gold" },
  { name: "おてつだいボーナス", rarity: "gold" },
  { name: "睡眠EXPボーナス", rarity: "gold" },
  { name: "ゆめのかけらボーナス", rarity: "gold" },
  { name: "リサーチEXPボーナス", rarity: "gold" },
  { name: "げんき回復ボーナス", rarity: "gold" },
  { name: "スキルレベルアップM", rarity: "gold" }
];

/* ソート：名前 → レアリティ（白→青→金） */
const rarityOrder = { white: 1, blue: 2, gold: 3 };
subSkills.sort((a, b) => {
  if (a.name === b.name) {
    return rarityOrder[a.rarity] - rarityOrder[b.rarity];
  }
  return a.name.localeCompare(b.name, "ja");
});

/* =====================
  性格データ
===================== */
const natures = [
  { name: "がんばりや(無補正)", detail: "" },

  { name: "さみしがり(おてスピ↑げんき↓)",
    detail: "おてつだいスピード↑↑\nげんき回復量↓↓" },

  { name: "いじっぱり(おてスピ↑食材↓)",
    detail: "おてつだいスピード↑↑\n食材おてつだい確率↓↓" },

  { name: "やんちゃ(おてスピ↑スキル↓)",
    detail: "おてつだいスピード↑↑\nメインスキル発生率↓↓" },

  { name: "ゆうかん(おてスピ↑EXP↓)",
    detail: "おてつだいスピード↑↑\nEXP獲得量↓↓" },

  { name: "ずぶとい(げんき↑おてスピ↓)",
    detail: "げんき回復量↑↑\nおてつだいスピード↓↓" },

  { name: "わんぱく(げんき↑食材↓)",
    detail: "げんき回復量↑↑\n食材おてつだい確率↓↓" },

  { name: "のうてんき(げんき↑スキル↓)",
    detail: "げんき回復量↑↑\nメインスキル発生率↓↓" },

  { name: "のんき(げんき↑EXP↓)",
    detail: "げんき回復量↑↑\nEXP獲得量↓↓" },

  { name: "ひかえめ(食材↑おてスピ↓)",
    detail: "食材おてつだい確率↑↑\nおてつだいスピード↓↓" },

  { name: "おっとり(食材↑げんき↓)",
    detail: "食材おてつだい確率↑↑\nげんき回復量↓↓" },

  { name: "うっかりや(食材↑スキル↓)",
    detail: "食材おてつだい確率↑↑\nメインスキル発生率↓↓" },

  { name: "れいせい(食材↑EXP↓)",
    detail: "食材おてつだい確率↑↑\nEXP獲得量↓↓" },

  { name: "おだやか(スキル↑おてスピ↓)",
    detail: "メインスキル発生率↑↑\nおてつだいスピード↓↓" },

  { name: "おとなしい(スキル↑げんき↓)",
    detail: "メインスキル発生率↑↑\nげんき回復量↓↓" },

  { name: "しんちょう(スキル↑食材↓)",
    detail: "メインスキル発生率↑↑\n食材おてつだい確率↓↓" },

  { name: "なまいき(スキル↑EXP↓)",
    detail: "メインスキル発生率↑↑\nEXP獲得量↓↓" },

  { name: "おくびょう(EXP↑おてスピ↓)",
    detail: "EXP獲得量↑↑\nおてつだいスピード↓↓" },

  { name: "せっかち(EXP↑げんき↓)",
    detail: "EXP獲得量↑↑\nげんき回復量↓↓" },

  { name: "ようき(EXP↑食材↓)",
    detail: "EXP獲得量↑↑\n食材おてつだい確率↓↓" },

  { name: "むじゃき(EXP↑スキル↓)",
    detail: "EXP獲得量↑↑\nメインスキル発生率↓↓" }
];

/* =====================
  DOM生成処理
===================== */
document.addEventListener("DOMContentLoaded", () => {

  /* 食材プルダウン */
  ["foodA", "foodB", "foodC"].forEach(id => {
    const select = document.getElementById(id);
    foodList.forEach(food => {
      const option = document.createElement("option");
      option.value = food;
      option.textContent = food;
      select.appendChild(option);
    });
  });

  /* サブスキル */
  document.querySelectorAll(".subSkill").forEach(select => {
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "なし";
    select.appendChild(empty);

    subSkills.forEach(skill => {
      const option = document.createElement("option");
      option.value = skill.name;
      option.textContent = skill.name;
      option.dataset.rarity = skill.rarity;
      select.appendChild(option);
    });
  });

  /* 性格 */
  const natureSelect = document.getElementById("nature");
  const natureDetail = document.getElementById("natureDetail");

  natures.forEach(nature => {
    const option = document.createElement("option");
    option.value = nature.name;
    option.textContent = nature.name;
    natureSelect.appendChild(option);
  });

  natureSelect.addEventListener("change", () => {
    const selected = natures.find(n => n.name === natureSelect.value);
    natureDetail.textContent = selected?.detail || "";
  });

});
/* =====================
  最大所持数 自動計算
===================== */

/* ポケモン固有の基本最大所持数（例） */
const baseCarryMap = {
  "メタモン": 10,
  "ピカチュウ": 15,
  "カビゴン": 20
  // ←ここに追加していく
};

/* サブスキルによる増加量 */
const carryUpMap = {
  "最大所持数アップS": 6,
  "最大所持数アップM": 12,
  "最大所持数アップL": 18
};

/* 睡眠時間による増加 */
function calcSleepBonus(hours) {
  let bonus = 0;
  if (hours >= 200) bonus += 1;
  if (hours >= 500) bonus += 2;
  if (hours >= 1000) bonus += 3;
  if (hours >= 2000) bonus += 2;
  return bonus;
}

/* 最大所持数を再計算 */
function updateMaxCarry() {
  const pokemonName = document.getElementById("pokemonName").value;
  const sleepHours = Number(document.getElementById("sleepHours").value) || 0;
  const display = document.getElementById("maxCarryDisplay");

  /* 基本値 */
  let total = baseCarryMap[pokemonName] ?? 0;

  /* サブスキル補正 */
  document.querySelectorAll(".subSkill").forEach(select => {
    const skill = select.value;
    if (carryUpMap[skill]) {
      total += carryUpMap[skill];
    }
  });

  /* 睡眠補正 */
  total += calcSleepBonus(sleepHours);

  display.textContent = total > 0 ? total : "（未確定）";
}

/* =====================
  イベント登録
===================== */
document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("pokemonName")
    .addEventListener("input", updateMaxCarry);

  document.getElementById("sleepHours")
    .addEventListener("input", updateMaxCarry);

  document.querySelectorAll(".subSkill").forEach(select => {
    select.addEventListener("change", updateMaxCarry);
  });

});
