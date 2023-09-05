const buttons = document.querySelectorAll("button");

buttons.forEach((item, index) => {
  item.addEventListener("click", () => {
    let itemText = item.innerText.replace(" ", "");

    let x = document.getElementById(`${itemText}Acc`);

    if (x.className.indexOf("show") == -1) {
      x.className = "show";
    } else {
      x.className = x.className.replace("show", "hide");
    }
  });
});
