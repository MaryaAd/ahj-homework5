let btn = document.querySelector(".btn-pop");
let pop = document.createElement("div");

pop.classList.add("pop-content");

let popTitle = document.createElement("div");
let popText = document.createElement("div");
let triangle = document.createElement("div"); // Создаем элемент для треугольника

popTitle.classList.add("pop-title");
popText.classList.add("pop-text");
triangle.classList.add("triangle"); // Добавляем класс для треугольника

popTitle.textContent = "Popover title";
popText.textContent = `And here's some amazing content. It's very engaging. Right?`;

btn.addEventListener("click", () => {
  const { top, left, width } = btn.getBoundingClientRect();

  if (document.querySelector(".pop-content")) {
    document.querySelector(".pop-content").remove();
  } else {
    pop.append(popTitle);
    pop.append(popText);
    pop.append(triangle);

    document.body.appendChild(pop);

    const popLeft = left - (pop.offsetWidth - width) / 2;
    const popTop = top - pop.offsetHeight - triangle.offsetHeight;
    pop.style.left = popLeft + "px";
    pop.style.top = popTop + "px";
  }
});
