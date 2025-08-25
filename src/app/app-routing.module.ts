import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsPage } from './features/posts/pages/posts-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts', component: PostsPage },
  { path: '**', redirectTo: '/posts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
