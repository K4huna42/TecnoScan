import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../application.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-form-cards',
  standalone: true,
  imports: [CommonModule,
    CardModule
  ],
  templateUrl: './form-cards.component.html',
  styleUrl: './form-cards.component.scss'
})
export class FormCardsComponent implements OnInit {
  cars: any[] = [];

  constructor(private applicationService: ApplicationService,)
  {

  }
  
  ngOnInit(): void {
    this.GetCar()
  }

  GetCar()
  {
    this.cars = [];
    this.applicationService.getCar().subscribe(
      (value) => {
        this.cars = value.data
      },
      (error) => {
        console.log(error.error.message)
      }
    )
  }

}
