const buttons = document.querySelectorAll("button");

buttons.forEach((item, index) => {
  item.addEventListener("click", () => {
    var x = document.getElementById("demoAcc");
    console.log(x);
    if (x.className.indexOf("show") == -1) {
      x.className = "show";
    } else {
      x.className = x.className.replace("show", "hide");
    }
  });
});
