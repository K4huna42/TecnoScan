import { Component, model, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CurrentUserService } from '../../../services/current-user.service';
import { ApplicationService } from './application.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TokenService } from '../../../services/token.service';
import { Observable } from 'rxjs';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';


interface LoadItems {
  name: string; 
  code: string;
}

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [ButtonModule,
    DialogModule, InputTextModule, DropdownModule, FormsModule, ReactiveFormsModule, FloatLabelModule,CardModule, CommonModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss',
})
export class ApplicationComponent implements OnInit {
  volumes: LoadItems[] = [];
  brands: LoadItems[] = [];
  gears: LoadItems[] = [];
  visible: boolean = false;
  SendCarForm: FormGroup;
  GetCarForm: FormGroup;
  cars: any[] = [];

  constructor(private currentUserService: CurrentUserService,
    private applicationService: ApplicationService,
    private fb: FormBuilder,
    private tokenService: TokenService,) 
    {
    this.SendCarForm = this.fb.group({
      user_id: ['', Validators.required],
      brand_id: ['', Validators.required],
      model: ['', Validators.required],
      year: [null, Validators.required],
      engine_volume: ['', Validators.required],
      transmission_type_id: ['', Validators.required],
      vin_code: ['', Validators.required],
    });
    this.GetCarForm = this.fb.group({
      car_brand: ['', Validators.required],
      model: ['', Validators.required],
      year: [null, Validators.required],
      engine_vol: ['', Validators.required],
      transmission_type: ['', Validators.required],
      vin_code: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.LoadDataForDropdown(this.applicationService.getCapacity(), 'volumes')
    this.LoadDataForDropdown(this.applicationService.getMark(), 'brands')
    this.LoadDataForDropdown(this.applicationService.getGearBox(), 'gears')
    this.GetCar()
  }

  PatchValueData(data: any)
  {
    this.GetCarForm.patchValue({
      car_brand: data?.car_brand.name,
      model: data?.model,
      year: data?.year,
      engine_vol: data?.engine_vol.name,
      transmission_type: data?.transmission_type.name,
      vin_code: data?.vin_code,
    })

    this.cars.push(this.GetCarForm.value);
  }

  LoadDataForDropdown(apiMethod: Observable<any>, targetField: string)
  {
      apiMethod.subscribe(
        (value) => {
          const result = value.data.map((item: any) => ({
            name: item.name,
            code: item.id,
          }));
          (this as any)[targetField] = result;
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

  GetCar()
  {
    this.cars = [];
    this.applicationService.getCar().subscribe(
      (value) => {
        value.data.forEach((car: any) => {
        this.applicationService.getCarId(car['id']).subscribe(
          (value) => {
            this.PatchValueData(value.data)
          },
          (error) => {
            console.log(error.error.message)
          } 
        )
    });
      },
      (error) => {
        console.log(error.error.message)
      }
    )
  }

  showDialog() {
    this.visible = true;
  }

}
