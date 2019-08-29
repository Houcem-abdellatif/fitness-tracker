import { Store } from '@ngrx/store';
import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import * as fromTraining from '../training.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;

  constructor(
    private dialog: MatDialog,
    private trainingervice: TrainingService,
    private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.startOrResumeTraining();
  }

  startOrResumeTraining() {
    this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe(ex => {
      const step = ex.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress += 5;
        if (this.progress >= 100) {
          this.trainingervice.completedExercises();
          clearInterval(this.timer);
        }
      }, step);
    });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingervice.cancelledExercise(this.progress);
      } else {
        this.startOrResumeTraining();
      }
    });
  }

}
