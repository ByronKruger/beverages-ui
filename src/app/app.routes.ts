import { Routes } from '@angular/router';
import { UserBeverageCustomisation } from './components/user-beverage-customisation/user-beverage-customisation';
import { EditBeverageCustomisation } from './components/edit-beverage-customisation/edit-beverage-customisation';
import { CreateBeverageCustomisation } from './components/create-beverage-customisation/create-beverage-customisation';
import { ExternalAuthHandler } from './components/auth/external-auth-handler/external-auth-handler';
import { CoffeegAuthenticateUser } from './components/coffeeg-authenticate-user/coffeeg-authenticate-user';
import { Home } from './components/home/home';
import { RegisterUser } from './components/auth/register-user/register-user';

export const routes: Routes = [
    {
        path: 'user-beverage-customisation/:id',
        component: UserBeverageCustomisation
    },
    {
        path: 'edit-beverage-customisation/:userId',
        component: EditBeverageCustomisation
    },
    {
        path: 'create-beverage-customisation',
        component: CreateBeverageCustomisation
    },
    // {
    //     path: 'test',
    //     component: LayoutTester
    // },
    {
        path: 'auth-user',
        component: CoffeegAuthenticateUser
    },
    {
        path: 'auth/callback/:token', // not a user-viewable route (needed for handling the callback from the external auth provider)
        component: ExternalAuthHandler
    },
    {
        path: 'register-user',
        component: RegisterUser
    },
    {
        path: '',
        component: Home
    }
];
