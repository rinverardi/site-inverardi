addEventListener("load", () => {
    let hamburgerButton = document.getElementById("hamburgerMenu");

    hamburgerButton.addEventListener("click", toggleHamburgerLinks);
});

function toggleHamburgerLinks()
{
    let hamburgerLinks = document.getElementById("hamburgerLinks");

    if (hamburgerLinks.classList.contains('collapsed'))
        hamburgerLinks.classList.remove('collapsed');
    else
        hamburgerLinks.classList.add('collapsed');
}
