/* =========================================================
   EVAN'S SMART FIX - ACCOUNT BUTTON FOR EVERY HEADER
========================================================= */

(function () {
    "use strict";

    function injectStyles() {
        if (document.getElementById("esf-auth-nav-styles")) {
            return;
        }

        const style = document.createElement("style");
        style.id = "esf-auth-nav-styles";
        style.textContent = `
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
            }

            .esf-account-link:hover {
                background: #fff !important;
                color: #0057b8 !important;
                transform: translateY(-1px);
            }

            .esf-account-icon {
                font-size: 16px;
                line-height: 1;
            }

            @media (max-width: 700px) {
                .esf-account-link {
                    padding: 8px 11px !important;
                    font-size: 14px !important;
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
            const existing = document.querySelector('script[data-esf-auth-helper="true"]');

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
        if (!nav || nav.querySelector(".esf-account-link")) {
            return;
        }

        const link = document.createElement("a");
        link.className = "esf-account-link";
        link.href = "login.html";
        link.title = "Log in to your account";
        link.innerHTML = '<span class="esf-account-icon">👤</span><span class="esf-account-text">Log In</span>';

        const cartLink = nav.querySelector(".cart-link");
        if (cartLink) {
            nav.insertBefore(link, cartLink);
        } else {
            nav.appendChild(link);
        }

        try {
            await loadAuthHelper();
            const client = await window.ESFAuth.getClient();

            const updateLink = async () => {
                const { data } = await client.auth.getSession();
                const session = data.session;

                if (session) {
                    link.href = "account.html";
                    link.title = "Open my account";
                    link.querySelector(".esf-account-text").textContent = "My Account";
                } else {
                    link.href = "login.html";
                    link.title = "Log in to your account";
                    link.querySelector(".esf-account-text").textContent = "Log In";
                }
            };

            await updateLink();

            client.auth.onAuthStateChange(() => {
                updateLink().catch(console.error);
            });
        } catch (error) {
            console.error("Account navigation error:", error);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialiseAccountButton, { once: true });
    } else {
        initialiseAccountButton();
    }
})();
