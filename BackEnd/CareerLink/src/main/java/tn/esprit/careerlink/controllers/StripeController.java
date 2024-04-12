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
    @PostMapping("/stripe/{amount}")
    public void payer(@PathVariable("amount") Long amount) throws StripeException {
        // Multipliez le montant par 100
        Long amountInCents = amount * 100L;

        Stripe.apiKey = "sk_test_51OtNbnH3RXz0S9dA8ANKd7dTlSdVXqsA20UsM57YU8joxiw7JH8wZBXeQ2W9X2yAhuPLDnKCbo2WsvzO9cE74r6l004bg2wKmN";

        ChargeCreateParams params = ChargeCreateParams.builder()
                .setAmount(amountInCents) // Utilisez le montant en cents
                .setCurrency("usd")
                .setSource("tok_visa")
                .build();

        Charge charge = Charge.create(params);
    }
}
