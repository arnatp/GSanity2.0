import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeEmailPasswordModalPage } from './change-email-password-modal.page';

describe('ChangeEmailPasswordModalPage', () => {
  let component: ChangeEmailPasswordModalPage;
  let fixture: ComponentFixture<ChangeEmailPasswordModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeEmailPasswordModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeEmailPasswordModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
