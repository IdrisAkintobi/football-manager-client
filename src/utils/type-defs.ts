interface Player {
  firstName: string;
  lastName: string;
  age: string;
  position: string;
  value: number;
  country: string;
  onSale: boolean;
  price?: number,
  _id: string;
}

interface Team {
  teamName: string;
  country: string;
  value: number;
  budget: number;
  players: Player[];
}
export type { Player, Team };
