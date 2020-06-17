import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerQuestionnaireComponent } from './customer-questionnaire.component';

describe('CustomerQuestionnaireComponent', () => {
  let component: CustomerQuestionnaireComponent;
  let fixture: ComponentFixture<CustomerQuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerQuestionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
