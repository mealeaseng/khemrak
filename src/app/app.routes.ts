import { Routes } from '@angular/router';
import { Error } from '../Components/error/error';
import { Layout } from '../Components/layout/layout';
import { Homepgae } from '../Components/hompgae/hompgae';
import { About } from '../Components/about/about';
import { Service } from '../Components/service/service';
import { Contact } from '../Components/contact/contact';
import { TotalProduct } from '../Components/total-product/total-product';

export const routes: Routes = [
        {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: '',
        component: Layout,
        children: [
            {
                path: 'home',
                component: Homepgae
            },
            {
                path: 'about',
                component: About
            },
            {
                path: "service",
                component: Service
            },
            {
                path: 'contact',
                component: Contact
            },
            {
                path: 'total',
                component: TotalProduct
            }
        ]
    },
    {
        path: '**',
        component: Error
    }

];
