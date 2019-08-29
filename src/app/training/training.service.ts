import { Store } from '@ngrx/store';
import { UIService } from './../shared/ui.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Exercise } from './exercise.model';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';
import * as UI from '../shared/ui.actions';

@Injectable()
export class TrainingService {
    private authSub: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private uiService: UIService,
        private store: Store<fromTraining.State>
        ) {}

    fetchAvailableExercises() {
        this.store.dispatch(new UI.StartLoading());
        this.authSub.push(this.db
            .collection('availableExercises')
            .snapshotChanges()
            .pipe(map(docArray => {
                return docArray.map(doc => {
                return {
                    id: doc.payload.doc.id,
                    ...doc.payload.doc.data()
                };
                });
            }))
            .subscribe((exercises: Exercise[]) => {
                this.store.dispatch(new UI.StopLoading());
                this.store.dispatch(new Training.SetAvailableExercises(exercises));
            }, error => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackBar(error.message, null, 3000);
            })
        );
    }

    completedExercises() {
        this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe(ex => {
            this.addDataToDataBase({
                ...ex,
                date: new Date(),
                state: 'completed',
            });
            this.store.dispatch(new Training.StopTraining());
        });
    }

    cancelledExercise(progress: number) {
        this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe(ex => {
            this.addDataToDataBase({
                ...ex,
                duration: ex.duration * (progress / 100),
                calories: ex.duration * (progress / 100),
                date: new Date(),
                state: 'cancelled',
            });
            this.store.dispatch(new Training.StopTraining());
        });
    }

    startExercise(selectedId: string) {
        this.store.dispatch(new Training.StartTraining(selectedId));
    }

    private addDataToDataBase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }

    fetchFinishedExercises() {
        this.authSub.push(this.db
            .collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => {
                this.store.dispatch(new Training.SetFinishedExercises(exercises));
            }));
    }

    cancelSubscriptions() {
        this.authSub.forEach(sub => sub.unsubscribe());
    }
}
