import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageToastService {

  constructor(private toastr: ToastrService) { }

  public showMsgWarning(msg: string) {
    this.toastr.warning(msg, '', {
      progressBar: true
    });
  }

  public showMsgSuccess(msg: string) {
    this.toastr.success(msg, '', {
      progressBar: true
    });
  }

  public showMsgError(message: string, header?: string) {
    this.toastr.error(message, header, {
      progressBar: true,
      enableHtml: true
    });
  }
}
