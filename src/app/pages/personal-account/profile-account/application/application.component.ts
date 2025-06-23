import { Component, model, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CurrentUserService } from '../../../../services/current-user.service';
import { ApplicationService } from './application.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TokenService } from '../../../../services/token.service';
import { Observable } from 'rxjs';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormCardsComponent } from './Components/form-cards/form-cards.component';
import { FormDropdownComponent } from './Components/form-dropdown/form-dropdown.component';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [FormCardsComponent, FormDropdownComponent],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss',
})
export class ApplicationComponent implements OnInit {

  constructor() 
  {
    
  }

  ngOnInit(): void {

  }
}
