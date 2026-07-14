import s from './auth-layout.module.scss'
import {Suspense} from "react";
import {Footer} from "@/widgets/footer";
import {HeaderLogin} from "@/widgets/header-login";
import {PageLoader} from "@/widgets/page-loader";
import {Outlet} from "react-router-dom";

export const AuthLayout = () => {
    return (
        <div className={s.app}>
            <HeaderLogin />
            <div className={s.app_wrapper}>
                <Suspense fallback={<PageLoader/>}>
                    <Outlet/>
                </Suspense>
            </div>
            <Footer />
        </div>
    );
};