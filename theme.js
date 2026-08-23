const root = document.documentElement;
const themeToggle = document.querySelector('#themeToggle');
const themeToggleLabel = document.querySelector('#themeToggleLabel');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
	if (theme) {
		root.setAttribute('data-theme', theme);
	} else {
		root.removeAttribute('data-theme');
	}
	const isDark = theme ? theme === 'dark' : systemPrefersDark.matches;
	themeToggleLabel.textContent = isDark ? 'LIGHT' : 'DARK';
}

const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
	const isDark = root.getAttribute('data-theme') === 'dark'
		|| (!root.getAttribute('data-theme') && systemPrefersDark.matches);
	const nextTheme = isDark ? 'light' : 'dark';
	localStorage.setItem('theme', nextTheme);
	applyTheme(nextTheme);
});

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#nav');
menuButton.addEventListener('click', () => {
	const isOpen = nav.classList.toggle('is-open');
	menuButton.setAttribute('aria-expanded', String(isOpen));
	menuButton.textContent = isOpen ? 'CLOSE ×' : 'MENU +';
});
nav.addEventListener('click', () => {
	nav.classList.remove('is-open');
	menuButton.setAttribute('aria-expanded', 'false');
	menuButton.textContent = 'MENU +';
});
