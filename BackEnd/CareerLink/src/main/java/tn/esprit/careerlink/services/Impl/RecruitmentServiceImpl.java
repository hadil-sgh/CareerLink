package tn.esprit.careerlink.services.Impl;

import edu.stanford.nlp.util.StringUtils;
import lombok.AllArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.careerlink.entities.Recruitment;
import tn.esprit.careerlink.entities.User;
import tn.esprit.careerlink.repositories.RecruitmentRepository;
import tn.esprit.careerlink.repositories.UserRepository;
import tn.esprit.careerlink.services.IRecruitmentService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@AllArgsConstructor
@Service
public class RecruitmentServiceImpl implements IRecruitmentService {
   final RecruitmentRepository recruitmentRepository;
   final UserRepository userRepository;
    @Override
    public Recruitment addRecruitment(Recruitment recruitment) {
        User user = userRepository.findById(recruitment.getUser().getId()).orElse(null);

        if (user != null) {
            recruitment.setUser(user);
        }
        return recruitmentRepository.save(recruitment);
    }

    @Override
    public Recruitment updateRecruitment(Recruitment recruitment) {
        return recruitmentRepository.save(recruitment);
    }

    @Override
    public Recruitment getOneRecruitment(Integer idRecruitment) {
        return recruitmentRepository.findById(idRecruitment).orElse(null);
    }

    @Override
    public List<Recruitment> getAllRecruitments() {
        return recruitmentRepository.findAll();
    }

    @Override
    public void deleteRecruitment(Integer idRecruitment) {
        recruitmentRepository.deleteById(idRecruitment);
    }


    public void calculateAndUpdateSponsorshipScore(Recruitment recruitment) {
        User user = recruitment.getUser();
        String post = recruitment.getPost();
        String result = recruitment.getResult();

        // Vérifier si le résultat du recrutement est "Accepted"
        if ("Accepted".equals(result)) {
            Long sponsorshipBonus = calculateSponsorshipBonus(post);
            Long currentSponsorshipScore = user.getScore() != null ? user.getScore() : 0L;
            Long newSponsorshipScore = currentSponsorshipScore + sponsorshipBonus;
            user.setScore(newSponsorshipScore);
            userRepository.save(user);
        }
    }


    public Long calculateSponsorshipBonus(String post) {
        // Convertir le poste en minuscules
        String lowercasePost = post.toLowerCase();

        switch (lowercasePost) {
            case "admin":
                return 70L;
            case "software engineer":
                return 50L;
            case "data analyst":
                return 30L;
            default:
                return 5L;
        }
    }

    public void importRecruitments(MultipartFile file) {
        try {
            Workbook workbook = WorkbookFactory.create(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);
            for (Row row : sheet) {
                if (row.getRowNum() == 0) { // Skip header row
                    continue;
                }
                Recruitment recruitment = new Recruitment();
                recruitment.setFullNameCandidate(row.getCell(0).getStringCellValue());
                recruitment.setPost(row.getCell(1).getStringCellValue());
                Date interviewDate = row.getCell(2).getDateCellValue();
                recruitment.setInterviewDate(interviewDate);
                recruitment.setResult(row.getCell(3).getStringCellValue());
                recruitment.setCv(row.getCell(4).getStringCellValue());
                recruitmentRepository.save(recruitment);
            }
        }  catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


}
