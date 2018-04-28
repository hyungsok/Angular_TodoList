import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index/index.component';
import {HomeComponent} from './home/home.component';
import {NewsComponent} from './news/news.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
  path: '', component: IndexComponent, children: [
    {path: '', component: HomeComponent},     // url경로 '/admin'
    {path: 'news', component: NewsComponent}  // url경로 '/admin/news'
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IndexComponent, HomeComponent, NewsComponent]
})
export class AdminModule {
}
