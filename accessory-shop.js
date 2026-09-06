function getAccessoryCart() {

    try {

        const saved =
            localStorage.getItem("cart");

        return saved
            ? JSON.parse(saved)
            : [];

    } catch (error) {

        console.error(
            "Could not read cart:",
            error
        );

        return [];

    }

}


/* =========================================================
   CART COUNT
========================================================= */

function accessoryCartCount(cart) {

    return cart.reduce(
        function(sum, item) {

            if (
                item &&
                item.type === "accessory"
            ) {

                const quantity =
                    Number(
                        item.quantity || 1
                    );

                return sum +
                    (
                        quantity > 0
                            ? quantity
                            : 1
                    );

            }

            return sum + 1;

        },
        0
    );

}


function updateAccessoryCartCount() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {

        cartCount.textContent =
            accessoryCartCount(
                getAccessoryCart()
            );

    }

}


/* =========================================================
   TOAST
========================================================= */

function showAccessoryToast(message) {

    let toast =
        document.getElementById(
            "accessoryToast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "accessoryToast";

        toast.className =
            "accessory-toast";

        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;


    toast.style.display =
        "block";


    clearTimeout(
        window.__toast
    );


    window.__toast =
        setTimeout(
            function() {

                toast.style.display =
                    "none";

            },
            1800
        );

}


/* =========================================================
   REMEMBER WHICH PRODUCT BUTTON WAS CLICKED

   This lets us get the correct image WITHOUT
   changing any of your HTML buttons.
========================================================= */

window.__lastAccessoryButton =
    null;


document.addEventListener(
    "click",
    function(event) {

        const target =
            event.target;


        if (
            !(target instanceof Element)
        ) {

            return;

        }


        const button =
            target.closest(
                ".add-accessory-btn"
            );


        if (button) {

            window.__lastAccessoryButton =
                button;

        }

    },
    true
);


/* =========================================================
   GET PRODUCT IMAGE
========================================================= */

function getAccessoryImage() {

    try {

        const button =
            window.__lastAccessoryButton;


        if (!button) {

            return "images/unavailable.png";

        }


        const card =
            button.closest(
                ".accessory-product"
            );


        if (!card) {

            return "images/unavailable.png";

        }


        const image =
            card.querySelector(
                ".product-image"
            ) ||
            card.querySelector(
                "img"
            );


        if (!image) {

            return "images/unavailable.png";

        }


        return (
            image.getAttribute("src") ||
            "images/unavailable.png"
        );

    } catch (error) {

        console.error(
            "Could not get product image:",
            error
        );


        return "images/unavailable.png";

    }

}


/* =========================================================
   ADD ACCESSORY TO CART

   IMPORTANT:
   This keeps your ORIGINAL four arguments:

   name
   variation
   price
   quantity
========================================================= */

function addAccessoryToCart(
    name,
    variation,
    price,
    quantity
) {

    try {

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


        price =
            Number(
                price || 0
            );


        const cart =
            getAccessoryCart();


        /*
        Image lookup is separate.

        Even if the image fails,
        THE PRODUCT STILL ADDS.
        */

        let image =
            "images/unavailable.png";


        try {

            image =
                getAccessoryImage();

        } catch (imageError) {

            console.error(
                "Image lookup failed:",
                imageError
            );

        }


        const existing =
            cart.find(
                function(item) {

                    return (
                        item &&
                        item.type === "accessory" &&
                        item.name === name &&
                        (
                            item.variation || ""
                        ) ===
                        (
                            variation || ""
                        ) &&
                        Number(item.price) ===
                            price
                    );

                }
            );


        if (existing) {

            existing.quantity =
                Number(
                    existing.quantity || 1
                ) +
                quantity;


            /*
            Add image to old basket items
            if they do not already have one.
            */

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
                    price,

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


        console.log(
            "Added to basket:",
            name
        );

    } catch (error) {

        console.error(
            "ADD TO BASKET ERROR:",
            error
        );


        alert(
            "There was a problem adding this item to your basket."
        );

    }

}


/*
Make absolutely sure your inline HTML
onclick can see the function.
*/

window.addAccessoryToCart =
    addAccessoryToCart;


/* =========================================================
   ADD FROM BUTTON
========================================================= */

function addAccessoryFromButton(button) {

    if (!button) {

        return;

    }


    window.__lastAccessoryButton =
        button;


    const qtyId =
        button.dataset.qtyId;


    const qtyInput =
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

        qtyInput
            ? qtyInput.value
            : 1

    );

}


window.addAccessoryFromButton =
    addAccessoryFromButton;


/* =========================================================
   SEARCH
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

                const search =
                    (
                        card.dataset.search ||
                        card.textContent ||
                        ""
                    )
                    .toLowerCase();


                card.style.display =
                    search.includes(value)
                        ? ""
                        : "none";

            }
        );

}


window.filterAccessoryProducts =
    filterAccessoryProducts;


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