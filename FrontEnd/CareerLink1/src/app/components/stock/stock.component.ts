import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stock } from 'src/app/models/Stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  constructor(private stockservice: StockService, private fb: FormBuilder) { }
  stocks:Stock[] = [];
  stockForm!: FormGroup;
  selectedStock: Stock | null = null;

  loadStocks(): void{
    this.stockservice.findAllStock()
    .subscribe(
      stocks => this.stocks = stocks,
      error => console.error('error, getallstk', error)
    );
  }
  ngOnInit(): void {
    this.loadStocks();
    this.createForm();
    
  }
  createForm(): void {
    this.stockForm = this.fb.group({
      name: ['', [Validators.required]],
      quantityAvailable: [null, [Validators.required]], 
     
    });
  }
  addStock(): void {
    const stock = this.stockForm.value;
    this.stockservice.addStock(stock)
    .subscribe(
      response => {
        console.log('success, addStock', response);
        this.loadStocks();
      },
      error => console.error('error, addStock', error)
    );
  }
  cancel():void {
    this.stockForm.reset();
    }
    editStock(stock: Stock): void {
      this.selectedStock = stock;
      this.stockForm.patchValue({
        name: stock.name,
        quantityAvailable: stock.quantityAvailable,
        
       
      });
    }
    updateStock(): void {
      if (this.selectedStock && this.stockForm.valid) {
        const updatedStock = { ...this.selectedStock, ...this.stockForm.value } as Stock;
        this.stockservice.updateStock(updatedStock).subscribe(
          response => {
            console.log('success, updateStock', response);
            this.loadStocks();
            this.stockForm.reset();
            this.selectedStock=null;
          },
          error => console.error('error, updateStock', error)
        );
      }
    }

    deleteStock(idstock :number): void {
      this.stockservice.deleteStock(idstock).subscribe(
        response => {
          console.log('success, deleteStock', response);
          this.loadStocks();
        },
        error => console.error('error, deleteStock', error)
      )
    }
}
