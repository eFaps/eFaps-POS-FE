import { Component, OnInit } from '@angular/core';
import { PosService } from '../../services/index'

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit {

  constructor(private posService: PosService) { }

  ngOnInit() {
  }

  register() {
    this.posService.register();
  }
}
