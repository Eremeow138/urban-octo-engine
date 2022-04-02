import { IMission } from './mission.interface';
import { IShip } from './ship.interface';

export interface IShipFull extends IShip {
  weight_kg: number;
  year_built: number;
  missions: IMission[];
}
