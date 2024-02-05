export default function menu(btnClass, menuClassParameter) {
    const buttonClass = btnClass,
            menuClass = menuClassParameter,
            buttonElement = document.querySelector(`.${buttonClass}`),
            menuElement = document.querySelector(`.${menuClass}`);

    buttonElement.addEventListener('click', e => {
        buttonElement.classList.toggle(`${buttonClass}--active`);
        menuElement.classList.toggle(`${menuClass}--active`);
    });
}