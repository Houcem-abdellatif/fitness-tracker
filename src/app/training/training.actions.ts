import { Exercise } from './exercise.model';
import { Action } from '@ngrx/store';

export const SET_AVAILABLE_EXERCISES = '[Training] Set available exercises';
export const SET_FINISHED_EXERCISES = '[Training] Set finished exercises';

export const START_TRAINING = '[Training] Start training';
export const STOP_TRAINING = '[Training] Stop training';

export class SetAvailableExercises implements Action {
    readonly type = SET_AVAILABLE_EXERCISES;

    constructor(public payload: Exercise[]) {}
}

export class SetFinishedExercises implements Action {
    readonly type = SET_FINISHED_EXERCISES;

    constructor(public payload: Exercise[]) {}
}


export class StartTraining implements Action {
    readonly type = START_TRAINING;

    constructor(public payload: string) {}
}

export class StopTraining implements Action {
    readonly type = STOP_TRAINING;
}

export type TrainingActions = StartTraining | StopTraining | SetAvailableExercises | SetFinishedExercises;
