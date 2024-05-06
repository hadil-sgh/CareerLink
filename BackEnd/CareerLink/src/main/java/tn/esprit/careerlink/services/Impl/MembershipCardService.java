package tn.esprit.careerlink.services.Impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MembershipCardService {

    @Value("${google.wallet.api.key}")
    private String googleWalletApiKey;

    // Method to send the membership card to Google Wallet API
    public void sendMembershipCardToGoogleWallet(String email, String cardDetails) {
        // Construct the request URL and payload
        String apiUrl = "https://www.googleapis.com/your-google-wallet-api-endpoint";
        String requestBody = "{\"email\": \"" + email + "\", \"cardDetails\": \"" + cardDetails + "\"}";

        // Set headers and API key
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + googleWalletApiKey);

        // Create the request entity
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        // Send the HTTP request
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class);

        // Handle the response
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            System.out.println("Membership card sent successfully to " + email);
        } else {
            System.err.println("Failed to send membership card to " + email + ". Status code: " + responseEntity.getStatusCode());
        }
    }
}

