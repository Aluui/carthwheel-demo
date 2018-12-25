import { Injectable, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Injectable()
export class ToastService implements OnInit {

  ngOnInit(): void {

  }
  constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    // Assign the selected theme name to the `theme` property of the instance of ToastyConfig.
    // Possible values: default, bootstrap, material
    // this.toastyConfig.theme = 'bootstrap';
  }

  showToastMessage(message: string, toastType: ToastType, title?: string): void {
    // Or create the instance of ToastOptions
    const toastOptions: ToastOptions = {
      title: this.getToastTitle(toastType, title),
      msg: message,
      showClose: true,
      timeout: 8000,
      theme: 'bootstrap',
      onAdd: (toast: ToastData) => {
        // console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        // console.log('Toast ' + toast.id + ' has been removed!');
      }
    };

    switch (toastType) {
      case ToastType.Error:
        this.toastyService.error(toastOptions);
        break;

      case ToastType.Info:
        this.toastyService.info(toastOptions);
        break;

      case ToastType.Success:
        this.toastyService.success(toastOptions);
        break;

      case ToastType.Warning:
        this.toastyService.warning(toastOptions);
        break;

      default:
        this.toastyService.info(toastOptions);
        // this.toastyService.wait(toastOptions);
        break;
    }
  }

  getToastTitle(toastType: ToastType, title?: string): string {
    let returnTitle = 'Message';

    if (title) {
      returnTitle = title;
    } else {
      switch (toastType) {
        case ToastType.Error:
          returnTitle = 'Error';
          break;

        case ToastType.Info:
          returnTitle = 'Information';
          break;

        case ToastType.Success:
          returnTitle = 'Success';
          break;

        case ToastType.Warning:
          returnTitle = 'Warning';
          break;

        default:
          break;
      }
    }

    return returnTitle;
  }

}

export enum ToastType {
  Success,
  Error,
  Info,
  Warning
}
