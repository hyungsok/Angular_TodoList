import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index/index.component';
import {HomeComponent} from './home/home.component';
import {NewsComponent} from './news/news.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatCardModule, MatExpansionModule, MatPaginatorModule, MatToolbarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AdminService} from './admin.service';
import {ViewComponent} from './news/view/view.component';

const routes: Routes = [{
  path: '', component: IndexComponent, children: [
    {path: '', component: HomeComponent},                     // url경로 '/admin'
    {path: 'news', component: NewsComponent, children: [      // url경로 '/admin/news'
        {path: 'view/:news_id', component: ViewComponent},    // url경로 '/admin/news/view/1'
      ]}
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatPaginatorModule
  ],
  declarations: [IndexComponent, HomeComponent, NewsComponent, ViewComponent],
  providers: [AdminService]
})
export class AdminModule {
}
