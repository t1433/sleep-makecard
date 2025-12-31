// レベル表示だけ
const level = document.getElementById("level");
const levelValue = document.getElementById("levelValue");

level.addEventListener("input", () => {
  levelValue.textContent = level.value;
});
