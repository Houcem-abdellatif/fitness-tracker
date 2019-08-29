import { StoreModule } from '@ngrx/store';
import { SharedModule } from './../shared/shared.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { PostTrainingComponent } from './post-training/post-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { StopTrainingComponent } from './current-training/stop-training/stop-training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { trainingReducer } from './training.reducer';

@NgModule({
    declarations: [
        TrainingComponent,
        PostTrainingComponent,
        NewTrainingComponent,
        StopTrainingComponent,
        CurrentTrainingComponent
    ],
    imports: [
       SharedModule,
       TrainingRoutingModule,
       StoreModule.forFeature('training', trainingReducer)
    ],
    entryComponents: [StopTrainingComponent]
})

export class TrainingModule {}
