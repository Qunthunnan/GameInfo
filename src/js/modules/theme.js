export class ThemeChanger {
    constructor(switcherClass, lightThemeClass, darkThemeClass, onChanging) {
        this.switcherClass = switcherClass;
        this.lightThemeClass = lightThemeClass;
        this.darkThemeClass = darkThemeClass;
        this.curentTheme;

        this.onChanging = onChanging;

        this.switcherElement = document.querySelector(`.${this.switcherClass}`);

        this.switcherElement.addEventListener('click', e => {
            this.switchTheme();
        });

        this.loadData();
    }

    switchTheme(themeClass) {
        if(document.documentElement.matches(`.${this.lightThemeClass}`) || themeClass === this.darkThemeClass) {
            this.setTheme(this.darkThemeClass);
            this.switcherElement.style['justify-content'] = 'end';
        } else {
            this.setTheme(this.lightThemeClass);
            this.switcherElement.style['justify-content'] = 'start';
        }
    }

    setTheme(themeClass) {
        document.documentElement.classList.remove(this.lightThemeClass);
        document.documentElement.classList.remove(this.darkThemeClass);

        document.documentElement.classList.add(themeClass);
        this.curentTheme = themeClass;
        localStorage.setItem('theme', this.curentTheme);
        this.onChanging();
    }

    loadData() {
        const userTheme = localStorage.getItem('theme');
        if(userTheme) {
            this.switchTheme(userTheme);
        } else {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            if(mediaQuery.matches) {
                this.switchTheme(this.darkThemeClass);
            } else {
                this.switchTheme(this.lightThemeClass);
            }
        }
    }
}