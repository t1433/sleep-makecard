const levelNumber = document.getElementById("levelNumber");
const levelRange = document.getElementById("levelRange");

// 数値 → バー
levelNumber.addEventListener("input", () => {
  let value = Number(levelNumber.value);

  if (value < 1) value = 1;
  if (value > 100) value = 100;

  levelNumber.value = value;
  levelRange.value = value;
});

// バー → 数値
levelRange.addEventListener("input", () => {
  levelNumber.value = levelRange.value;
});
