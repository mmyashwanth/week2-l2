// Constants and variables initialization.
const rootEl = document.getElementById("root");
const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};
let apiStatus = apiStatusConstants.initial;
let layoutData;
let productIndex = 0;

// Function to create HTML element dynamically based on provided tag name
const createElement = (tag) => {
  return document.createElement(tag);
};

// Function to fetch data asynchronously from the API
const fetchData = async () => {
  apiStatus = apiStatusConstants.inProgress;
  const response = await fetch("layout.json");
  if (response.ok) {
    const data = await response.json();
    layoutData = data;
    apiStatus = apiStatusConstants.success;
  } else {
    apiStatus = apiStatusConstants.failure;
  }
};
fetchData();

//-------------------------------------------------RENDER VIEWS-------------------------------------------------

// -------------------------------------------------Render success view-------------------------------------------------

// -------------------Header section-------------------
const renderHeaderSection = () => {
  const headerEl = createElement("header");
  rootEl.appendChild(headerEl);

  // Container
  const containerEl = createElement("div");
  containerEl.classList.add("container");
  headerEl.appendChild(containerEl);

  // Logo
  const logo = createElement("img");
  logo.src = "assets/Logo.png";
  logo.alt = "logo";
  containerEl.appendChild(logo);

  // Navmenu
  const navMenuData = layoutData.header.nav;
  const navEl = createElement("nav");
  containerEl.appendChild(navEl);

  const ulEl = createElement("ul");
  navEl.appendChild(ulEl);

  navMenuData.forEach((element) => {
    const { linkTitle } = element;
    const liEl = createElement("li");
    ulEl.appendChild(liEl);

    const anchorEl = createElement("a");
    anchorEl.textContent = linkTitle;
    liEl.appendChild(anchorEl);
  });

  // CTA
  const displaySignupBtn = layoutData.header.showSignupButton;
  const signupBtnEl = createElement("button");
  signupBtnEl.classList.add("signup-btn");
  signupBtnEl.textContent = "sign up";
  containerEl.appendChild(signupBtnEl);
};

// -------------------Banner section-------------------
const renderBannerSection = () => {
  const mainEl = createElement("main");
  rootEl.appendChild(mainEl);

  // Container
  const containerEl = createElement("div");
  containerEl.classList.add("container");
  mainEl.appendChild(containerEl);

  const articleEl = createElement("article");
  articleEl.classList.add("product-bg-container");
  containerEl.appendChild(articleEl);

  // Product details
  const productDetails = layoutData.sectionBlocks;
  const { heading, subHeading, description, price, media } =
    productDetails[productIndex];

  const productDetailsContainerEl = createElement("div");
  productDetailsContainerEl.classList.add("product-details-container");
  articleEl.appendChild(productDetailsContainerEl);

  const productHeadingEl = createElement("h2");
  productHeadingEl.id = "heading";
  productHeadingEl.textContent = heading;
  productDetailsContainerEl.appendChild(productHeadingEl);

  const productSubHeadingEl = createElement("h3");
  productSubHeadingEl.id = "subHeading";
  productSubHeadingEl.textContent = subHeading;
  productDetailsContainerEl.appendChild(productSubHeadingEl);

  productSubHeadingEl.innerHTML = productSubHeadingEl.textContent.replace(
    "Choose Us",
    "<span style='color: black;'>Choose Us</span>"
  );

  const descriptionEl = createElement("p");
  descriptionEl.id = "description";
  descriptionEl.textContent = description;
  productDetailsContainerEl.appendChild(descriptionEl);

  const priceEl = createElement("p");
  priceEl.id = "price";
  priceEl.classList.add("price");
  priceEl.textContent = price;
  productDetailsContainerEl.appendChild(priceEl);

  //Social icons
  const socialIcons = layoutData.socialIcons;

  const socialIconsContainer = createElement("section");
  socialIconsContainer.classList.add("social-icons-container");
  productDetailsContainerEl.appendChild(socialIconsContainer);

  socialIcons.forEach((element) => {
    const socialIcon = createElement("div");
    socialIcon.innerHTML = element.icon;
    socialIcon.classList.add("social-icon");
    socialIconsContainer.appendChild(socialIcon);
  });

  // Product thumbnail
  const splideContainerEl = createElement("section");
  splideContainerEl.innerHTML = `
  <section id= "splide" class="splide" aria-label="Splide Basic HTML Example">
    <div class="splide__arrows">
      <button id="splidePrevBtn" class="splide__arrow splide__arrow--prev">
        <i class="fa-solid fa-angle-left"></i>
      </button>
      <button id="splideNextBtn" class="splide__arrow splide__arrow--next">
        <i class="fa-solid fa-angle-right"></i>
      </button>
    </div>
    <div class="splide__track">
      <ul class="splide__list"></ul>
    </div>
  </section>
  `;
  splideContainerEl.classList.add("splide-container");
  articleEl.appendChild(splideContainerEl);

  productDetails.forEach((element) => {
    const splideListEl = splideContainerEl.querySelector(".splide__list");

    const splideSlideEl = createElement("li");
    splideSlideEl.classList.add("splide__slide", "splide__li");

    splideListEl.appendChild(splideSlideEl);

    const imgEl = createElement("img");
    imgEl.classList.add("splide-img");
    imgEl.src = element.media;
    imgEl.alt = "thumbnail";
    splideSlideEl.appendChild(imgEl);
  });

  // Initialize Splide
  var splide = new Splide(".splide", {
    perPage: 1,
    pagination: false,
  });
  splide.mount();

  const splidePrevBtnEl = document.getElementById("splidePrevBtn");
  splidePrevBtnEl.addEventListener("click", () => {
    if (productIndex > 0) {
      productIndex -= 1;
      //Change background
      const bodyEl = document.body;
      const { gradient } = layoutData.sectionBlocks[productIndex];
      bodyEl.style.backgroundImage = `linear-gradient(to right, ${gradient[0]}, ${gradient[1]})`;
      // Product details
      const productDetails = layoutData.sectionBlocks;
      const { heading, subHeading, description, price } =
        productDetails[productIndex];

      const productHeadingEl = document.getElementById("heading");
      productHeadingEl.textContent = heading;

      const productSubHeadingEl = document.getElementById("subHeading");
      productSubHeadingEl.textContent = subHeading;

      productSubHeadingEl.innerHTML = productSubHeadingEl.textContent.replace(
        "Choose Us",
        "<span style='color: black;'>Choose Us</span>"
      );

      const descriptionEl = document.getElementById("description");
      descriptionEl.textContent = description;

      const priceEl = document.getElementById("price");
      priceEl.textContent = price;
    }
  });

  const splideNextBtnEl = document.getElementById("splideNextBtn");
  splideNextBtnEl.addEventListener("click", () => {
    if (productIndex <= productDetails.length - 1) {
      productIndex += 1;
      //Change background
      const bodyEl = document.body;
      const { gradient } = layoutData.sectionBlocks[productIndex];
      bodyEl.style.backgroundImage = `linear-gradient(to right, ${gradient[0]}, ${gradient[1]})`;
      // Product details
      const productDetails = layoutData.sectionBlocks;
      const { heading, subHeading, description, price } =
        productDetails[productIndex];

      const productHeadingEl = document.getElementById("heading");
      productHeadingEl.textContent = heading;

      const productSubHeadingEl = document.getElementById("subHeading");
      productSubHeadingEl.textContent = subHeading;

      productSubHeadingEl.innerHTML = productSubHeadingEl.textContent.replace(
        "Choose Us",
        "<span style='color: black;'>Choose Us</span>"
      );

      const descriptionEl = document.getElementById("description");
      descriptionEl.textContent = description;

      const priceEl = document.getElementById("price");
      priceEl.textContent = price;
    }
  });
};

const renderSuccessView = () => {
  const bodyEl = document.body;
  const { gradient } = layoutData.sectionBlocks[productIndex];
  bodyEl.style.backgroundImage = `linear-gradient(to right, ${gradient[0]}, ${gradient[1]})`;
  renderHeaderSection();
  renderBannerSection();
};

// --------------------Conditional rendering based on Api status--------------------
fetchData().then(() => {
  switch (apiStatus) {
    case apiStatusConstants.inProgress:
      return renderLoadingView();
    case apiStatusConstants.success:
      return renderSuccessView();
    case apiStatusConstants.failure:
      return renderFailureView();
    default:
      console.log("Unknown status");
  }
});
