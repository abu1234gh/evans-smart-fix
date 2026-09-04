(() => {
  "use strict";

  /*
    Evan's Smart Fix
    Shared Shop & Repair / Accessories dropdown

    Edit ACCESSORY_LINKS below whenever you want
    to add, remove or rename an accessory page.

    This file does NOT touch social-dropdown.js.
  */

  const ACCESSORY_LINKS = [
    ["Cases", "cases.html"],
    ["Cables", "cables.html"],
    ["Chargers", "chargers.html"],
    ["Power Banks", "power-banks.html"],
    ["Headphones", "headphones.html"],
    ["Earbuds", "earbuds.html"],
    ["Adapters", "adapters.html"],
    ["Screen Protectors", "screen-protectors.html"],
    ["AirPods Cases", "airpods-cases.html"],
    ["Batteries", "batteries.html"],
    ["Camera Protectors", "camera-protectors.html"],
    ["Controllers", "controllers.html"],
    ["Phone Holders", "holders.html"],
    ["Keyboards", "keyboards.html"],
    ["Storage", "storage.html"],
    ["Watch Cases", "watch-cases.html"],
    ["View All Accessories", "accessories.html"]
  ];

  const REPAIR_LINK = [
    "Book a Repair",
    "brands.html"
  ];

  function addShopDropdownStyles() {

    if (document.getElementById("shared-shop-dropdown-styles")) {
      return;
    }

    const style = document.createElement("style");

    style.id = "shared-shop-dropdown-styles";

    style.textContent = `

      .nav-dropdown {
        position: relative;
      }

      .nav-dropdown > .dropdown-menu {
        min-width: 220px;
      }

      .shop-accessories-dropdown {
        position: relative;
      }

      .shop-accessories-dropdown > summary {
        cursor: pointer;
      }

      /* ACCESSORIES MENU */
      .shop-accessories-menu {
        box-sizing: border-box;

        display: grid !important;

        /* 3 items across */
        grid-template-columns: repeat(3, minmax(0, 1fr));

        /* Fill left to right, then next row */
        grid-auto-flow: row;

        /* Fixed row height */
        grid-auto-rows: 54px;

        gap: 6px;
        padding: 12px;

        width: min(650px, calc(100vw - 30px));
        max-width: calc(100vw - 30px);

        /*
          Around 3 rows visible.
          Scroll down for the rest.
        */
        max-height: 200px;

        overflow-y: auto;
        overflow-x: hidden;

        position: absolute;

        top: 100%;
        left: 50%;

        transform: translateX(-50%);

        z-index: 9999;

        border-radius: 18px;
      }

      .shop-accessories-menu a {
        box-sizing: border-box;

        display: flex;
        align-items: center;
        justify-content: center;

        min-width: 0;

        padding: 8px;

        white-space: normal;

        overflow-wrap: anywhere;

        text-align: center;

        line-height: 1.2;

        text-decoration: none;
      }

      /* TABLETS / SMALLER SCREENS */
      @media (max-width: 650px) {

        .shop-accessories-menu {
          grid-template-columns: repeat(2, minmax(0, 1fr));

          width: calc(100vw - 20px);

          max-width: calc(100vw - 20px);

          max-height: 200px;
        }

      }

      /* SMALL PHONES */
      @media (max-width: 380px) {

        .shop-accessories-menu {
          grid-template-columns: 1fr;
        }

      }

    `;

    document.head.appendChild(style);
  }

  function findShopDropdown() {

    const dropdowns =
      document.querySelectorAll(
        "details.nav-dropdown"
      );

    for (const details of dropdowns) {

      const summary =
        details.querySelector(
          ":scope > summary"
        );

      if (
        summary &&
        summary.textContent
          .trim()
          .toLowerCase()
          === "shop & repair"
      ) {
        return details;
      }
    }

    return null;
  }

  function buildShopDropdown() {

    const shopDropdown =
      findShopDropdown();

    if (!shopDropdown) {
      return;
    }

    let dropdownMenu =
      shopDropdown.querySelector(
        ":scope > .dropdown-menu"
      );

    if (!dropdownMenu) {

      dropdownMenu =
        document.createElement("div");

      dropdownMenu.className =
        "dropdown-menu";

      shopDropdown.appendChild(
        dropdownMenu
      );
    }

    /*
      Remove only the old Shop & Repair
      dropdown contents.

      Home, Basket and Socials stay untouched.
    */

    dropdownMenu.innerHTML = "";

    /* BOOK A REPAIR */

    const repairLink =
      document.createElement("a");

    repairLink.href =
      REPAIR_LINK[1];

    repairLink.textContent =
      REPAIR_LINK[0];

    dropdownMenu.appendChild(
      repairLink
    );

    /* ACCESSORIES */

    const accessoriesDetails =
      document.createElement("details");

    accessoriesDetails.className =
      "sub-dropdown shop-accessories-dropdown";

    const accessoriesSummary =
      document.createElement("summary");

    accessoriesSummary.textContent =
      "Accessories";

    accessoriesDetails.appendChild(
      accessoriesSummary
    );

    const accessoriesMenu =
      document.createElement("div");

    accessoriesMenu.className =
      "sub-dropdown-menu shop-accessories-menu";

    ACCESSORY_LINKS.forEach(
      ([label, href]) => {

        const link =
          document.createElement("a");

        link.href =
          href;

        link.textContent =
          label;

        accessoriesMenu.appendChild(
          link
        );
      }
    );

    accessoriesDetails.appendChild(
      accessoriesMenu
    );

    dropdownMenu.appendChild(
      accessoriesDetails
    );
  }

  function initShopDropdown() {

    addShopDropdownStyles();

    buildShopDropdown();
  }

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initShopDropdown
    );

  } else {

    initShopDropdown();
  }

})();