const HomePage = (() => {
    const homeContainer = document.createElement('div');
    homeContainer.id = 'home-container';

    const heading = document.createElement('h1');
    heading.id = 'homepage-heading';
    heading.textContent = "EXQUISITELY GOOD";
    
    const bannerImage = document.createElement('img');
    bannerImage.id = 'homepage-banner';
    bannerImage.src = "https://img2.rtve.es/v/6897051?w=1600&preview=1684846584492.jpg";

    const descriptionText = document.createElement('p');
    descriptionText.id = 'homepage-text';
    descriptionText.textContent = "Our homemade Tiramisu will melt in your mouth!";

    homeContainer.appendChild(bannerImage);
    homeContainer.appendChild(heading);
    homeContainer.appendChild(descriptionText);
    

    return { homeContainer };
})();

const { homeContainer } = HomePage;
export { homeContainer };