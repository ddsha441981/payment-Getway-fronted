import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';



declare var Razorpay: any;


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  payment: any = {
    amount:'',
  };
 
  constructor( private _orderService : OrderService
    ) { }

  ngOnInit(): void {
  }

  amountData(){
    if(this.payment.amount == '' || this.payment.amount == null){
      alert("amount can not be blank");
      return;
    }
    this._orderService.generateOrder(this.payment).subscribe(
      (data:any)=>{
        //success
        console.log("data sent....");

        console.log(data);
        if(data.status == 'created'){
          //then we call form of razorpay
          let options = {
            key:'',
            amount:data.amount,
            currency:'INR',
            name: 'Donation',
            description: 'Donation Payment',
            image:'./assets/payment.jpg',
            order_id:data.id,
            handler:function(response:any){
              console.log(response.razorpay_payment_id);
              console.log(response.razorpay_order_id);
              console.log(response.razorpay_signature);
              console.log(response);
              alert(response);

              // When status created updatingServer
              // updatingServer(response,'Paid');

              alert("payment successfull");
            },
    
            prefill: {
              name: '',
              email: '',
              contact: '',
          },
          notes:{
              address:'welcome this is payment integretion demo',
          },

          theme:{
            color:'#3399cc',
          },

          };

          //object of razorpay_payment_id
          let rzp = new Razorpay(options);

          //when payment failed
          rzp.on('payment.failed', function (response:any){
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
            alert("payment failed");
          });
          rzp.open();
        }
      },
      (error:any)=>{
        // Error
        console.log(error);
      });
  }//method end

  // updatingServer(response: any){

  //   this._orderService.updatingPaymentServer(response).subscribe(
  //     (data)=>{
  //       alert("success");
  //     },
  //     (error)=>{
  //       alert("eerror");
  //     },
  //   );

  // }

}
  
  // _orderService.updatingPaymentServer(response).subscribe(
  //   (data:any)=>{
  //     alert("success");
  //     alert(response.razorpay_payment_id)
  //   },
  //   (error:any)=>{
  //     alert("eerror");
  //   },
  // );

// }

