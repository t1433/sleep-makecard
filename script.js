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
