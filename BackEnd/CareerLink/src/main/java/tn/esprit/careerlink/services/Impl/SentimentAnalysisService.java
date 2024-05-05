package tn.esprit.careerlink.services.Impl;

import edu.stanford.nlp.pipeline.*;
import edu.stanford.nlp.ling.*;
import edu.stanford.nlp.neural.rnn.RNNCoreAnnotations;
import edu.stanford.nlp.sentiment.SentimentCoreAnnotations;
import edu.stanford.nlp.trees.Tree;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import javax.annotation.PostConstruct;

@Service
public class SentimentAnalysisService {

    private StanfordCoreNLP stanfordCoreNLP;
    private final Map<Integer, String> sentimentMap = new HashMap<>();

    public SentimentAnalysisService() {
        this.sentimentMap.put(0, "Very Negative");
        this.sentimentMap.put(1, "Negative");
        this.sentimentMap.put(2, "Neutral");
        this.sentimentMap.put(3, "Positive");
        this.sentimentMap.put(4, "Very Positive");
    }

    @PostConstruct
    public void init() {
        Properties props = new Properties();
        props.setProperty("annotators", "tokenize, ssplit, parse, sentiment");
        this.stanfordCoreNLP = new StanfordCoreNLP(props);
    }

    public String analyzeSentiment(String text) {
        CoreDocument coreDocument = new CoreDocument(text);
        stanfordCoreNLP.annotate(coreDocument);
        List<CoreSentence> sentences = coreDocument.sentences();
        StringBuilder sentimentResult = new StringBuilder();

        for (CoreSentence sentence : sentences) {
            Tree tree = sentence.sentimentTree();
            int sentiment = RNNCoreAnnotations.getPredictedClass(tree);
            sentimentResult.append(sentimentMap.get(sentiment)).append(" ");
        }

        return sentimentResult.toString().trim();
    }
}

