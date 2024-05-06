import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return (
        item.user.firstName.toLowerCase().includes(searchText) ||
        item.user.lastName.toLowerCase().includes(searchText) ||
        item.type.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText) ||
        item.fromDate.toString().toLowerCase().includes(searchText) ||
        item.toDate.toString().toLowerCase().includes(searchText) ||
        item.status.toLowerCase().includes(searchText)
      );
    });
  }

}
