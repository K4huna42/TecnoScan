import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicationService } from '../../application.service';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../../../../../../services/current-user.service';
import { TokenService } from '../../../../../../services/token.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';

type LoadKey = 'volumes' | 'brands' | 'gears';
type Something = Record<LoadKey, LoadItems[]>;

interface LoadItems {
  name: string;
  code: string;
}

@Component({
  selector: 'app-form-dropdown',
  standalone: true,
  imports: [ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,],
  templateUrl: './form-dropdown.component.html',
  styleUrl: './form-dropdown.component.scss'
})
export class FormDropdownComponent implements OnInit {
  loadValues: Something = {
    volumes:[],
    brands: [],
    gears:[]
  }



  visible: boolean = false;
  SendCarForm: FormGroup;
  years:{name: number}[] = [];

  constructor(private applicationService: ApplicationService,
    private currentUserService: CurrentUserService,
    private fb: FormBuilder,
    private tokenService: TokenService,) {
    this.SendCarForm = this.fb.group({
      user_id: ['', Validators.required],
      brand_id: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      engine_volume: ['', Validators.required],
      transmission_type_id: ['', Validators.required],
      vin_code: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  generateYears() {
    for (let annum = 1940; annum <= 2025; annum++) {
      this.years.push({name: annum});
    }
    console.log(this.years)
  }

  LoadDataForDropdown(apiMethod: Observable<any>, targetField: LoadKey) {
    if (apiMethod)
      apiMethod.subscribe(
        (value) => {
          const result = value.data.map((item: any) => ({
            name: item.name,
            code: item.id,
          }));
          this.loadValues[targetField] = result;
        },
        (error) => {
          console.error(error.error.message);
        }
      );
  }

  SendCar() {
    const formData = this.SendCarForm.value;
    const FlowUser = this.currentUserService.getUserSession()

    const data = {
      user_id: FlowUser.id,
      brand_id: formData.brand_id?.code,
      model: formData.model,
      year: formData.year,
      engine_volume: formData.engine_volume?.code,
      transmission_type_id: formData.transmission_type_id?.code,
      vin_code: formData.vin_code,
    }

    this.applicationService.setCar(data).subscribe(
      (value) => {
        this.tokenService.setToken(value.token);
        this.tokenService.getValueToken()
      },
      (error) => {
        console.log(error.error.message)
      }
    )

    console.log(data)
  }
   methods = [this.applicationService.getCapacity(),
  this.applicationService.getMark(),
  this.applicationService.getGearBox()]
  loadFieldValues: LoadKey[] = ['volumes', 'brands', 'gears']

  showDialog() {
    for (let item = 0; item <= this.methods.length; item++) {
      if (this.loadValues[this.loadFieldValues[item]] && this.loadValues[this.loadFieldValues[item]].length === 0)
        this.LoadDataForDropdown(this.methods[item], this.loadFieldValues[item])
    }

    console.log('loadData', this.loadValues)
    this.generateYears();
    this.visible = true;

  }
}
