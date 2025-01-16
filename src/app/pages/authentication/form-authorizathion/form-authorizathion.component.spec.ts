import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAuthorizathionComponent } from './form-authorizathion.component';

describe('FormAuthorizathionComponent', () => {
  let component: FormAuthorizathionComponent;
  let fixture: ComponentFixture<FormAuthorizathionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAuthorizathionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormAuthorizathionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
