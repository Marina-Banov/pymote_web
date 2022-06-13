import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-reset-button",
  templateUrl: "./reset-button.component.html",
  styleUrls: ["./reset-button.component.scss"],
})
export class ResetButtonComponent implements OnInit {
  public loading = false;

  constructor() {}

  ngOnInit(): void {}
}
