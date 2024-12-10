import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexNavComponent } from './flex-nav.component';

describe('FlexNavComponent', () => {
  let component: FlexNavComponent;
  let fixture: ComponentFixture<FlexNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlexNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlexNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
