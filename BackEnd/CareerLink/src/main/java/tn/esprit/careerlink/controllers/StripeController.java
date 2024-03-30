package tn.esprit.careerlink.controllers;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.param.ChargeCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/stripe")

public class StripeController {
    @PostMapping ("/stripe/{amount}")
    public void payer(@PathVariable("amount") Long amount ) throws StripeException{
        Stripe.apiKey = "sk_test_51OyMyNGNLXT5inUdu51OPfvjqWJ9ueb62CKPp2GnmFQRwZPWUs5bjyzKOknZWxy1ko7oJCYmdXKHeyC1SGIv4Bwk00uMDYSrY2";

        ChargeCreateParams params =
                ChargeCreateParams.builder()
                        .setAmount(amount)
                        .setCurrency("usd")
                        .setSource("tok_visa")
                        .build();

        Charge charge = Charge.create(params);
    }
}
