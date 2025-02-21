export default function () {
  const liEls = document.querySelectorAll('.subnav-item');

  // Note: Handle subnav items that contains selected items
  liEls.forEach((el) => {
    const hasActiveSubLi = !!el.querySelector('.is-active');
    if (!hasActiveSubLi) {
      closeSubnavItem(el);
    } else {
      el.classList.add('has-active');
    }
  });

  // Note: Handle click event on subnav toggles
  liEls.forEach((el) => {
    const toggleEl = el.querySelector('.subnav-toggle');

    const handleSubnavToggleClick = (event: Event) => {
      const closed = el.classList.contains('closed');

      // Note: Close all items
      liEls.forEach((liEl) => {
        closeSubnavItem(liEl);
      });

      if (closed) {
        openSubnavItem(el);
      }
    };

    toggleEl.addEventListener('click', handleSubnavToggleClick);
  });
}

function openSubnavItem(el: Element) {
  el.classList.remove('closed');
}

function closeSubnavItem(el: Element) {
  el.classList.add('closed');
}
