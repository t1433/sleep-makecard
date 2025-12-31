const levelNumber = document.getElementById("levelNumber");
const levelRange = document.getElementById("levelRange");

levelNumber.addEventListener("input", () => {
  let value = Number(levelNumber.value);

  if (value < 1) value = 1;
  if (value > 100) value = 100;

  levelNumber.value = value;
  levelRange.value = value;
});

levelRange.addEventListener("input", () => {
  levelNumber.value = levelRange.value;
});

/*************************
 * DOM
 *************************/
const sleepHourInput = document.getElementById("sleepHour");
const sleepMinuteInput = document.getElementById("sleepMinute");
const maxCarryBox = document.getElementById("maxCarry");
const subSkillSelects = document.querySelectorAll(".sub-skill");

/*************************
 * イベント登録
 *************************/
sleepHourInput.addEventListener("input", updateMaxCarry);
sleepMinuteInput.addEventListener("input", updateMaxCarry);

subSkillSelects.forEach(select => {
  select.addEventListener("change", updateMaxCarry);
});

/*************************
 * 最大所持数 計算
 *************************/
function updateMaxCarry() {
  const sleepBonus = calcSleepBonus();
  const subSkillBonus = calcSubSkillBonus();

  const total = sleepBonus + subSkillBonus;

  maxCarryBox.textContent =
    `睡眠 +${sleepBonus} ／ サブスキル +${subSkillBonus} → 合計 +${total} 個`;
}

/*************************
 * 睡眠ボーナス
 *************************/
function calcSleepBonus() {
  const hours = Number(sleepHourInput.value) || 0;
  const minutes = Number(sleepMinuteInput.value) || 0;
  const totalHours = hours + minutes / 60;

  let bonus = 0;
  if (totalHours >= 200) bonus += 1;
  if (totalHours >= 500) bonus += 2;
  if (totalHours >= 1000) bonus += 3;
  if (totalHours >= 2000) bonus += 2;

  return bonus;
}

/*************************
 * サブスキルボーナス
 *************************/
function calcSubSkillBonus() {
  let bonus = 0;

  subSkillSelects.forEach(select => {
    const value = select.value;

    if (value === "最大所持数アップS") bonus += 6;
    if (value === "最大所持数アップM") bonus += 12;
    if (value === "最大所持数アップL") bonus += 18;
  });

  return bonus;
}

// 性格データ 
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

// 性格プルダウン生成
const natureSelect = document.getElementById("nature");
const natureDetail = document.getElementById("natureDetail");

natures.forEach((n, i) => {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = n.name;
  natureSelect.appendChild(option);
});

natureSelect.addEventListener("change", () => {
  const n = natures[natureSelect.value];
  natureDetail.textContent = n ? n.detail : "";
});

// フィールド「その他」切り替え
const foundField = document.getElementById("foundField");
const otherFieldWrapper = document.getElementById("otherFieldWrapper");

foundField.addEventListener("change", () => {
  otherFieldWrapper.style.display =
    foundField.value === "other" ? "block" : "none";
});

// 出力テスト
document.getElementById("generateBtn").addEventListener("click", () => {
  const result = {
    pokemonName: pokemonName.value,
    nickname: nickname.value,
    gender: gender.value,
    level: level.value,
    sleepTime: sleepTime.value,
    nature: natures[natureSelect.value]?.name,
    field:
      foundField.value === "other"
        ? otherField.value
        : foundField.value
  };

  document.getElementById("output").textContent =
    JSON.stringify(result, null, 2);
});
