import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAccountComponent } from './settings-account.component';

describe('SettingsAccountComponent', () => {
  let component: SettingsAccountComponent;
  let fixture: ComponentFixture<SettingsAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
