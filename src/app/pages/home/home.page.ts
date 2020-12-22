import { DataService } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  inventario: any;
  selectedProduct: any;
  productFound:boolean = false;

  constructor(private barcodeScanner: BarcodeScanner, private toast: Toast, public dataService: DataService) {
    this.dataService.getProducts()
    .subscribe((response)=> {
        this.inventario = response
        console.log(this.inventario);
    });
   }

  ngOnInit() {
  }

  scan() {
    this.selectedProduct = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct = this.inventario.find(product => product.codigo === barcodeData.text);
      if(this.selectedProduct !== undefined) {
        this.productFound = true;
        console.log(this.selectedProduct);
      } else {
        this.selectedProduct = {};
        this.productFound = false;
        this.toast.show('Recurso no encontrado en inventario', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}
