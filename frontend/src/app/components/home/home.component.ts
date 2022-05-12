import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { RestService } from "../../http/rest.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public image = "";
  public error = "";
  public myForm: FormGroup;

  constructor(protected restService: RestService) {
    this.myForm = new FormGroup({
      file: new FormControl("", [Validators.required]),
      fileSource: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file,
      });
      const formData = new FormData();
      formData.append("file", this.myForm.get("fileSource")?.value);
      this.restService.uploadNetwork(formData).subscribe(
        (res) => {
          this.error = "";
          this.image = res.image;
        },
        (_) => {
          this.image = "";
          this.error = "Something went wrong!";
        }
      );
    }
  }
}
