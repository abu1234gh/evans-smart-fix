/* =========================================================
   EVAN'S SMART FIX - ACCOUNT BUTTON FOR EVERY HEADER
   Customer / Staff login choice when signed out
========================================================= */

(function () {
    "use strict";

    function injectStyles() {
        if (document.getElementById("esf-auth-nav-styles")) return;

        const style = document.createElement("style");
        style.id = "esf-auth-nav-styles";

        style.textContent = `
            .esf-account-wrap {
                position: relative;
                display: inline-flex;
                align-items: center;
            }

            .esf-account-link {
                display: inline-flex !important;
                align-items: center;
                justify-content: center;
                gap: 7px;
                background: rgba(255,255,255,.14);
                color: #fff !important;
                border: 1px solid rgba(255,255,255,.32);
                padding: 9px 14px !important;
                border-radius: 25px;
                text-decoration: none !important;
                font-weight: 700 !important;
                white-space: nowrap;
                transition: .2s ease !important;
                cursor: pointer;
                font: inherit;
            }

            .esf-account-link:hover,
            .esf-account-link:focus-visible {
                background: #fff !important;
                color: #0057b8 !important;
                transform: translateY(-1px);
            }

            .esf-account-icon {
                font-size: 16px;
                line-height: 1;
            }

            .esf-login-chevron {
                font-size: 11px;
                transition: transform .2s ease;
            }

            .esf-login-menu {
                position: absolute;
                top: calc(100% + 8px);
                right: 0;
                min-width: 205px;
                padding: 7px;
                background: #fff;
                border: 1px solid rgba(13,27,42,.12);
                border-radius: 14px;
                box-shadow: 0 14px 35px rgba(13,27,42,.16);
                z-index: 10000;
                display: none;
            }

            .esf-account-wrap.open .esf-login-menu {
                display: block;
            }

            .esf-account-wrap.open .esf-login-chevron {
                transform: rotate(180deg);
            }

            .esf-login-menu a {
                display: flex !important;
                align-items: center;
                gap: 9px;
                width: 100%;
                padding: 11px 12px !important;
                border-radius: 9px;
                color: #172033 !important;
                background: transparent !important;
                text-decoration: none !important;
                font-weight: 700 !important;
            }

            .esf-login-menu a:hover {
                background: #f1f6fc !important;
                color: #0057b8 !important;
            }

            @media (max-width: 700px) {
                .esf-account-link {
                    padding: 8px 11px !important;
                    font-size: 14px !important;
                }

                .esf-login-menu {
                    right: 0;
                    min-width: 190px;
                }
            }
        `;

        document.head.appendChild(style);
    }

    function loadAuthHelper() {
        if (window.ESFAuth) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const existing = document.querySelector(
                'script[data-esf-auth-helper="true"]'
            );

            if (existing) {
                existing.addEventListener("load", resolve, { once: true });
                existing.addEventListener("error", reject, { once: true });
                return;
            }

            const script = document.createElement("script");

            script.src = "auth.js";
            script.async = true;
            script.dataset.esfAuthHelper = "true";

            script.onload = resolve;
            script.onerror = reject;

            document.head.appendChild(script);
        });
    }

    async function initialiseAccountButton() {
        injectStyles();

        const nav = document.querySelector("nav, .nav-bar");

        if (!nav || nav.querySelector(".esf-account-wrap")) {
            return;
        }

        const wrap = document.createElement("div");

        wrap.className = "esf-account-wrap";

        wrap.innerHTML = `
            <button
                type="button"
                class="esf-account-link"
                aria-expanded="false"
                aria-haspopup="true"
            >
                <span class="esf-account-icon">👤</span>
                <span class="esf-account-text">Log In</span>
                <span class="esf-login-chevron">▼</span>
            </button>

            <div class="esf-login-menu">
                <a href="login.html">
                    <span>👤</span>
                    Customer Login
                </a>

                <a href="staff/login.html">
                    <span>🔧</span>
                    Staff Login
                </a>
            </div>
        `;

        const button = wrap.querySelector(".esf-account-link");
        const text = wrap.querySelector(".esf-account-text");
        const chevron = wrap.querySelector(".esf-login-chevron");
        const menu = wrap.querySelector(".esf-login-menu");

        const cartLink = nav.querySelector(".cart-link");

        if (cartLink) {
            nav.insertBefore(wrap, cartLink);
        } else {
            nav.appendChild(wrap);
        }

        button.addEventListener("click", () => {

            if (button.dataset.loggedIn === "true") {
                location.href = "account.html";
                return;
            }

            const open = wrap.classList.toggle("open");

            button.setAttribute(
                "aria-expanded",
                String(open)
            );
        });

        document.addEventListener("click", event => {

            if (!wrap.contains(event.target)) {
                wrap.classList.remove("open");
                button.setAttribute("aria-expanded", "false");
            }
        });

        try {
            await loadAuthHelper();

            const client = await window.ESFAuth.getClient();

            const updateLink = async () => {

                const { data } = await client.auth.getSession();

                const loggedIn = !!data.session;

                button.dataset.loggedIn = String(loggedIn);

                text.textContent =
                    loggedIn
                        ? "My Account"
                        : "Log In";

                button.title =
                    loggedIn
                        ? "Open my account"
                        : "Choose customer or staff login";

                chevron.style.display =
                    loggedIn
                        ? "none"
                        : "inline";

                menu.style.display = "";

                if (loggedIn) {
                    wrap.classList.remove("open");
                }
            };

            await updateLink();

            client.auth.onAuthStateChange(() => {
                updateLink().catch(console.error);
            });

        } catch (error) {
            console.error(
                "Account navigation error:", 
                error
            );
        }
    }

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initialiseAccountButton,
            { once: true }
        );

    } else {

        initialiseAccountButton();

    }

})();
