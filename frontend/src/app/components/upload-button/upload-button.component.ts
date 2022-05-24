import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { RestService } from "../../http/rest.service";
import { PymoteNetwork } from "../../models/pymote-models";

@Component({
  selector: "app-upload-button",
  templateUrl: "./upload-button.component.html",
  styleUrls: ["./upload-button.component.scss"],
})
export class UploadButtonComponent implements OnInit {
  @Output() updateNetwork: EventEmitter<PymoteNetwork>;
  public loading = false;
  public uploadForm: FormGroup;

  constructor(protected restService: RestService) {
    this.updateNetwork = new EventEmitter();
    this.uploadForm = new FormGroup({
      file: new FormControl("", [Validators.required]),
      fileSource: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any) {
    if (event.target.files.length === 0) return;
    const file = event.target.files[0];
    this.uploadForm.patchValue({ fileSource: file });

    const formData = new FormData();
    formData.append("file", this.uploadForm.get("fileSource")?.value);

    this.loading = true;
    this.restService.uploadNetwork(formData).subscribe({
      next: (res) => this.updateNetwork.emit(res),
      complete: () => (this.loading = false),
    });
  }
}
