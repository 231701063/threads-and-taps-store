
import React from 'react';
import { Layout } from '@/components/Layout';
import { LoginForm } from '@/components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
