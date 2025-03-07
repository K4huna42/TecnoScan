import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'app-personal-account',
  standalone: true,
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './personal-account.component.html',
  styleUrl: './personal-account.component.scss'
})
export class PersonalAccountComponent implements OnInit{

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private currentUserService: CurrentUserService) { }

  menuItems: any = {
        home: { 
            action: () => this.executeCommand('home') 
        },
        profile: { 
            action: () => this.executeCommand('profile') 
        },
        settings: {
            action: () => this.executeCommand('settings') 
        },
        exit:
        {
          action: () => this.executeCommand('exit') 
        }
  };

  ngOnInit(): void {
  }
  
  executeCommand(commandName: string): void {

  if (commandName === 'exit') {
    localStorage.removeItem('YXV0aFRva2Vu');
    this.currentUserService.removeUser();
    this.router.navigate(['/login'], { state: { isSessionExpired: false } });
  }
  else{
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('UserId');
      if (id) {
        this.router.navigate([`${id}/${commandName}`]);
      }
      });
      }
  }
}
