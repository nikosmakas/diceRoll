import { Component, ElementRef, ViewChild, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {

  constructor(
    private renderer: Renderer2
  ) { }

  @ViewChild('betOn') inputBetOn: ElementRef;
  @ViewChild('diceOutcome') inputDiceOutcome: ElementRef;
  @ViewChild('betAmount') inputBetAmount: ElementRef;
  @ViewChild('balance') inputBalance: ElementRef;

  //sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  incrementBetOn() { //increases betOn by one
    if (this.inputBetOn.nativeElement.value < 12) {
      this.inputBetOn.nativeElement.value++;
    }
  }
  decrementBetOn() { //decreases betOn by one
    if (this.inputBetOn.nativeElement.value > 2) {
      this.inputBetOn.nativeElement.value--
    }
  }

  diceOutcome() { //Rolls the dice. 
    let diceNum = 0;

    diceNum = Math.floor(Math.random()*(12-2)+2)

    //diceNum = 2;// for testing purposes

    this.renderer.setProperty(this.inputDiceOutcome.nativeElement, 'value', diceNum);

    //this.inputDiceOutcome.nativeElement.value = diceNum;


    return diceNum;
  }

  resetBalance() { //sets the balance back to 10.000
    this.inputBalance.nativeElement.value = 10000;
  }


  //takes the placeAmount from #placeAmount input. subtracts it from balance and checks if betOn == diceNumer. if betOn==diceNum , pay up
  placeBet() {
    //checks if you balance is equal or higher to the placed amount.
    if (parseInt(this.inputBalance.nativeElement.value) >= this.inputBetAmount.nativeElement.value) { //checks if you have enough balance
      this.inputBalance.nativeElement.value =
        parseInt(this.inputBalance.nativeElement.value) - this.inputBetAmount.nativeElement.value; //subtracts placed amount from balance
    }
    else {

      setTimeout(function () { alert("You have insufficient balance"); }, 100);
      return;
    }
    let diceNumber = 0;

    diceNumber = this.diceOutcome();

    if (diceNumber == this.inputBetOn.nativeElement.value) {

      this.inputBalance.nativeElement.value = parseInt(this.inputBalance.nativeElement.value) + (this.inputBetAmount.nativeElement.value * 12);

      setTimeout(function () { alert("YOU WON!!!"); }, 100);

    }
    else {

      setTimeout(function () { alert(" i'm sorry, you Lost \n Try again. "); }, 100);

    }

  }
}
