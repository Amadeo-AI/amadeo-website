(() => {
  "use strict";
  const formFields = ['name', 'email', 'phone', 'job-title', 'company'];
  formFields.forEach((id) => {
    document.getElementById(id).addEventListener("change", (event) => {
      (event.target.value && event.target.value.length > 2)
        ? event.currentTarget.parentElement.classList.remove('input-wrapper-error')
        : event.currentTarget.parentElement.classList.add('input-wrapper-error');
    });
  })

  /* Look for any elements with the class "custom-select": */
  const x = document.getElementsByClassName("custom-select");
  const l = x.length;
  for (let i = 0; i < l; i++) {
    const selElmnt = x[i].getElementsByTagName("select")[0];
    const ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    const a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    const b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (let j = 1; j < ll; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      const c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        const s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        const sl = s.length;
        const h = this.parentNode.previousSibling;
        for (let i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            const y = this.parentNode.getElementsByClassName("same-as-selected");
            const yl = y.length;
            for (let k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
      this.classList.add("select-checked");
    });
  }

  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    const arrNo = [];
    const x = document.getElementsByClassName("select-items");
    const y = document.getElementsByClassName("select-selected");
    const xl = x.length;
    const yl = y.length;
    for (let i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");

      }
    }
    for (let i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);
})()
