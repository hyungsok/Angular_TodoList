import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {IndexComponent} from './index/index.component';
import {HomeComponent} from './home/home.component';
import {JqueryComponent} from './jquery/jquery.component';
import {RouterModule, Routes} from '@angular/router';
import {AugularComponent} from './augular/augular.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './user.service';

const routes: Routes = [
  // 사용자 사이트 : 부모, 자식간의 트리형식으로 해당 패스의 뷰를 DI해주는 방식임
  {
    path: '', component: IndexComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'jquery', component: JqueryComponent},
      {path: 'angular', component: AugularComponent}
    ]
  },
  // 관리자 사이트 (LazyLoading)
  // {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule'}
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent,
    JqueryComponent,
    AugularComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
