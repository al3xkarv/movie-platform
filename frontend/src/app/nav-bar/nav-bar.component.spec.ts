import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app.routing';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MatMenuModule],
      declarations: [NavBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should render title',
    waitForAsync(() => {
      const fixture = TestBed.createComponent(NavBarComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('button').textContent).toContain(
        'MOVIES PLATFORM'
      );
    })
  );
});
