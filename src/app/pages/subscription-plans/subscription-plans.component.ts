import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoggedInUser } from 'src/app/NGRX/auth.selectors';
import { Plan } from 'src/app/Interfaces/plan';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StripeService } from 'src/app/Services/StripeService/stripe.service';
import { PopupComponent } from 'src/app/Components/popup/popup.component';
import { User } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/Services/userService/user.service';
import cli from '@angular/cli';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.css'],
})
export class SubscriptionPlansComponent implements OnInit {
  client!: User;
  selectedPlan?: Plan;
  PlanId: number = 0;
  card: any;

  @ViewChild('cardElement') cardElement!: ElementRef;
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;

  constructor(
    private store: Store,
    private router: Router,
    private userService: UserService,
    private stripeService: StripeService
  ) {}

  ngOnInit() {
    this.store.select(selectLoggedInUser).subscribe((loggedInclient) => {
      if (loggedInclient) {
        this.userService.getClient(loggedInclient.id!+1).subscribe((client) => {
          this.client = client;
          this.selectedPlan = client.plan;
          console.log('====================================');
          console.log(this.client,this.selectedPlan);
          console.log('====================================');
        })
      }
    });
  }

  async payWithCard() {
    const { token, error } = await this.stripeService.createToken(this.card);

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while processing the card information.',
      });
    } else {
      this.userService
        .updateClientPlan(this.client.id!, this.PlanId, token.id)
        .subscribe(
          (updatedClient) => {
            this.client = updatedClient;
            this.selectedPlan = updatedClient.plan;
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Plan updated successfully',
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while updating the plan',
            });
            console.error(error);
          }
        );
    }
  }

  async choosePlan(planId: number) {
    this.PlanId = planId;
    this.card = this.stripeService.createCardElement();
    this.card.mount(this.cardElement.nativeElement);
    this.popupComponent.Toggle();
  }
}
