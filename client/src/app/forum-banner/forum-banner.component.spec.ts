import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumBannerComponent } from './forum-banner.component';

describe('ForumBannerComponent', () => {
  let component: ForumBannerComponent;
  let fixture: ComponentFixture<ForumBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
