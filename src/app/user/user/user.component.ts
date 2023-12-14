import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import{User}from '../user';
import { UserService } from '../user.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { ProgramService } from 'src/app/program/program.service';
import { Program } from 'src/app/program/program';
import { BatchService } from 'src/app/batch/batch.service';
import { Batch } from 'src/app/batch/batch';
import { SelectItem } from 'primeng/api';
import { UserProgBatch } from '../user-prog-batch';


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
  userRoleDropdown: SelectItem[];
  roleStatus:string[]=['Active','Inactive'];
  userVisaStatus: string[] = ['Not-Specified', 'NA', 'GC-EAD', 'H4-EAD', 'H4', 'H1B', 
  'Canada-EAD', 'Indian-Citizen', 'US-Citizen', 'Canada-Citizen'];
  userVisaStatusControl: FormControl;
  visaStatusValue: string;
  userRoleStatusControl: FormControl;
  roleStatusValue:string;
  userRoleMapsControl:FormControl;
  userRoleMapsValue:string;
  assignProgBatchDialogue : boolean;
  programList: Program[];
  batchList : Batch[];
  batchListTemp :Batch[];
  filteredBatches: Batch[] = [];
  submittedPB :boolean =false;
 
 constructor(private userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private programService: ProgramService,
    private batchService: BatchService
    ){ }

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
     
    this.programService.getPrograms().subscribe(list => {
        this.programList = list;
        });
    
    this.batchService.getBatchList().subscribe(list => {
        this.batchList = list;
        this.batchListTemp=this.batchList;
    });
    
    this.userRoleDropdown = this.userRoleMaps.map(role => ({ label: role, value: role }));
  }
  
updateFilteredBatchNames(){
   
    this.batchList = this.batchListTemp;
    const progData :any = this.assignProgBatchForm.value.programName;
    const pid :any=progData.programId;
    this.batchList = this.batchList.filter(item => item.programId === pid);
  }
  
  private selectRow(checkValue: any) {
  
  }

  private getUserList() { 
    this.visibility = true;
    this.userService.getAllUsers().subscribe(users => {
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
    this.assignProgBatchDialogue=false;
    this.submitted=false;
  }

  openAssignDialog(){
    this.submittedPB=false;
    this.assignProgBatchDialogue=true;
    this.assignProgBatchForm.reset();
  }
  
  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialogue = true;
    this.userForm.reset();
  }

    userForm = this.fb.group({
      userId: [''],
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
    
  assignProgBatchForm = this.fb.group({
    programName: ['', Validators.required],
    batchName: ['', Validators.required],
    userId: ['', Validators.required],
    userStatus:['', Validators.required],
    roleId:['', Validators.required]
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



  
  editUser(user: User) {
    
    const userEmailAddress:string=user.userLoginEmail;
    this.userForm.patchValue(user);
    this.userForm.get('userLogin.userLoginEmail').patchValue(userEmailAddress);
    this.userDialogue = true;
    this.user={...user};
    const getAllUsers$ = this.userService.getAllUsers();
    const getUsers$ = this.userService.getUsers();
    getAllUsers$.subscribe(
      allUsers => console.log('allUsers:', allUsers),
      error => console.error('Error fetching allUsers', error)
    );
    
    getUsers$.subscribe(
      userRoleMap1 => console.log('userRoleMap1:', userRoleMap1),
      error => console.error('Error fetching userRoleMap1', error)
    );
    forkJoin([getAllUsers$, getUsers$]).subscribe(
      ([allUsers, userRoleMap1]) => {
        this.users = allUsers;
        allUsers.forEach(allUser => {
          const correspondingUser = userRoleMap1.find(userMap => userMap.user?.userId == allUser.userId);
          if (correspondingUser) {
            const userRoleStatus = correspondingUser.userRoleStatus;
            const userRoleId = correspondingUser.role.roleId;
            this.userForm.get('userRoleMaps').get('0.userRoleStatus').setValue(userRoleStatus);
            this.userForm.get('userRoleMaps').get('0.roleId').setValue(userRoleId);
          this.user = { ...user, userId: user.userId };

          }
        });
         
        this.visibility = false;
        
      },
      error => {
        console.error('Error fetching data', error);
        this.visibility = false;
      }
    ); 
   

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
    
    if (this.userForm.valid) {
      if (this.userForm.value.userId) {//Edit User
        const updatedUser = { ...this.userForm.value };
        const userData = {
          userId: this.userForm.value.userId,
          userComments: this.userForm.value.userComments,
          userEduPg: this.userForm.value.userEduPg,
          userEduUg: this.userForm.value.userEduUg,
          userFirstName: this.userForm.value.userFirstName,
          userLastName: this.userForm.value.userLastName,
          userLinkedinUrl: this.userForm.value.userLinkedinUrl,
          userLocation: this.userForm.value.userLocation,
          userMiddleName: this.userForm.value.userMiddleName,
          userPhoneNumber: this.userForm.value.userPhoneNumber,
          userTimeZone: this.userForm.value.userTimeZone,
          userVisaStatus: this.userForm.value.userVisaStatus,
        };
        //this.users[this.findIndexById(this.userForm.value.userId)] = this.userForm.value.userId;
        const index = this.findIndexById(this.userForm.value.userId);
        this.users[index] = { ...this.userForm.value };
         this.userService.updateUser(userData).subscribe((res) => {
          console.log('User updated successfully');
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'User Updated Successfully',
            life: 3000,
            
          });
          this.getUserList();
          this.userDialogue = false;
        },
        (error) => {
          console.error('Error updating user', error);
          alert('Error updating user details.');
        }
        );
        this.userDialogue = false;
       this.user = {};
      }
    }
       else {//may be new User
        //this.userSize = this.userSize + 1;
        //this.user.userId = this.userSize.toString();
        
    //  }
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
            this.submitted = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'User Added Successfully',
              life: 3000,
          });
            this.user={};
          },
         error:(error) =>
          {
            console.log(error);
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
        
       message: 'Are you sure you want to delete the user?', 
       header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.users = this.users.filter(val => val.userId !== user.userId);
            this.userService.deleteUser(user).subscribe(response => {
              console.log('User is deleted');
            })
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

  assignProgramBatch(){
    this.submittedPB = true;
    if(this.assignProgBatchForm.valid){
    
      const progData :any = this.assignProgBatchForm.value.programName;
      const pid :any=progData.programId;
      const batchData :any  = this.assignProgBatchForm.value.batchName;
      const bId :any = batchData.batchId; 
      const status = this.assignProgBatchForm.value.userStatus;
      
      const userPBData = {
        programId:pid,
        roleId:this.assignProgBatchForm.value.roleId,
        userId:this.assignProgBatchForm.value.userId,
        userRoleProgramBatches:[
          {
              batchId:bId,
              userRoleProgramBatchStatus:status
          }
        ]
      } 

      this.userService.assignProgBatch(userPBData).subscribe((res) => {
      this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'User  has been successfully assigned to Program/Batch(es)',
          life: 2000,
        });
        this.assignProgBatchDialogue=false;
      
      }, (error)=> {
            this.assignProgBatchDialogue=false;
            console.error('Other error:', error.status, error.statusText);
            if(error.status === 200){
              console.log("true");
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'User  has been successfully assigned to Program/Batch(es)',
                life: 2000,
              });
              this.assignProgBatchDialogue=false;
            }else{
              this.messageService.add({
              severity: 'error',
              summary: 'Failed',
              detail: error.error.message,
              life: 2000,
            });
          }
      });
    } else {
      console.log("Invalid form");
    }
  }
}

