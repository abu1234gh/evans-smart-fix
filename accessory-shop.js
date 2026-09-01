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
            () =>
                t.style.display =
                    "none",
            1800
        );

}


function addAccessoryToCart(
    name,
    variation,
    price,
    quantity,
    stock
) {

    quantity =
        Number(
            quantity || 1
        );


    stock =
        Number(
            stock || 0
        );


    if (quantity < 1) {

        quantity = 1;

    }


    if (
        stock > 0 &&
        quantity > stock
    ) {

        quantity = stock;

    }


    const cart =
        getAccessoryCart();


    const existing =
        cart.find(
            i =>
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


    if (existing) {

        const nq =
            Number(
                existing.quantity ||
                1
            ) +
            quantity;


        existing.quantity =
            stock > 0
                ? Math.min(
                    nq,
                    stock
                )
                : nq;

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
                quantity

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


function filterAccessoryProducts(
    value
) {

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
            card => {

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


document.addEventListener(
    "DOMContentLoaded",
    updateAccessoryCartCount
);