function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function keepTheme() {

  if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-dark');
    } else if (localStorage.getItem('theme') === 'theme-light') {
      setTheme('theme-light')
    }
     else if((window.matchMedia) &&
     (window.matchMedia('(prefers-color-scheme: dark)').matches))
     {console.log("hhhhhhhhhhhhh")
        setTheme('theme-windows')
      }
    }
    else if ((window.matchMedia) &&
    (window.matchMedia('(prefers-color-scheme: light)').matches)) {
    setTheme('theme-windows')
  }
  else{setTheme('theme-light')}
}

module.exports = {
  setTheme,
  keepTheme
}