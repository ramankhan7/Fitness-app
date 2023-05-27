import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training-component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;
  @Output() dialogState = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.startOrResumeTraining();
  }

  startOrResumeTraining() {
    this.timer = setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogState.emit();
      } else {
        this.startOrResumeTraining();
      }
    });
  }
}
