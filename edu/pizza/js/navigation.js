addEventListener("load", () => {
    var hamburgerButton = document.getElementById("hamburgerMenu");

    hamburgerButton.addEventListener("click", toggleHamburgerLinks);
});

function toggleHamburgerLinks()
{
    var hamburgerLinks = document.getElementById("hamburgerLinks");

    if (hamburgerLinks.classList.contains('collapsed'))
        hamburgerLinks.classList.remove('collapsed');
    else
        hamburgerLinks.classList.add('collapsed');
}
