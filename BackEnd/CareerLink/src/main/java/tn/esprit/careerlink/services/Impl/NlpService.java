package tn.esprit.careerlink.services.Impl;


import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import org.springframework.stereotype.Service;
import java.util.Properties;
import javax.annotation.PostConstruct;

@Service
public class NlpService {

    private StanfordCoreNLP stanfordCoreNLP;

    @PostConstruct
    public void init() {
        Properties props = new Properties();
        props.setProperty("annotators", "tokenize, ssplit, parse, sentiment");
        this.stanfordCoreNLP = new StanfordCoreNLP(props);
    }
}
