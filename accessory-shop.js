```js
function getAccessoryCart() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


function accessoryCartCount(cart) {

    return cart.reduce(
        function(sum, item) {

            if (
                item &&
                item.type === "accessory"
            ) {

                const q =
                    Number(
                        item.quantity || 1
                    );

                return sum +
                    (
                        q > 0
                            ? q
                            : 1
                    );

            }

            return sum + 1;

        },
        0
    );

}


function updateAccessoryCartCount() {

    const e =
        document.getElementById(
            "cartCount"
        );

    if (e) {

        e.textContent =
            accessoryCartCount(
                getAccessoryCart()
            );

    }

}


function showAccessoryToast(message) {

    let t =
        document.getElementById(
            "accessoryToast"
        );

    if (!t) {

        t =
            document.createElement(
                "div"
            );

        t.id =
            "accessoryToast";

        t.className =
            "accessory-toast";

        document.body
            .appendChild(t);

    }


    t.textContent =
        message;


    t.style.display =
        "block";


    clearTimeout(
        window.__toast
    );


    window.__toast =
        setTimeout(
            function() {

                t.style.display =
                    "none";

            },
            1800
        );

}


/* =========================================================
   FIND PRODUCT IMAGE
========================================================= */

function getAccessoryImageByName(name) {

    const cards =
        document.querySelectorAll(
            ".accessory-product"
        );


    for (
        let i = 0;
        i < cards.length;
        i++
    ) {

        const card =
            cards[i];


        const button =
            card.querySelector(
                ".add-accessory-btn"
            );


        const heading =
            card.querySelector(
                "h3"
            );


        const cardName =
            button &&
            button.dataset.name
                ? button.dataset.name.trim()
                : heading
                    ? heading.textContent.trim()
                    : "";


        if (
            cardName ===
            String(name || "").trim()
        ) {

            const image =
                card.querySelector(
                    ".product-image"
                ) ||
                card.querySelector(
                    "img"
                );


            if (image) {

                return (
                    image.getAttribute("src") ||
                    "images/unavailable.png"
                );

            }

        }

    }


    return "images/unavailable.png";

}


/* =========================================================
   ADD ACCESSORY TO CART
========================================================= */

function addAccessoryToCart(
    name,
    variation,
    price,
    quantity
) {

    quantity =
        Number(
            quantity || 1
        );


    if (
        !Number.isFinite(quantity) ||
        quantity < 1
    ) {

        quantity = 1;

    }


    const image =
        getAccessoryImageByName(
            name
        );


    const cart =
        getAccessoryCart();


    const existing =
        cart.find(
            function(i) {

                return (
                    i &&
                    i.type ===
                        "accessory" &&
                    i.name ===
                        name &&
                    (
                        i.variation ||
                        ""
                    ) ===
                    (
                        variation ||
                        ""
                    ) &&
                    Number(i.price) ===
                        Number(price)
                );

            }
        );


    if (existing) {

        existing.quantity =
            Number(
                existing.quantity || 1
            ) +
            quantity;


        if (
            !existing.image ||
            existing.image ===
                "images/unavailable.png"
        ) {

            existing.image =
                image;

        }

    } else {

        cart.push({

            type:
                "accessory",

            name:
                name,

            variation:
                variation || "",

            price:
                Number(price),

            quantity:
                quantity,

            image:
                image

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateAccessoryCartCount();


    showAccessoryToast(
        name +
        " added to basket"
    );

}


/* =========================================================
   ADD FROM PRODUCT BUTTON
========================================================= */

function addAccessoryFromButton(button) {

    if (!button) {
        return;
    }


    const qtyId =
        button.dataset.qtyId;


    const qty =
        qtyId
            ? document.getElementById(
                qtyId
            )
            : null;


    addAccessoryToCart(

        button.dataset.name || "",

        button.dataset.variation || "",

        Number(
            button.dataset.price || 0
        ),

        qty
            ? qty.value
            : 1

    );

}


/* =========================================================
   SEARCH PRODUCTS
========================================================= */

function filterAccessoryProducts(value) {

    value =
        String(
            value || ""
        )
        .toLowerCase()
        .trim();


    document
        .querySelectorAll(
            ".accessory-product"
        )
        .forEach(
            function(card) {

                const s =
                    (
                        card.dataset.search ||
                        card.textContent ||
                        ""
                    )
                    .toLowerCase();


                card.style.display =
                    s.includes(value)
                        ? ""
                        : "none";

            }
        );

}


/* =========================================================
   REMOVE STOCK SYSTEM
========================================================= */

function removeAccessoryStockSystem() {

    document
        .querySelectorAll(
            ".stock-text"
        )
        .forEach(
            function(stockText) {

                stockText.remove();

            }
        );


    document
        .querySelectorAll(
            ".accessory-product input[type='number']"
        )
        .forEach(
            function(input) {

                input.disabled =
                    false;

                input.removeAttribute(
                    "disabled"
                );

                input.removeAttribute(
                    "max"
                );

                input.min =
                    "1";


                if (
                    !input.value ||
                    Number(input.value) < 1
                ) {

                    input.value =
                        "1";

                }

            }
        );


    document
        .querySelectorAll(
            ".add-accessory-btn"
        )
        .forEach(
            function(button) {

                button.disabled =
                    false;

                button.removeAttribute(
                    "disabled"
                );

                button.removeAttribute(
                    "data-stock"
                );


                if (
                    button.textContent
                        .trim()
                        .toLowerCase()
                        .includes(
                            "out of stock"
                        )
                ) {

                    button.textContent =
                        "Add to Basket";

                }

            }
        );

}


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateAccessoryCartCount();

        removeAccessoryStockSystem();

    }
);
```
