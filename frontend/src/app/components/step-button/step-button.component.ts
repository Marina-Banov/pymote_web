import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-step-button",
  templateUrl: "./step-button.component.html",
  styleUrls: ["./step-button.component.scss"],
})
export class StepButtonComponent implements OnInit {
  public loading = false;

  constructor() {}

  ngOnInit(): void {}
}
