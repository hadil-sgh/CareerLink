package tn.esprit.careerlink.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.careerlink.entities.Expense;
import tn.esprit.careerlink.entities.Stock;
import tn.esprit.careerlink.services.IStockService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Stockgit")
public class StockController {
    @Autowired
    IStockService iStockService;
    @PostMapping("/add")
    public Stock addStock(@RequestBody Stock stock) {
        return iStockService.addStock(stock);
    }
    @PutMapping("/update")
    public Stock updateStock(@RequestBody Stock stock){
        return iStockService.updateStock(stock);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteStock(@PathVariable ("id")Integer idstock) {
        iStockService.deleteStock(idstock);
    }
    @GetMapping("/getAll")
    public List<Stock> getAllStock(){
        return iStockService.getAllStock();
    }
}
