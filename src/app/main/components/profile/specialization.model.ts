export class SpecializationModel {
  id: number;
  name: string;

  constructor(data: any = {}) {
    this.id = data.id || 0;
    this.name = data.name || '';
  }
}
