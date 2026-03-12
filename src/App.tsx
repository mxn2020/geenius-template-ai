import { RouterProvider } from '@tanstack/react-router';
import { Authenticated, Unauthenticated } from 'convex/react';
import { router } from '~/router';
import { SignIn } from '~/routes/SignIn';

export default function App() {
  return (
    <>
      <Authenticated>
        <RouterProvider router={router} />
      </Authenticated>
      <Unauthenticated>
        <SignIn />
      </Unauthenticated>
    </>
  );
}
