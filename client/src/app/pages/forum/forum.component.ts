import { Component, OnInit } from '@angular/core';
import { Forum } from '../../core/api/Forum'; // Replace 'path-to-appointment-model' with the actual path to the Appointment model
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ForumService } from '../../core/service/Forum.service';
import { AuthentificationService } from 'src/app/core/service/authentification.service';
import { User } from 'src/app/core/api/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    styleUrls: ['./forum.component.scss'],
    templateUrl: './forum.component.html',
    providers: [MessageService],
})
export class ForumComponent implements OnInit {
    ForumDialog: boolean = false;
    postForm!: FormGroup;

    
    // deleteAppointmentDialog: boolean = false;

    // deleteAppointmentsDialog: boolean = false;
    user: User={"pseudo":"pseudoNom"};
    posts: Forum[] = [];
    myposts: Forum[]= [];
    MyId: string="Empty";
    data?: string;

    constructor(
        public forumService: ForumService,
        private messageService: MessageService,private _userService:AuthentificationService,
        private fb: FormBuilder
        ) {}
    
    
    ngOnInit() {
        // setMyId(){
            
        this.postForm = this.fb.group({
            postContent: ['', Validators.required]
        });
  

        // }
        this.forumService
            .getAllPosts()
            .then((data) => {
                //this.posts = JSON.parse(this.postsJson);
                this.posts = data || []; // Assign data to posts or use an empty array if data is undefined
                console.log('test', this.posts);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
                this.posts = []; // Assign an empty array in case of an error
            });
            this.forumService
            .getPostsById(this.MyId)
            .then((data) => {
                //this.posts = JSON.parse(this.postsJson);
                this.myposts = data || []; // Assign data to posts or use an empty array if data is undefined
                console.log('test', this.myposts);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
                this.myposts = []; // Assign an empty array in case of an error
            });

            // this._userService.getUserProfile().subscribe((data)=>{
            //     this.user=data
            // })

}

onSubmit(): void {
    // Handle the form submission here (e.g., send the post to the server)
    const postContent = this.postForm.get('postContent')?.value;
    console.log('Post submitted:', postContent);

    // Reset the form after submission (optional)
    this.postForm.reset();
  }
}