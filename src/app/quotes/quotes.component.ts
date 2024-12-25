import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-quotes',
  imports: [CommonModule],
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
  standalone: true,
})
export class QuotesComponent {
  quotes = [
    { message: 'First, solve the problem. Then, write the code.' },
    { message: 'Make it work, make it right, make it fast.' },
    { message: 'It’s not a bug; it’s an undocumented feature.' },
    {
      message:
        'Walking on water and developing software from a specification are easy if both are frozen.',
    },
    { message: 'Confusion is part of programming.' },
  ];
}
