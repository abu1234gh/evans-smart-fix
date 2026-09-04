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

      /* ========================================
         SHARED SHOP & REPAIR DROPDOWN
      ======================================== */

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


      /* ========================================
         ACCESSORIES MENU - DESKTOP
         2 ROWS
      ======================================== */

      .shop-accessories-menu {

        box-sizing: border-box;

        display: grid !important;

        grid-template-rows: repeat(2, auto);

        grid-auto-flow: column;

        grid-auto-columns: minmax(135px, 1fr);

        gap: 6px;

        padding: 12px;

        width: max-content;

        max-width: min(
          1100px,
          calc(100vw - 32px)
        );

        position: absolute;

        top: 100%;

        left: 50%;

        transform: translateX(-50%);

        overflow: visible;

        z-index: 9999;
      }


      .shop-accessories-menu a {

        box-sizing: border-box;

        display: flex;

        align-items: center;

        justify-content: flex-start;

        min-width: 135px;

        padding: 10px 12px;

        white-space: normal;

        line-height: 1.25;

        text-decoration: none;
      }


      /* ========================================
         LAPTOP / TABLET
         3 COLUMNS
      ======================================== */

      @media (max-width: 1000px) {

        .shop-accessories-menu {

          grid-template-rows: none;

          grid-auto-flow: row;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          width: min(
            720px,
            calc(100vw - 28px)
          );

          max-width:
            calc(100vw - 28px);
        }


        .shop-accessories-menu a {
          min-width: 0;
        }

      }


      /* ========================================
         MOBILE
         2 COLUMNS
      ======================================== */

      @media (max-width: 650px) {

        .shop-accessories-menu {

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          width:
            calc(100vw - 24px);

          max-width:
            calc(100vw - 24px);

          gap: 5px;

          padding: 10px;
        }


        .shop-accessories-menu a {

          padding: 9px 10px;

          font-size: 0.95rem;
        }

      }


      /* ========================================
         SMALL PHONES
         1 COLUMN
      ======================================== */

      @media (max-width: 390px) {

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
      Remove the OLD contents inside
      Shop & Repair only.

      The rest of the nav stays untouched.

      Socials stays untouched.
    */

    dropdownMenu.innerHTML = "";


    /* ========================================
       BOOK A REPAIR
    ======================================== */

    const repairLink =
      document.createElement("a");


    repairLink.href =
      REPAIR_LINK[1];


    repairLink.textContent =
      REPAIR_LINK[0];


    dropdownMenu.appendChild(
      repairLink
    );



    /* ========================================
       ACCESSORIES SUBMENU
    ======================================== */

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



  /* ========================================
     LOAD WHEN PAGE IS READY
  ======================================== */

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