require("dotenv").config();
const stripe = require("stripe")(process.env.stripeId);

var pago = {
  crearCuenta: async (req, res) => {
    const account = await stripe.accounts.create({
      type: "express",
    });
    console.log(account);
    res.status(200).json({ id: account.id });
  },

  linkCuenta: async (req, res) => {
    var id = req.query.id;
    const accountLinks = await stripe.accountLinks.create({
      account: id,
      refresh_url: "https://example.com/reauth",
      return_url: "https://example.com/return",
      type: "account_onboarding",
    });
    console.log(accountLinks);
    res.json({ enlace: accountLinks });
  },

  pagoIntent: async (req, res) => {
    var monto = req.query.monto;
    var comision = monto * 0.1;
    var stripeId = req.query.stripe;
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ["card"],
      amount: monto,
      currency: "mxn",
      application_fee_amount: comision,
      transfer_data: {
        destination: stripeId,
      },
    });
    res.json({ client_secret: paymentIntent.client_secret });
  },
};

module.exports = pago;
