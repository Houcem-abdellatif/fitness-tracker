import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTrainingComponent } from './post-training.component';

describe('PostTrainingComponent', () => {
  let component: PostTrainingComponent;
  let fixture: ComponentFixture<PostTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
