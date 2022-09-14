function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  //Tabs

  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

  const hideContent = () => {
    tabsContent.forEach((elem) => {
      elem.classList.add("hide");
      elem.classList.remove("show", "fade");
    });

    tabs.forEach((elem) => {
      elem.classList.remove(activeClass);
    });
  };

  const showTabContent = (i = 0) => {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add(activeClass);
  };

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((elem, i) => {
        if (target == elem) {
          hideContent();
          showTabContent(i);
        }
      });
    }
  });

  hideContent();
  showTabContent();
}

export default tabs;
