import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index/index.component';
import {HomeComponent} from './home/home.component';
import {NewsComponent} from './news/news.component';
import {RouterModule, Routes} from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatPaginatorModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AdminService} from './admin.service';
import {ViewComponent} from './news/view/view.component';
import {WriteComponent} from './news/write/write.component';
import {CKEditorModule} from 'ng2-ckeditor';
import {FormsModule} from '@angular/forms';

const routes: Routes = [{
  path: '', component: IndexComponent, children: [
    {path: '', component: HomeComponent},                     // url경로 '/admin'
    {path: 'news', component: NewsComponent, children: [      // url경로 '/admin/news'
        {path: 'view/:news_id', component: ViewComponent},    // url경로 '/admin/news/view/1'
        {path: 'write', component: WriteComponent}
      ]}
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatPaginatorModule,
    CKEditorModule
  ],
  declarations: [IndexComponent, HomeComponent, NewsComponent, ViewComponent, WriteComponent],
  providers: [AdminService]
})
export class AdminModule {
}
