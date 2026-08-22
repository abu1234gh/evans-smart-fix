document.addEventListener("DOMContentLoaded", function () {

    if (document.querySelector(".social-top-bar")) return;

    /* CSS */
    const style = document.createElement("style");

    style.textContent = `
        .social-top-bar {
            width: 100%;
            height: 32px;
            background: #073b7a;
            color: white;

            display: flex;
            justify-content: flex-end;
            align-items: center;

            gap: 18px;
            padding: 0 30px;

            box-sizing: border-box;

            font-family: Arial, sans-serif;
            font-size: 13px;
        }

        .social-top-bar span {
            opacity: 0.8;
        }

        .social-top-bar a {
            color: white;
            text-decoration: none;
            font-weight: bold;
        }

        .social-top-bar a:hover {
            opacity: 0.7;
        }

        @media (max-width: 600px) {
            .social-top-bar {
                justify-content: center;
                padding: 0 10px;
            }
        }
    `;

    document.head.appendChild(style);


    /* SOCIAL BAR */

    const bar = document.createElement("div");

    bar.className = "social-top-bar";

    bar.innerHTML = `
        <span>Follow us:</span>

        <a href="https://www.instagram.com/evanssmartfix/"
           target="_blank"
           rel="noopener noreferrer">
            Instagram
        </a>

        <a href="https://www.tiktok.com/@evans.smartfix"
           target="_blank"
           rel="noopener noreferrer">
            TikTok
        </a>
    `;

    document.body.prepend(bar);

});
