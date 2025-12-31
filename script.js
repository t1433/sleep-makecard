/* =====================
   性格データ
===================== */
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

/* =====================
   ポケモンデータ（例）
===================== */
const pokemonData = {
  ピカチュウ: {
    type: "でんき",
    mainSkill: "げんきチャージS",
    baseCarry: 20,
    ingredients: {
      A: "とくせんリンゴ",
      B: "モーモーミルク",
      C: "あまいミツ"
    },
    hasC: true
  },

  コダック: {
    type: "みず",
    mainSkill: "ゆめのかけらゲットS",
    baseCarry: 18,
    ingredients: {
      A: "あんみんトマト",
      B: "モーモーミルク"
    },
    hasC: false
  }
};

/* =====================
   食材パターン
===================== */
const ingredientPatternsABC = ["AAA", "AAB", "AAC", "ABA", "ABB", "ABC"];
const ingredientPatternsAB  = ["AAA", "AAB", "ABA", "ABB"];

/* =====================
   初期化
===================== */
const pokemonSelect = document.getElementById("pokemonSelect");
const natureSelect = document.getElementById("nature");
const ingredientSelect = document.getElementById("ingredientPattern");

Object.keys(pokemonData).forEach(name => {
  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  pokemonSelect.appendChild(option);
});

natures.forEach((n, i) => {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = n.name;
  natureSelect.appendChild(option);
});

/* =====================
   食材プルダウン生成
===================== */
function generateIngredientOptions(pokemonName) {
  ingredientSelect.innerHTML = "";

  const data = pokemonData[pokemonName];
  if (!data) return;

  const patterns = data.hasC ? ingredientPatternsABC : ingredientPatternsAB;

  patterns.forEach(pattern => {
    const label = pattern
      .split("")
      .map(letter => data.ingredients[letter])
      .join(" ー ");

    const option = document.createElement("option");
    option.value = pattern;
    option.textContent = label;

    ingredientSelect.appendChild(option);
  });
}

pokemonSelect.addEventListener("change", e => {
  generateIngredientOptions(e.target.value);
});

/* =====================
   フィールド「その他」
===================== */
const foundField = document.getElementById("foundField");
const otherFieldWrapper = document.getElementById("otherFieldWrapper");

foundField.addEventListener("change", () => {
  otherFieldWrapper.style.display =
    foundField.value === "other" ? "block" : "none";
});

/* =====================
   出力テスト
===================== */
document.getElementById("generateBtn").addEventListener("click", () => {
  const nature = natures[natureSelect.value];

  const result = {
    pokemon: pokemonSelect.value,
    nickname: nickname.value,
    gender: gender.value,
    level: level.value,
    sp: sp.value,
    sleepTime: sleepTime.value,
    nature: nature
      ? `${nature.name}${nature.detail ? "（" + nature.detail.replace(/\n/g, " / ") + "）" : ""}`
      : "",
    ingredientPattern: ingredientSelect.value,
    foundDate: foundDate.value,
    foundField:
      foundField.value === "other" ? otherField.value : foundField.value
  };

  output.textContent = JSON.stringify(result, null, 2);
});
