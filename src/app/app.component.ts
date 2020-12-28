import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CustomNumericValidator } from './validators/numeric-validator';
import { ClientIdsCompareValue } from './validators/clientids-validator';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Add custom validator to compare values.';
  actionCreateForm: FormGroup;
  transactionsObj = ['1','2','3','4','5'];
  isPullFlag = false;
  isTransactionsFlag = false;
  constructor(private fb: FormBuilder, private location: Location) {
    this.actionCreateForm = this.fb.group({
      clientIdOne:['',[Validators.required, Validators.minLength(4),Validators.pattern("^[0-9]*$"), CustomNumericValidator.numeric]],
      clientIdTwo:['',[Validators.required,Validators.pattern("^[0-9]*$"), CustomNumericValidator.numeric]],
      pullFlag:[false],
      transactions: ['']
    }, {
      validator: [ClientIdsCompareValue.compare]
    });
  }


  checkPullFlag(value: boolean){
    this.isPullFlag = value;
    this.isTransactionsFlag = (this.isPullFlag === true)? true: false;
    const transactionsFormControl = this.actionCreateForm.get('transactions');
    (this.isPullFlag === true)?transactionsFormControl.setValidators(Validators.required): transactionsFormControl.clearValidators();
    transactionsFormControl.updateValueAndValidity();
  }
  
  resetForm() {
    this.actionCreateForm.reset();
    location.reload();
  }
  submitForm() {
    const clientOneValue = this.actionCreateForm.value.clientIdOne;
    const clientTwoValue = this.actionCreateForm.value.clientIdTwo;
    const pullFlagValue = this.actionCreateForm.value.pullFlag;
    const transValue = this.actionCreateForm.value.transactions;

    console.log(clientOneValue + ' ' + clientTwoValue + ' ' + pullFlagValue + ' ' + transValue);
  }
}
