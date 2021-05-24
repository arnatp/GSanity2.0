import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'welcome',
		pathMatch: 'full',
	},
	{
		path: 'welcome',
		canActivate: [AuthGuard],
		loadChildren: () =>
			import('./pages/welcome/welcome.module').then(
				(m) => m.WelcomePageModule
			),
	},
	{
		path: 'login',
		children: [
			{
				path: '',
				loadChildren: () =>
					import('./pages/auth-pages/login/login.module').then(
						(m) => m.LoginPageModule
					),
			},
			{
				path: 'recover-password',
				loadChildren: () =>
					import(
						'./pages/auth-pages/recover-password/recover-password.module'
					).then((m) => m.RecoverPasswordPageModule),
			},
		],
	},
	{
		path: 'register',
		loadChildren: () =>
			import('./pages/auth-pages/register/register.module').then(
				(m) => m.SignupPageModule
			),
	},
	{
		path: 'verify-email',
		loadChildren: () =>
			import('./pages/auth-pages/verify-email/verify-email.module').then(
				(m) => m.VerifyEmailPageModule
			),
	},
	{
		path: 'patient',
		loadChildren: () =>
			import('./pages/patient/tabs/tabs.module').then(
				(m) => m.TabsPageModule
			),
	},
	{
		path: 'doctor',
		loadChildren: () =>
			import('./pages/doctor/tabs/tabs.module').then(
				(m) => m.TabsPageModule
			),
	},
	{
		path: 'admin',
		loadChildren: () =>
			import('./pages/admin/tabs/tabs.module').then((m) => m.TabsPageModule),
	},
	/*{
		path: '**',
		redirectTo: 'welcome',
	},*/
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
