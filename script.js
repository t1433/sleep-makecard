/* =====================
   性格データ
===================== */
const natures = [
  { name: "がんばりや", detail: "" },
  { name: "さみしがり", detail: "おてつだいスピード↑↑\nげんき回復量↓↓" },
  { name: "いじっぱり", detail: "おてつだいスピード↑↑\n食材おてつだい確率↓↓" },
  { name: "やんちゃ", detail: "おてつだいスピード↑↑\nメインスキル発生率↓↓" },
  { name: "ゆうかん", detail: "おてつだいスピード↑↑\nEXP獲得量↓↓" },
  { name: "ずぶとい", detail: "げんき回復量↑↑\nおてつだいスピード↓↓" },
  { name: "わんぱく", detail: "げんき回復量↑↑\n食材おてつだい確率↓↓" },
  { name: "のうてんき", detail: "げんき回復量↑↑\nメインスキル発生率↓↓" },
  { name: "のんき", detail: "げんき回復量↑↑\nEXP獲得量↓↓" },
  { name: "ひかえめ", detail: "食材おてつだい確率↑↑\nおてつだいスピード↓↓" },
  { name: "おっとり", detail: "食材おてつだい確率↑↑\nげんき回復量↓↓" },
  { name: "うっかりや", detail: "食材おてつだい確率↑↑\nメインスキル発生率↓↓" },
  { name: "れいせい", detail: "食材おてつだい確率↑↑\nEXP獲得量↓↓" },
  { name: "おだやか", detail: "メインスキル発生率↑↑\nおてつだいスピード↓↓" },
  { name: "おとなしい", detail: "メインスキル発生率↑↑\nげんき回復量↓↓" },
  { name: "しんちょう", detail: "メインスキル発生率↑↑\n食材おてつだい確率↓↓" },
  { name: "なまいき", detail: "メインスキル発生率↑↑\nEXP獲得量↓↓" },
  { name: "おくびょう", detail: "EXP獲得量↑↑\nおてつだいスピード↓↓" },
  { name: "せっかち", detail: "EXP獲得量↑↑\nげんき回復量↓↓" },
  { name: "ようき", detail: "EXP獲得量↑↑\n食材おてつだい確率↓↓" },
  { name: "むじゃき", detail: "EXP獲得量↑↑\nメインスキル発生率↓↓" }
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
