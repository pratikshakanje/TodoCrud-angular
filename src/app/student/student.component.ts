import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Istd } from '../model/stdInterface';
import { UuidServiceService } from 'src/app/service/uuid.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  ngOnInit(): void {

  }

  @ViewChild('stdForm') stdFormRef !: ElementRef;
  @ViewChild('fname') fnameRef !: ElementRef;
  @ViewChild('lname') lnameRef !: ElementRef;
  @ViewChild('email') emailRef !: ElementRef;
  @ViewChild('contact') contactRef !: ElementRef;
  @ViewChild('isActive') isActiveRef !: ElementRef;
  @ViewChild('stdTable') stdTableRef !: ElementRef;

  isInEditMode: boolean = false;

  updateId!: string

  stdArr: Istd[] = [
    {
      stdId: "1",
      fname: "Rahul",
      lname: "Sharma",
      email: "rahul@gmail.com",
      contact: "9876543210",
      isActive: true
    },
    {
      stdId: "2",
      fname: "Priya",
      lname: "Patil",
      email: "priya@gmail.com",
      contact: "9876543211",
      isActive: false
    },
    {
      stdId: "3",
      fname: "Amit",
      lname: "Verma",
      email: "amit@gmail.com",
      contact: "9876543212",
      isActive: true
    },
    {
      stdId: "4",
      fname: "Sneha",
      lname: "Joshi",
      email: "sneha@gmail.com",
      contact: "9876543213",
      isActive: true
    },
    {
      stdId: "5",
      fname: "Rohit",
      lname: "Kadam",
      email: "rohit@gmail.com",
      contact: "9876543214",
      isActive: false

    }]

  constructor(private __uuidServiceService: UuidServiceService) {

  }
  onAddStd() {
    let stdObj: Istd = {
      stdId: this.__uuidServiceService.getuuid(),
      fname: this.fnameRef.nativeElement.value,
      lname: this.lnameRef.nativeElement.value,
      email: this.emailRef.nativeElement.value,
      contact: this.contactRef.nativeElement.value,
      isActive: this.isActiveRef.nativeElement.value === 'active'
    }

    this.stdArr.push(stdObj);

    this.stdFormRef.nativeElement.querySelectorAll('input, select').forEach((ele: any) => {
      ele.value = '';
    });

    this.__uuidServiceService.snackbar('New student created successfully!!')

  }

  onEditStd(std: Istd) {
    this.fnameRef.nativeElement.value = std.fname;
    this.lnameRef.nativeElement.value = std.lname;
    this.emailRef.nativeElement.value = std.email;
    this.contactRef.nativeElement.value = std.contact;
    this.isActiveRef.nativeElement.value = std.isActive ? 'active' : 'inActive';

    this.isInEditMode = true;

    this.updateId = std.stdId
  }

  onUpdateStd() {
    let updateObj: Istd = {
      stdId: this.updateId,
      fname: this.fnameRef.nativeElement.value,
      lname: this.lnameRef.nativeElement.value,
      email: this.emailRef.nativeElement.value,
      contact: this.contactRef.nativeElement.value,
      isActive: this.isActiveRef.nativeElement.value === 'active'
    }

    const getInd = this.stdArr.findIndex(u => u.stdId === this.updateId)

    this.stdArr[getInd] = updateObj

    this.__uuidServiceService.snackbar('Student updated successfully!!')

    this.stdFormRef.nativeElement.querySelectorAll('input, select').forEach((ele: any) => {
      ele.value = '';
    });

    this.isInEditMode = false;

  }


  onDeleteStd(id: string){
    const index = this.stdArr.findIndex(d => d.stdId === id)

    this.stdArr.splice(index, 1)

    this.__uuidServiceService.snackbar('Student deleted successfully!!')

  }


  onUpdateCheckbox(std: Istd) {
    std.isActive = !std.isActive;

    this.__uuidServiceService.snackbar('Checkbox updated successfully')
  }
}
