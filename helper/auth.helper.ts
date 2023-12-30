
import { ApolloError } from "@apollo/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
const helperAuth = (error: ApolloError | undefined, authState: any, router: AppRouterInstance) => {
    if (error?.graphQLErrors[0].message === 'jwt expired') {
        router.push('/auth/login');
    }
    else if (error?.graphQLErrors[0].message === 'Forbidden') {
        router.push('/auth/login')
    } else if (error) {
        router.push('/')
    } else {
        authState.setIsAuth(true);
    }
}

export default helperAuth