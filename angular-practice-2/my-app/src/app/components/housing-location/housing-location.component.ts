import { Component, Input } from '@angular/core';
import { HousingLocation } from 'src/app/models/housing-location';

@Component({
  selector: 'app-housing-location',
  templateUrl: './housing-location.component.html',
  styleUrls: ['./housing-location.component.scss'],
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
