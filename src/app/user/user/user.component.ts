import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import{User}from '../user';
import { UserService } from '../user.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[];
  user:User;
  visibility: boolean = false;
  userSize: number;
  selectedUsers: User[];
  submitted: boolean;
  userDialogue : boolean = false;
  viewUserDialogue:boolean=false;
  role = new FormControl();
  userRoleMaps:string[]=['R01','R02','R03'];
  roleStatus:string[]=['Active','Inactive'];
  userVisaStatus: string[] = ['Not-Specified', 'NA', 'GC-EAD', 'H4-EAD', 'H4', 'H1B', 
  'Canada-EAD', 'Indian-Citizen', 'US-Citizen', 'Canada-Citizen'];
  userVisaStatusControl: FormControl;
  visaStatusValue: string;
  userRoleStatusControl: FormControl;
  roleStatusValue:string;
  userRoleMapsControl:FormControl;
  userRoleMapsValue:string;
  constructor(private userService: UserService,private fb: FormBuilder,private messageService: MessageService,
    private confirmationService: ConfirmationService) { }
 
  ngOnInit(): void { 
    this.getUserList();
    this.userVisaStatusControl = new FormControl();
    this.userVisaStatusControl.valueChanges.subscribe((val)=>{
      console.log(val);
       this.visaStatusValue=val;
    });
    this.userRoleStatusControl = new FormControl();
    this.userRoleStatusControl.valueChanges.subscribe((val) => {
      this.roleStatusValue = val;
       });

  }
  private selectRow(checkValue: any) {
  
  }
  private getUserList() { 
    this.visibility = true;this.userService.getAllUsers().subscribe(users => {
      this.users = users; 
    this.visibility = false;
   });
   }

  viewUser(user: User) {
    this.user = { ...user };
    this.viewUserDialogue = true;
  }
  hideDialog() {
    this.userDialogue = false;
    this.viewUserDialogue=false;
   this.submitted=false;
  }

  openAssign(){

  }
  
  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialogue = true;
  }
    userForm = this.fb.group({
      userComments: ['', Validators.required],
      userEduPg: ['', Validators.required],
      userEduUg: ['', Validators.required],
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userLinkedinUrl: ['', Validators.required],
      userLocation: ['', Validators.required],
      userMiddleName: [''],
      userPhoneNumber: ['', Validators.required],
      userTimeZone: ['', Validators.required],
      userVisaStatus: ['', Validators.required],
      userLogin: this.fb.group({
        loginStatus: ['Active', Validators.required],
        password: [''],
        userLoginEmail: ['', [Validators.required, Validators.email]],
      }),
      userRoleMaps: this.fb.array([
        this.fb.group({
          roleId: ['',Validators.required],
          userRoleStatus: ['',Validators.required],
        })
      ]),
    });


  hasUnitNumber = false;

  states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'American Samoa', abbreviation: 'AS' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'District Of Columbia', abbreviation: 'DC' },
    { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Guam', abbreviation: 'GU' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Marshall Islands', abbreviation: 'MH' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Northern Mariana Islands', abbreviation: 'MP' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Palau', abbreviation: 'PW' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Puerto Rico', abbreviation: 'PR' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virgin Islands', abbreviation: 'VI' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' }
  ];


  
  editProgram(user: User) {

    console.log('Tesggggggg')
    this.userForm.setValue(user);
    this.userDialogue = true;
   
  }
  visaStatusChanged(event: any) {
    this.visaStatusValue = event.value;
    
  }
  userRoleStatusChanged(value: string) {
    this.userRoleStatusControl.setValue(value);
  }
  userRoleMapStatusChanged(value: string) {
    
  }
  //Code for adding new user
  onSubmit() {
    this.submitted = true;
    if (this.userForm.value) {
      if (this.userForm.value.userId) {

        this.users[this.findIndexById(this.userForm.value.userId)] = this.userForm.value.userId;
      
      } else {
       console.log('hjgjhgjhg');
       
       
        this.userSize = this.userSize + 1;
        this.user.userId = this.userSize.toString();
        
      }
      this.userForm.get('userLogin.loginStatus').setValue('Active');
        const userData = this.userForm.value;
        this.userForm.controls['userVisaStatus'].setValue(this.visaStatusValue);
        const role=this.roleStatusValue;
        this.userForm.get('userRoleMaps').get('0.userRoleStatus').setValue(role);
        if (this.userForm.value && this.userForm.value.userPhoneNumber) {
          this.userForm.value.userPhoneNumber = parseInt(this.userForm.value.userPhoneNumber, 11);
        }

        this.userService.addUser(userData).subscribe({
          next:(res) => {
            this.userForm.reset();
            alert("User added successfully");
          },
         error:() =>
          {
          
            alert("Error adding user details.");
          }
        })

    
      this.userDialogue = false;
      this.user= {};

      
    }
  }
  
  deleteSelectedUsers() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected Users?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.users = this.users.filter(val => !this.selectedUsers.includes(val));
            this.selectedUsers = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Users Deleted', life: 3000});
        }
    });
}
  deleteUser(user: User) {
    this.confirmationService.confirm({
        
       // message: 'Are you sure you want to delete ' + user.userFirstName? + " " + user.userMiddleName+ " " + user.lastName +'?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.users = this.users.filter(val => val.userId !== user.userId);
            //this.user = {};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
        }
    });
}

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].userId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

}