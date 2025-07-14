import { GlobalConfig, PayloadRequest } from 'payload';
import { handlers } from '@/auth';
import { NextRequest } from 'next/server';

export const Auth: GlobalConfig = {
    slug: 'auth',
    fields: [],
    endpoints: [
        {
            path: 'admin/login',
            method: 'get',
            handler: async (req: PayloadRequest) => {
                const nextRequest = new NextRequest(req as Request);
                return handlers.GET(nextRequest);
            }
        },
        {
            path: 'signin-callback',
            method: 'post',
            handler: async (req: PayloadRequest) => {
                const nextRequest = new NextRequest(req as Request);
                return handlers.POST(nextRequest);
            }
        }
    ]
}