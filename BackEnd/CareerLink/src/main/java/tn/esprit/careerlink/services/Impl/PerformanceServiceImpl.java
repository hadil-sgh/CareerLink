package tn.esprit.careerlink.services.Impl;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Performance;
import tn.esprit.careerlink.entities.User;
import tn.esprit.careerlink.repositories.PerformanceRepository;
import tn.esprit.careerlink.services.IPerformanceService;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class PerformanceServiceImpl implements IPerformanceService {
    @Autowired
        PerformanceRepository performanceRepository;
    @Autowired
    UserServiceImpl userService;
    private final SentimentAnalysisService sentimentAnalysisService;


    @Override
    public Performance addPerformence(Performance performence) {

        return performanceRepository.save(performence);
    }

    public List<Performance> getPerformancesByUser(User user) {
        return performanceRepository.findByUser(user);
    }

    public double getAverageGradeByEmployee(User employee) {
        List<Performance> performances = performanceRepository.findByUser(employee);
        if (performances.isEmpty()) {
            return 0.0; // Return 0 if no performances found
        }

        int totalGrade = 0;
        for (Performance performance : performances) {
            totalGrade += performance.getGrade();
        }

        return (double) totalGrade / performances.size(); // Calculate average grade
    }

    @Override
    public Performance bestEmplyeeOfThisMonth() {
        List<Performance> PerformancesofthisMonth=new ArrayList<>();
        return null;
    }

    @Override
    public Performance updatePerformence(Performance performence) {
        return performanceRepository.save(performence);
    }

    @Override
    public Performance getOnePerformence(Integer idPerformence) {
        return performanceRepository.findById(idPerformence).orElse(null);
    }

    @Override
    public List<Performance> getAllPerformences() {
        return performanceRepository.findAll();
    }

    @Override
    public List<Performance> getAllPerformencesbyid(String email) {
        int id = userService.getOneUserbyEmail(email).getId();
        List<Performance> list=new ArrayList<>();
        List<Performance> performances=getAllPerformences();
        for (Performance p :performances){
        if (p.getUser().getId().equals(id)){
             list.add(p);
        }
}
        return  list;
    }

    @Override
    public List<Performance> getPerformanceByYearAndMonth(int year, int month) {
        return performanceRepository.findByYearAndMonth(year,month);
    }

    @Override
    public void deletePerformence(Integer idPerformence) {
        performanceRepository.deleteById(idPerformence);
    }

    @Override
    public float getCurrentWeekGradeForUser(Integer userId) {
        LocalDate currentDate = LocalDate.now();
        int currentMonth = currentDate.getMonthValue();


        Performance performance = performanceRepository.findByWeekAndUserId(currentMonth, userId);

        if (performance != null) {
            return performance.getGrade();
        } else {
            return 0;
        }
    }
    public List<Performance> PerformanceForCurrentMonth() {
        // Get the current month and year
        LocalDate currentDate = LocalDate.now();
        int currentMonth = currentDate.getMonthValue();
        int currentYear = currentDate.getYear();

        // Retrieve the best performance for the current month and year
        return performanceRepository.findByMonthAndYear(currentMonth, currentYear);

    }

    public String findBestComment(List<Performance> performances) {
        Optional<Performance> bestPerformance = performances.stream()
                .max((p1, p2) -> {
                    String sentiment1 = sentimentAnalysisService.analyzeSentiment(p1.getComment());
                    String sentiment2 = sentimentAnalysisService.analyzeSentiment(p2.getComment());
                    return compareSentiments(sentiment1, sentiment2);
                });

        return bestPerformance.map(Performance::getComment).orElse(null);
    }

    private int compareSentiments(String sentiment1, String sentiment2) {
        // Assigning weights to sentiments based on their positivity/negativity
        // Adjust these weights based on your specific requirements
        int weight1 = getSentimentWeight(sentiment1);
        int weight2 = getSentimentWeight(sentiment2);
        return Integer.compare(weight1, weight2);
    }

    private int getSentimentWeight(String sentiment) {
        // Assign weights based on the sentiment
        switch (sentiment) {
            case "Very Positive":
                return 5;
            case "Positive":
                return 4;
            case "Neutral":
                return 3;
            case "Negative":
                return 2;
            case "Very Negative":
                return 1;
            default:
                return 0;
        }
    }

    public static Optional<Performance> findPerformanceByComment(List<Performance> performances, String comment) {
        return performances.stream()
                .filter(performance -> performance.getComment().equals(comment))
                .findFirst();
    }
    public Map<Integer, Double> calculateMonthlyAverageImprovement(List<Performance> performances) {
        // Group performances by month
        Map<Integer, List<Performance>> performancesByMonth = performances.stream()
                .collect(Collectors.groupingBy(Performance::getWeek));

        Map<Integer, Double> monthlyAverageImprovement = new HashMap<>();

        // Iterate over each month
        for (Map.Entry<Integer, List<Performance>> entry : performancesByMonth.entrySet()) {
            int month = entry.getKey();
            List<Performance> performancesInMonth = entry.getValue();

            // Sort performances in the month by year
            performancesInMonth.sort(Comparator.comparingInt(Performance::getYear));

            double totalImprovement = 0;
            int count = 0;

            // Calculate improvement for each year
            for (int i = 1; i < performancesInMonth.size(); i++) {
                Performance currentPerformance = performancesInMonth.get(i);
                Performance previousPerformance = performancesInMonth.get(i - 1);

                if (currentPerformance.getGrade() > previousPerformance.getGrade()) {
                    totalImprovement += currentPerformance.getGrade() - previousPerformance.getGrade();
                    count++;
                }
            }

            // Calculate average improvement for the month
            double averageImprovement = count == 0 ? 0 : totalImprovement / count;
            monthlyAverageImprovement.put(month, averageImprovement);
        }

        return monthlyAverageImprovement;
    }
    public Map<Integer, Float> calculateAveragePerformanceByMonth(List<Performance> performances, int year) {
        // Filter performances for the given year
        List<Performance> performancesForYear = performances.stream()
                .filter(performance -> performance.getYear() == year)
                .collect(Collectors.toList());

        // Map to store average performance for each month
        Map<Integer, Float> averagePerformanceByMonth = new HashMap<>();

        // Map to store sum of grades for each month
        Map<Integer, Float> sumOfGradesByMonth = new HashMap<>();

        // Map to store count of performances for each month
        Map<Integer, Integer> performanceCountByMonth = new HashMap<>();

        // Calculate sum of grades and count of performances for each month
        for (Performance performance : performancesForYear) {
            int month = performance.getWeek();
            float grade = performance.getGrade();

            sumOfGradesByMonth.put(month, sumOfGradesByMonth.getOrDefault(month, 0.0f) + grade);
            performanceCountByMonth.put(month, performanceCountByMonth.getOrDefault(month, 0) + 1);
        }

        // Calculate average performance for each month
        for (Map.Entry<Integer, Float> entry : sumOfGradesByMonth.entrySet()) {
            int month = entry.getKey();
            float sumOfGrades = entry.getValue();
            int count = performanceCountByMonth.get(month);

            float average = sumOfGrades / count;
            averagePerformanceByMonth.put(month, average);
        }

        return averagePerformanceByMonth;
    }

}




