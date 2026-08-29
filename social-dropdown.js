/* =========================================================
   LOAD ACCOUNT BUTTON ON EVERY PAGE THAT USES THIS SCRIPT
========================================================= */

(function loadAccountNavigation() {
    if (document.querySelector('script[data-esf-auth-nav="true"]')) {
        return;
    }

    const script = document.createElement("script");
    script.src = "auth-nav.js";
    script.async = true;
    script.dataset.esfAuthNav = "true";
    document.head.appendChild(script);
})();

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       REMOVE OLD SOCIAL DROPDOWN
    ========================================================= */

    document
        .querySelectorAll(".social-dropdown")
        .forEach(menu => menu.remove());


    /* =========================================================
       FIND BASKET BUTTON
    ========================================================= */

    const cartButton = document.querySelector(".cart-link");

    if (!cartButton) {
        return;
    }


    /* =========================================================
       ADD DROPDOWN STYLES
    ========================================================= */

    const style = document.createElement("style");

    style.textContent = `

        /* =========================================
           SOCIAL DROPDOWN WRAPPER
        ========================================= */

        .esf-social-dropdown {
            position: relative;
            display: inline-flex;
            align-items: center;
        }


        /* =========================================
           SOCIALS BUTTON
        ========================================= */

        .esf-social-button {
            background: transparent;
            border: none;

            color: white;

            font-family: inherit;
            font-size: inherit;
            font-weight: 600;

            cursor: pointer;

            padding: 15px 12px;

            display: flex;
            align-items: center;
            gap: 6px;
        }


        .esf-social-arrow {
            font-size: 11px;

            transition: transform 0.2s ease;
        }


        .esf-social-dropdown.open .esf-social-arrow {
            transform: rotate(180deg);
        }


        /* =========================================
           FLOATING DROPDOWN
        ========================================= */

        .esf-social-menu {
            position: absolute;

            top: calc(100% + 8px);
            right: 0;

            width: 190px;

            background: white;

            border-radius: 10px;

            box-shadow:
                0 8px 25px rgba(0, 0, 0, 0.20);

            overflow: hidden;

            opacity: 0;
            visibility: hidden;

            transform: translateY(-8px);

            transition:
                opacity 0.18s ease,
                transform 0.18s ease,
                visibility 0.18s;

            z-index: 99999;
        }


        /* Show dropdown */

        .esf-social-dropdown.open .esf-social-menu,
        .esf-social-dropdown:hover .esf-social-menu {
            opacity: 1;
            visibility: visible;

            transform: translateY(0);
        }


        /* =========================================
           DROPDOWN LINKS
        ========================================= */

        .nav-bar .esf-social-menu a,
        .esf-social-menu a {

            display: block !important;

            width: 100% !important;

            padding: 14px 18px !important;

            box-sizing: border-box !important;

            background: white !important;

            color: #222 !important;

            text-decoration: none !important;

            font-size: 15px !important;
            font-weight: 500 !important;

            text-align: left !important;

            border-bottom:
                1px solid #eeeeee !important;
        }


        .nav-bar .esf-social-menu a:last-child,
        .esf-social-menu a:last-child {
            border-bottom: none !important;
        }


        .nav-bar .esf-social-menu a:hover,
        .esf-social-menu a:hover {

            background: #f4f6f8 !important;

            color: #0057b8 !important;
        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 700px) {

            .esf-social-menu {
                right: 0;

                width: 170px;
            }

            .esf-social-button {
                padding-left: 8px;
                padding-right: 8px;
            }

        }

    `;

    document.head.appendChild(style);


    /* =========================================================
       CREATE DROPDOWN
    ========================================================= */

    const dropdown = document.createElement("div");

    dropdown.className = "esf-social-dropdown";

    dropdown.innerHTML = `

        <button
            class="esf-social-button"
            type="button"
            aria-expanded="false"
        >
            Socials

            <span class="esf-social-arrow">
                ▼
            </span>
        </button>


        <div class="esf-social-menu">

            <a
                href="https://www.instagram.com/evanssmartfix/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Instagram
            </a>


            <a
                href="https://www.tiktok.com/@evans.smartfix"
                target="_blank"
                rel="noopener noreferrer"
            >
                TikTok
            </a>

        </div>

    `;


    /* =========================================================
       INSERT BEFORE BASKET
    ========================================================= */

    cartButton.parentNode.insertBefore(
        dropdown,
        cartButton
    );


    /* =========================================================
       CLICK SUPPORT
    ========================================================= */

    const button =
        dropdown.querySelector(".esf-social-button");


    button.addEventListener("click", function (event) {

        event.stopPropagation();

        dropdown.classList.toggle("open");

        button.setAttribute(
            "aria-expanded",
            dropdown.classList.contains("open")
        );

    });


    /* =========================================================
       CLOSE WHEN CLICKING ELSEWHERE
    ========================================================= */

    document.addEventListener("click", function () {

        dropdown.classList.remove("open");

        button.setAttribute(
            "aria-expanded",
            "false"
        );

    });


    dropdown.addEventListener("click", function (event) {

        event.stopPropagation();

    });

});