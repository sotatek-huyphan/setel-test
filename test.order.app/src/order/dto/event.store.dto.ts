export interface IOrderEventStoreDTO {
  _id?: string;
  aggregateId: string;
  type: string;
  data?: any;
  timestamp: Date;
  author?: string;
}
