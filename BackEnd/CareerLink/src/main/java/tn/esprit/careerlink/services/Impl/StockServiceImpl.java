package tn.esprit.careerlink.services.Impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Stock;
import tn.esprit.careerlink.repositories.StockRepository;
import tn.esprit.careerlink.services.IExpenseService;
import tn.esprit.careerlink.services.IStockService;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class StockServiceImpl implements IStockService {
    @Autowired
    StockRepository stockRepository;
    @Override
    public Stock addStock(Stock stock) {
        return stockRepository.save(stock);
    }

    @Override
    public Stock updateStock(Stock stock) {
        return stockRepository.save(stock);
    }


    @Override
    public void deleteStock(Integer idstock) {
        stockRepository.deleteById(idstock);

    }

    @Override
    public List<Stock> getAllStock() {
       return stockRepository.findAll();
    }
}
