import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { ToastController } from '@ionic/angular'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})

export class HomePage {
  tasks = null;
  isLoading: boolean = true;
  isAlertOpen: boolean = false;
  isModalOpen: boolean = false;
  id: string = '';
  currentTask: any = null;
  name: string = '';
  alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Delete',
      role: 'confirm',
    }
  ];
  constructor(private http: HttpService, public toastCtrl: ToastController) {}
  ionViewWillEnter() {
    this.getTasks();
  }

  getTasks() {
    this.http.doGet(`${environment.baseURL}/tasks`).then(
      (res: any) => {
        this.tasks = res.length > 0 ? res : null;
      },
      (err: any) => {
        this.tasks = null;
      }
    ).finally(
      () => {
        this.isLoading = false;
      }
    );
  }
  
  setResult(ev: any) {
    if(ev.detail.role === 'confirm'){
      this.isAlertOpen = false;
      this.isLoading = true;
      this.http.doDelete(`${environment.baseURL}/deleteTask?id=${this.id}`).then(
        (res: any) => {
          this.openToast('Task deleted successfully.', 'success');
          this.getTasks();
        },
        (err: any) => {
          this.openToast('Something went wrong. Try again.', 'danger');
        }
      ).finally(
        () => {
          this.isLoading = false;
          this.id = '';
        }
      );
    } else {
      this.id = '';
      this.isAlertOpen = false;
      console.log("id: ", this.id);
    }
  }

  deleteTask(id: string) {
    this.isAlertOpen = true;
    this.id = id;
  }

  async openToast(msg: string, color: string) {  
    const toast = await this.toastCtrl.create({  
      message: msg,
      duration: 5000,
      color: color
    });  
    toast.present();  
  }

  editTask(task: any) {
    this.currentTask = task;
    this.isModalOpen = true;
    this.name = this.currentTask.name;
  }

  cancel() {
    this.isModalOpen = false;
    this.currentTask = null;
    this.name = '';
  }

  confirm() {
    this.isLoading = true;
    let url;
    let obj;
    let msg: any;
    if(this.currentTask){
      url = `${environment.baseURL}/updateTask`;
      obj = {
        _id: this.currentTask._id,
        name: this.name
      };
      msg = 'updated';
    } else {
      url = `${environment.baseURL}/addTask`;
      obj = {
        name: this.name
      };
      msg = 'added';
    }
      this.http.doPost(url, obj).then(
        (res: any) => {
          this.openToast(`Task ${msg} successfully.`, 'success');
        },
        (err: any) => {
          this.openToast('Something went wrong. Try again.', 'danger');
        }
      ).finally(
        () => {
          this.isLoading = false;
          this.id = '';
          this.cancel();
          this.getTasks();
        }
      );
  }

  addTask() {
    this.isModalOpen = true;
  }
}
