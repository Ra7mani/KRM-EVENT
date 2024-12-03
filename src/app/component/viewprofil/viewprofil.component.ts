import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { EventListService } from 'src/app/services/event-list.service';
import { FollowService } from 'src/app/services/follow.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-viewprofil',
  templateUrl: './viewprofil.component.html',
  styleUrls: ['./viewprofil.component.css']
})
export class ViewprofilComponent implements OnInit {
/**
 *
 */
 announcerdetails:any = {};
 requestdetails:any;
 idrequest:any;
 eventdetails:any;
 eventId = this.route.snapshot.paramMap.get('id');
isfollow:any;
nbrfollowers:any
constructor(private service : FollowService ,private serviceaccount : AccountService ,        private route: ActivatedRoute,
  private serviceevent : EventListService , private servicerequest : RequestService

) {
  
}
  ngOnInit(): void {
this.getprofileinfo();  
this.getrequestid();
this.getannouncerid();
this.getfollowers();

}


getrequestid(){
  this.serviceevent.geteventtbyid(this.eventId).subscribe(
    (res:any)=>{
      this.eventdetails=res;
      this.idrequest=this.eventdetails.eventRequestId;
      console.log("id request : ",this.idrequest);
      localStorage.setItem("idreq",this.idrequest);
      console.log("event details : ",this.eventdetails);
    }
  )
}
getannouncerid(){
  const idreq =localStorage.getItem("idreq");
  this.servicerequest.getrequestbyid(idreq).subscribe(
    (res:any)=>{
      this.requestdetails=res;
      const announcerid = localStorage.setItem("idannouncer",this.requestdetails.announcerId);
      console.log("announcer id: ",this.requestdetails.announcerId);

      console.log("request details: ",this.requestdetails);

    }
  )
}
getprofileinfo(){
  const idann= localStorage.getItem("idannouncer");
  this.serviceaccount.detailsbyid(idann).subscribe(
    (res:any)=>{
      this.announcerdetails=res;
      console.log("announcer details : ",this.announcerdetails);
    }
  )
}
getfollowers(){
  console.log("hello")
  const idann= localStorage.getItem("idannouncer");
  this.service.getfollowers(idann).subscribe(
    (res:any)=>{
      if (res.length === 0) {
        this.nbrfollowers = 0; 
      } else {
        this.nbrfollowers = res.length; 
      }
      

      console.log("followers",this.nbrfollowers)
      //console.log("followers",this.nbrfollowers.length)
    }
  )
}
follow()
{
  const idann= localStorage.getItem("idannouncer");

  this.service.follow(idann).subscribe(
    (res:any)=>{
      console.log("follow suuccessfully");
      localStorage.setItem("followed","1")
      this.isfollow=true;
      this.getfollowers();

    }
  )
}
unfollow(){
  const idann= localStorage.getItem("idannouncer");

  this.service.unfollow(idann).subscribe(
    (res:any)=>{
      console.log("unfollow suuccessfully");
      localStorage.setItem("followed","0")
      this.isfollow=false;
      this.getfollowers();
    }
  )
}

}
