import { Input, OnDestroy, OnInit, Directive } from "@angular/core";
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import {
  Document,
  Payment,
  PaymentService,
  UtilsService,
} from "@efaps/pos-library";
import { Subscription } from "rxjs";

@Directive()
export abstract class PaymentForm implements OnInit, OnDestroy {
  public paymentForm: FormGroup;
  protected payments: Payment[] = [];
  @Input() protected change: number = 0;
  public currency: string;
  protected subscription$ = new Subscription();
  protected document!: Document;

  constructor(
    protected paymentService: PaymentService,
    protected utilsService: UtilsService,
    protected fb: UntypedFormBuilder
  ) {
    this.currency = utilsService.getCurrencySymbol("PEN");
    this.paymentForm = this.fb.group({
      amount: ["0.00", Validators.min(0)],
    });
  }

  ngOnInit() {
    this.subscription$.add(
      this.paymentService.currentDocument.subscribe(
        (_doc) => (this.document = _doc)
      )
    );
    this.subscription$.add(
      this.paymentService.currentPayments.subscribe(
        (_payments) => (this.payments = _payments)
      )
    );
    this.subscription$.add(
      this.paymentService.currentTotal.subscribe((_total) => {
        let payableAmount = 0;
        if (this.document) {
          payableAmount = this.document.payableAmount
            ? this.document.payableAmount
            : this.document.crossTotal;
        }
        this.change = this.document ? _total - payableAmount : _total;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  setNumber(_number: string) {
    let amount: string;
    switch (_number) {
      case "clear":
        amount = "0";
        break;
      default:
        amount = "" + this.paymentForm.value.amount + _number;
        break;
    }
    amount = amount.replace(/\./g, "").replace(/,/g, "").replace(/^0+/, "");
    if (amount.length > 2) {
      amount =
        amount.substring(0, amount.length - 2) +
        "." +
        amount.substring(amount.length - 2);
    } else if (amount.length === 1) {
      amount = "0.0" + amount;
    } else {
      amount = "0." + amount;
    }

    const amountNum = this.utilsService.parse(amount);
    const amountStr = this.utilsService.toString(amountNum);
    this.paymentForm.patchValue({ amount: amountStr });
  }

  setChange() {
    if (this.change < 0) {
      const amountStr = this.utilsService.toString(-this.change);
      this.paymentForm.patchValue({ amount: amountStr });
    }
  }

  addPayment() {
    const amount = this.utilsService.parse(this.paymentForm.value.amount);
    if (amount > 0) {
      let payment = this.getPayment();
      payment.amount = amount;
      this.payments.push(payment);
      this.paymentService.updatePayments(this.payments);
      this.paymentForm.patchValue({ amount: 0 });
      this.setNumber("0");
    }
  }

  abstract getPayment(): Payment;
}
