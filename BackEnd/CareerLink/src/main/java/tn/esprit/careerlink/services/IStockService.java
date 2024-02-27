package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.Expense;
import tn.esprit.careerlink.entities.Stock;

import java.util.List;

public interface IStockService {
    Stock addStock (Stock stock);
    Stock updateStock (Stock stock);
    void deleteStock (Integer idstock);
    List<Stock> getAllStock();

}
