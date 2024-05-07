package tn.esprit.careerlink.services.Impl;

import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.careerlink.entities.Recruitment;
import tn.esprit.careerlink.entities.User;
import tn.esprit.careerlink.repositories.RecruitmentRepository;
import tn.esprit.careerlink.repositories.UserRepository;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Service
@RequiredArgsConstructor
//Import recruitments from excel
public class ImportService {

    private final RecruitmentRepository recruitmentRepository;
    private final UserRepository userRepository;
    private final FileStorage fileStorage;

    public void importRecruitmentsFromExcel(MultipartFile file, Integer userId, MultipartFile cv) throws IOException {
        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = new XSSFWorkbook(inputStream);

            Sheet sheet = workbook.getSheetAt(0);

            // Parcourir chaque ligne de la feuille de calcul (en commençant par la deuxième ligne pour sauter l'en-tête)
            Iterator<Row> iterator = sheet.iterator();
            iterator.next(); // Saute la première ligne d'en-tête
            List<Recruitment> recruitments = new ArrayList<>();
            while (iterator.hasNext()) {
                Row currentRow = iterator.next();
                // Lire les données de chaque colonne
                String fullNameCandidate = currentRow.getCell(0).getStringCellValue();
                String post = currentRow.getCell(1).getStringCellValue();
                Date interviewDate = currentRow.getCell(2).getDateCellValue();
                String result = currentRow.getCell(3).getStringCellValue();



                // Créer un objet Recruitment
                Recruitment recruitment = new Recruitment();
                recruitment.setFullNameCandidate(fullNameCandidate);
                recruitment.setPost(post);
                recruitment.setInterviewDate(interviewDate);
                recruitment.setResult(result);
                if (cv!= null && !cv.isEmpty()) {
                    String original = FileStorage.saveFile(StringUtils.cleanPath(cv.getOriginalFilename()), cv);
                    recruitment.setCv(original);

                }

                // Ajouter l'utilisateur à partir de l'ID spécifié
                User user = userRepository.findById(userId).orElse(null);
                if (user != null) {
                    recruitment.setUser(user);
                }

                recruitments.add(recruitment);
            }

            recruitmentRepository.saveAll(recruitments);

            workbook.close();
        }
    }
}