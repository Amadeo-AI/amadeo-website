(() => {
  "use strict";
  const $tabs = (target, tabNumber = '') => {
    const _elemTabs = typeof target === 'string' ? document.querySelector(target) : target;
    const _showTab = function (tabsLinkTarget) {
        const tabsPaneTarget = document.querySelector(tabsLinkTarget.getAttribute('href'));
        const tabsLinkActive = tabsLinkTarget.parentElement.querySelector(`.tabs__link_active${tabNumber}`);
        const tabsPaneShow = tabsPaneTarget.parentElement.querySelector(`.tabs__pane_show${tabNumber}`);
        // если следующая вкладка равна активной, то завершаем работу
        if (tabsLinkTarget === tabsLinkActive) {
          return;
        }
        // удаляем классы у текущих активных элементов
        if (tabsLinkActive !== null) {
          tabsLinkActive.classList.remove(`tabs__link_active${tabNumber}`);
        }
        if (tabsPaneShow !== null) {
          tabsPaneShow.classList.remove(`tabs__pane_show${tabNumber}`);
        }
        // добавляем классы к элементам (в завимости от выбранной вкладки)
        tabsLinkTarget.classList.add(`tabs__link_active${tabNumber}`);
        tabsPaneTarget.classList.add(`tabs__pane_show${tabNumber}`);
      },
      _switchTabTo = function (tabsLinkIndex) {
        const tabsLinks = _elemTabs.querySelectorAll(`.tabs__link${tabNumber}`);
        if (tabsLinks.length > 0) {
          if (tabsLinkIndex > tabsLinks.length) {
            tabsLinkIndex = tabsLinks.length;
          } else if (tabsLinkIndex < 1) {
            tabsLinkIndex = 1;
          }
          _showTab(tabsLinks[tabsLinkIndex - 1]);
        }
      };

    const _eventTabsShow = new CustomEvent('tab.show', {detail: _elemTabs});

    _elemTabs.addEventListener('click', function (e) {
      const tabsLinkTarget = e.target;
      // завершаем выполнение функции, если кликнули не по ссылке
      if (!tabsLinkTarget.classList.contains(`tabs__link${tabNumber}`)) {
        return;
      }
      // отменяем стандартное действие
      e.preventDefault();
      _showTab(tabsLinkTarget);
    });

    return {
      showTab: function (target) {
        _showTab(target);
      },
      switchTabTo: function (index) {
        _switchTabTo(index);
      }
    }
  };

  $tabs('.tabs');
  $tabs('.tabs', 1);
  $tabs('.tabs', 2);
})();
