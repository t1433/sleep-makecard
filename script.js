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

const sleepHourInput = document.getElementById("sleepHour");
const sleepMinuteInput = document.getElementById("sleepMinute");
const maxCarryBox = document.getElementById("maxCarry");

sleepHourInput.addEventListener("input", updateCarryFromSleep);
sleepMinuteInput.addEventListener("input", updateCarryFromSleep);

function updateCarryFromSleep() {
  const hours = Number(sleepHourInput.value) || 0;
  const minutes = Number(sleepMinuteInput.value) || 0;

  const totalHours = hours + minutes / 60;

  let bonus = 0;

  if (totalHours >= 200) bonus += 1;
  if (totalHours >= 500) bonus += 2;
  if (totalHours >= 1000) bonus += 3;
  if (totalHours >= 2000) bonus += 2;

  maxCarryBox.textContent = `睡眠ボーナス +${bonus} 個`;
}
