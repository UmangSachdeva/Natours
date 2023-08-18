/* eslint-disable */ /* eslint-disable */ // import * as maptilersdk from '@maptiler/sdk';
const $1d5accf3d59993d4$export$4c5dd147b21b9176 = (locations)=>{
    mapboxgl.accessToken = "pk.eyJ1IjoidW1hbmcwNyIsImEiOiJjbGtsaHY2ZmIxYzJzM29yenA0bGE0dmxyIn0.25lXLxcIg50m8LsKyRmjaw";
    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/umang07/clklluulb000301qx7h0iat25",
        scrollZoom: false
    });
    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((loc)=>{
        // Add a morker
        const el = document.createElement("div");
        el.className = "marker";
        //   Create Marker
        new mapboxgl.Marker({
            element: el,
            anchor: "bottom"
        }).setLngLat(loc.coordinates).addTo(map);
        // Add popup
        new mapboxgl.Popup({
            offset: 30
        }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`).addTo(map);
        // Extends map bounds to include current location
        bounds.extend(loc.coordinates);
    });
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 200,
            left: 100,
            right: 100
        }
    });
};


// type is success or error
const $41f9315a2d9897c4$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};
const $41f9315a2d9897c4$export$de026b00723010c1 = (type, msg, time = 7)=>{
    $41f9315a2d9897c4$export$516836c6a9dfc573();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout($41f9315a2d9897c4$export$516836c6a9dfc573, time * 1000);
};


const $163cf72673b12797$export$596d806903d1f59e = async (email, password)=>{
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/users/login",
            data: {
                email: email,
                password: password
            }
        });
        if (res.data.status === "success") {
            (0, $41f9315a2d9897c4$export$de026b00723010c1)("success", "Logged in successfully");
            window.setTimeout(()=>{
                location.assign("/");
            }, 1500);
        }
    } catch (err) {
        (0, $41f9315a2d9897c4$export$de026b00723010c1)("error", err.response.data.message);
    }
};
const $163cf72673b12797$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const res = await axios({
            method: "GET",
            url: "/api/v1/users/logout"
        });
        if (res.data.status == "success") location.reload(true);
    } catch (err) {
        (0, $41f9315a2d9897c4$export$de026b00723010c1)("error", "Error logging out! Try Again");
    }
};



const $a79c2954e4b7b555$export$f558026a994b6051 = async (data, type)=>{
    try {
        const url = type === "password" ? "/api/v1/users/updatePassword" : "/api/v1/users/updateMe";
        const res = await axios({
            url: url,
            method: "PATCH",
            data: data
        });
        if (res.data.status === "success") (0, $41f9315a2d9897c4$export$de026b00723010c1)("success", `${type.toUpperCase()} Updated Successfully'`);
    } catch (err) {
        console.log(err);
        (0, $41f9315a2d9897c4$export$de026b00723010c1)("error", err.response.data.message);
    }
};



const $11907cc848d9f487$var$stripe = Stripe("pk_test_51NH531SBYp4Ve4TSrSn1M2EXtgIGufhgFtrXPOhR6GCZBru5kll1nxxPAjTlZjufDga45BweGmC343D2XcMU1pzj009zT4gZaU");
const $11907cc848d9f487$export$8d5bdbf26681c0c2 = async (tourId)=>{
    try {
        // 1) Get Checkout session from API
        const session = await axios.post(`/api/v1/bookings/checkout-session/${tourId}`);
        // 2) Create Checkout form + charge credit card\
        await $11907cc848d9f487$var$stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        console.log(err);
        showAlert("error", err);
    }
};



// DOM ELEMENTS
const $a3ab8c272eed4ffe$var$mapBox = document.getElementById("map");
const $a3ab8c272eed4ffe$var$loginForm = document.querySelector(".form--login");
const $a3ab8c272eed4ffe$var$logOutBtn = document.querySelector(".nav__el--logout");
const $a3ab8c272eed4ffe$var$submitForm = document.querySelector(".form-user-data");
const $a3ab8c272eed4ffe$var$submitFormPassword = document.querySelector(".form-user-password");
const $a3ab8c272eed4ffe$var$bookBtn = document.getElementById("book-tour");
// DELEGATION
if ($a3ab8c272eed4ffe$var$mapBox) {
    const locations = JSON.parse($a3ab8c272eed4ffe$var$mapBox.dataset.locations);
    (0, $1d5accf3d59993d4$export$4c5dd147b21b9176)(locations);
}
if ($a3ab8c272eed4ffe$var$loginForm) $a3ab8c272eed4ffe$var$loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    (0, $163cf72673b12797$export$596d806903d1f59e)(email, password);
});
if ($a3ab8c272eed4ffe$var$logOutBtn) $a3ab8c272eed4ffe$var$logOutBtn.addEventListener("click", (0, $163cf72673b12797$export$a0973bcfe11b05c9));
if ($a3ab8c272eed4ffe$var$submitForm) $a3ab8c272eed4ffe$var$submitForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);
    (0, $a79c2954e4b7b555$export$f558026a994b6051)(form, "data");
});
if ($a3ab8c272eed4ffe$var$submitFormPassword) $a3ab8c272eed4ffe$var$submitFormPassword.addEventListener("submit", async (e)=>{
    e.preventDefault();
    document.querySelector(".bnt--save-password").textContent = "Updating....";
    const passwordPrev = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await (0, $a79c2954e4b7b555$export$f558026a994b6051)({
        password: password,
        passwordConfirm: passwordConfirm,
        passwordPrev: passwordPrev
    }, "password");
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
});
if ($a3ab8c272eed4ffe$var$bookBtn) $a3ab8c272eed4ffe$var$bookBtn.addEventListener("click", (e)=>{
    e.target.textContent = "Processing...";
    const { tourId: tourId } = e.target.dataset;
    (0, $11907cc848d9f487$export$8d5bdbf26681c0c2)(tourId);
});
const $a3ab8c272eed4ffe$var$alertMessage = document.querySelector("body").dataset.alert;
if ($a3ab8c272eed4ffe$var$alertMessage) (0, $41f9315a2d9897c4$export$de026b00723010c1)("success", $a3ab8c272eed4ffe$var$alertMessage, 20);


//# sourceMappingURL=bundle.js.map
