const router = require("express").Router();
require ("dotenv").config();

//const KEY = 'sk_test_51KnJzyDDhDxx13zXLdk7cu748T7B69sKBvNc5KO9ZRFsKoqjXXeh2nfUnqv7kluP4gPFAbi5Q9EQwtGreyZa1uAS005nk0DFsJ'
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
  // console.log("called")
  // console.log(req.body)
 //console.log(stripe)
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      //console.log("error")
     // console.log(stripeErr)
      } else {
       res.status(200).json(stripeRes);
      // console.log("success")
      }
    }
  );
});

module.exports = router;