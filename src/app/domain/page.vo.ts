export class PageVO {
  constructor(public pageIndex: number, public pageSize: number,
              public totalCount: number = 0,
              public pageSizeOptions?: number[]) {
    if (!pageSizeOptions) {
      this.pageSizeOptions = [5, 15, 30, 60, 90];
    }
  }
}
