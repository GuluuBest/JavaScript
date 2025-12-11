export const DEFAULT_PRIORITY = "medium";

export class Task {
  constructor(title, priority = DEFAULT_PRIORITY) {
    this.title = title;
    this.priority = priority;
    this.isCompleted = false;
  }

  markComplete() {
    this.isCompleted = true;
    console.log(`Tugas "${this.title}" selesai:`);
  }
}
