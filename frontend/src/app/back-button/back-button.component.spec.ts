import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { BackButtonComponent } from './back-button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SpyLocation } from '@angular/common/testing';

describe('BackButtonComponent', () => {
  let component: BackButtonComponent;
  let fixture: ComponentFixture<BackButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BackButtonComponent],
      providers: [
        {
          provide: Location,
          useClass: SpyLocation,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have goBack method and should call location.back', () => {
    spyOn(component.location, 'back');
    component.goBack();
    expect(component.goBack).toBeDefined();
    expect(component.location.back).toHaveBeenCalled();
  });
});
