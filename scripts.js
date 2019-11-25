const HIDE_OFFSET = "-70px"; // This is the amount of pixels to move the menu up when it closes
const SHOW_OFFSET = "70px"; // This is the amount of pixels to move the menu down when it opens

function toggleMenu(idName = "dropdownMenuOne") {
  let menu = document.getElementById(idName);
  let otherMenu = "";
  if (idName === "dropdownMenuOne") {
    otherMenu = "dropdownMenuTwo";
  } else {
    otherMenu = "dropdownMenuOne";
  }
  closeMenuIfOpen(otherMenu);

  toggleButtonText(idName);

  if (menu.style.marginTop !== SHOW_OFFSET) {
    menu.style.marginTop = SHOW_OFFSET;
    toggleFocus(menu, true);
    toggleButtonText(idName, "Close");
  } else {
    closeMenuIfOpen(idName);
  }
}

function closeMenuIfOpen(idName = "dropdownMenuOne") {
  let menu = document.getElementById(idName);
  if (menu.style.marginTop === SHOW_OFFSET) {
    menu.style.marginTop = HIDE_OFFSET;
    toggleFocus(menu, false);
    if (idName === "dropdownMenuOne") {
      toggleButtonText(idName, "Menu 1");
    } else {
      toggleButtonText(idName, "Menu 2");
    }
  }
}

function toggleButtonText(idName, text) {
  let button = document.getElementById(idName + "Button");
  button.innerHTML = text;
}

// We need to know if there has been a click anywhere on the page outside of the buttons
// so we can close the menus
window.onclick = function(event) {
  if (!event.target.matches(".dropdownMenu-button")) {
    closeMenuIfOpen("dropdownMenuOne");
    closeMenuIfOpen("dropdownMenuTwo");
  }
};

// https://jsfiddle.net/m9w8m/
document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    closeMenuIfOpen();
    closeMenuIfOpen("dropdownMenuTwo");
  }
};

// I ended up reusing these two function from a post on github
// https://github.com/edenspiekermann/a11y-dialog/issues/70
function toggleFocus(parent, focusable) {
  var elements = getFocusableElements(parent);

  elements.forEach(function(el) {
    if (focusable) {
      if (el.getAttribute("data-tabindex") !== undefined) {
        el.setAttribute("tabindex", el.getAttribute("data-tabindex"));
      } else {
        el.removeAttribute("tabindex");
      }
    } else {
      if (el.getAttribute("tabindex") !== undefined) {
        el.setAttribute("data-tabindex", el.getAttribute("tabindex"));
      }

      el.setAttribute("tabindex", -1);
    }
  });
}

function getFocusableElements(parent) {
  return [
    parent.querySelectorAll("input"),
    parent.querySelectorAll("a"),
    parent.querySelectorAll("button"),
    parent.querySelectorAll("[tabindex]")
  ].reduce(function(prev, current) {
    return prev.concat([].slice.apply(current));
  }, []);
}