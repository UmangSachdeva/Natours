const stripe = Stripe(
  'pk_test_51NH531SBYp4Ve4TSrSn1M2EXtgIGufhgFtrXPOhR6GCZBru5kll1nxxPAjTlZjufDga45BweGmC343D2XcMU1pzj009zT4gZaU'
);
import { showAlerts } from './alert';

export const bookTour = async (tourId) => {
  try {
    // 1) Get Checkout session from API
    const session = await axios.post(
      `/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Create Checkout form + charge credit card\

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
