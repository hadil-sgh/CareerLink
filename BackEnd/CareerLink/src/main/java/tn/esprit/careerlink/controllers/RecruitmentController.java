package tn.esprit.careerlink.controllers;

import lombok.RequiredArgsConstructor;
import org.apache.tika.exception.TikaException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.SAXException;
import tn.esprit.careerlink.entities.*;
import tn.esprit.careerlink.repositories.RecruitmentRepository;
import tn.esprit.careerlink.repositories.UserRepository;
import tn.esprit.careerlink.services.Impl.FileStorage;
import tn.esprit.careerlink.services.Impl.ImportService;
import tn.esprit.careerlink.services.Impl.PdfTextExtractor;
import tn.esprit.careerlink.services.Impl.RecruitmentServiceImpl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/Recruitment")
public class RecruitmentController {

    private  final RecruitmentServiceImpl recruitmentService;
    private final RecruitmentRepository recruitmentRepository;
    private final UserRepository userRepository;
    private final PdfTextExtractor pdfTextExtractor;
    private final ImportService  importService;

    @PostMapping("/add")
    public Recruitment addRecruitment(@RequestParam("fullNameCandidate") String fullNameCandidate,
                                                      @RequestParam("post") String post,
                                                      @RequestParam("interviewDate") @DateTimeFormat(pattern="yyyy-MM-dd") Date interviewDate,
                                                      @RequestParam("result") String result,
                                                      @RequestParam(value = "cv", required = false) MultipartFile file,
                                                      @RequestParam("userId") Integer userId) {
        try {
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) {
                return null;
            }

            Recruitment recruitment = new Recruitment();
            recruitment.setFullNameCandidate(fullNameCandidate);
            recruitment.setPost(post);
            recruitment.setInterviewDate(interviewDate);
            recruitment.setResult(result);
            recruitment.setUser(user);

            if (file != null && !file.isEmpty()) {
                String original = FileStorage.saveFile(StringUtils.cleanPath(file.getOriginalFilename()), file);
                recruitment.setCv(original);

            }

            Recruitment savedRecruitment = recruitmentService.addRecruitment(recruitment);

            recruitmentService.calculateAndUpdateSponsorshipScore(savedRecruitment);

            return recruitmentRepository.save(savedRecruitment);
        } catch (IOException e) {
            e.printStackTrace(); // Gérer l'exception de manière appropriée
            return null; // Retourner 500 en cas d'erreur interne du serveur
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Recruitment> updateRecruitment(@PathVariable("id") Integer id,
                                                         @RequestParam("fullNameCandidate") String fullNameCandidate,

                                                         @RequestParam("post") String post,
                                                         @RequestParam("interviewDate") @DateTimeFormat(pattern="yyyy-MM-dd") Date interviewDate,
                                                         @RequestParam("result") String result,
                                                         @RequestParam(value = "cv", required = false) MultipartFile file,
                                                         @RequestParam("userId") Integer userId) {
        try {
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            Recruitment existingRecruitment = recruitmentRepository.findById(id).orElse(null);
            if (existingRecruitment == null) {
                return ResponseEntity.notFound().build();
            }

            existingRecruitment.setFullNameCandidate(fullNameCandidate);

            existingRecruitment.setPost(post);
            existingRecruitment.setInterviewDate(interviewDate);
            existingRecruitment.setResult(result);
            existingRecruitment.setUser(user);

            if (file != null && !file.isEmpty()) {
                String original = FileStorage.saveFile(StringUtils.cleanPath(file.getOriginalFilename()), file);
                existingRecruitment.setCv(original);

            }


            Recruitment savedRecruitment = recruitmentService.addRecruitment(existingRecruitment);

            recruitmentService.calculateAndUpdateSponsorshipScore(savedRecruitment);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedRecruitment);
        } catch (IOException e) {
            e.printStackTrace(); // Gérer l'exception de manière appropriée
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Retourner 500 en cas d'erreur interne du serveur
        }

    }


    @GetMapping("/getOne/{id}")
    public Recruitment getOneRecruitment(@PathVariable ("id")Integer idRecruitment){

        return recruitmentService.getOneRecruitment(idRecruitment);
    }

    @GetMapping("/getAll")
    public List<Recruitment> getAllRecruitments(){
        return recruitmentService.getAllRecruitments();
    }

    @DeleteMapping("/delete/{id}")
    public void  deleteRecruitment(@PathVariable ("id") Integer idRecruitment) {
        recruitmentService.deleteRecruitment(idRecruitment);
    }

    @GetMapping("/downloadFile/{id}")
    public ResponseEntity<?> downloadFile(@PathVariable("id") Integer id) {
        Recruitment recruitment = recruitmentService.getOneRecruitment(id);

        // Check if the PDF data is null
        if (recruitment.getCv() == null) {
            // Create an empty byte array
            byte[] emptyData = new byte[0];
            // Create a ByteArrayResource from the empty byte array
            ByteArrayResource resource = new ByteArrayResource(emptyData);

            // Set the appropriate content type for PDF files
            String contentType = "application/pdf";

            // Instead of forcing download, set content disposition to inline
            String headerValue = "inline; filename=\"empty.pdf\"";

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                    .body(resource);
        }

        String fileCode = recruitment.getCv();
        FileDownloadUtil downloadUtil = new FileDownloadUtil();

        Resource resource = null;
        try {
            resource = downloadUtil.getFileAsResource(fileCode);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }

        if (resource == null) {
            return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
        }

        // Set the appropriate content type for PDF files
        String contentType = "application/pdf";

        // Instead of forcing download, set content disposition to inline
        String headerValue = "inline; filename=\"" + resource.getFilename() + "\"";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }
    @PostMapping("/import")
    public ResponseEntity<String> importRecruitments(@RequestParam("file") MultipartFile file,
                                                     @RequestParam("userId") Integer userId,
                                                     @RequestParam("cv") MultipartFile cv) {
        try {
            importService.importRecruitmentsFromExcel(file, userId, cv);
            return ResponseEntity.ok("Recruitments imported successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error importing recruitments");
        }
    }

    @GetMapping("/searchByKeyword")
    public List<Recruitment> searchRecruitmentsByKeyword(@RequestParam("keyword") String keyword) {
        List<Recruitment> allRecruitments = recruitmentService.getAllRecruitments();
        List<Recruitment> filteredRecruitments = new ArrayList<>();

        for (Recruitment recruitment : allRecruitments) {
            try {
                // Extract text from the PDF CV
                byte[] pdfData = FileStorage.getFile(recruitment.getCv());
                String cvContent = pdfTextExtractor.extractText(pdfData);

                // If CV content is not null and contains the keyword, add the recruitment to the filtered list
                if (cvContent != null && cvContent.contains(keyword)) {
                    filteredRecruitments.add(recruitment);
                }
            } catch (IOException  e) {
                e.printStackTrace();
            }
        }
        return filteredRecruitments;
    }


}
